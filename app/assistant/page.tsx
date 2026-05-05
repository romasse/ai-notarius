'use client'
import { useState, useRef, useEffect } from 'react'

interface Message { role: 'user' | 'assistant'; content: string }

const QUICK_PROMPTS = [
  { icon: '📋', text: 'Что входит в обязательный пакет документов продавца вторичного рынка?' },
  { icon: '💸', text: 'Продавец владеет квартирой 2 года, первая продажа. Какие налоги при продаже за 2 500 000 грн?' },
  { icon: '📄', text: 'Составь черновик предварительного договора купли-продажи: цена 85 000 $, задаток 5 000 $, срок 30 дней' },
  { icon: '👤', text: 'Объясни клиенту простым языком, что такое обременение на квартире и почему это риск' },
  { icon: '🏗️', text: 'Какие риски при покупке квартиры от застройщика по схеме ФФС?' },
  { icon: '⚖️', text: 'Продавец — ВПЛ. Какие дополнительные документы нужны для сделки?' },
]

function UserBubble({ text }: { text: string }) {
  return (
    <div className="flex justify-end mb-4 animate-fade-up">
      <div className="max-w-xl bg-teal-600 text-white rounded-2xl rounded-tr-sm px-4 py-3 text-sm leading-relaxed">
        {text}
      </div>
    </div>
  )
}

function AssistantBubble({ text, streaming }: { text: string; streaming?: boolean }) {
  return (
    <div className="flex gap-3 mb-4 animate-fade-up">
      <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center shrink-0 mt-0.5">
        <span className="text-teal-400 text-xs font-bold" style={{fontFamily: 'Sora, sans-serif'}}>N</span>
      </div>
      <div className="flex-1 max-w-2xl">
        <div className="bg-white rounded-2xl rounded-tl-sm border border-slate-200 px-4 py-3 text-sm leading-relaxed text-slate-800">
          {text ? (
            <pre className="whitespace-pre-wrap font-sans">{text}</pre>
          ) : (
            <div className="dot-pulse flex gap-1 py-1">
              <span /><span /><span />
            </div>
          )}
        </div>
        {streaming && text && (
          <div className="mt-1 flex items-center gap-1 text-xs text-slate-400">
            <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-pulse inline-block" />
            Генерирует ответ...
          </div>
        )}
      </div>
    </div>
  )
}

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const send = async (text?: string) => {
    const content = (text ?? input).trim()
    if (!content || loading) return

    const userMsg: Message = { role: 'user', content }
    const newMessages = [...messages, userMsg]
    setMessages([...newMessages, { role: 'assistant', content: '' }])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      })
      if (!res.body) return
      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value)
        setMessages(prev => {
          const updated = [...prev]
          updated[updated.length - 1] = {
            role: 'assistant',
            content: updated[updated.length - 1].content + chunk,
          }
          return updated
        })
      }
    } catch {
      setMessages(prev => {
        const u = [...prev]
        u[u.length - 1] = { role: 'assistant', content: 'Ошибка соединения. Проверь API-ключ.' }
        return u
      })
    } finally {
      setLoading(false)
      textareaRef.current?.focus()
    }
  }

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="shrink-0 border-b border-slate-200 bg-white px-8 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-slate-900" style={{fontFamily: 'Sora, sans-serif'}}>AI-ассистент нотариуса</h1>
          <p className="text-xs text-slate-400 mt-0.5">Документы · Договоры · Налоги · Объяснения клиентам</p>
        </div>
        {messages.length > 0 && (
          <button
            onClick={() => setMessages([])}
            className="text-xs text-slate-400 hover:text-slate-600 border border-slate-200 rounded-lg px-3 py-1.5 transition-colors"
          >
            Очистить чат
          </button>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-auto px-8 py-6">
        {messages.length === 0 ? (
          <div>
            <p className="text-sm text-slate-400 mb-4 font-medium">Быстрые запросы</p>
            <div className="grid grid-cols-1 gap-2 max-w-2xl">
              {QUICK_PROMPTS.map((p, i) => (
                <button
                  key={i}
                  onClick={() => send(p.text)}
                  className="flex items-start gap-3 text-left text-sm p-3.5 bg-white border border-slate-200 rounded-xl hover:border-teal-300 hover:bg-teal-50 transition-all text-slate-700 group"
                >
                  <span className="text-base">{p.icon}</span>
                  <span className="group-hover:text-teal-800 transition-colors">{p.text}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {messages.map((msg, i) =>
              msg.role === 'user'
                ? <UserBubble key={i} text={msg.content} />
                : <AssistantBubble key={i} text={msg.content} streaming={loading && i === messages.length - 1} />
            )}
          </>
        )}
        <div ref={endRef} />
      </div>

      {/* Input */}
      <div className="shrink-0 border-t border-slate-200 bg-white px-8 py-4">
        <div className="max-w-3xl flex gap-3">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            rows={2}
            placeholder="Задай вопрос ассистенту нотариуса... (Enter — отправить, Shift+Enter — перенос)"
            className="flex-1 resize-none text-sm border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white text-slate-800 placeholder:text-slate-400"
          />
          <button
            onClick={() => send()}
            disabled={!input.trim() || loading}
            className="px-5 bg-teal-600 text-white rounded-xl font-medium text-sm hover:bg-teal-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            style={{fontFamily: 'Sora, sans-serif'}}
          >
            →
          </button>
        </div>
      </div>
    </div>
  )
}
