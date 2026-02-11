// src/utils/binance.js
import axios from 'axios';

/**
 * Base URLs for Binance public API
 */
const BINANCE_BASE_URL = 'https://api.binance.com/api/v3';

/**
 * Get current price for a symbol (e.g., BTCUSDT)
 * @param {string} symbol - trading pair symbol
 * @returns {Promise<number>} - current price
 */
export const getPrice = async (symbol) => {
  try {
    const response = await axios.get(`${BINANCE_BASE_URL}/ticker/price`, {
      params: { symbol }
    });
    return parseFloat(response.data.price);
  } catch (err) {
    console.error(`Error fetching price for ${symbol}:`, err.message);
    return null;
  }
};

/**
 * Get 24h statistics for a symbol (price change, volume, etc.)
 * @param {string} symbol - trading pair symbol
 * @returns {Promise<Object>} - 24h stats
 */
export const get24hStats = async (symbol) => {
  try {
    const response = await axios.get(`${BINANCE_BASE_URL}/ticker/24hr`, {
      params: { symbol }
    });
    return {
      priceChange: parseFloat(response.data.priceChange),
      priceChangePercent: parseFloat(response.data.priceChangePercent),
      highPrice: parseFloat(response.data.highPrice),
      lowPrice: parseFloat(response.data.lowPrice),
      volume: parseFloat(response.data.volume),
      quoteVolume: parseFloat(response.data.quoteVolume)
    };
  } catch (err) {
    console.error(`Error fetching 24h stats for ${symbol}:`, err.message);
    return null;
  }
};

/**
 * Get hourly candlestick data for a symbol
 * @param {string} symbol - trading pair symbol
 * @param {string} interval - candle interval (default '1h')
 * @param {number} limit - number of candles to fetch (default 24)
 * @returns {Promise<Array>} - array of candle objects
 */
export const getHourlyCandles = async (symbol, interval = '1h', limit = 24) => {
  try {
    const response = await axios.get(`${BINANCE_BASE_URL}/klines`, {
      params: { symbol, interval, limit }
    });

    // Binance returns: [openTime, open, high, low, close, volume, ...]
    return response.data.map(candle => ({
      openTime: candle[0],
      open: parseFloat(candle[1]),
      high: parseFloat(candle[2]),
      low: parseFloat(candle[3]),
      close: parseFloat(candle[4]),
      volume: parseFloat(candle[5])
    }));
  } catch (err) {
    console.error(`Error fetching hourly candles for ${symbol}:`, err.message);
    return [];
  }
};
