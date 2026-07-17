import fs from 'fs';
import path from 'path';
import AdmZip from 'adm-zip';

export interface SiteFiles {
  indexPhp: string;
  aboutHtml: string;
  servicesHtml: string;
  contactHtml: string;
  thanksPhp: string;
  privacyHtml: string;
  termsHtml: string;
  cookiesHtml: string;
  gdprHtml: string;
  sitemapXml: string;
  robotsTxt: string;
  stylesCss: string;
  scriptJs: string;
  kclientScript: string;
}

export async function buildSite(files: SiteFiles, outputDirName: string): Promise<string> {
  const distPath = path.join(process.cwd(), 'dist', outputDirName);
  
  if (!fs.existsSync(distPath)) {
    fs.mkdirSync(distPath, { recursive: true });
  }

  const writeMap: Record<string, string> = {
    'index.php': files.indexPhp,
    'about.html': files.aboutHtml,
    'services.html': files.servicesHtml,
    'contact.html': files.contactHtml,
    'thanks.php': files.thanksPhp,
    'privacy-policy.html': files.privacyHtml,
    'terms-of-use.html': files.termsHtml,
    'cookies-policy.html': files.cookiesHtml,
    'gdpr.html': files.gdprHtml,
    'sitemap.xml': files.sitemapXml,
    'robots.txt': files.robotsTxt,
    'styles.css': files.stylesCss,
    'script.js': files.scriptJs,
    'kclient.php': files.kclientScript
  };

  for (const [filename, content] of Object.entries(writeMap)) {
    const filePath = path.join(distPath, filename);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`[Builder] Wrote ${filename}`);
  }

  return distPath;
}

export async function zipSite(sourceDir: string, outputZipPath: string): Promise<void> {
  const zip = new AdmZip();
  zip.addLocalFolder(sourceDir);
  zip.writeZip(outputZipPath);
  console.log(`[Builder] Site archived successfully to ${outputZipPath}`);
}
