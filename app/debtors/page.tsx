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
          На сайте реестра введите: фамилию, имя, отчество и ИНН (РНОКПП) проверяемого лица.
        </p>
        <a
          href="https://erb.minjust.gov.ua/#/search-debtors"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-xl transition text-center"
        >
          Открыть реестр должников
        </a>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <h2 className="text-base font-semibold text-gray-800 mb-3">Что содержит реестр</h2>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex items-start gap-2">
            <span className="text-green-500">v</span>
            <span>ФИО и дата рождения должника</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500">v</span>
            <span>ИНН или код ЕГРПОУ (для юрлиц)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500">v</span>
            <span>Номер исполнительного производства</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500">v</span>
            <span>Категория взыскания (алименты, штраф и т.д.)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500">v</span>
            <span>Данные исполнителя и его контакты</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500">v</span>
            <span>Дата внесения в реестр</span>
          </li>
        </ul>
        <p className="text-xs text-gray-400 mt-4">
          Наличие в реестре означает открытое исполнительное производство.
          Нотариус не вправе удостоверять сделки с таким должником.
        </p>
      </div>
    </div>
  )
}
