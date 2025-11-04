// src/components/EncryptTab.tsx
import { useState } from 'react'
import useZeroWidthCipher from '../hooks/useZeroWidthCipher'
import EncryptionForm from './EncryptionForm'
import EncryptionResult from './EncryptionResult'
import EncryptionInfoPanel from './EncryptionInfoPanel'

export default function EncryptTab() {
  const [publicMessage, setPublicMessage] = useState('')
  const [secretMessage, setSecretMessage] = useState('')
  const [showResult, setShowResult] = useState(false)

  const { encrypt, cipherText, encryptionInfo, error } = useZeroWidthCipher()

  const handleEncrypt = () => {
    if (!publicMessage.trim() || !secretMessage.trim()) return
    encrypt(publicMessage, secretMessage)
    setShowResult(true)
  }

  const handleClear = () => {
    setPublicMessage('')
    setSecretMessage('')
    setShowResult(false)
  }

  // quick copy helper (for UI)
  const copyText = async (text?: string) => {
    if (!text) return
    try {
      await navigator.clipboard.writeText(text)
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

        {/* header compact */}
        <div className="p-4 sm:p-5 grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
          <div>
            <div className="flex items-center gap-2">
              <i className="bx bx-lock-alt text-lg text-green-400 animate-pulse" />
                            <h1 className="flex items-center gap-2 text-green-400 text-base sm:text-lg font-semibold"> encrypt — ocultar mensaje
              </h1>
            </div>
            <p className="mt-1 text-[0.73rem] text-green-300/70 max-w-lg">
              Esteganografía zero-width: oculta secretos dentro de texto público.
            </p>
          </div>

        </div>

        {/* main body */}
        <div className="p-4 sm:p-6 space-y-4">
          {/* form panel */}
          <div className="bg-black/80 border border-green-700/12 rounded-xl p-3 sm:p-4 shadow-inner">
            <EncryptionForm
              publicMessage={publicMessage}
              secretMessage={secretMessage}
              onPublicMessageChange={setPublicMessage}
              onSecretMessageChange={setSecretMessage}
              onEncrypt={handleEncrypt}
              onClear={handleClear}
              encryptedResult={cipherText || undefined}
            />
          </div>

          {/* error */}
          {error && (
            <div className="text-red-300 bg-red-900/10 border border-red-700/18 rounded-md px-3 py-2 text-sm flex items-center gap-2">
              <i className="bx bx-error-circle" /> {error}
            </div>
          )}

          {/* results area: two-column on wide screens */}
          {showResult && cipherText && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* left: cipher text */}
              <div className="bg-[#041014] border border-green-700/12 rounded-xl p-3 shadow-[0_0_18px_rgba(0,255,0,0.04)]">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm text-green-300 font-semibold flex items-center gap-2">
                    <i className="bx bx-code-block text-lg animate-pulse" /> Texto cifrado
                  </h2>
                  <div className="flex items-center gap-2">
                    <span className="text-[0.72rem] text-green-300/70">len: {cipherText.length}</span>
                    <button
                      onClick={() => copyText(cipherText)}
                      className="text-[0.72rem] px-2 py-0.5 bg-transparent border border-green-700/10 rounded hover:bg-green-900/10"
                    >
                      <i className="bx bx-copy" />
                    </button>
                  </div>
                </div>

                <div className="mt-3">
                  <EncryptionResult cipherText={cipherText} />
                </div>
              </div>

              {/* right: info + instructions (stacked) */}
              <div className="flex flex-col gap-4">
                {encryptionInfo && (
                  <div className="bg-[#041014] border border-cyan-700/8 rounded-xl p-3 shadow-inner">
                    <EncryptionInfoPanel encryptionInfo={encryptionInfo} />
                  </div>
                )}

                <aside className="bg-black/80 border border-green-700/12 rounded-xl p-3">
                  <h3 className="text-sm text-green-300 font-semibold flex items-center gap-2">
                    <i className="bx bx-info-circle text-lg animate-pulse" /> Instrucciones
                  </h3>
                  <ol className="list-decimal list-inside text-[0.78rem] text-green-200/80 mt-2 space-y-1">
                    <li>Copia el texto cifrado con "Copiar".</li>
                    <li>Pega donde quieras ocultarlo (ej: post, nota, mensaje).</li>
                    <li>Para recuperar, usa la pestaña <strong>Descifrar</strong>.</li>
                    <li>No compartas secretos sensibles en texto plano.</li>
                  </ol>
                </aside>
              </div>
            </div>
          )}
        </div>

        {/* status bar */}
        <div className="px-4 py-2 border-t border-green-700/10 bg-gradient-to-t from-black/75 to-black/50 text-green-300 text-[0.75rem] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2">
              <i className="bx bx-terminal" /> status: <strong className="ml-1 text-green-200">idle</strong>
            </span>
            <span className="hidden md:inline-flex items-center gap-2 text-green-300/70">
              <i className="bx bx-network-chart" /> net: offline
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-green-300/60">root@hacker:~$</span>
            <span className="w-3 h-4 bg-green-300 animate-pulse inline-block rounded-sm" aria-hidden />
          </div>
        </div>
      </section>
    </main>
  )
}
