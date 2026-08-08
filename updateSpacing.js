const fs = require('fs');
const path = require('path');

const dirs = [
  'app/(main)',
  'app/login',
  'app/signup',
  'app/forgot-password',
  'components/authentication',
  'components/calendar',
  'components/organization',
  'components/profile'
];

function processDir(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;
      
      // Update form spacing for better breathing room
      if (content.includes('space-y-4')) {
        content = content.replace(/space-y-4/g, 'space-y-6');
        changed = true;
      }
      if (content.includes('space-y-2')) {
        content = content.replace(/space-y-2/g, 'space-y-3');
        changed = true;
      }
      
      // Update Textarea padding
      if (content.includes('px-3 py-2')) {
        content = content.replace(/px-3 py-2/g, 'px-4 py-3');
        changed = true;
      }

      if (changed) {
        fs.writeFileSync(fullPath, content);
        console.log('Updated:', fullPath);
      }
    }
  }
}

dirs.forEach(d => processDir(path.join(process.cwd(), d)));
console.log('Done replacing UI spacing.');
