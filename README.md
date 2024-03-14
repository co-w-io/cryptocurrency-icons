# CDN

### Statically
- https://cdn.statically.io/gh/co-w-io/cryptocurrency-icons/master/png/64/btc.png
- https://cdn.statically.io/gh/co-w-io/cryptocurrency-icons/master/png/64/{{symbol}}.png

### JSDelivr
- https://cdn.jsdelivr.net/gh/co-w-io/cryptocurrency-icons@master/png/64/btc.png
- https://cdn.jsdelivr.net/gh/co-w-io/cryptocurrency-icons@master/png/64/{{symbol}}.png

### GitHack
- https://rawcdn.githack.com/co-w-io/cryptocurrency-icons/f6946108af553b1d618340c39d24c06dee44773b/png/64/btc.png
- https://rawcdn.githack.com/co-w-io/cryptocurrency-icons/f6946108af553b1d618340c39d24c06dee44773b/png/64/{{symbol}}.png

# cryptocurrency-icons

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.0.30. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

---

# Cryptocurrency Asset Image Downloader

This script automates the process of fetching cryptocurrency asset symbols from the CoinCap API and downloading their corresponding images for offline use. It efficiently handles the downloading process by ensuring that no image is downloaded more than once and by managing concurrent downloads to speed up the process.

## Prerequisites

- Node.js and npm (Node Package Manager) must be installed on your system. You can download them from [https://nodejs.org/](https://nodejs.org/).
- An understanding of how to run Node.js scripts from the command line.

## Dependencies

- `axios` for making HTTP requests.
- `fs` (File System module) for handling file operations, which comes built-in with Node.js.
- `https` for making HTTPS requests, also built-in with Node.js.

To install the necessary dependencies, run the following command in your terminal in the project directory:

```bash
npm install axios
```

No need to manually install `fs` and `https`, as they are included in Node.js.

## How to Use

1. **Clone or download the script** to your local machine in a directory of your choice.
2. **Navigate to the script's directory** using your terminal or command prompt.
3. **Ensure all dependencies are installed** by running `npm install` if you haven't already.
4. **Run the script** by executing `node download.js` in the terminal, where `download` is the name of the script file.

## Functionality Overview

- **Creating a Download Directory:** The script first checks if a specified download directory exists. If it doesn't, the directory is created. This is where all downloaded images will be stored.
- **Fetching Asset Symbols:** The script fetches cryptocurrency asset symbols from the CoinCap API, handling pagination to collect symbols across multiple pages.
- **Downloading Images:** For each symbol, the script checks if the image has already been downloaded. If not, it downloads the image from a constructed URL and saves it in the download directory. This process is managed with a concurrency limit to control the number of simultaneous downloads.

## Concurrency Control

The script limits the number of concurrent downloads to 1. This is to prevent overwhelming your network connection and the server from which the images are being downloaded.

## Error Handling

The script includes basic error handling for API requests and file operations. If an error occurs, the script will log the error message to the console.

## Customization

You can modify the `limit` variable to change the maximum number of assets fetched per API request or adjust the `concurrencyLimit` variable to increase or decrease the number of concurrent downloads.

## License

This script is released under the MIT license.

## Disclaimer

This script is provided as-is without any warranty. Use at your own risk. Always ensure you have permission to download and use any images fetched by this script.

---

# PNG Image Optimization Script

This script provides an automated workflow for optimizing PNG images using a sequence of tools: `pngquant`, `oxipng`, and `advpng`. The goal is to significantly reduce the file size of PNG images without compromising visual quality, making the images more suitable for web use.

## Overview

The script automates the process of compressing PNG files in a specified directory. It sequentially applies lossy and lossless compression techniques to achieve optimal file size reduction. This process involves:

1. Reducing the color palette with `pngquant`.
2. Applying lossless compression with `oxipng`.
3. Further compressing with `advpng` for additional size reduction.

## Installation

### Prerequisites

- Node.js
- `pngquant`
- `oxipng`
- `advpng`

### Installing Dependencies

1. **Install Node.js**: Follow the installation instructions for your operating system from the [official Node.js website](https://nodejs.org/).

2. **Install Image Optimization Tools**: The image optimization tools can be installed via package managers on most Unix-like operating systems. For example, on macOS with Homebrew:

```bash
brew install pngquant oxipng advpng
```

On Ubuntu or Debian-based Linux distributions:

```bash
sudo apt-get install pngquant
sudo apt-get install oxipng
sudo apt-get install advancecomp # for advpng
```

### Setup

1. Clone or download the script from the repository.
2. Navigate to the script directory.
3. Ensure the script has execute permissions (if necessary):

```bash
chmod +x optimize-images.js
```

## Usage

To run the script, use the following command in the terminal:

```bash
node optimize-images.js
```

The script will automatically find all PNG images in the `downloaded_images` directory and apply a series of optimizations. Ensure that your PNG images are placed in this directory before running the script.

## How It Works

### Step 1: `pngquant`

- **Process**: Reduces the number of colors in the image (lossy compression).
- **Goal**: Significant reduction in file size with minimal visual quality loss.

### Step 2: `oxipng`

- **Process**: Applies various lossless optimizations.
- **Goal**: Further reduces file size by optimizing PNG chunk structure.

### Step 3: `advpng`

- **Process**: Re-compresses the image using the AdvanceCOMP's `advpng`.
- **Goal**: Additional file size reduction through advanced lossless compression algorithms.

## Contributing

Contributions to improve the script or documentation are welcome. Please feel free to submit issues or pull requests with your suggestions or improvements.

## License

[Specify the license here, or state that it's provided "as is" without any warranty.]

---

Raw size: 8.7 Mb

Optimized: 6.3 Mb

Reduce: 32%