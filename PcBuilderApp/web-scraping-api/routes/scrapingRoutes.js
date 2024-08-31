const express = require('express');
const {scrapeProducts} = require('../controllers/scrapingController');
const router = express.Router();

// Scrape Kabum for products by category
router.get('/scrape-products', scrapeProducts);

router.get('/cpu-data', (req, res) => {
    const existingData = readFromFile(); // Use the readFromFile function from scrapingController
    res.json({ products: existingData });
});

module.exports = router;
