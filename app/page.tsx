import Link from 'next/link'

const features = [
  {
    href: '/checklist',
    emoji: '✅',
    title: 'Чек-лист документов',
    desc: 'Интерактивный список для вторичного и первичного рынка. Включает блоки ипотеки и военного времени.',
    color: 'from-teal-50 to-emerald-50',
    border: 'border-teal-200',
    tag: 'Вторичный · Первичный · Ипотека · Военное время',
  },
  {
    href: '/assistant',
    emoji: '🤖',
    title: 'AI-ассистент нотариуса',
    desc: 'Чат с Claude: проверка документов, разбор договоров, налоги, объяснения клиентам простым языком.',
    color: 'from-blue-50 to-indigo-50',
    border: 'border-blue-200',
    tag: 'Документы · Договоры · Налоги · Клиенты',
 },
  {
    href: '/debtors',
    emoji: '',
    title: 'Реестр должников',
    desc: 'Проверка физических и юридических лиц по Единому реестру должников Минюста Украины.',
    color: 'from-red-50 to-rose-50',
    border: 'border-red-200',
    tag: 'Исполнительные производства · Проверка · Минюст',
  },
]

export default function HomePage() {
  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 bg-teal-50 text-teal-700 text-xs font-medium px-3 py-1.5 rounded-full border border-teal-200 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse inline-block" />
          Персональный инструмент · Украинский рынок
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-3" style={{fontFamily: 'Sora, sans-serif'}}>
          Нотариус AI
        </h1>
        <p className="text-slate-500 text-lg leading-relaxed max-w-2xl">
          Всё для сопровождения сделки с недвижимостью в одном месте. Чек-листы, AI-ассистент.
        </p>
      </div>

      <div className="space-y-4">
        {features.map(f => (
          <Link
            key={f.href}
            href={f.href}
            className={`block bg-gradient-to-br ${f.color} border ${f.border} rounded-2xl p-6 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 group`}
          >
            <div className="flex items-start gap-4">
              <div className="text-3xl">{f.emoji}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-semibold text-slate-900" style={{fontFamily: 'Sora, sans-serif'}}>{f.title}</h2>
                  <span className="ml-auto text-slate-400 group-hover:translate-x-0.5 transition-transform">→</span>
                </div>
                <p className="text-sm text-slate-600 mt-1 leading-relaxed">{f.desc}</p>
                <div className="mt-3 text-xs text-slate-400 font-mono">{f.tag}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <p className="text-xs text-slate-400 mt-10">
        Законодательство Украины · ЦКУ · ЗУ «О нотариате» · НКУ · Обновлено 2026
      </p>
    </div>
  )
}
