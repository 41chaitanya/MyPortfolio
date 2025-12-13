// convert-to-cloudinary.js
// This script converts all local image paths to Cloudinary URLs

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import cloudinaryUrls from './src/utils/cloudinaryImages.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcDir = path.join(__dirname, 'src');
let filesModified = 0;
let imagesConverted = 0;

// Get all React files
function getAllFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir);

  items.forEach((item) => {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      if (!item.includes('node_modules')) {
        files.push(...getAllFiles(fullPath));
      }
    } else if (item.endsWith('.jsx') || item.endsWith('.js')) {
      files.push(fullPath);
    }
  });

  return files;
}

// Convert image paths in content
function convertImagePaths(content) {
  let modified = false;
  let newContent = content;

  // Find all '/image/filename' patterns
  const imagePathRegex = /['"`]\/image\/([^'"`]+)['"`]/g;
  
  newContent = newContent.replace(imagePathRegex, (match, filename) => {
    if (cloudinaryUrls[filename]) {
      modified = true;
      imagesConverted++;
      return `'${cloudinaryUrls[filename]}'`;
    }
    return match;
  });

  return { modified, newContent };
}

// Process all files
const files = getAllFiles(srcDir);
console.log(`Found ${files.length} React files to process\n`);

files.forEach((file) => {
  const content = fs.readFileSync(file, 'utf-8');
  const { modified, newContent } = convertImagePaths(content);

  if (modified) {
    fs.writeFileSync(file, newContent, 'utf-8');
    filesModified++;
    console.log(`✅ Updated: ${path.relative(__dirname, file)}`);
  }
});

console.log('\n' + '='.repeat(80));
console.log(`Conversion Complete!`);
console.log(`Files modified: ${filesModified}`);
console.log(`Images converted: ${imagesConverted}`);
console.log('='.repeat(80) + '\n');

if (filesModified > 0) {
  console.log('✅ All image paths have been converted to Cloudinary URLs!');
  console.log('You can now safely delete the public/image folder.');
} else {
  console.log('⚠️  No changes were made. Check if image paths are in the expected format.');
}
