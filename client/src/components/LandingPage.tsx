import React from 'react';

export default function LandingPage({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center text-center mt-10">
      <h1 className="text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
        Production Whitepage Generator
      </h1>
      <p className="text-xl text-gray-400 mb-10 max-w-2xl">
        Generate fully-fledged, multi-page corporate websites designed to pass moderation on advertising networks. No lorem ipsum. No placeholders.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 w-full max-w-4xl text-left">
        <div className="bg-[#14151a] border border-[#2a2b33] p-6 rounded-xl">
          <div className="text-3xl mb-4">🚀</div>
          <h3 className="font-bold text-lg mb-2">Fast Generation</h3>
          <p className="text-gray-400 text-sm">Creates 13-page structures with AI content and legal policies in seconds.</p>
        </div>
        <div className="bg-[#14151a] border border-[#2a2b33] p-6 rounded-xl">
          <div className="text-3xl mb-4">🎨</div>
          <h3 className="font-bold text-lg mb-2">25 Design Presets</h3>
          <p className="text-gray-400 text-sm">Choose from a variety of professional designs to match your niche.</p>
        </div>
        <div className="bg-[#14151a] border border-[#2a2b33] p-6 rounded-xl">
          <div className="text-3xl mb-4">🛡️</div>
          <h3 className="font-bold text-lg mb-2">Pass Moderation</h3>
          <p className="text-gray-400 text-sm">Valid HTML, working forms, real privacy policies, and integrated pixels.</p>
        </div>
      </div>

      <button 
        onClick={onNavigate}
        className="px-10 py-4 rounded-full font-bold text-lg shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all hover:-translate-y-1"
        style={{ background: 'linear-gradient(90deg, #1e3a8a, #3b82f6)' }}
      >
        Open Generator
      </button>
    </div>
  );
}
