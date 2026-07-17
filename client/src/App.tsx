import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import GeneratorWizard from './components/GeneratorWizard';

function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'generator'>('landing');

  return (
    <div className="min-h-screen bg-darkBg text-white flex flex-col items-center pt-6 pb-20 font-sans">
      <div className="w-full max-w-5xl px-4 flex-grow flex flex-col">
        {currentView === 'landing' && (
          <header className="mb-8 flex justify-between items-center py-4 border-b border-[#2a2b33]">
            <div className="font-bold tracking-widest uppercase text-xl text-blue-500">WHITEGEN</div>
            <div className="text-gray-400 text-sm">
              user@example.com
            </div>
          </header>
        )}

        <main className="w-full max-w-4xl mx-auto flex-grow flex flex-col justify-center">
          {currentView === 'landing' ? (
            <LandingPage onNavigate={() => setCurrentView('generator')} />
          ) : (
            <GeneratorWizard onBack={() => setCurrentView('landing')} />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
