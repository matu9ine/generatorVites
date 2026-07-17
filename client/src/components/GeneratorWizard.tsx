import React, { useState } from 'react';

export default function GeneratorWizard({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Step 1: Basic
    projectName: 'My First Whitepage',
    siteName: 'HealthLife Magazine',
    domain: 'nordblick-webdesign.de',
    language: 'US',
    geo: 'US',
    theme: 'Здоровый образ жизни',
    description: '',
    
    // Step 2: Structure
    articles: 5,
    enableBlog: true,
    enableFaq: true,
    enableTestimonials: true,
    
    // Step 3: Legal
    companyName: 'HealthLife LLC',
    address: '123 Health Ave, NY 10001, USA',
    email: 'contact@nordblick-webdesign.de',
    phone: '+1 800 123 4567',
    
    // Step 4: Design
    designPreset: '03-premium-corporate',
    
    // Step 5: Integrations
    platform: 'Facebook',
    pixelId: '',
    gtmId: ''
  });

  const nextStep = () => setStep(s => Math.min(6, s + 1));
  const prevStep = () => setStep(s => Math.max(1, s - 1));

  const handleSubmit = async () => {
    setLoading(true);
    setStep(6);
    try {
      const response = await fetch('http://localhost:3001/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          theme: formData.theme,
          geo: formData.language, // mapping language to geo for backward compatibility
          domain: formData.domain,
          siteName: formData.siteName,
          pixelId: formData.pixelId,
          isFacebook: formData.platform === 'Facebook',
          designPreset: formData.designPreset
          // Future: pass the rest of the structure and legal data
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

  const steps = ['Основа', 'Структура', 'Юридические', 'Дизайн', 'Интеграции'];

  return (
    <div className="bg-[#14151a] border border-[#2a2b33] rounded-xl p-8 w-full">
      <button onClick={onBack} className="text-gray-400 hover:text-white mb-6 flex items-center text-sm">
        ← Вернуться на главную
      </button>

      {/* Stepper Header */}
      <div className="flex items-center justify-between mb-8">
        {steps.map((label, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold mb-2 transition-colors ${step > idx + 1 ? 'bg-green-500 text-white' : step === idx + 1 ? 'bg-blue-500 text-white' : 'bg-[#2a2b33] text-gray-500'}`}>
              {step > idx + 1 ? '✓' : idx + 1}
            </div>
            <span className={`text-xs ${step === idx + 1 ? 'text-blue-400 font-bold' : 'text-gray-500'}`}>{label}</span>
          </div>
        ))}
      </div>

      <div className="min-h-[300px]">
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4">Шаг 1. Основные данные</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Название проекта</label>
                <input type="text" value={formData.projectName} onChange={e => setFormData({...formData, projectName: e.target.value})} className="w-full bg-[#1a1b23] border border-[#2a2b33] rounded-lg p-3 text-white" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Название сайта</label>
                <input type="text" value={formData.siteName} onChange={e => setFormData({...formData, siteName: e.target.value})} className="w-full bg-[#1a1b23] border border-[#2a2b33] rounded-lg p-3 text-white" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Домен</label>
                <input type="text" value={formData.domain} onChange={e => setFormData({...formData, domain: e.target.value})} className="w-full bg-[#1a1b23] border border-[#2a2b33] rounded-lg p-3 text-white" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Язык / GEO</label>
                <select value={formData.language} onChange={e => setFormData({...formData, language: e.target.value})} className="w-full bg-[#1a1b23] border border-[#2a2b33] rounded-lg p-3 text-white">
                  {['US', 'DE', 'FR', 'ES', 'IT', 'PL', 'BR', 'NL', 'CZ', 'RO', 'HU', 'SE', 'NO', 'DK', 'FI', 'GR', 'TR', 'RU', 'UA', 'SA', 'SG', 'HR', 'RS', 'SI', 'LT', 'LV', 'EE', 'TH', 'VN', 'ID', 'MY', 'IN', 'JP', 'KR', 'CN'].map(lang => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Тематика</label>
                <select value={formData.theme} onChange={e => setFormData({...formData, theme: e.target.value})} className="w-full bg-[#1a1b23] border border-[#2a2b33] rounded-lg p-3 text-white">
                  <optgroup label="Образование и медиа">
                    <option value="Курсы копирайтинга и коммерческого текста">Курсы копирайтинга и коммерческого текста</option>
                    <option value="Обучение медиаграмотности и фактчекингу">Обучение медиаграмотности и фактчекингу</option>
                    <option value="Мастер-классы по интервью и сторителлингу">Мастер-классы по интервью и сторителлингу</option>
                    <option value="Курсы видеожурналистики и мультимедийных форматов">Курсы видеожурналистики и мультимедийных форматов</option>
                    <option value="Программы повышения квалификации для редакторов и контент-менеджеров">Программы повышения квалификации для редакторов и контент-менеджеров</option>
                  </optgroup>
                  <optgroup label="Аудио и студии">
                    <option value="Ремонт и калибровка профессионального аудиооборудования">Ремонт и калибровка профессионального аудиооборудования</option>
                    <option value="Аренда студийного оборудования для съёмок и записи">Аренда студийного оборудования для съёмок и записи</option>
                    <option value="Акустический дизайн и звукоизоляция помещений">Акустический дизайн и звукоизоляция помещений</option>
                    <option value="Обучение работе со студийным оборудованием">Обучение работе со студийным оборудованием</option>
                    <option value="Комплексное оснащение студий «под ключ»">Комплексное оснащение студий «под ключ»</option>
                  </optgroup>
                  <optgroup label="Путешествия и софт-скиллы">
                    <option value="Бюджетные путешествия и лайфхаки">Бюджетные путешествия и лайфхаки</option>
                    <option value="Гид для цифровых кочевников по странам">Гид для цифровых кочевников по странам</option>
                    <option value="Постановка голоса и дыхательные практики">Постановка голоса и дыхательные практики</option>
                    <option value="Язык тела и невербальное общение">Язык тела и невербальное общение</option>
                    <option value="Написание текстов и сценариев для выступлений">Написание текстов и сценариев для выступлений</option>
                    <option value="Мастерство проведения онлайн-вебинаров">Мастерство проведения онлайн-вебинаров</option>
                    <option value="Техники разрешения конфликтов и медиация">Техники разрешения конфликтов и медиация</option>
                    <option value="Нетворкинг для интровертов">Нетворкинг для интровертов</option>
                    <option value="Построение личного бренда эксперта">Построение личного бренда эксперта</option>
                    <option value="Тайм-менеджмент для спикеров">Тайм-менеджмент для спикеров</option>
                    <option value="Создание и продвижение подкастов">Создание и продвижение подкастов</option>
                    <option value="Развитие эмоционального интеллекта">Развитие эмоционального интеллекта</option>
                  </optgroup>
                  <optgroup label="Технологии">
                    <option value="Обзоры носимой электроники и фитнес-трекеров">Обзоры носимой электроники и фитнес-трекеров</option>
                    <option value="Гиды по выбору ноутбуков и компьютеров">Гиды по выбору ноутбуков и компьютеров</option>
                    <option value="Тесты аудиооборудования и микрофонов">Тесты аудиооборудования и микрофонов</option>
                    <option value="Обзоры приложений для работы и учёбы">Обзоры приложений для работы и учёбы</option>
                    <option value="Основы кибербезопасности для обычных пользователей">Основы кибербезопасности для обычных пользователей</option>
                    <option value="Электромобили и зарядная инфраструктура">Электромобили и зарядная инфраструктура</option>
                    <option value="Ремонт и обслуживание банкоматов">Ремонт и обслуживание банкоматов</option>
                    <option value="Ремонт банкоматов в Германии">Ремонт банкоматов в Германии</option>
                  </optgroup>
                  <optgroup label="Серые крео (банки, селебы)">
                    <option value="Шитье костюмов на заказ">Шитье костюмов на заказ</option>
                    <option value="Производство флагов с государственной символикой">Производство флагов с государственной символикой</option>
                    <option value="Производство эмблем государственной символики">Производство эмблем государственной символики</option>
                    <option value="Организация торжественных мероприятий">Организация торжественных мероприятий</option>
                    <option value="Изготовление реалистичных восковых фигур в Германии">Изготовление реалистичных восковых фигур в Германии</option>
                    <option value="Изготовление мужских портретов">Изготовление мужских портретов</option>
                    <option value="Техническое обслуживание банкоматов">Техническое обслуживание банкоматов</option>
                    <option value="Продажа горных велосипедов в Германии">Продажа горных велосипедов в Германии</option>
                    <option value="Скупка старинного быта в Германии">Скупка старинного быта в Германии</option>
                    <option value="Объяснение законов и реформ простым языком">Объяснение законов и реформ простым языком</option>
                    <option value="Пошив классических мужских костюмов в Германии под заказ">Пошив классических мужских костюмов в Германии под заказ</option>
                  </optgroup>
                </select>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4">Шаг 2. Структура сайта</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Количество статей блога</label>
                <input type="number" min="0" max="10" value={formData.articles} onChange={e => setFormData({...formData, articles: parseInt(e.target.value)})} className="w-full bg-[#1a1b23] border border-[#2a2b33] rounded-lg p-3 text-white" />
              </div>
              <div className="flex items-center gap-4 mt-8">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={formData.enableFaq} onChange={e => setFormData({...formData, enableFaq: e.target.checked})} className="w-4 h-4" />
                  <span>Включить FAQ</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={formData.enableTestimonials} onChange={e => setFormData({...formData, enableTestimonials: e.target.checked})} className="w-4 h-4" />
                  <span>Включить Отзывы</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4">Шаг 3. Юридические данные</h2>
            <p className="text-gray-400 text-sm mb-4">Эти данные будут использованы для Privacy Policy, GDPR и Terms of Use.</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Юридическое название (Company)</label>
                <input type="text" value={formData.companyName} onChange={e => setFormData({...formData, companyName: e.target.value})} className="w-full bg-[#1a1b23] border border-[#2a2b33] rounded-lg p-3 text-white" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Официальный адрес</label>
                <input type="text" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full bg-[#1a1b23] border border-[#2a2b33] rounded-lg p-3 text-white" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Email для связи</label>
                <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-[#1a1b23] border border-[#2a2b33] rounded-lg p-3 text-white" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Телефон</label>
                <input type="text" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-[#1a1b23] border border-[#2a2b33] rounded-lg p-3 text-white" />
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4">Шаг 4. Дизайн</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
              {[
                { id: '01-editorial-classic', name: 'Editorial Classic', colors: ['#000000', '#ffffff', '#e60000'] },
                { id: '02-modern-saas', name: 'Modern SaaS', colors: ['#2563eb', '#f8fafc', '#1e40af'] },
                { id: '03-premium-corporate', name: 'Premium Corporate', colors: ['#1e293b', '#f1f5f9', '#0f172a'] },
                { id: '04-swiss-minimal', name: 'Swiss Minimal', colors: ['#111111', '#fafafa', '#ff3333'] },
                { id: '05-warm-organic', name: 'Warm Organic', colors: ['#78350f', '#fffbeb', '#b45309'] },
                { id: '06-tech-grid', name: 'Tech Grid', colors: ['#0f766e', '#f0fdfa', '#115e59'] },
                { id: '07-neo-brutalist', name: 'Neo Brutalist', colors: ['#000000', '#ffeb3b', '#000000'] },
                { id: '08-luxury-dark', name: 'Luxury Dark', colors: ['#d4af37', '#121212', '#b58e30'] },
                { id: '09-soft-pastel', name: 'Soft Pastel', colors: ['#ec4899', '#fdf2f8', '#be185d'] },
                { id: '10-urban-industrial', name: 'Urban Industrial', colors: ['#3f3f46', '#f4f4f5', '#27272a'] },
                { id: '11-bold-magazine', name: 'Bold Magazine', colors: ['#e11d48', '#fff1f2', '#be123c'] },
                { id: '12-calm-wellness', name: 'Calm Wellness', colors: ['#047857', '#ecfdf5', '#065f46'] },
                { id: '13-eco-natural', name: 'Eco Natural', colors: ['#65a30d', '#f7fee7', '#4d7c0f'] },
                { id: '14-cinematic-story', name: 'Cinematic Story', colors: ['#171717', '#000000', '#404040'] },
                { id: '15-monochrome-pro', name: 'Monochrome Pro', colors: ['#52525b', '#ffffff', '#3f3f46'] },
                { id: '16-mediterranean-warmth', name: 'Mediterranean Warmth', colors: ['#ea580c', '#fff7ed', '#c2410c'] },
                { id: '17-nordic-light', name: 'Nordic Light', colors: ['#64748b', '#f8fafc', '#475569'] },
                { id: '18-retro-modern', name: 'Retro Modern', colors: ['#d97706', '#fef3c7', '#b45309'] },
                { id: '19-playful-geometric', name: 'Playful Geometric', colors: ['#8b5cf6', '#f5f3ff', '#6d28d9'] },
                { id: '20-fintech-clean', name: 'Fintech Clean', colors: ['#0284c7', '#f0f9ff', '#0369a1'] },
                { id: '21-education-friendly', name: 'Education Friendly', colors: ['#0d9488', '#f0fdfa', '#0f766e'] },
                { id: '22-craft-artisan', name: 'Craft Artisan', colors: ['#9a3412', '#fff7ed', '#7c2d12'] },
                { id: '23-professional-services', name: 'Professional Services', colors: ['#1d4ed8', '#eff6ff', '#1e40af'] },
                { id: '24-futuristic-glass', name: 'Futuristic Glass', colors: ['#4f46e5', '#eef2ff', '#4338ca'] },
                { id: '25-high-contrast-accessible', name: 'High Contrast', colors: ['#000000', '#ffffff', '#ffff00'] }
              ].map(preset => (
                <div 
                  key={preset.id}
                  onClick={() => setFormData({...formData, designPreset: preset.id})}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${formData.designPreset === preset.id ? 'bg-blue-500/10 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.2)]' : 'bg-[#1a1b23] border-[#2a2b33] hover:border-gray-500 hover:scale-[1.02]'}`}
                >
                  <div className="h-16 rounded-lg mb-3 flex overflow-hidden border border-[#2a2b33]/50">
                    <div className="w-1/2 h-full" style={{ backgroundColor: preset.colors[1] }}></div>
                    <div className="w-1/4 h-full" style={{ backgroundColor: preset.colors[0] }}></div>
                    <div className="w-1/4 h-full" style={{ backgroundColor: preset.colors[2] }}></div>
                  </div>
                  <div className="font-bold text-xs text-center truncate text-gray-300">{preset.name}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4">Шаг 5. Интеграции</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Meta Pixel ID</label>
                <input type="text" value={formData.pixelId} onChange={e => setFormData({...formData, pixelId: e.target.value})} placeholder="1234567890" className="w-full bg-[#1a1b23] border border-[#2a2b33] rounded-lg p-3 text-white" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">GTM Container ID</label>
                <input type="text" value={formData.gtmId} onChange={e => setFormData({...formData, gtmId: e.target.value})} placeholder="GTM-XXXXXX" className="w-full bg-[#1a1b23] border border-[#2a2b33] rounded-lg p-3 text-white" />
              </div>
            </div>
          </div>
        )}

        {step === 6 && (
          <div className="flex flex-col items-center justify-center space-y-6 py-10">
            {loading ? (
              <>
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <h2 className="text-xl font-bold">Собираем ваш 13-страничный сайт...</h2>
                <p className="text-gray-400">Это займет около 30-40 секунд</p>
              </>
            ) : (
              <>
                <div className="text-5xl">✅</div>
                <h2 className="text-2xl font-bold">Генерация завершена!</h2>
                <p className="text-gray-400">Архив скачан. Распакуйте его и загрузите на свой хостинг.</p>
                <button onClick={() => setStep(1)} className="px-6 py-2 bg-[#2a2b33] rounded-lg hover:bg-gray-600">Создать новый проект</button>
              </>
            )}
          </div>
        )}
      </div>

      {step < 6 && (
        <div className="flex justify-between mt-8 pt-6 border-t border-[#2a2b33]">
          <button 
            onClick={prevStep}
            disabled={step === 1}
            className={`px-6 py-3 rounded-lg font-bold transition-colors ${step === 1 ? 'opacity-0 cursor-default' : 'bg-[#1a1b23] border border-[#2a2b33] hover:bg-[#2a2b33]'}`}
          >
            Назад
          </button>
          
          {step < 5 ? (
            <button 
              onClick={nextStep}
              className="px-6 py-3 rounded-lg font-bold bg-white text-black hover:bg-gray-200 transition-colors"
            >
              Далее
            </button>
          ) : (
            <button 
              onClick={handleSubmit}
              className="px-8 py-3 rounded-lg font-bold shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] transition-all"
              style={{ background: 'linear-gradient(90deg, #1e3a8a, #3b82f6)' }}
            >
              Сгенерировать
            </button>
          )}
        </div>
      )}
    </div>
  );
}
