const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Define the file path for storing scraped data
const filePath = path.join(__dirname, 'updateAllHardwareData.json');

// Function to read data from the JSON file
const readFromFile = () => {
    try {
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath, 'utf8');
            const jsonData = JSON.parse(data);

            // Ensure the data is an array
            if (Array.isArray(jsonData)) {
                return jsonData;
            } else {
                console.error('File content is not an array. Initializing with empty array.');
                return [];
            }
        } else {
            // File does not exist, return an empty array
            return [];
        }
    } catch (error) {
        console.error('Error reading or parsing file:', error);
        return [];
    }
};

// Function to write data to the JSON file
const writeToFile = (data) => {
    fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8', (err) => {
        if (err) {
            console.error('Error writing to file:', err);
        } else {
            console.log('Data successfully written to file.');
        }
    });
};

// Function to scrape multiple products from a single URL using Puppeteer
const scrapeProductsFromPage = async (url) => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    try {
        await page.goto(url, { waitUntil: 'networkidle2' }); // Wait until the network is idle

        // Extract multiple products from the page
        const products = await page.evaluate(() => {
            // Select all product cards
            const productElements = document.querySelectorAll('a.productLink');
            return Array.from(productElements).map(element => {
                const productName = element.querySelector('span.nameCard') ? element.querySelector('span.nameCard').innerText.trim() : 'No name';
                const price = element.querySelector('span.priceCard') ? element.querySelector('span.priceCard').innerText.trim() : 'No price';
                const imageElement = element.querySelector('.imageCard');
                const productUrl = element ? element.href : 'No URL';
                const imageUrl = imageElement ? imageElement.src : 'No image';;
                return { productName, price, imageUrl, productUrl };
            });
        });

        await browser.close();

        if (products.length === 0) {
            return null; // Return null if no valid data is found
        }

        return products;
    } catch (error) {
        console.error('Error scraping products from the page:', error);
        await browser.close();
        return null; // Return null in case of an error
    }
};

// Function to scrape products from a single URL
const scrapeProducts = async (req, res) => {
    const { url } = req.query;
    if (!url) return res.status(400).json({ error: 'Missing url parameter' });

    try {
        const products = await scrapeProductsFromPage(url);

        if (!products || products.length === 0) {
            return res.status(404).json({ error: 'No products found on the page' });
        }

        // Read existing data
        const existingData = readFromFile();
        
        // Append new data
        existingData.push(...products);

        // Write combined data to file
        writeToFile(existingData);
        
        res.json({ products });
    } catch (error) {
        console.error('Error scraping products:', error);
        res.status(500).json({ error: 'Error fetching data from the product page' });
    }
};

module.exports = {
    scrapeProducts,
};
