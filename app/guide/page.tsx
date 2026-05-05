'use client'
import { useState } from 'react'

const METAPROMPT = `Ты — опытный AI-ассистент в области нотариального оформления сделок с недвижимостью. Ты работаешь в связке с опытным риэлтором и помогаешь ему на всех этапах сделки: от проверки документов до объяснения нюансов клиентам.

РОЛЬ И СТИЛЬ
— Говори как грамотный практикующий юрист, но без канцелярита
— Риэлтору отвечай профессионально и по сути, без лишних предисловий
— Клиентские объяснения составляй простым языком — как для умного, но неюридического человека
— Структурируй ответ: сначала вывод, потом детали
— Если вопрос неоднозначный — укажи на риски явно, не смягчай

НАПРАВЛЕНИЯ РАБОТЫ

1. ПРОВЕРКА ДОКУМЕНТОВ
Анализируй пакет документов по сделке. Выявляй:
— несоответствия между документами
— истекшие сроки действия
— отсутствующие или подозрительные позиции
— ограничения, обременения, аресты
— риски оспаривания сделки
Формат вывода: сначала список рисков (🔴 критично / 🟡 важно / 🟢 ок), затем рекомендации.

2. ПОДГОТОВКА И РАЗБОР ДОГОВОРОВ
— Разбирай договоры купли-продажи, дарения, залога, аренды
— Указывай на нестандартные или невыгодные условия
— Предлагай формулировки-замены для спорных пунктов
— Объясняй правовые последствия каждого раздела
— Составляй черновики договоров по заданным условиям

3. НАЛОГИ И СБОРЫ
— Рассчитывай НДФЛ, военный сбор, госпошлину при сделках
— Разъясняй льготы и исключения (первая продажа, наследство, владение более 3 лет и т.д.)
— Указывай, кто платит (продавец / покупатель / оба) и в каком порядке
— Предупреждай о типичных ошибках при декларировании

4. ОБЪЯСНЕНИЯ ДЛЯ КЛИЕНТОВ
— Переводи юридические и нотариальные термины на простой язык
— Готовь короткие понятные объяснения для передачи клиенту
— Формат: «Что это значит для вас» + «Что нужно сделать»

ОГРАНИЧЕНИЯ
— Ты не заменяешь нотариуса и не несёшь юридической ответственности — всегда указывай на это при финальных решениях
— Если законодательство менялось недавно — предупреждай о возможной неактуальности
— Если ситуация нетипичная или высокорисковая — рекомендуй консультацию с живым юристом

ФОРМАТИРОВАНИЕ
— Для рисков — маркированный список с цветовыми метками
— Для договоров — разбивка по разделам
— Для налогов — пошаговый расчёт
— Для клиентских объяснений — короткий абзац без терминов`

const STEPS = [
  { n: '1', title: 'Открой claude.ai → Projects', desc: 'В боковом меню слева найди раздел «Projects» и нажми «New project». Назови: Нотариус 🏠' },
  { n: '2', title: 'Вставь метапромт в Custom Instructions', desc: 'Внутри проекта нажми «Edit project» → «Custom Instructions». Скопируй метапромт выше и вставь сюда.' },
  { n: '3', title: 'Загрузи базу знаний', desc: 'В разделе «Project Knowledge» нажми «Add content» → «Upload files». Загружай: чек-листы, шаблоны договоров, свои заметки по сделкам.' },
  { n: '4', title: 'Работай только внутри проекта', desc: 'Каждый новый чат внутри проекта автоматически получает метапромт и базу знаний. Не создавай разовые чаты — это сбивает контекст.' },
  { n: '5', title: 'Загружай документы в чат', desc: 'Для анализа — прикрепляй PDF прямо в диалог. Claude прочитает и проверит документ по твоему чек-листу.' },
]

const EXAMPLES = [
  { tag: 'Проверка', prompt: 'Вот пакет документов. Проверь на риски, выяви критичные моменты и дай рекомендации.' },
  { tag: 'Договор', prompt: 'Составь черновик предварительного договора купли-продажи. Цена 85 000 $, задаток 5 000 $, срок основного договора 30 дней.' },
  { tag: 'Налоги', prompt: 'Квартира получена по наследству год назад. Это первая продажа. Какие налоги?' },
  { tag: 'Клиент', prompt: 'Объясни клиенту простым языком: что такое обременение и почему нельзя покупать ипотечную квартиру без согласия банка.' },
]

const TAG_COLORS: Record<string, string> = {
  'Проверка': 'bg-teal-50 text-teal-700 border-teal-200',
  'Договор': 'bg-blue-50 text-blue-700 border-blue-200',
  'Налоги': 'bg-amber-50 text-amber-700 border-amber-200',
  'Клиент': 'bg-purple-50 text-purple-700 border-purple-200',
}

export default function GuidePage() {
  const [copied, setCopied] = useState(false)

  const copyPrompt = () => {
    navigator.clipboard.writeText(METAPROMPT)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-1" style={{fontFamily: 'Sora, sans-serif'}}>Метапромт и инструкция</h1>
        <p className="text-slate-500 text-sm">Системный промт для Claude Projects + пошаговая настройка.</p>
      </div>

      {/* Metaprompt block */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-slate-700" style={{fontFamily: 'Sora, sans-serif'}}>Системный промт — скопируй целиком</h2>
          <button
            onClick={copyPrompt}
            className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all ${
              copied
                ? 'bg-teal-50 text-teal-700 border-teal-300'
                : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'
            }`}
          >
            {copied ? '✓ Скопировано' : 'Копировать'}
          </button>
        </div>
        <div className="bg-slate-900 rounded-2xl p-5 overflow-auto max-h-80">
          <pre className="text-slate-300 text-xs leading-relaxed font-mono whitespace-pre-wrap">{METAPROMPT}</pre>
        </div>
      </div>

      {/* Claude Projects setup */}
      <div className="mb-10">
        <h2 className="text-sm font-semibold text-slate-700 mb-4" style={{fontFamily: 'Sora, sans-serif'}}>Настройка в Claude Projects — 5 шагов</h2>
        <div className="space-y-3">
          {STEPS.map((step, i) => (
            <div key={i} className="flex gap-4 bg-white rounded-xl border border-slate-200 p-4">
              <div className="w-7 h-7 rounded-full bg-teal-600 text-white text-xs font-bold flex items-center justify-center shrink-0" style={{fontFamily: 'Sora, sans-serif'}}>
                {step.n}
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-800 mb-0.5" style={{fontFamily: 'Sora, sans-serif'}}>{step.title}</div>
                <div className="text-sm text-slate-500 leading-relaxed">{step.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Usage examples */}
      <div>
        <h2 className="text-sm font-semibold text-slate-700 mb-4" style={{fontFamily: 'Sora, sans-serif'}}>Примеры запросов</h2>
        <div className="space-y-2">
          {EXAMPLES.map((ex, i) => (
            <div key={i} className="bg-white rounded-xl border border-slate-200 p-4">
              <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded border mb-2 ${TAG_COLORS[ex.tag]}`}>
                {ex.tag}
              </span>
              <p className="text-sm text-slate-700 leading-relaxed">{ex.prompt}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
        <strong>Совет:</strong> Используй вкладку «AI-ассистент» (встроена в этот сайт) для быстрых вопросов без настройки. Claude Projects нужен для загрузки своих документов и более глубокого контекста.
      </div>
    </div>
  )
}
