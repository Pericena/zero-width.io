import { useState } from 'react'
import logo from '../../assets/logo.png' // 👈 coloca tu logo aquí (puede ser .png o .svg)

function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="w-full font-mono text-green-300 select-none">
      {/* Barra superior tipo terminal */}
      <div className="relative bg-[#050b07] border-b border-green-700/30 shadow-[0_8px_40px_rgba(0,255,0,0.08)] overflow-hidden">
        {/* Efecto de scanline hacker */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.02)_1px,transparent_1px)] bg-[length:100%_2px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 gap-4 relative z-10">
          {/* Logo + nombre */}
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="FicctHack Logo"
              className="w-7 h-7 md:w-9 md:h-9 object-contain drop-shadow-[0_0_6px_rgba(0,255,0,0.4)] animate-pulse"
            />
            <div className="flex flex-col leading-tight">
              <h1 className="text-sm md:text-base font-bold text-green-400 tracking-widest drop-shadow-[0_0_5px_rgba(0,255,0,0.6)]">
                FicctHack Zero
              </h1>
              <p className="text-[0.65rem] md:text-xs text-green-300/70 font-mono">
                Esteganografía Zero-Width
              </p>
            </div>
          </div>

          {/* Badge de seguridad */}
          <div className="hidden md:flex items-center gap-2">
            <i className="bx bx-shield text-green-400 text-xl md:text-2xl animate-pulse drop-shadow-[0_0_6px_rgba(0,255,0,0.4)]"></i>
            <span className="bg-green-600 text-black px-2 py-1 rounded-full text-[0.65rem] md:text-xs font-bold uppercase tracking-wider shadow-[0_0_10px_rgba(0,255,0,0.4)] hover:bg-green-500 transition-all">
              Secure
            </span>
          </div>

          {/* Botón hamburguesa móvil */}
          <button
            className="md:hidden p-2 rounded-md bg-black/60 border border-green-700/30 hover:bg-green-900/20 transition-colors"
            aria-label="Abrir menú"
            onClick={() => setOpen(!open)}
          >
            <i className={`bx ${open ? 'bx-x' : 'bx-menu'} text-2xl text-green-300`} />
          </button>
        </div>
      </div>

      {/* Subrayado neón */}
      <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-green-500 to-transparent animate-pulse shadow-[0_0_12px_rgba(0,255,0,0.7)]" />
    </header>
  )
}

export default Header
