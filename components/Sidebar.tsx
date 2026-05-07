'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const nav = [
  { href: '/', label: 'Главная', icon: IconHome },
  { href: '/checklist', label: 'Чек-лист', icon: IconChecklist },
  { href: '/assistant', label: 'AI-ассистент', icon: IconBot },
  { href: '/debtors', label: 'Реестр', icon: IconDebtors },
]

function IconHome() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  )
}

function IconChecklist() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 11l3 3L22 4"/>
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
    </svg>
  )
}

function IconBot() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="10" rx="2"/>
      <circle cx="12" cy="5" r="2"/>
      <path d="M12 7v4"/>
      <line x1="8" y1="16" x2="8" y2="16"/>
      <line x1="16" y1="16" x2="16" y2="16"/>
    </svg>
  )
}

function IconDebtors() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="8" x2="12" y2="12"/>
      <line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  )
}

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <>
      {/* Десктоп: боковая панель */}
      <aside className="hidden md:flex w-60 flex-shrink-0 bg-[#0c1829] flex-col select-none">
        {/* Logo */}
        <div className="px-6 py-6 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white text-sm font-semibold" style={{fontFamily: 'Sora, sans-serif'}}>N</div>
            <div>
              <div className="text-white text-sm font-semibold" style={{fontFamily: 'Sora, sans-serif'}}>Нотариус AI</div>
              <div className="text-slate-500 text-xs mt-0.5">Инструмент риэлтора</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 space-y-0.5 px-3">
          {nav.map(({ href, label, icon: Icon }) => {
            const active = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 ${
                  active
                    ? 'bg-teal-600/20 text-teal-400 font-medium'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.05]'
                }`}
              >
                <span className={active ? 'text-teal-400' : 'text-slate-500'}>
                  <Icon />
                </span>
                {label}
                {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-teal-400" />}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/[0.06]">
          <div className="text-slate-600 text-xs">v1.0 · Личный инструмент</div>
          <div className="text-slate-700 text-xs mt-0.5">Украинский рынок · 2025</div>
        </div>
      </aside>

      {/* Мобильный: верхний хедер */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-[#0c1829] border-b border-white/[0.06] px-4 py-3 flex items-center gap-3">
        <div className="w-7 h-7 rounded-lg bg-teal-600 flex items-center justify-center text-white text-xs font-semibold">N</div>
        <span className="text-white text-sm font-semibold" style={{fontFamily: 'Sora, sans-serif'}}>Нотариус AI</span>
      </div>

      {/* Мобильный: нижняя навигация */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0c1829] border-t border-white/[0.06] flex">
        {nav.map(({ href, label, icon: Icon }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={`flex-1 flex flex-col items-center gap-1 py-3 text-xs transition-all ${
                active ? 'text-teal-400' : 'text-slate-500'
              }`}
            >
              <Icon />
              <span>{label}</span>
            </Link>
          )
        })}
      </nav>
    </>
  )
}
