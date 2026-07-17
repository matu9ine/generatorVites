import React, { useState } from 'react';

export default function GeneratorForm({ onBack }: { onBack: () => void }) {
  const [formData, setFormData] = useState({
    language: 'US',
    theme: 'Здоровый образ жизни',
    articles: 5,
    siteName: 'HealthLife Magazine',
    domain: 'nordblick-webdesign.de',
    platform: 'Facebook',
    pixelId: '1234567890',
    design: 'Случайный (авто)',
    addVideo: false
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('http://localhost:3001/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          theme: formData.theme,
          geo: formData.language,
          domain: formData.domain,
          pixelId: formData.pixelId,
          isFacebook: formData.platform === 'Facebook'
        })
      });

      if (!response.ok) throw new Error('Generation failed');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${formData.domain.replace(/[^a-z0-9.-]/gi, '_')}.zip`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err) {
      alert('Error generating site');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#14151a] border border-[#2a2b33] rounded-xl p-8 w-full">
      <button onClick={onBack} className="text-gray-400 hover:text-white mb-6 flex items-center text-sm">
        ← Назад в кабинет
      </button>

      <h1 className="text-2xl font-bold mb-2">Генератор вайтпейджей</h1>
      <p className="text-gray-400 text-sm mb-8">AI генерирует уникальный информационный сайт для Facebook.</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-wider">язык сайта</label>
            <select 
              value={formData.language} 
              onChange={e => setFormData({...formData, language: e.target.value})}
              className="w-full bg-[#1a1b23] border border-[#2a2b33] rounded-lg p-3 text-white focus:outline-none focus:border-blue-500"
            >
              <option value="US">us English</option>
              <option value="DE">de German</option>
              <option value="IT">it Italian</option>
              <option value="CA">ca English</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-wider">тематика</label>
            <select 
              value={formData.theme} 
              onChange={e => setFormData({...formData, theme: e.target.value})}
              className="w-full bg-[#1a1b23] border border-[#2a2b33] rounded-lg p-3 text-white focus:outline-none focus:border-blue-500"
            >
              <option value="Здоровый образ жизни">Здоровый образ жизни</option>
              <option value="Изготовление мужских портретов">Изготовление мужских портретов</option>
              <option value="Ремонт банкоматов">Ремонт банкоматов</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-wider">количество статей</label>
            <div className="flex gap-2">
              {[3,4,5,6,7,8,10].map(num => (
                <button
                  type="button"
                  key={num}
                  onClick={() => setFormData({...formData, articles: num})}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm transition-colors border
                    ${formData.articles === num ? 'bg-[#2a2b33] border-gray-500 text-white' : 'bg-[#1a1b23] border-[#2a2b33] text-gray-400 hover:text-white hover:border-gray-600'}`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-wider">название сайта</label>
            <input 
              type="text" 
              value={formData.siteName}
              onChange={e => setFormData({...formData, siteName: e.target.value})}
              className="w-full bg-[#1a1b23] border border-[#2a2b33] rounded-lg p-3 text-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-wider">домен сайта <span className="text-gray-600 lowercase font-normal">(необязательно)</span></label>
          <input 
            type="text" 
            value={formData.domain}
            onChange={e => setFormData({...formData, domain: e.target.value})}
            className="w-full bg-[#1a1b23] border border-[#2a2b33] rounded-lg p-3 text-white focus:outline-none focus:border-blue-500"
          />
          <p className="text-xs text-gray-500 mt-2">Используется в sitemap.xml и schema.org разметке</p>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-wider">платформа для рекламы</label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setFormData({...formData, platform: 'Facebook'})}
              className={`py-3 rounded-lg font-bold flex justify-center items-center gap-2 border transition-colors
                ${formData.platform === 'Facebook' ? 'bg-[#1a1b23] border-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'bg-[#1a1b23] border-[#2a2b33] text-gray-400 hover:text-white'}`}
            >
              <span className="w-3 h-3 bg-blue-500 rounded-sm"></span> Facebook
            </button>
            <button
              type="button"
              onClick={() => setFormData({...formData, platform: 'Google'})}
              className={`py-3 rounded-lg font-bold flex justify-center items-center gap-2 border transition-colors
                ${formData.platform === 'Google' ? 'bg-[#1a1b23] border-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.3)]' : 'bg-[#1a1b23] border-[#2a2b33] text-gray-400 hover:text-white'}`}
            >
              <span className="w-3 h-3 bg-red-500 rounded-full"></span> Google
            </button>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-wider">FACEBOOK PIXEL ID <span className="text-gray-600 lowercase font-normal">(необязательно)</span></label>
          <input 
            type="text" 
            value={formData.pixelId}
            onChange={e => setFormData({...formData, pixelId: e.target.value})}
            className="w-full bg-[#1a1b23] border border-[#2a2b33] rounded-lg p-3 text-white focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-wider flex items-center gap-2">🎨 стиль дизайна</label>
          <select 
            value={formData.design} 
            onChange={e => setFormData({...formData, design: e.target.value})}
            className="w-full bg-[#1a1b23] border border-[#2a2b33] rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 appearance-none"
          >
            <option>🎲 Случайный (авто)</option>
          </select>
        </div>

        <div className="flex items-center gap-4 py-2">
          <button 
            type="button"
            onClick={() => setFormData({...formData, addVideo: !formData.addVideo})}
            className={`w-12 h-6 rounded-full transition-colors relative ${formData.addVideo ? 'bg-blue-500' : 'bg-gray-700'}`}
          >
            <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${formData.addVideo ? 'left-7' : 'left-1'}`}></span>
          </button>
          <div>
            <h4 className="text-sm font-bold flex items-center gap-2">🎥 Добавить видео на вайтпейдж</h4>
            <p className="text-xs text-gray-500 mt-1">Фоновое видео из Pexels — увеличивает объём ZIP и время генерации</p>
          </div>
        </div>

        <div className="bg-[#1a1b23] border border-[#2a2b33] rounded-lg p-6">
          <h4 className="font-bold text-yellow-500 mb-4 flex items-center gap-2">💡 Зачем нужен Facebook Pixel?</h4>
          <div className="grid grid-cols-2 gap-6 text-sm">
            <div>
              <div className="font-bold flex items-center gap-2 mb-1">📊 Сбор аудитории</div>
              <div className="text-gray-400 text-xs">Посетители попадут в ретаргетинг</div>
            </div>
            <div>
              <div className="font-bold text-green-500 flex items-center gap-2 mb-1">✓ Доверие Facebook</div>
              <div className="text-gray-400 text-xs">Сайт с пикселем лучше проходит модерацию</div>
            </div>
            <div>
              <div className="font-bold text-red-500 flex items-center gap-2 mb-1">🎯 Обучение алгоритма</div>
              <div className="text-gray-400 text-xs">Facebook понимает кому показывать рекламу</div>
            </div>
            <div>
              <div className="font-bold text-blue-400 flex items-center gap-2 mb-1">↑ Где взять</div>
              <div className="text-gray-400 text-xs">Ads Manager → Events Manager → Пиксели</div>
            </div>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full mt-6 py-4 rounded-lg font-bold text-lg hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg"
          style={{ background: 'linear-gradient(90deg, #1e3a8a, #3b82f6)' }}
        >
          {loading ? '⏳ Генерируем...' : '⚡ Сгенерировать сайт'}
        </button>
      </form>

      <div className="mt-8 border border-[#2a2b33] bg-[#14151a] rounded-xl p-6">
        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-6">что генерируется</h4>
        <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-sm text-gray-300">
          <div className="flex items-center gap-2">✓ Уникальные статьи по теме</div>
          <div className="flex items-center gap-2">✓ Секция отзывов с именами</div>
          <div className="flex items-center gap-2">✓ Рандомный дизайн (цвета, шрифты)</div>
          <div className="flex items-center gap-2">✓ Privacy Policy, Terms, Cookie</div>
          <div className="flex items-center gap-2">✓ Contact форма + Cookie banner</div>
          <div className="flex items-center gap-2">✓ Facebook Pixel, если указан ID</div>
          <div className="flex items-center gap-2">✓ Адаптивная мобильная верстка</div>
          <div className="flex items-center gap-2">✓ Информационный сайт для Facebook</div>
        </div>
        <div className="mt-6 pt-4 border-t border-[#2a2b33] text-gray-400 text-sm flex items-center gap-2">
          📄 Результат: ZIP архив — распакуй и залей на домен.
        </div>
      </div>
    </div>
  );
}
