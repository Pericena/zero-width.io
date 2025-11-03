import { useState } from 'react';

interface EncryptionFormProps {
  publicMessage: string;
  secretMessage: string;
  onPublicMessageChange: (value: string) => void;
  onSecretMessageChange: (value: string) => void;
  onEncrypt: () => void;
  onClear: () => void;
  encryptedResult?: string;
}

const EncryptionForm = ({
  publicMessage,
  secretMessage,
  onPublicMessageChange,
  onSecretMessageChange,
  onEncrypt,
  onClear,
  encryptedResult,
}: EncryptionFormProps) => {
  const [showSecret, setShowSecret] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row gap-4 w-full font-mono text-green-300 text-[0.7rem]">
      {/* Formulario principal */}
      <div className="flex-1 flex flex-col gap-3 ">
        
        {/* Mensaje Público */}
        <div className="flex flex-col gap-1">
          <label htmlFor="public-message" className="flex items-center gap-2 text-green-400 text-xs">
            <i className="bx bx-message text-green-400 animate-pulse"></i> Mensaje Público
          </label>
          <textarea
            id="public-message"
            value={publicMessage}
            onChange={(e) => onPublicMessageChange(e.target.value)}
            placeholder="> Escribe el mensaje público..."
            rows={4}
            className="bg-black text-green-300 placeholder-green-600 border border-green-500/20 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-green-500 resize-none transition-all text-[0.7rem]"
          />
        </div>

        {/* Mensaje Secreto */}
        <div className="flex flex-col gap-1 relative">
          <label htmlFor="secret-message" className="flex items-center gap-2 text-green-400 text-xs">
            <i className="bx bx-hide text-green-400 animate-pulse"></i> Mensaje Secreto
          </label>
          <input
            type={showSecret ? 'text' : 'password'}
            id="secret-message"
            value={secretMessage}
            onChange={(e) => onSecretMessageChange(e.target.value)}
            placeholder="> Escribe el mensaje secreto..."
            className="bg-black text-green-300 placeholder-green-600 border border-green-500/20 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-green-500 transition-all text-[0.7rem]"
          />
          <button
            type="button"
            onClick={() => setShowSecret(!showSecret)}
            className="absolute right-2 top-7 text-green-400 hover:text-green-200"
            aria-label={showSecret ? 'Ocultar mensaje secreto' : 'Mostrar mensaje secreto'}
          >
            <i className={`bx ${showSecret ? 'bx-show' : 'bx-hide'} animate-pulse`}></i>
          </button>
        </div>

        {/* Botones estilo terminal hacker */}
        <div className="flex flex-wrap gap-2 mt-2">
          <button
            onClick={onEncrypt}
            disabled={!publicMessage.trim() || !secretMessage.trim()}
            className="flex items-center gap-1 px-3 py-1 bg-green-500 hover:bg-green-600 disabled:bg-gray-700 text-black rounded-md shadow-[0_0_10px_rgba(0,255,0,0.4)] text-[0.7rem] transition-all active:scale-95"
          >
            <i className="bx bx-lock"></i> Cifrar
          </button>
          <button
            onClick={onClear}
            className="flex items-center gap-1 px-3 py-1 bg-transparent border border-green-500 text-green-300 hover:bg-green-900/20 rounded-md text-[0.7rem] shadow-inner transition-all active:scale-95"
          >
            <i className="bx bx-trash"></i> Limpiar
          </button>
        </div>
      </div>

      {/* Panel lateral de resultados estilo terminal */}
      {encryptedResult && (
        <div className="flex-1 bg-[#0b0f10] border border-green-500/20 rounded-2xl p-4 overflow-auto text-[0.7rem]">
          <h4 className="flex items-center gap-2 mb-2 text-green-400 text-xs">
            <i className="bx bx-code-block animate-pulse"></i> Resultado Cifrado
          </h4>
          <pre className="break-all whitespace-pre-wrap text-green-300 text-[0.7rem]">{encryptedResult}</pre>
        </div>
      )}
    </div>
  );
};

export default EncryptionForm;
