import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

const downloadDir = './downloaded_images/64x64'; // Directory containing downloaded images
const optimizedDir = './optimized_images'; // Output directory for optimized images

// Executes a command and returns a promise
const execPromise = (command) => new Promise((resolve, reject) => {
  exec(command, (error, stdout, stderr) => {
    if (error) {
      reject(`Error: ${error.message}`);
    } else if (stderr) {
      console.warn(`Warning: ${stderr}`);
      resolve(stderr); // Treat warnings as non-critical
    } else {
      resolve(stdout);
    }
  });
});

// Sequential optimization steps for a single PNG image
async function optimizeImageSequentially(filePath) {
  try {
    const fileName = path.basename(filePath);
    const optimizedFilePath = path.join(optimizedDir, fileName);

    // Ensure the output directory exists
    if (!fs.existsSync(optimizedDir)) {
      fs.mkdirSync(optimizedDir, { recursive: true });
    }

    // Step 1: pngquant for initial lossy compression. Output to optimized directory
    await execPromise(`pngquant --force --output "${optimizedFilePath}" -- "${filePath}"`);

    // Step 2: OxiPNG for lossless optimization. OxiPNG modifies the file in place, so move file to optimized directory first
    await execPromise(`oxipng --opt max "${optimizedFilePath}"`);

    // Step 3: AdvPNG for further lossless compression. AdvPNG modifies the file in place
    await execPromise(`advpng -z -4 "${optimizedFilePath}"`);

    console.log(`Optimized: ${optimizedFilePath}`);
  } catch (error) {
    console.error(`Failed optimization for ${filePath}: ${error}`);
  }
}

// Function to iterate over all PNG files in the directory and optimize them sequentially
async function optimizeAllImagesSequentially() {
  fs.readdir(downloadDir, async (err, files) => {
    if (err) {
      console.error('Error reading the directory:', err);
      return;
    }

    for (const file of files) {
      if (path.extname(file).toLowerCase() === '.png') {
        const filePath = path.join(downloadDir, file);
        await optimizeImageSequentially(filePath);
      }
    }
  });
}

optimizeAllImagesSequentially();
