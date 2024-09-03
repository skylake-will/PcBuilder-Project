// const puppeteer = require('puppeteer');
// const fs = require('fs');
// const path = require('path');

// // Define the file path for storing scraped data
// const filePath = path.join(__dirname, 'geekbenchData.json');

// // Function to read data from the JSON file
// const readFromFile = () => {
//     try {
//         if (fs.existsSync(filePath)) {
//             const data = fs.readFileSync(filePath, 'utf8');
//             const jsonData = JSON.parse(data);

//             // Ensure the data is an array
//             if (Array.isArray(jsonData)) {
//                 return jsonData;
//             } else {
//                 console.error('File content is not an array. Initializing with empty array.');
//                 return [];
//             }
//         } else {
//             // File does not exist, return an empty array
//             return [];
//         }
//     } catch (error) {
//         console.error('Error reading or parsing file:', error);
//         return [];
//     }
// };

// // Function to write data to the JSON file
// const writeToFile = (data) => {
//     fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8', (err) => {
//         if (err) {
//             console.error('Error writing to file:', err);
//         } else {
//             console.log('Data successfully written to file.');
//         }
//     });
// };

// // Function to scrape CPU benchmarks from Geekbench
// const scrapeGeekbenchFromPage = async (url) => {
//     const browser = await puppeteer.launch({ headless: true });
//     const page = await browser.newPage();

//     try {
//         await page.goto(url, { waitUntil: 'networkidle2' });

//         // Extract CPU benchmarks from the page
//         const benchmarks = await page.evaluate(() => {
//             const rows = Array.from(document.querySelectorAll('table.table tr')).slice(1); // Skip header row
//             return rows.map(row => {
//                 const cpuNameElement = row.querySelector('a'); // Adjust selector as needed
//                 const singleCoreScoreElement = row.querySelector('td.score');
//                 const multiCoreScoreElement = row.querySelector(''); // Assuming this is correct

//                 return {
//                     cpuName: cpuNameElement ? cpuNameElement.innerText.trim() : 'No name',
//                     singleCoreScore: singleCoreScoreElement ? singleCoreScoreElement.innerText.trim() : 'No score',
//                     multiCoreScore: multiCoreScoreElement ? multiCoreScoreElement.innerText.trim() : 'No score',
//                 };
//             });
//         });

//         return benchmarks.length ? benchmarks : null;
//     } catch (error) {
//         console.error('Error scraping Geekbench data:', error);
//         return null;
//     } finally {
//         await browser.close();
//     }
// };

// // Function to scrape data from Geekbench
// const scrapeGeekbench = async (req, res) => {
//     const { url } = req.query;
//     if (!url) return res.status(400).json({ error: 'Missing url parameter' });

//     try {
//         const benchmarks = await scrapeGeekbenchFromPage(url);

//         if (!benchmarks || benchmarks.length === 0) {
//             return res.status(404).json({ error: 'No benchmarks found on the page' });
//         }

//         const existingData = readFromFile();

//         benchmarks.forEach(benchmark => {
//             if (!existingData.some(item => item.cpuName === benchmark.cpuName)) {
//                 existingData.push(benchmark);
//             }
//         });

//         writeToFile(existingData);

//         res.json({ benchmarks });
//     } catch (error) {
//         console.error('Error scraping Geekbench data:', error);
//         res.status(500).json({ error: 'Error fetching data from Geekbench' });
//     }
// };

// module.exports = {
//     scrapeGeekbench
// };


const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Define the file path for storing scraped data
const filePath = path.join(__dirname, 'geekbenchData.json');

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

// Function to scrape CPU benchmarks from Geekbench
const scrapeGeekbenchFromPage = async (url) => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    try {
        await page.goto(url, { waitUntil: 'networkidle2' });

        // Extract CPU benchmarks from the page
        const benchmarks = await page.evaluate(() => {
            const singleCoreData = [];
            const multiCoreData = [];

            // Extract data from the single-core section
            const singleCoreRows = Array.from(document.querySelectorAll('#single-core table.table tr')).slice(1);
            singleCoreRows.forEach(row => {
                const cpuNameElement = row.querySelector('td:first-child a'); // CPU name in the first <td> <a>
                const singleCoreScoreElement = row.querySelector('td.score'); // Single-core score

                if (cpuNameElement && singleCoreScoreElement) {
                    const cpuName = cpuNameElement.innerText.trim();
                    const singleCoreScore = singleCoreScoreElement.innerText.trim();

                    singleCoreData.push({
                        cpuName,
                        singleCoreScore
                    });
                }
            });

            // Extract data from the multi-core section
            const multiCoreRows = Array.from(document.querySelectorAll('#multi-core table.table tr')).slice(1);
            multiCoreRows.forEach(row => {
                const cpuNameElement = row.querySelector('td:first-child a'); // CPU name in the first <td> <a>
                const multiCoreScoreElement = row.querySelector('td.score'); // Multi-core score

                if (cpuNameElement && multiCoreScoreElement) {
                    const cpuName = cpuNameElement.innerText.trim();
                    const multiCoreScore = multiCoreScoreElement.innerText.trim();

                    // Update existing entry or create new one
                    let entry = singleCoreData.find(item => item.cpuName === cpuName);
                    if (entry) {
                        entry.multiCoreScore = multiCoreScore;
                    } else {
                        singleCoreData.push({
                            cpuName,
                            singleCoreScore: 'No score', // Placeholder
                            multiCoreScore
                        });
                    }
                }
            });

            return singleCoreData;
        });

        return benchmarks.length ? benchmarks : null;
    } catch (error) {
        console.error('Error scraping Geekbench data:', error);
        return null;
    } finally {
        await browser.close();
    }
};

// Function to scrape data from Geekbench
const scrapeGeekbench = async (req, res) => {
    const { url } = req.query;
    if (!url) return res.status(400).json({ error: 'Missing url parameter' });

    try {
        const benchmarks = await scrapeGeekbenchFromPage(url);

        if (!benchmarks || benchmarks.length === 0) {
            return res.status(404).json({ error: 'No benchmarks found on the page' });
        }

        const existingData = readFromFile();

        benchmarks.forEach(benchmark => {
            if (!existingData.some(item => item.cpuName === benchmark.cpuName)) {
                existingData.push(benchmark);
            }
        });

        writeToFile(existingData);

        res.json({ benchmarks });
    } catch (error) {
        console.error('Error scraping Geekbench data:', error);
        res.status(500).json({ error: 'Error fetching data from Geekbench' });
    }
};

module.exports = {
    scrapeGeekbench
};
