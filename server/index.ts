import express from 'express';
import cors from 'cors';
import { 
  generateWhitePageHtml, 
  generateThanksPageHtml,
  generateInnerPageHtml,
  generateLegalPageHtml,
  getSystemFiles 
} from '../src/ai/generator';
import { createCampaign } from '../src/keitaro/api';
import { buildSite, zipSite, SiteFiles } from '../src/utils/builder';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.post('/api/generate', async (req, res) => {
  try {
    const { theme, geo, domain, siteName, pixelId, isFacebook, designPreset } = req.body;

    if (!theme || !geo || !domain) {
      return res.status(400).json({ error: 'Missing required fields: theme, geo, domain' });
    }
    
    const fallbackSiteName = siteName || theme;

    console.log(`[API] Generating full 13-page site: ${domain} | Theme: ${theme} | GEO: ${geo}`);

    // 1. AI Content Generation (run in parallel)
    const [indexHtml, aboutHtml, servicesHtml, contactHtml, thanksHtml] = await Promise.all([
      generateWhitePageHtml(theme, geo, fallbackSiteName),
      generateInnerPageHtml(theme, geo, 'about', fallbackSiteName),
      generateInnerPageHtml(theme, geo, 'services', fallbackSiteName),
      generateInnerPageHtml(theme, geo, 'contact', fallbackSiteName),
      generateThanksPageHtml(theme, geo, fallbackSiteName)
    ]);

    // Inject Pixel into index and thanks
    let finalIndexHtml = indexHtml;
    let finalThanksHtml = thanksHtml;
    if (pixelId) {
        const pixelCode = isFacebook ? `
        <!-- Meta Pixel Code -->
        <script>
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${pixelId}');
        fbq('track', 'PageView');
        </script>
        <noscript><img height="1" width="1" style="display:none"
        src="https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1"
        /></noscript>
        <!-- End Meta Pixel Code -->
        ` : `<!-- Google Pixel Code ${pixelId} -->`;

        finalIndexHtml = indexHtml.replace('<!-- GSC_TAG_PLACEHOLDER -->', pixelCode);
        finalThanksHtml = thanksHtml.replace('<!-- GSC_TAG_PLACEHOLDER -->', pixelCode);
    }

    // 2. Legal Pages Generation (Templates)
    const privacyHtml = generateLegalPageHtml(domain, fallbackSiteName, 'privacy-policy');
    const termsHtml = generateLegalPageHtml(domain, fallbackSiteName, 'terms-of-use');
    const cookiesHtml = generateLegalPageHtml(domain, fallbackSiteName, 'cookies-policy');
    const gdprHtml = generateLegalPageHtml(domain, fallbackSiteName, 'gdpr');

    // 3. System Files
    const { css, js, robots } = getSystemFiles(designPreset);

    // 4. Tracker integration
    const campaignName = `WP_${geo}_${theme.replace(/\s+/g, '_')}`;
    const { kclientScript } = await createCampaign(campaignName);

    // 5. Build Enhanced Sitemap
    const baseUrl = domain.startsWith('http') ? domain : `https://${domain}`;
    const date = new Date().toISOString().split('T')[0];
    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${baseUrl}/</loc><lastmod>${date}</lastmod><priority>1.0</priority></url>
  <url><loc>${baseUrl}/about.html</loc><lastmod>${date}</lastmod><priority>0.8</priority></url>
  <url><loc>${baseUrl}/services.html</loc><lastmod>${date}</lastmod><priority>0.8</priority></url>
  <url><loc>${baseUrl}/contact.html</loc><lastmod>${date}</lastmod><priority>0.8</priority></url>
  <url><loc>${baseUrl}/privacy-policy.html</loc><lastmod>${date}</lastmod><priority>0.5</priority></url>
  <url><loc>${baseUrl}/terms-of-use.html</loc><lastmod>${date}</lastmod><priority>0.5</priority></url>
</urlset>`;

    const siteFiles: SiteFiles = {
      indexPhp: finalIndexHtml,
      aboutHtml,
      servicesHtml,
      contactHtml,
      thanksPhp: finalThanksHtml,
      privacyHtml,
      termsHtml,
      cookiesHtml,
      gdprHtml,
      sitemapXml,
      robotsTxt: robots,
      stylesCss: css,
      scriptJs: js,
      kclientScript
    };

    const outputDirName = domain.replace(/[^a-z0-9.-]/gi, '_');
    const siteDir = await buildSite(siteFiles, outputDirName);
    
    const zipPath = path.join(process.cwd(), 'dist', `${outputDirName}.zip`);
    await zipSite(siteDir, zipPath);

    res.download(zipPath, `${outputDirName}.zip`, (err) => {
        if (err) {
            console.error('[API] Error sending file:', err);
        }
    });

  } catch (error) {
    console.error('[API] Error generating site:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`[API] Server is running on http://localhost:${PORT}`);
});
