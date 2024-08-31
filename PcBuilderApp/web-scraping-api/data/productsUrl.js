const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

// Define category URLs
const categoryUrls = [
    'https://www.kabum.com.br/hardware/processadores',
    'https://www.kabum.com.br/hardware/placas-de-video',
    'https://www.kabum.com.br/hardware/placas-mae'
    // Add other category URLs here
];

const scrapeProductUrls = async (categoryUrl) => {
    try {
        const response = await axios.get(categoryUrl);
        const $ = cheerio.load(response.data);
        const productUrls = [];

        // Adjust selectors based on the site's structure
        $('a.product-link').each((index, element) => {
            const href = $(element).attr('href');
            if (href) {
                const fullUrl = `https://www.kabum.com.br${href}`;
                productUrls.push(fullUrl);
            }
        });

        return productUrls;
    } catch (error) {
        console.error(`Error fetching product URLs from ${categoryUrl}:`, error);
        return [];
    }
};

const updateProductUrls = async () => {
    let allProductUrls = [];
    for (const url of categoryUrls) {
        const urls = await scrapeProductUrls(url);
        allProductUrls = [...allProductUrls, ...urls];
    }

    fs.writeFileSync('path/to/productUrls.json', JSON.stringify(allProductUrls, null, 2));
    console.log('Product URLs collected successfully.');
};

updateProductUrls();
