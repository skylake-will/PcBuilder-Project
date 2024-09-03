const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Define the file path for storing scraped data
const filePath = path.join(__dirname, 'gpuBenchmarkData.json');

// Function to read data from the JSON file
const readFromFile = () => {
    try {
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath, 'utf8');
            const jsonData = JSON.parse(data);

            if (Array.isArray(jsonData)) {
                return jsonData;
            } else {
                console.error('File content is not an array. Initializing with empty array.');
                return [];
            }
        } else {
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

// Function to scrape GPU benchmarks from the page
const scrapeGpuBenchmarksFromPage = async (url) => {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--ignore-certificate-errors', '--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    try {
        await page.goto(url, { waitUntil: 'networkidle2' });

        const benchmarks = await page.evaluate(() => {
            const rows = Array.from(document.querySelectorAll('ul.chartlist li')).slice(1); // Skip header row
            return rows.map(row => {
                const gpuNameElement = row.querySelector('span.prdname'); // Adjust selector based on actual structure
                const scoreElement = row.querySelector('span.count'); // Adjust selector based on actual structure

                return {
                    gpuName: gpuNameElement ? gpuNameElement.innerText.trim() : 'No name',
                    score: scoreElement ? scoreElement.innerText.trim() : 'No score',
                };
            }).filter(item => item.gpuName !== 'No name' && item.score !== 'No score');
        });

        return benchmarks.length ? benchmarks : null;
    } catch (error) {
        console.error('Error scraping GPU benchmarks data:', error);
        return null;
    } finally {
        await browser.close();
    }
};

// Function to handle the scraping request
const scrapeGpuBenchmarks = async (req, res) => {
    const { url } = req.query;
    if (!url) return res.status(400).json({ error: 'Missing url parameter' });

    try {
        const benchmarks = await scrapeGpuBenchmarksFromPage(url);

        if (!benchmarks || benchmarks.length === 0) {
            return res.status(404).json({ error: 'No benchmarks found on the page' });
        }

        const existingData = readFromFile();

        // Add new benchmarks to existing data
        benchmarks.forEach(benchmark => {
            if (!existingData.some(item => item.gpuName === benchmark.gpuName)) {
                existingData.push(benchmark);
            }
        });

        writeToFile(existingData);

        res.json({ benchmarks });
    } catch (error) {
        console.error('Error scraping GPU benchmarks data:', error);
        res.status(500).json({ error: 'Error fetching data from VideoCardBenchmark' });
    }
};

module.exports = {
    scrapeGpuBenchmarks
};
