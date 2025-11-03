import { useState } from 'react'

interface EncryptionResultProps {
  cipherText: string
}

const EncryptionResult = ({ cipherText }: EncryptionResultProps) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(cipherText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Error al copiar:', err)
    }
  }

  return (
    <div className="relative bg-[#0b0f10] border border-cyan-600/30 rounded-2xl p-4 shadow-[0_0_20px_rgba(0,255,255,0.2)] transition-all duration-300 font-mono text-[0.65rem]">
      
      {/* Top bar estilo terminal */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-600 animate-pulse"></span>
          <span className="w-3 h-3 rounded-full bg-yellow-400 animate-pulse"></span>
          <span className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></span>
          <h3 className="text-cyan-400 font-semibold ml-2 flex items-center gap-2">
            <i className="bx bx-check-shield animate-pulse"></i>
            Texto Cifrado
          </h3>
        </div>

        <button
          onClick={handleCopy}
          className={`flex items-center gap-2 px-3 py-1 rounded-lg border text-[0.65rem] font-semibold transition-all duration-300 ${
            copied
              ? 'bg-cyan-500 text-black border-cyan-400 shadow-[0_0_10px_rgba(0,255,255,0.3)]'
              : 'bg-[#081012] border-cyan-500/40 text-cyan-300 hover:bg-cyan-600 hover:text-black hover:shadow-[0_0_12px_rgba(0,255,255,0.3)]'
          }`}
        >
          <i className={`bx ${copied ? 'bx-check' : 'bx-copy'}`}></i>
          {copied ? 'Copiado!' : 'Copiar'}
        </button>
      </div>

      {/* Panel de texto cifrado */}
      <div className="bg-[#060b12] border border-cyan-600/20 rounded-lg p-3 overflow-auto break-all whitespace-pre-wrap relative shadow-inner">
        <code className="text-cyan-300 text-[0.65rem] leading-snug select-text">{cipherText}</code>
        {/* Cursor animado estilo terminal */}
        <span className="absolute bottom-2 left-2 w-[2px] h-4 bg-cyan-300 animate-blink"></span>
      </div>
    </div>
  )
}

export default EncryptionResult
