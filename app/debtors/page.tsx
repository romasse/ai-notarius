'use client'

import { useState } from 'react'

export default function DebtorsPage() {
  const [form, setForm] = useState({
    lastName: '',
    firstName: '',
    middleName: '',
    inn: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSearch = () => {
    if (!form.lastName && !form.inn) {
      alert('Введите фамилию или ИНН')
      return
    }
    window.open('https://erb.minjust.gov.ua/#/search-debtors', '_blank')
  }

  const fields = [
    { name: 'lastName', label: 'Фамилия', placeholder: 'Иваненко', required: true },
    { name: 'firstName', label: 'Имя', placeholder: 'Иван', required: false },
    { name: 'middleName', label: 'Отчество', placeholder: 'Иванович', required: false },
    { name: 'inn', label: 'ИНН / РНОКПП', placeholder: '1234567890', required: false },
  ]

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl">⚖️</span>
          <h1 className="text-2xl font-bold text-gray-900">Реестр должников</h1>
        </div>
        <p className="text-gray-500 text-sm">
          Проверка через Единый реестр должников Минюста Украины
        </p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex gap-3">
        <span className="text-amber-500 text-lg flex-shrink-0">ℹ️</span>
        <div className="text-sm text-amber-800">
          <p className="font-medium mb-1">Как это работает</p>
          <p>
            Введите данные — кнопка откроет официальный реестр{' '}
            <span className="font-medium">erb.minjust.gov.ua</span>.
            Данные реестра открытые и предоставляются бесплатно.
          </p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mb-6">
        <h2 className="text-base font-semibold text-gray-800 mb-4">Данные для поиска</h2>
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
          className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-xl transition flex items-center justify-center gap-2"
        >
          🔍 Проверить в реестре
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <h2 className="text-base font-semibold text-gray-800 mb-3">📋 Что содержит реестр</h2>
        <ul className="space-y-2 text-sm text-gray-600">
          {[
            'ФИО и дата рождения должника',
            'ИНН или код ЕГРПОУ (для юрлиц)',
            'Номер исполнительного производства',
            'Категория взыскания (алименты, штраф и т.д.)',
            'Данные исполнителя и его контакты',
            'Дата внесения в реестр',
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="text-xs text-gray-400 mt-4">
          ⚠️ Наличие в реестре означает открытое исполнительное производство. Нотариус не вправе удостоверять сделки с таким должником.
        </p>
      </div>

      <div className="mt-4 bg-gray-50 border border-gray-200 rounded-xl p-4">
        
          href="https://erb.minjust.gov.ua/#/search-debtors"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 text-sm underline"
        >
          Открыть реестр напрямую →
        </a>
      </div>
    </div>
  )
}
