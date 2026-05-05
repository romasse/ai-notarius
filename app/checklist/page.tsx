'use client'
import { useState, useCallback } from 'react'
import { SECONDARY, PRIMARY, MORTGAGE, WARTIME, type Item, type Section, type Badge } from '@/lib/checklist-data'

const BADGE_CONFIG: Record<Badge, { label: string; classes: string }> = {
  required:    { label: 'обяз',   classes: 'bg-teal-50 text-teal-700 border-teal-200' },
  conditional: { label: 'условн', classes: 'bg-amber-50 text-amber-700 border-amber-200' },
  risk:        { label: 'риск',   classes: 'bg-red-50 text-red-700 border-red-200' },
}

function BadgePill({ badge }: { badge: Badge }) {
  const cfg = BADGE_CONFIG[badge]
  return (
    <span className={`inline-flex items-center text-[10px] font-semibold px-1.5 py-0.5 rounded border ${cfg.classes} shrink-0`}>
      {cfg.label}
    </span>
  )
}

function CheckItem({
  item, checked, onToggle
}: { item: Item; checked: boolean; onToggle: () => void }) {
  return (
    <label
      className={`flex items-start gap-3 px-4 py-2.5 cursor-pointer group transition-colors rounded-lg mx-2 mb-0.5 ${
        checked ? 'opacity-50' : 'hover:bg-slate-50'
      }`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onToggle}
        className="mt-0.5 shrink-0"
      />
      <div className="flex-1 min-w-0">
        <span className={`text-sm leading-snug ${checked ? 'line-through text-slate-400' : 'text-slate-700'}`}>
          {item.text}
        </span>
        {item.note && (
          <div className="text-xs text-slate-400 mt-0.5 leading-relaxed">{item.note}</div>
        )}
      </div>
      <BadgePill badge={item.badge} />
    </label>
  )
}

function SectionBlock({
  section, checked, onToggle
}: { section: Section; checked: Set<string>; onToggle: (id: string) => void }) {
  const [open, setOpen] = useState(true)
  const done = section.items.filter(i => checked.has(i.id)).length
  const total = section.items.length

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden mb-3">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-slate-50 transition-colors"
      >
        <span className="text-lg">{section.icon}</span>
        <span className="flex-1 text-sm font-semibold text-slate-800" style={{fontFamily: 'Sora, sans-serif'}}>
          {section.title}
        </span>
        <span className="text-xs text-slate-400 font-mono">{done}/{total}</span>
        <svg
          className={`w-4 h-4 text-slate-400 transition-transform ${open ? 'rotate-90' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
        </svg>
      </button>
      {open && (
        <div className="pb-2">
          {section.items.map(item => (
            <CheckItem key={item.id} item={item} checked={checked.has(item.id)} onToggle={() => onToggle(item.id)} />
          ))}
        </div>
      )}
    </div>
  )
}

function SpecialBlock({
  icon, title, items, colorClass, checked, onToggle, defaultOpen = false
}: {
  icon: string; title: string; items: Item[]
  colorClass: string; checked: Set<string>; onToggle: (id: string) => void
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  const done = items.filter(i => checked.has(i.id)).length

  return (
    <div className={`rounded-xl border overflow-hidden mb-3 ${colorClass}`}>
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-3 px-4 py-3 text-left"
      >
        <span className="text-lg">{icon}</span>
        <span className="flex-1 text-sm font-semibold" style={{fontFamily: 'Sora, sans-serif'}}>{title}</span>
        <span className="text-xs opacity-60 font-mono">{done}/{items.length}</span>
        <svg className={`w-4 h-4 opacity-50 transition-transform ${open ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
        </svg>
      </button>
      {open && (
        <div className="bg-white pb-2">
          {items.map(item => (
            <CheckItem key={item.id} item={item} checked={checked.has(item.id)} onToggle={() => onToggle(item.id)} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function ChecklistPage() {
  const [market, setMarket] = useState<'secondary' | 'primary'>('secondary')
  const [checked, setChecked] = useState<Set<string>>(new Set())
  const [copied, setCopied] = useState(false)

  const sections = market === 'secondary' ? SECONDARY : PRIMARY

  const allItems = [
    ...sections.flatMap(s => s.items),
    ...MORTGAGE,
    ...WARTIME,
  ]

  const total = allItems.length
  const done = allItems.filter(i => checked.has(i.id)).length
  const pct = total > 0 ? Math.round((done / total) * 100) : 0

  const toggle = useCallback((id: string) => {
    setChecked(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id); else next.add(id)
      return next
    })
  }, [])

  const checkAll = () => setChecked(new Set(allItems.map(i => i.id)))
  const clearAll = () => setChecked(new Set())

  const copyMissing = () => {
    const missing = allItems.filter(i => !checked.has(i.id))
    if (!missing.length) return alert('Все документы собраны! ✅')
    const text = '❌ НЕДОСТАЮЩИЕ ДОКУМЕНТЫ:\n\n' + missing.map(i => `• ${i.text}`).join('\n')
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="p-8 max-w-3xl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 mb-1" style={{fontFamily: 'Sora, sans-serif'}}>Чек-лист документов</h1>
        <p className="text-slate-500 text-sm">Отмечай собранные документы. Прогресс сохраняется в текущей сессии.</p>
      </div>

      {/* Progress */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-slate-700">Прогресс сбора пакета</span>
          <span className="text-sm font-mono text-slate-500">{done} / {total}</span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-teal-500 rounded-full transition-all duration-300"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="flex gap-3 text-xs text-slate-400">
            <span><span className="inline-block w-2 h-2 rounded-sm bg-teal-50 border border-teal-200 mr-1" />обяз</span>
            <span><span className="inline-block w-2 h-2 rounded-sm bg-amber-50 border border-amber-200 mr-1" />условн</span>
            <span><span className="inline-block w-2 h-2 rounded-sm bg-red-50 border border-red-200 mr-1" />риск</span>
          </div>
          <span className="text-sm font-semibold text-teal-600">{pct}%</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-100 p-1 rounded-lg mb-5 w-fit">
        {(['secondary', 'primary'] as const).map(m => (
          <button
            key={m}
            onClick={() => setMarket(m)}
            className={`px-4 py-1.5 text-sm rounded-md font-medium transition-all ${
              market === m
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {m === 'secondary' ? 'Вторичный рынок' : 'Первичный рынок'}
          </button>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex gap-2 mb-5">
        <button onClick={checkAll} className="text-xs px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
          Отметить все
        </button>
        <button onClick={clearAll} className="text-xs px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
          Снять все
        </button>
        <button
          onClick={copyMissing}
          className="text-xs px-3 py-1.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium"
        >
          {copied ? 'Скопировано ✓' : 'Скопировать недостающие'}
        </button>
      </div>

      {/* Main sections */}
      {sections.map(section => (
        <SectionBlock key={section.id} section={section} checked={checked} onToggle={toggle} />
      ))}

      {/* Special blocks */}
      <div className="mt-6">
        <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3 px-1">
          Специальные блоки
        </h2>

        <SpecialBlock
          icon="🏦" title="Ипотека — дополнительные документы"
          items={MORTGAGE}
          colorClass="border-blue-200 bg-blue-50 text-blue-900"
          checked={checked} onToggle={toggle}
        />

        <SpecialBlock
          icon="⚠️" title="Военное время — документы и проверки"
          items={WARTIME}
          colorClass="border-red-200 bg-red-50 text-red-900"
          checked={checked} onToggle={toggle}
        />
      </div>
    </div>
  )
}
