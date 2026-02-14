// backend-agents/utils/binance.js
export async function getBinancePrice(symbol) {
  try {
    // We map your task symbols (e.g., BTC) to Binance pairs (BTCUSDT)
    const pair = `${symbol.toUpperCase()}USDT`;
    const response = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${pair}`);
    const data = await response.json();
    return data.price; // Returns string price like "64250.20"
  } catch (err) {
    console.error("Price fetch failed:", err);
    return null;
  }
}
