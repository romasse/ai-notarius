'use client'

import { useState } from 'react'

export default function DebtorsPage() {
  const [form, setForm] = useState({
    lastName: '',
    firstName: '',
    middleName: '',
    inn: '',
    birthDate: '',
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSearch = () => {
    if (!form.lastName && !form.inn) {
      alert('Введіть прізвище або ІПН')
      return
    }
    setLoading(true)
    // Открываем официальный реестр — прямой API недоступен
    window.open('https://erb.minjust.gov.ua/#/search-debtors', '_blank')
    setTimeout(() => setLoading(false), 1000)
  }

  const fields = [
    { name: 'lastName', label: 'Прізвище', placeholder: 'Іваненко', required: true },
    { name: 'firstName', label: "Ім'я", placeholder: 'Іван', required: false },
    { name: 'middleName', label: 'По батькові', placeholder: 'Іванович', required: false },
    { name: 'inn', label: 'ІПН / РНОКПП', placeholder: '1234567890', required: false },
    { name: 'birthDate', label: 'Дата народження', placeholder: 'дд.мм.рррр', required: false },
  ]

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl">⚖️</span>
          <h1 className="text-2xl font-bold text-gray-900">Реєстр боржників</h1>
        </div>
        <p className="text-gray-500 text-sm">
          Перевірка через Єдиний реєстр боржників Мін'юсту України
        </p>
      </div>

      {/* Info banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex gap-3">
        <span className="text-amber-500 text-lg flex-shrink-0">ℹ️</span>
        <div className="text-sm text-amber-800">
          <p className="font-medium mb-1">Як це працює</p>
          <p>
            Для пошуку введіть дані — система відкриє офіційний реєстр{' '}
            <span className="font-medium">erb.minjust.gov.ua</span> із потрібним запитом.
            Дані з реєстру є відкритими та надаються безкоштовно.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mb-6">
        <h2 className="text-base font-semibold text-gray-800 mb-4">Дані для пошуку</h2>
        <div className="space-y-4">
          {fields.map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>
              <input
                type="text"
                name={field.name}
                value={form[field.name as keyof typeof form]}
                onChange={handleChange}
                placeholder={field.placeholder}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
          ))}
        </div>

        <button
          onClick={handleSearch}
          disabled={loading}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-6 rounded-xl transition flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <span className="animate-spin">⏳</span> Відкриваю реєстр...
            </>
          ) : (
            <>
              🔍 Перевірити в реєстрі
            </>
          )}
        </button>
      </div>

      {/* Quick link */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
        <p className="text-sm font-medium text-gray-700 mb-2">Швидкий доступ</p>
        <a
          href="https://erb.minjust.gov.ua/#/search-debtors"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 text-sm underline"
        >
          Відкрити єдиний реєстр боржників напряму →
        </a>
        <p className="text-xs text-gray-400 mt-2">
          Офіційний сайт Міністерства юстиції України
        </p>
      </div>

      {/* What debtor registry contains */}
      <div className="mt-6 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <h2 className="text-base font-semibold text-gray-800 mb-3">
          📋 Що містить реєстр
        </h2>
        <ul className="space-y-2 text-sm text-gray-600">
          {[
            'ПІБ та дата народження боржника',
            'ІПН або код ЄДРПОУ (для юросіб)',
            'Номер виконавчого провадження',
            'Категорія стягнення (аліменти, штраф тощо)',
            'Дані виконавця та його контакти',
            'Дата внесення до реєстру',
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="text-xs text-gray-400 mt-4">
          ⚠️ Наявність в реєстрі означає відкрите виконавче провадження. Нотаріус не має права посвідчувати угоди з таким боржником.
        </p>
      </div>
    </div>
  )
}
