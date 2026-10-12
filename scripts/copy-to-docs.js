import fs from 'fs';

try {
  if (fs.existsSync('dist')) {
    // Clean old files in docs folder
    if (fs.existsSync('docs')) {
      fs.rmSync('docs', { recursive: true, force: true });
    }
    // Copy build to docs folder for GitHub Pages "Deploy from a branch (/docs)"
    fs.cpSync('dist', 'docs', { recursive: true });
    // Ensure .nojekyll exists in docs
    fs.writeFileSync('docs/.nojekyll', '');
    console.log('✓ Successfully synced dist/ to docs/ for GitHub Pages');
  }
} catch (err) {
  console.error('Error copying to docs:', err);
}
