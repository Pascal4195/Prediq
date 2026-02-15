const axios = require('axios');

const getPrice = async (symbol) => {
  try {
    // CryptoCompare is region-friendly for Render's servers
    const url = `https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=USDT`;
    const response = await axios.get(url);
    
    if (response.data && response.data.USDT) {
      return parseFloat(response.data.USDT);
    }
    throw new Error("Price data missing");
  } catch (error) {
    console.error(`Price Fetch Error (${symbol}):`, error.message);
    return null;
  }
};

module.exports = { getPrice };
