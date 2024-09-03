const express = require('express');
const { scrapeProducts, readFromFile } = require('../controllers/scrapingController');
const {scrapeGeekbench} = require('../controllers/geekbenchController')
const {scrapeGpuBenchmarks} =require('../controllers/gpuBenchController')
const router = express.Router();

// Scrape products from Kabum or Geekbench
router.get('/scrape-products', scrapeProducts);

// Scrape Geekbench scores
router.get('/scrape-geekbench', scrapeGeekbench);

//Scrape GPU Bench Scores
router.get('/scrape-gpubench',scrapeGpuBenchmarks)

// Retrieve stored CPU data
router.get('/cpu-data', (res) => {
    const existingData = readFromFile();
    res.json({ products: existingData });
});

module.exports = router;
