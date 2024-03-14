import axios from 'axios';
import { createWriteStream, existsSync, mkdirSync } from 'fs';

const apiUrl = 'https://api.coincap.io/v2/assets';
const imageBaseUrl = 'https://assets.coincap.io/assets/icons/';
const limit = 2000; // Max limit per request
const downloadDir = './downloaded_images';

// Ensure download directory exists
if (!existsSync(downloadDir)){
    mkdirSync(downloadDir, { recursive: true });
}

// Function to fetch all asset symbols from the API
async function fetchAllAssetSymbols() {
  let offset = 0;
  let allAssets = [];
  let hasMore = true;

  console.log('Fetching asset symbols from API...');
  while (hasMore) {
    try {
      const response = await axios.get(`${apiUrl}?limit=${limit}&offset=${offset}`);
      allAssets = allAssets.concat(response.data.data.map(asset => asset.symbol.toLowerCase())); // Ensure symbols are lowercase for consistency
      offset += limit;
      if (response.data.data.length < limit) {
        hasMore = false;
      }
    } catch (error) {
      console.error('Error fetching assets:', error);
      break;
    }
  }
  console.log(`Fetched ${allAssets.length} asset symbols.`);
  return allAssets;
}

// Function to download images with concurrency control
async function downloadImages(symbols) {
  console.log('Downloading images...');

  const concurrencyLimit = 1;
  let current = Promise.resolve();
  let promises = [];

  symbols.forEach(symbol => {
    if (!existsSync(`${downloadDir}/${symbol}@2x.png`)) { // Check if image already exists
      const promise = current.then(() => downloadImage(symbol));
      promises.push(promise);

      if (promises.length >= concurrencyLimit) {
        current = Promise.race(promises);
      }
    } else {
      console.log(`Image for ${symbol} already downloaded.`);
    }
  });

  await Promise.all(promises);
  console.log('All images downloaded.');
}

// Function to download a single image
async function downloadImage(symbol) {
  const url = `${imageBaseUrl}${symbol}@2x.png`;
  const path = `${downloadDir}/64x64/${symbol}.png`;

  return axios({
    method: 'get',
    url,
    responseType: 'stream',
  }).then(response => {
    return new Promise((resolve, reject) => {
      response.data.pipe(createWriteStream(path))
        .on('finish', () => resolve())
        .on('error', e => reject(e));
    });
  }).catch(error => {
    console.error(`Error downloading image for ${symbol}: ${url}.`);
  });
}

// Main function to orchestrate the fetching and downloading
async function main() {
  try {
    const symbols = await fetchAllAssetSymbols();
    await downloadImages(symbols);
  } catch (error) {
    console.error('Error in main execution:', error);
  }
}

main();
