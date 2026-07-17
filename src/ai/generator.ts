import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'mock-key');

async function callGemini(systemPrompt: string, userPrompt: string): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", systemInstruction: systemPrompt });
  const result = await model.generateContent(userPrompt);
  return result.response.text();
}

// Helper for Mock AI responses
function mockHtmlWrapper(title: string, siteName: string, bodyContent: string): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - ${siteName}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <link rel="stylesheet" href="styles.css">
    <style>
      .bg-primary { background-color: var(--color-primary, #2563eb); }
      .text-primary { color: var(--color-primary, #2563eb); }
      .bg-secondary { background-color: var(--color-secondary, #f8fafc); }
      .bg-accent { background-color: var(--color-accent, #1e40af); }
      .text-accent { color: var(--color-accent, #1e40af); }
      .border-primary { border-color: var(--color-primary, #2563eb); }
    </style>
    <!-- GSC_TAG_PLACEHOLDER -->
</head>
<body class="bg-gray-50 text-gray-800 font-sans antialiased flex flex-col min-h-screen">
    <!-- Navbar -->
    <nav class="bg-white shadow-sm fixed w-full z-10 top-0">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16">
                <div class="flex items-center">
                    <i class="fas fa-cube text-primary text-2xl mr-2"></i>
                    <a href="index.php" class="font-bold text-xl tracking-tight text-gray-900">${siteName}</a>
                </div>
                <div class="hidden md:flex items-center space-x-8">
                    <a href="index.php" class="text-gray-600 hover:text-primary transition">Home</a>
                    <a href="about.html" class="text-gray-600 hover:text-primary transition">About Us</a>
                    <a href="services.html" class="text-gray-600 hover:text-primary transition">Services</a>
                    <a href="contact.html" class="bg-primary text-white px-5 py-2 rounded-full font-medium hover:opacity-90 transition">Contact</a>
                </div>
            </div>
        </div>
    </nav>

    <main class="flex-grow pt-16">
        ${bodyContent}
    </main>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white pt-16 pb-8 mt-auto">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                <div class="col-span-1 md:col-span-2">
                    <h3 class="text-2xl font-bold mb-4 flex items-center"><i class="fas fa-cube text-primary mr-2"></i> ${siteName}</h3>
                    <p class="text-gray-400 max-w-md">Professional and reliable services tailored for you. We aim to provide the best experience and outstanding results.</p>
                </div>
                <div>
                    <h4 class="text-lg font-semibold mb-4 text-white">Quick Links</h4>
                    <ul class="space-y-2 text-gray-400 text-sm">
                        <li><a href="about.html" class="hover:text-primary transition">About Us</a></li>
                        <li><a href="services.html" class="hover:text-primary transition">Services</a></li>
                        <li><a href="contact.html" class="hover:text-primary transition">Contact</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="text-lg font-semibold mb-4 text-white">Legal</h4>
                    <ul class="space-y-2 text-gray-400 text-sm">
                        <li><a href="privacy-policy.html" class="hover:text-primary transition">Privacy Policy</a></li>
                        <li><a href="terms-of-use.html" class="hover:text-primary transition">Terms of Use</a></li>
                        <li><a href="cookies-policy.html" class="hover:text-primary transition">Cookies Policy</a></li>
                        <li><a href="gdpr.html" class="hover:text-primary transition">GDPR</a></li>
                    </ul>
                </div>
            </div>
            <div class="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
                <div>&copy; 2026 ${siteName}. All rights reserved.</div>
                <div class="mt-4 md:mt-0 flex space-x-4">
                    <a href="#" class="hover:text-white transition"><i class="fab fa-facebook-f"></i></a>
                    <a href="#" class="hover:text-white transition"><i class="fab fa-twitter"></i></a>
                    <a href="#" class="hover:text-white transition"><i class="fab fa-linkedin-in"></i></a>
                </div>
            </div>
        </div>
    </footer>
    <script src="script.js"></script>
</body>
</html>`;
}

export async function generateWhitePageHtml(theme: string, geo: string, siteName: string): Promise<string> {
  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
    return mockHtmlWrapper(`${theme} in ${geo}`, siteName, `
      <div class="bg-secondary text-gray-900 py-32 px-4 text-center">
        <h1 class="text-5xl md:text-6xl font-extrabold mb-6 text-primary tracking-tight">Welcome to ${siteName}</h1>
        <p class="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-10">We are leading experts in <strong>${theme}</strong> in ${geo}. Discover our premium services and insights tailored just for you.</p>
        <a href="services.html" class="bg-primary text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-accent transition shadow-lg inline-block">Explore Services</a>
      </div>
      <div class="py-24 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 class="text-3xl font-bold mb-12 text-gray-800">Why Choose Us?</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div class="p-8 border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition">
                    <i class="fas fa-check-circle text-accent text-4xl mb-4"></i>
                    <h3 class="text-xl font-bold mb-2">Expert Quality</h3>
                    <p class="text-gray-600">Top-tier results guaranteed by our professional team.</p>
                </div>
                <div class="p-8 border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition">
                    <i class="fas fa-bolt text-accent text-4xl mb-4"></i>
                    <h3 class="text-xl font-bold mb-2">Fast Delivery</h3>
                    <p class="text-gray-600">Quick turnaround times without compromising on detail.</p>
                </div>
                <div class="p-8 border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition">
                    <i class="fas fa-users text-accent text-4xl mb-4"></i>
                    <h3 class="text-xl font-bold mb-2">Customer First</h3>
                    <p class="text-gray-600">Dedicated support to ensure 100% satisfaction.</p>
                </div>
            </div>
        </div>
      </div>
      <div class="py-24 bg-gray-50">
        <div class="max-w-4xl mx-auto px-4 text-center">
            <h2 class="text-3xl font-bold mb-8 text-gray-800">Ready to get started?</h2>
            <p class="text-xl text-gray-600 mb-8">Contact us today to learn more about our <strong>${theme}</strong> solutions.</p>
            <a href="contact.html" class="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-full font-bold text-lg transition inline-block">Contact Us</a>
        </div>
      </div>
    `);
  }

  try {
    const systemPrompt = `You are a web developer. Generate a stunning HTML landing page using Tailwind CSS via CDN.
Sections: Navbar, Hero, Features, Testimonials, Footer.
The Navbar MUST link to: index.php, about.html, services.html, contact.html.
The Footer MUST link to: privacy-policy.html, terms-of-use.html, cookies-policy.html, gdpr.html.
Output ONLY valid HTML code. Do NOT wrap in \`\`\`html. Include <!-- GSC_TAG_PLACEHOLDER --> in <head>.
Link to styles.css and script.js.`;
    const userPrompt = `Theme: "${theme}", GEO (Language code): "${geo}". MUST WRITE ALL CONTENT IN THE LANGUAGE OF "${geo}".`;
    
    const responseText = await callGemini(systemPrompt, userPrompt);
    return responseText.replace(/^```html/, '').replace(/```$/, '').trim();
  } catch (e) {
    return mockHtmlWrapper(`${theme} in ${geo}`, siteName, `<h1 class="text-4xl text-center font-bold">Welcome to ${theme}</h1>`);
  }
}

export async function generateThanksPageHtml(theme: string, geo: string, siteName: string): Promise<string> {
  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
    return mockHtmlWrapper(`Thank You`, siteName, `<div class="text-center py-24 bg-white"><div class="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6"><i class="fas fa-check text-4xl text-green-500"></i></div><h1 class="text-5xl font-extrabold text-gray-900 mb-4">Thank You!</h1><p class="text-xl text-gray-600 max-w-lg mx-auto mb-8">Your request has been successfully submitted. Our team will contact you shortly.</p><a href="index.php" class="bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-accent transition inline-block shadow-md">Return to Home</a></div>`);
  }

  try {
    const systemPrompt = `Generate a Thank You page in Tailwind CSS. MUST be valid HTML without markdown. Include <!-- GSC_TAG_PLACEHOLDER -->. Link to styles.css and index.php.`;
    const userPrompt = `Theme: "${theme}", GEO (Language Code): "${geo}". You MUST write the entire page content in the language corresponding to "${geo}".`;
    
    const responseText = await callGemini(systemPrompt, userPrompt);
    return responseText.replace(/^```html/, '').replace(/```$/, '').trim();
  } catch (e) {
    return mockHtmlWrapper(`Thank You`, siteName, `<h1 class="text-3xl text-center font-bold">Thank You!</h1>`);
  }
}

export async function generateInnerPageHtml(theme: string, geo: string, pageType: string, siteName: string): Promise<string> {
  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
    let content = '';
    if (pageType === 'about') {
        content = `<div class="max-w-5xl mx-auto px-4 py-20"><div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"><div><h1 class="text-4xl font-extrabold mb-6 text-gray-900">About ${siteName}</h1><p class="text-lg text-gray-600 mb-4 leading-relaxed">Since our inception, we have been dedicated to delivering top-notch solutions in the field of ${theme}. Operating primarily in ${geo}, we understand local needs and global standards.</p><p class="text-lg text-gray-600 leading-relaxed">Our mission is simple: to provide reliable, professional, and innovative services that exceed expectations. We value trust, transparency, and hard work.</p></div><div class="bg-gray-200 h-80 rounded-2xl w-full object-cover"></div></div></div>`;
    } else if (pageType === 'services') {
        content = `<div class="max-w-6xl mx-auto px-4 py-20 text-center"><h1 class="text-4xl font-extrabold mb-4 text-gray-900">Our Services</h1><p class="text-xl text-gray-600 mb-12">Professional ${theme} solutions.</p><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"><div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition"><i class="fas fa-star text-4xl text-primary mb-4"></i><h3 class="text-xl font-bold mb-2">Premium Quality</h3><p class="text-gray-600">The best service on the market.</p></div><div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition"><i class="fas fa-clock text-4xl text-primary mb-4"></i><h3 class="text-xl font-bold mb-2">24/7 Support</h3><p class="text-gray-600">We are here for you anytime.</p></div><div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition"><i class="fas fa-shield-alt text-4xl text-primary mb-4"></i><h3 class="text-xl font-bold mb-2">Secure & Reliable</h3><p class="text-gray-600">100% satisfaction guaranteed.</p></div></div></div>`;
    } else if (pageType === 'contact') {
        content = `<div class="max-w-4xl mx-auto px-4 py-20"><div class="bg-white shadow-xl rounded-3xl overflow-hidden flex flex-col md:flex-row"><div class="md:w-5/12 bg-primary text-white p-10 flex flex-col justify-center"><h2 class="text-3xl font-bold mb-4">Get in Touch</h2><p class="mb-8 opacity-90">Fill up the form and our Team will get back to you within 24 hours.</p><div class="flex items-center mb-4"><i class="fas fa-phone mr-4 text-xl"></i><span>+1 (234) 567-890</span></div><div class="flex items-center mb-4"><i class="fas fa-envelope mr-4 text-xl"></i><span>hello@${siteName.toLowerCase().replace(/\s+/g,'')}.com</span></div><div class="flex items-center"><i class="fas fa-map-marker-alt mr-4 text-xl"></i><span>${geo}</span></div></div><div class="md:w-7/12 p-10"><form action="thanks.php" method="POST" class="space-y-6"><div><label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label><input type="text" name="name" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition" placeholder="John Doe"></div><div><label class="block text-sm font-medium text-gray-700 mb-1">Email Address</label><input type="email" name="email" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition" placeholder="john@example.com"></div><div><label class="block text-sm font-medium text-gray-700 mb-1">Message</label><textarea name="message" rows="4" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition" placeholder="How can we help?"></textarea></div><button type="submit" class="w-full bg-primary hover:bg-accent text-white font-bold py-3 px-4 rounded-lg transition shadow-md">Send Message</button></form></div></div></div>`;
    }
    return mockHtmlWrapper(pageType.toUpperCase(), siteName, content);
  }

  try {
    const systemPrompt = `You are a web developer. Generate an HTML page for '${pageType}'. 
Use Tailwind CSS. Include Navbar (linking to index.php, about.html, services.html, contact.html) and Footer (linking to privacy-policy.html, terms-of-use.html, cookies-policy.html, gdpr.html).
For contact.html, ensure the form has action="thanks.php" method="POST".
Output ONLY valid HTML without markdown. Include <!-- GSC_TAG_PLACEHOLDER -->.`;
    const userPrompt = `Theme: "${theme}", GEO (Language Code): "${geo}". You MUST write the entire page content in the language corresponding to "${geo}".`;
    
    const responseText = await callGemini(systemPrompt, userPrompt);
    return responseText.replace(/^```html/, '').replace(/```$/, '').trim();
  } catch (e) {
    return mockHtmlWrapper(pageType, siteName, `<h1 class="text-4xl text-center font-bold">${pageType}</h1>`);
  }
}

export function generateLegalPageHtml(domain: string, siteName: string, pageType: string): string {
  const contentMap: Record<string, string> = {
    'privacy-policy': `This Privacy Policy outlines how ${siteName} (${domain}) collects, uses, and protects your information. We do not sell data to third parties.`,
    'terms-of-use': `Welcome to ${siteName}. By accessing ${domain}, you agree to abide by these Terms of Use and our policies.`,
    'cookies-policy': `${siteName} uses cookies to enhance user experience on ${domain}. By using our site, you consent to our use of cookies.`,
    'gdpr': `We at ${siteName} (${domain}) are committed to GDPR compliance. You have the right to request, modify, or delete your personal data.`
  };
  
  const title = pageType.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  return mockHtmlWrapper(title, siteName, `<div class="max-w-3xl mx-auto px-4 py-16"><div class="bg-white p-10 rounded-2xl shadow-sm border border-gray-100">
    <h1 class="text-4xl font-bold mb-8 text-gray-900 border-b pb-4">${title}</h1>
    <div class="prose prose-blue max-w-none text-gray-600 leading-relaxed space-y-4">
        <p>${contentMap[pageType] || 'Legal policy content.'}</p>
        <p>This document constitutes the entire agreement between the user and ${siteName}. We reserve the right to modify these terms at any time without prior notice.</p>
    </div>
    <p class="mt-12 text-sm text-gray-400 font-medium">Last updated: ${new Date().toISOString().split('T')[0]}</p>
  </div></div>`);
}

export function getSystemFiles(designPreset?: string) {
  let cssVariables = '';
  if (designPreset) {
    const fs = require('fs');
    const path = require('path');
    const presetPath = path.join(process.cwd(), 'design-presets', `${designPreset}.md`);
    if (fs.existsSync(presetPath)) {
      const content = fs.readFileSync(presetPath, 'utf8');
      const primaryMatch = content.match(/primaryColor:\s*"([^"]+)"/);
      const secondaryMatch = content.match(/secondaryColor:\s*"([^"]+)"/);
      const accentMatch = content.match(/accentColor:\s*"([^"]+)"/);
      
      if (primaryMatch && secondaryMatch && accentMatch) {
        cssVariables = `:root {
  --color-primary: ${primaryMatch[1]};
  --color-secondary: ${secondaryMatch[1]};
  --color-accent: ${accentMatch[1]};
}`;
      }
    }
  }

  return {
    css: `/* Custom styles for whitepages */
${cssVariables}
html { scroll-behavior: smooth; }
.fade-in { animation: fadeIn 0.5s ease-in; }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }`,
    js: `document.addEventListener('DOMContentLoaded', () => {
    console.log('Site loaded successfully.');
});`,
    robots: `User-agent: *
Allow: /
Sitemap: /sitemap.xml`
  };
}
