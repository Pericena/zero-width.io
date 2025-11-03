import type { EncryptionInfo } from '../types/index';

interface EncryptionInfoPanelProps {
  encryptionInfo: EncryptionInfo;
}

/**
 * Panel estilo terminal hacker para mostrar información detallada del cifrado.
 */
function EncryptionInfoPanel({ encryptionInfo }: EncryptionInfoPanelProps) {
  return (
    <section className="relative flex flex-col gap-4 p-4 bg-[#0a0f16] text-cyan-300 rounded-2xl shadow-[0_0_25px_rgba(0,255,255,0.15)] border border-cyan-700/50 overflow-hidden group transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,255,255,0.25)] text-[0.7rem]">
      
      {/* Top bar estilo terminal */}
      <div className="flex items-center justify-between gap-2 mb-3 border-b border-cyan-800/60 pb-2">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-600 animate-pulse"></span>
          <span className="w-3 h-3 rounded-full bg-yellow-400 animate-pulse"></span>
          <span className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></span>
          <span className="ml-2 text-xs text-cyan-400 font-mono uppercase">ficcthack@terminal:~ /encryption</span>
        </div>
        <span className="text-xs text-cyan-400/70">v1.0</span>
      </div>

      {/* Info General */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        <InfoItem label="🔒 Mensaje secreto" value={`"${encryptionInfo.secretMessage}"`} />
        <InfoItem label="📏 Longitud" value={`${encryptionInfo.messageLength} caracteres`} />
        <InfoItem label="🟦 ZWSP" value={encryptionInfo.zwspUsed} />
        <InfoItem label="⬛ ZWNJ" value={encryptionInfo.zwnjUsed} />
        <InfoItem label="⚙️ Total Zero-Width" value={encryptionInfo.totalZeroWidth} />
      </div>

      {/* Panel de binario */}
      <div className="bg-[#060b12] border border-cyan-800/60 p-3 rounded-xl overflow-auto shadow-inner relative">
        <h4 className="flex items-center gap-2 text-cyan-400 mb-2 font-semibold">
          <i className="bx bx-code-block text-base"></i> Binario Generado
        </h4>

        <code className="block font-mono break-all whitespace-pre-wrap text-cyan-300 text-[0.65rem] leading-snug select-text animate-fade-in">
          {encryptionInfo.binary}
        </code>

        {/* Cursor animado */}
        <div className="absolute bottom-2 left-2 w-[2px] h-4 bg-cyan-400 animate-blink"></div>
      </div>
    </section>
  );
}

interface InfoItemProps {
  label: string;
  value: string | number;
}

function InfoItem({ label, value }: InfoItemProps) {
  return (
    <div className="flex flex-col bg-[#0c121b] border border-cyan-800/50 rounded-lg p-2 hover:border-cyan-400/80 hover:shadow-[0_0_10px_rgba(0,255,255,0.2)] transition-all duration-300">
      <span className="text-[0.6rem] text-cyan-400 uppercase font-semibold">{label}</span>
      <span className="text-[0.65rem] font-mono text-cyan-300 mt-1 truncate">{value}</span>
    </div>
  );
}

export default EncryptionInfoPanel;
