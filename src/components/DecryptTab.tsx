// src/components/DecryptTab.tsx
import { useState } from 'react'
import useZeroWidthCipher from '../hooks/useZeroWidthCipher'

export default function DecryptTab() {
  const [cipherText, setCipherText] = useState('')
  const { decrypt, decryptedPublic, decryptedSecret, error } = useZeroWidthCipher()

  // UI state
  const [maskSecret, setMaskSecret] = useState(true)
  const [copiedPublic, setCopiedPublic] = useState(false)
  const [copiedSecret, setCopiedSecret] = useState(false)

  const handleDecrypt = () => {
    if (!cipherText.trim()) return
    decrypt(cipherText)
  }

  const handleClear = () => {
    setCipherText('')
  }

  const handleCopy = async (text: string, which: 'public' | 'secret') => {
    try {
      await navigator.clipboard.writeText(text)
      if (which === 'public') {
        setCopiedPublic(true)
        setTimeout(() => setCopiedPublic(false), 1800)
      } else {
        setCopiedSecret(true)
        setTimeout(() => setCopiedSecret(false), 1800)
      }
    } catch {
      // ignore
    }
  }

  return (
    <main className="w-full max-w-6xl mx-auto p-4 sm:p-6 text-[0.85rem] font-mono text-green-300">
      <section className="relative bg-[#061013] border border-green-700/12 rounded-2xl shadow-[0_0_28px_rgba(0,255,0,0.06)] overflow-hidden">
        {/* window top bar */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-green-700/8 bg-gradient-to-b from-black/80 to-black/60">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-red-600/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-400/80" />
            <span className="w-3 h-3 rounded-full bg-green-400/80" />
            <span className="ml-3 text-[11px] text-green-300/80">hacker@ficct:~/encrypt</span>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-green-300/70">
            <span className="px-2 py-0.5 bg-green-900/10 rounded">v1.0</span>
            <span className="uppercase">secure</span>
          </div>
        </div>

        {/* Body: grid 2 columnas en lg, 1 columna en mobile */}
        <div className="p-4 sm:p-5 lg:p-6 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {/* Left column: input */}
          <div className="space-y-3">
            <header>
              <h1 className="flex items-center gap-2 text-green-400 text-base sm:text-lg font-semibold">
                <i className="bx bx-terminal text-lg sm:text-xl" /> decrypt — analizar
              </h1>
              <p className="mt-1 text-green-300/70 text-[11px]">
                Pega el texto que contiene caracteres zero-width.
              </p>
            </header>

            <div className="bg-black/80 border border-green-600/12 rounded-lg p-3">
              <label className="text-green-300/80 text-[11px] flex items-center gap-2 mb-1">
                <i className="bx bx-key" /> Texto cifrado
              </label>

              <textarea
                id="cipher-text"
                value={cipherText}
                onChange={(e) => setCipherText(e.target.value)}
                placeholder="> Pega aquí el texto cifrado..."
                rows={8}
                className="w-full bg-transparent text-green-300 placeholder-green-600 border border-green-600/8 rounded px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-green-500 resize-none"
              />

              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  onClick={handleDecrypt}
                  disabled={!cipherText.trim()}
                  className="flex items-center gap-2 px-3 py-1.5 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-black text-xs rounded shadow"
                >
                  <i className="bx bx-search-alt" /> Analizar
                </button>

                <button
                  onClick={handleClear}
                  className="flex items-center gap-2 px-3 py-1.5 bg-transparent border border-green-700/20 text-green-300 text-xs rounded hover:bg-green-900/20"
                >
                  <i className="bx bx-trash" /> Limpiar
                </button>

                <button
                  onClick={() => { setCipherText(prev => prev + '\n\u200B\u200C') }}
                  className="flex items-center gap-2 px-3 py-1.5 bg-black/60 border border-green-700/10 text-green-300 text-xs rounded hover:bg-green-900/20"
                  title="Insertar caracteres zero-width (demo)"
                >
                  <i className="bx bx-code" /> Insert ZW
                </button>
              </div>

              {error && (
                <div className="mt-3 text-red-400 bg-red-900/10 border border-red-700/20 rounded px-2 py-1 text-xs flex items-center gap-2">
                  <i className="bx bx-error-circle" /> {error}
                </div>
              )}
            </div>
          </div>

          {/* Right column: resultados */}
          <aside className="space-y-3">
            <div className="bg-black/85 border border-green-600/12 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <h2 className="text-green-300/90 text-sm font-semibold flex items-center gap-2">
                  <i className="bx bx-message-detail" /> Mensaje Público
                </h2>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decryptedPublic && handleCopy(decryptedPublic, 'public')}
                    disabled={!decryptedPublic}
                    className="text-[11px] px-2 py-0.5 bg-black/60 border border-green-700/10 rounded hover:bg-green-900/10"
                    aria-label="Copiar mensaje público"
                  >
                    <i className={`bx ${copiedPublic ? 'bx-check' : 'bx-copy'}`} />
                  </button>
                </div>
              </div>

              <div className="mt-2 bg-black/90 border border-green-700/8 rounded p-2 min-h-[64px]">
                <pre className="text-xs text-green-200 break-words whitespace-pre-wrap">{decryptedPublic || <span className="text-green-400/50">— vacío —</span>}</pre>
              </div>
            </div>

            <div className="bg-black/85 border border-green-600/12 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <h2 className="text-green-300/90 text-sm font-semibold flex items-center gap-2">
                  <i className="bx bx-hide" /> Mensaje Secreto
                </h2>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setMaskSecret(s => !s)}
                    className="text-[11px] px-2 py-0.5 bg-black/60 border border-green-700/10 rounded hover:bg-green-900/10"
                    aria-label={maskSecret ? 'Mostrar secreto' : 'Ocultar secreto'}
                  >
                    <i className={`bx ${maskSecret ? 'bx-low-vision' : 'bx-show'}`} />
                  </button>

                  <button
                    onClick={() => decryptedSecret && handleCopy(decryptedSecret, 'secret')}
                    disabled={!decryptedSecret}
                    className="text-[11px] px-2 py-0.5 bg-black/60 border border-green-700/10 rounded hover:bg-green-900/10"
                    aria-label="Copiar mensaje secreto"
                  >
                    <i className={`bx ${copiedSecret ? 'bx-check' : 'bx-copy'}`} />
                  </button>
                </div>
              </div>

              <div className="mt-2 bg-black/90 border border-green-700/8 rounded p-2 min-h-[64px]">
                <pre className="text-xs text-green-200 break-words whitespace-pre-wrap">
                  {decryptedSecret
                    ? maskSecret
                      ? '•'.repeat(Math.min(80, decryptedSecret.length)) // masked preview
                      : decryptedSecret
                    : <span className="text-green-400/50">— vacío —</span>
                  }
                </pre>
                {decryptedSecret && (
                  <div className="mt-2 text-[11px] text-green-300/70">
                    <span>length: {decryptedSecret.length} chars</span>
                  </div>
                )}
              </div>
            </div>

            {/* Binary / stats panel */}
            <div className="bg-[#021014] border border-cyan-700/6 rounded-lg p-3 text-[11px] text-cyan-200">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <i className="bx bx-code-alt" /> <strong className="text-xs">Análisis</strong>
                </div>
                <span className="text-xs text-cyan-200/70">zw: invisible</span>
              </div>

              <div className="text-[11px] text-cyan-100/80">
                {/* Placeholder: si quieres, muestra estadísticas aquí */}
                <div>ZW detection: <span className="text-green-300 ml-1">{decryptedSecret ? 'sí' : 'no'}</span></div>
                <div className="mt-1">Public length: <span className="text-green-300 ml-1">{decryptedPublic?.length ?? 0}</span></div>
              </div>
            </div>
          </aside>
        </div>

        {/* Bottom status bar */}
        <div className="px-3 py-2 border-t border-green-600/8 bg-gradient-to-t from-black/75 to-black/50 text-green-300 text-[11px] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2"><i className="bx bx-terminal" /> status: <strong className="ml-1 text-green-200">{cipherText.trim() ? 'ready' : 'idle'}</strong></span>
            <span className="hidden sm:inline-flex items-center gap-2 text-green-300/70"><i className="bx bx-network-chart" /> net: offline</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-green-300/70 text-[11px]">root@hacker:~$</span>
            <span className="w-3 h-4 bg-green-300 animate-pulse inline-block rounded-sm" aria-hidden />
          </div>
        </div>
      </section>
    </main>
  )
}
