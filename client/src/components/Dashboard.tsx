import React from 'react';

const tools = [
  { id: 'uniq', title: 'Уникализатор', desc: 'Фото и видео крео', icon: '🔀' },
  { id: 'ai-ad', title: 'AI Ad Generator', desc: 'Рекламные тексты с AI', icon: '✍️' },
  { id: 'downloader', title: 'Загрузчик', desc: 'Скачать видео по ссылке', icon: '⬇️' },
  { id: 'pagespeed', title: 'PageSpeed', desc: 'Анализ скорости сайта от Google', icon: '⚡' },
  { id: 'compress', title: 'Компрессор', desc: 'Сжать видео или фото', icon: '🗜️' },
  { id: 'subtitles', title: 'Субтитры', desc: 'SRT/VTT из видео', icon: '🎬' },
  { id: 'bg-remove', title: 'Удал. фона', desc: 'AI удаление фона', icon: '🎭' },
  { id: 'whitepage', title: 'Вайтпейдж', desc: 'Генератор белых страниц', icon: '📄', active: true },
  { id: 'ai-analyzer', title: 'AI Analyzer', desc: 'Нет доступа', icon: '🔍', locked: true },
  { id: 'audiences', title: 'Аудитории', desc: 'Генератор интересов FB', icon: '🎯' },
  { id: 'cloak-checker', title: 'Клоак-чекер', desc: 'Проверить клоакинг', icon: '🕵️' },
  { id: 'ai-creative', title: 'AI Creative', desc: 'В разработке', icon: '🎨', locked: true },
];

export default function Dashboard({ onNavigate }: { onNavigate: (view: 'dashboard' | 'generator') => void }) {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {tools.map(tool => (
          <div 
            key={tool.id} 
            onClick={() => tool.active && onNavigate('generator')}
            className={`p-5 rounded-xl border flex flex-col gap-2 transition-all
              ${tool.locked ? 'bg-[#14151a] border-[#2a2b33]/50 opacity-50 cursor-not-allowed' : 
                tool.active ? 'bg-cardBg border-[#2a2b33] cursor-pointer hover:border-gray-500 ring-1 ring-blue-500/20' : 
                'bg-cardBg border-[#2a2b33] cursor-pointer hover:border-gray-500'}
            `}
          >
            <div className="flex justify-between items-start">
              <span className="text-2xl">{tool.icon}</span>
              {tool.locked && <span className="text-yellow-500 text-xs">🔒</span>}
            </div>
            <div className="mt-2">
              <h3 className="font-bold text-md">{tool.title}</h3>
              <p className="text-gray-400 text-xs mt-1">{tool.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#14151a] border border-[#2a2b33] rounded-xl p-6 mt-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-bold text-lg">Вайтпейдж кредиты</h2>
          <span className="text-3xl font-bold">0</span>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-6 text-center">
          <div className="bg-[#1a1b23] p-4 rounded-lg">
            <div className="text-green-400 font-bold text-xl mb-1">0/1</div>
            <div className="text-gray-500 text-[10px] uppercase tracking-wider font-bold">Бесплатно</div>
          </div>
          <div className="bg-[#1a1b23] p-4 rounded-lg">
            <div className="text-blue-400 font-bold text-xl mb-1">0</div>
            <div className="text-gray-500 text-[10px] uppercase tracking-wider font-bold">Куплено</div>
          </div>
          <div className="bg-[#1a1b23] p-4 rounded-lg">
            <div className="text-white font-bold text-xl mb-1">3</div>
            <div className="text-gray-500 text-[10px] uppercase tracking-wider font-bold">Использовано</div>
          </div>
        </div>
        <button className="w-full bg-[#1a1b23] border border-[#2a2b33] py-3 rounded-lg text-sm hover:bg-[#2a2b33] transition flex items-center justify-center gap-2 text-gray-300">
          <span className="text-yellow-500">💳</span> Купить кредиты — $3/шт · от 10шт = $2
        </button>
      </div>
    </div>
  );
}
