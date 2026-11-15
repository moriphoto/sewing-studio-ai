// Shared helpers for the AI functions (ask.mts, identify.mts).
//  - GEMINI_API_KEY set  -> Google Gemini Flash-Lite through the plain REST API (no extra package).
//  - otherwise           -> the Netlify AI Gateway (Anthropic SDK, key injected by Netlify) exactly as before.
//  - neither             -> the functions answer { configured: false } and the app falls back to local search.
import Anthropic from '@anthropic-ai/sdk';

export const env = (k: string): string | undefined => {
  try { // @ts-ignore – Netlify global exists on the platform, not in local tests
    if (typeof Netlify !== 'undefined') return Netlify.env.get(k) || undefined;
  } catch { /* ignore */ }
  return (globalThis as any).process?.env?.[k] || undefined;
};
export const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' } });

export const GATEWAY_MODELS = ['claude-haiku-5-5', 'claude-sonnet-4-6']; // overridable with SSAI_MODEL; second is the fallback
// Current Gemini Flash-Lite id (checked Nov 2026). Override with SSAI_GEMINI_MODEL if Google renames it.
export const GEMINI_MODELS = ['gemini-3.5-flash-lite', 'gemini-flash-lite-latest'];

// Adapts Gemini's generateContent to the small slice of the Anthropic client that the functions use:
//   client.messages.create({ model, max_tokens, temperature, system, messages, json? }) -> { content: [{ type: 'text', text }] }
export function geminiClient(apiKey: string, fetchImpl: typeof fetch = fetch) {
  const toParts = (c: any) => (typeof c === 'string' ? [{ text: c }] : (c || []).map((b: any) => b.type === 'image' ? { inlineData: { mimeType: b.source.media_type, data: b.source.data } } : { text: b.text }));
  return {
    messages: {
      create: async (a: any) => {
        const body: any = {
          contents: (a.messages || []).map((m: any) => ({ role: m.role === 'assistant' ? 'model' : 'user', parts: toParts(m.content) })),
          generationConfig: { temperature: a.temperature ?? 0.3, maxOutputTokens: Math.max(a.max_tokens || 650, 1200), thinkingConfig: { thinkingLevel: 'minimal' } }
        };
        if (a.system) body.systemInstruction = { parts: [{ text: a.system }] };
        if (a.json) body.generationConfig.responseMimeType = 'application/json';
        const call = async () => fetchImpl(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(a.model)}:generateContent`, {
          method: 'POST', headers: { 'content-type': 'application/json', 'x-goog-api-key': apiKey }, body: JSON.stringify(body)
        });
        let res = await call();
        if (res.status === 400) { // some model versions reject the thinking setting: retry once without it
          const t = await res.clone().text().catch(() => '');
          if (/thinking/i.test(t)) { delete body.generationConfig.thinkingConfig; res = await call(); }
        }
        if (!res.ok) {
          const t = await res.text().catch(() => '');
          // an invalid key comes back as 400 "API key not valid" – treat it as an auth failure
          const status = res.status === 400 && /api key/i.test(t) ? 401 : res.status;
          throw Object.assign(new Error(`gemini ${res.status}: ${t.slice(0, 200)}`), { status });
        }
        const j: any = await res.json();
        const text = (j?.candidates?.[0]?.content?.parts || []).filter((p: any) => typeof p.text === 'string' && !p.thought).map((p: any) => p.text).join('\n').trim();
        if (!text) throw Object.assign(new Error('empty answer'), { status: 502 });
        return { content: [{ type: 'text', text }], model: a.model };
      }
    }
  };
}

export type Provider = { client: any; models: string[]; name: 'gemini' | 'gateway' | 'injected' } | null;
// Chooses the AI provider. `deps.client` is for tests. Returns null when nothing is configured.
export function pickProvider(deps: { client?: any; fetch?: typeof fetch } = {}): Provider {
  const override = env('SSAI_MODEL');
  if (deps.client) return { client: deps.client, models: (override ? [override] : []).concat(GATEWAY_MODELS), name: 'injected' };
  const gk = env('GEMINI_API_KEY');
  if (gk) { const gm = env('SSAI_GEMINI_MODEL'); return { client: geminiClient(gk, deps.fetch), models: (gm ? [gm] : []).concat(GEMINI_MODELS.filter((m) => m !== gm)), name: 'gemini' }; }
  if (env('ANTHROPIC_API_KEY')) return { client: new Anthropic(), models: (override ? [override] : []).concat(GATEWAY_MODELS), name: 'gateway' };
  return null;
}
export const authMessage = (p: Provider) => p && p.name === 'gemini' ? 'The Gemini API key was not accepted. Check GEMINI_API_KEY in the Netlify environment variables.' : 'The AI Gateway did not accept the request – AI may be turned off for this site.';
