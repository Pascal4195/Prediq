const axios = require('axios');

const getPrice = async (symbol) => {
  try {
    // Fetches real-time price from Binance Public API
    const response = await axios.get(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}USDT`);
    return parseFloat(response.data.price);
  } catch (error) {
    console.error(`Error fetching ${symbol} price:`, error);
    return null;
  }
};

module.exports = { getPrice };
