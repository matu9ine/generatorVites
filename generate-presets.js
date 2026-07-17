const fs = require('fs');
const path = require('path');

const presetsDir = path.join(__dirname, 'design-presets');
if (!fs.existsSync(presetsDir)) {
  fs.mkdirSync(presetsDir, { recursive: true });
}

const presets = [
  { id: 'editorial-classic', name: 'Editorial Classic', colors: ['#000000', '#ffffff', '#e60000'] },
  { id: 'modern-saas', name: 'Modern SaaS', colors: ['#2563eb', '#f8fafc', '#1e40af'] },
  { id: 'premium-corporate', name: 'Premium Corporate', colors: ['#1e293b', '#f1f5f9', '#0f172a'] },
  { id: 'swiss-minimal', name: 'Swiss Minimal', colors: ['#111111', '#fafafa', '#ff3333'] },
  { id: 'warm-organic', name: 'Warm Organic', colors: ['#78350f', '#fffbeb', '#b45309'] },
  { id: 'tech-grid', name: 'Tech Grid', colors: ['#0f766e', '#f0fdfa', '#115e59'] },
  { id: 'neo-brutalist', name: 'Neo Brutalist', colors: ['#000000', '#ffeb3b', '#000000'] },
  { id: 'luxury-dark', name: 'Luxury Dark', colors: ['#d4af37', '#121212', '#b58e30'] },
  { id: 'soft-pastel', name: 'Soft Pastel', colors: ['#ec4899', '#fdf2f8', '#be185d'] },
  { id: 'urban-industrial', name: 'Urban Industrial', colors: ['#3f3f46', '#f4f4f5', '#27272a'] },
  { id: 'bold-magazine', name: 'Bold Magazine', colors: ['#e11d48', '#fff1f2', '#be123c'] },
  { id: 'calm-wellness', name: 'Calm Wellness', colors: ['#047857', '#ecfdf5', '#065f46'] },
  { id: 'eco-natural', name: 'Eco Natural', colors: ['#65a30d', '#f7fee7', '#4d7c0f'] },
  { id: 'cinematic-story', name: 'Cinematic Story', colors: ['#171717', '#000000', '#404040'] },
  { id: 'monochrome-pro', name: 'Monochrome Pro', colors: ['#52525b', '#ffffff', '#3f3f46'] },
  { id: 'mediterranean-warmth', name: 'Mediterranean Warmth', colors: ['#ea580c', '#fff7ed', '#c2410c'] },
  { id: 'nordic-light', name: 'Nordic Light', colors: ['#64748b', '#f8fafc', '#475569'] },
  { id: 'retro-modern', name: 'Retro Modern', colors: ['#d97706', '#fef3c7', '#b45309'] },
  { id: 'playful-geometric', name: 'Playful Geometric', colors: ['#8b5cf6', '#f5f3ff', '#6d28d9'] },
  { id: 'fintech-clean', name: 'Fintech Clean', colors: ['#0284c7', '#f0f9ff', '#0369a1'] },
  { id: 'education-friendly', name: 'Education Friendly', colors: ['#0d9488', '#f0fdfa', '#0f766e'] },
  { id: 'craft-artisan', name: 'Craft Artisan', colors: ['#9a3412', '#fff7ed', '#7c2d12'] },
  { id: 'professional-services', name: 'Professional Services', colors: ['#1d4ed8', '#eff6ff', '#1e40af'] },
  { id: 'futuristic-glass', name: 'Futuristic Glass', colors: ['#4f46e5', '#eef2ff', '#4338ca'] },
  { id: 'high-contrast-accessible', name: 'High Contrast', colors: ['#000000', '#ffffff', '#ffff00'] }
];

presets.forEach((p, idx) => {
  const num = String(idx + 1).padStart(2, '0');
  const filename = `${num}-${p.id}.md`;
  const content = `---
id: ${p.id}
name: ${p.name}
primaryColor: "${p.colors[0]}"
secondaryColor: "${p.colors[1]}"
accentColor: "${p.colors[2]}"
---
# ${p.name} Design Preset

This preset uses a primary color of ${p.colors[0]} and a secondary background of ${p.colors[1]}.
`;
  fs.writeFileSync(path.join(presetsDir, filename), content, 'utf8');
});

console.log('Created 25 presets.');
