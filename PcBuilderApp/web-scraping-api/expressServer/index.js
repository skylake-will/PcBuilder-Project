require('dotenv').config(); // Ensure this is at the very top
const express = require('express');
const rateLimit = require('express-rate-limit');
const basicAuth = require('express-basic-auth');
const ipRangeCheck = require('ip-range-check');
const cors = require('cors');
const scrapingRoutes = require('../routes/scrapingRoutes'); // Adjust path as needed

const app = express();
const PORT = process.env.PORT || 3000;

// Log environment variables for debugging
console.log('API_USER:', process.env.API_USER);
console.log('API_PASSWORD:', process.env.API_PASSWORD);

// CORS Middleware
app.use(cors());

// Rate Limiting Middleware
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: "Too many requests, please try again later."
});
app.use(limiter);

// IP Whitelisting Middleware (Optional, uncomment and configure if needed)


// Basic Authentication Middleware
if (!process.env.API_USER || !process.env.API_PASSWORD) {
    console.error('API_USER or API_PASSWORD is not set in the environment variables.');
    process.exit(1);
}

app.use(basicAuth({
    users: { [process.env.API_USER]: process.env.API_PASSWORD },
    challenge: true,
}));

// Use Routes
app.use('/', scrapingRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
