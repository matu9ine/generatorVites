import { Command } from 'commander';
import { generateWhitePageHtml } from './ai/generator';
import { createCampaign } from './keitaro/api';
import { buildSite, zipSite } from './utils/builder';
import path from 'path';
import fs from 'fs';

const program = new Command();

program
  .name('white-page-generator')
  .description('CLI to automatically generate white pages for Google Ads farming')
  .version('1.0.0');

program
  .requiredOption('-t, --theme <string>', 'Theme of the white page (e.g., "ATM repair")')
  .requiredOption('-g, --geo <string>', 'Target GEO (e.g., "Germany", "DE")')
  .requiredOption('-d, --domain <string>', 'Target domain name (e.g., "example.com")')
  .option('-z, --zip', 'Output as ZIP archive instead of a directory')
  .action(async (options) => {
    try {
      console.log('=== Starting White Page Generator MVP ===');
      console.log(`Theme: ${options.theme} | GEO: ${options.geo} | Domain: ${options.domain}`);

      // 1. Generate Content
      const html = await generateWhitePageHtml(options.theme, options.geo);
      console.log('[Main] HTML generation completed.');

      // 2. Setup Keitaro Tracker
      const campaignName = `WP_${options.geo}_${options.theme.replace(/\s+/g, '_')}`;
      const { kclientScript } = await createCampaign(campaignName);
      console.log('[Main] Tracker setup completed.');

      // 3. Build Site
      const outputDirName = options.domain.replace(/[^a-z0-9.-]/gi, '_');
      const siteDir = await buildSite(html, kclientScript, outputDirName);
      console.log(`[Main] Site built successfully at: ${siteDir}`);

      // 4. Archive (Optional)
      if (options.zip) {
        const zipPath = path.join(process.cwd(), 'dist', `${outputDirName}.zip`);
        await zipSite(siteDir, zipPath);
        // fs.rmSync(siteDir, { recursive: true, force: true });
      }

      console.log('=== Done! ===');
      console.log(`You can now deploy the files from ${options.zip ? 'the ZIP archive' : 'the directory'} to your server.`);
      console.log('Don\'t forget to add your Google Search Console tag to the <!-- GSC_TAG_PLACEHOLDER --> in index.html!');
    } catch (error) {
      console.error('[Main] Fatal error:', error);
      process.exit(1);
    }
  });

program.parse(process.argv);
