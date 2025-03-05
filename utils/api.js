import axios from 'axios';

// Yahoo Finance API
export const yahooFinanceAPI = axios.create({
  baseURL: 'https://query1.finance.yahoo.com/v8/finance',
});

// CoinGecko API
export const coinGeckoAPI = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3',
});

// Helper functions for data fetching
export const fetchStockPrice = async (symbol) => {
  try {
    const response = await yahooFinanceAPI.get(`/chart/${symbol}?interval=1d&range=1mo`);
    return response.data;
  } catch (error) {
    console.error('Error fetching stock price:', error);
    return null;
  }
};

export const fetchCryptoPrice = async (id) => {
  try {
    const response = await coinGeckoAPI.get(`/coins/${id}/market_chart?vs_currency=usd&days=30&interval=daily`);
    return response.data;
  } catch (error) {
    console.error('Error fetching crypto price:', error);
    return null;
  }
}; 