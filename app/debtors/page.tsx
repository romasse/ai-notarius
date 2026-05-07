'use client'

export default function DebtorsPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Реестр должников</h1>
        <p className="text-gray-500 text-sm">
          Проверка через Единый реестр должников Минюста Украины
        </p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
        <p className="font-medium text-amber-800 mb-1">Как это работает</p>
        <p className="text-sm text-amber-800">
          Нажмите кнопку ниже — откроется официальный реестр erb.minjust.gov.ua.
          Введите данные прямо на сайте Минюста. Поиск бесплатный.
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mb-6">
        <p className="text-sm text-gray-600 mb-4">
