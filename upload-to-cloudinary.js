import cloudinary from 'cloudinary';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure Cloudinary with your credentials
cloudinary.v2.config({
  cloud_name: 'dtpstgz1j',
  api_key: '743491934174612',
  api_secret: 'nAEWjBuuitLhZJelC4y0l2jVboE',
});

const imageFolder = path.join(__dirname, 'public/image');
const uploadedUrls = {};

// Check if folder exists
if (!fs.existsSync(imageFolder)) {
  console.error(`Image folder not found at: ${imageFolder}`);
  process.exit(1);
}

// Get all files from the image folder
const files = fs.readdirSync(imageFolder);
console.log(`Found ${files.length} files to upload\n`);

let uploadCount = 0;
let errorCount = 0;

// Upload each file
files.forEach((file) => {
  const filePath = path.join(imageFolder, file);
  const isFile = fs.statSync(filePath).isFile();

  if (!isFile) return; // Skip directories

  console.log(`Uploading: ${file}...`);

  cloudinary.v2.uploader.upload(
    filePath,
    {
      folder: 'portfolio-images',
      resource_type: 'auto',
      overwrite: true,
    },
    (error, result) => {
      if (error) {
        console.error(`❌ Error uploading ${file}:`, error.message);
        errorCount++;
      } else {
        uploadedUrls[file] = result.secure_url;
        console.log(`✅ Uploaded: ${file}`);
        console.log(`   URL: ${result.secure_url}\n`);
        uploadCount++;
      }

      // After all files are processed, save the URLs to a file
      if (uploadCount + errorCount === files.length) {
        console.log('\n' + '='.repeat(80));
        console.log(`Upload Complete! Total: ${uploadCount} succeeded, ${errorCount} failed`);
        console.log('='.repeat(80) + '\n');

        // Save URLs to a JSON file for reference
        const urlsFile = path.join(__dirname, 'cloudinary-urls.json');
        fs.writeFileSync(urlsFile, JSON.stringify(uploadedUrls, null, 2));
        console.log(`✅ URLs saved to: ${urlsFile}\n`);

        // Display mapping for easy reference
        console.log('Image URL Mapping:');
        console.log('='.repeat(80));
        Object.entries(uploadedUrls).forEach(([filename, url]) => {
          console.log(`${filename}`);
          console.log(`  → ${url}\n`);
        });
      }
    }
  );
});
