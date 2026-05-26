import type { HighlighterCore } from 'shiki/core'
import { createHighlighterCore } from 'shiki/core'
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'

let highlighter: HighlighterCore | null = null

export async function getHighlighter(): Promise<HighlighterCore> {
  if (highlighter)
    return highlighter

  highlighter = await createHighlighterCore({
    themes: [
      import('shiki/themes/vitesse-dark.mjs'),
      import('shiki/themes/vitesse-light.mjs'),
    ],
    langs: [
      import('shiki/langs/javascript.mjs'),
      import('shiki/langs/typescript.mjs'),
      import('shiki/langs/json.mjs'),
      import('shiki/langs/bash.mjs'),
      import('shiki/langs/html.mjs'),
      import('shiki/langs/css.mjs'),
      import('shiki/langs/vue.mjs'),
      import('shiki/langs/markdown.mjs'),
    ],
    engine: createJavaScriptRegexEngine(),
  })

  return highlighter
}

export async function highlightCode(code: string, lang: string): Promise<string> {
  const h = await getHighlighter()
  return h.codeToHtml(code, { lang, theme: 'vitesse-dark' })
}
