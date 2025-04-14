import React, { createContext, useContext, useState, useEffect } from 'react';
import { storeData, getData } from '../utils/storage';
import { 
  assetAPI, 
  cryptoAPI, 
  realEstateAPI, 
  cashAPI, 
  stockAPI 
} from '../utils/api';
import Toast from 'react-native-toast-message';

const AssetContext = createContext();

export const useAssets = () => useContext(AssetContext);

export const AssetProvider = ({ children }) => {
  const [stocks, setStocks] = useState([]);
  const [cryptos, setCryptos] = useState([]);
  const [properties, setProperties] = useState([]);
  const [cashEntries, setCashEntries] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all assets on mount
  useEffect(() => {
    fetchAllAssets();
  }, []);

  const fetchAllAssets = async () => {
    setLoading(true);
    try {
      const [stocksRes, cryptosRes, propertiesRes, cashRes] = await Promise.all([
        stockAPI.getAllStocks(),
        cryptoAPI.getAllCryptos(),
        realEstateAPI.getAllProperties(),
        cashAPI.getAllCashEntries(),
      ]);

      setStocks(stocksRes.data);
      setCryptos(cryptosRes.data);
      setProperties(propertiesRes.data);
      setCashEntries(cashRes.data);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to fetch assets',
      });
    } finally {
      setLoading(false);
    }
  };

  const addStock = async (stock) => {
 
    try {
     
      const response = await stockAPI.addStock(stock);
      // console.log('stock from conetxt',response)
      setStocks([...stocks, response.data]);
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Stock added successfully',
      });
      return response.data;
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to add stock',
      });
    }
  };

  const addCrypto = async (crypto) => {
    try {
      const response = await cryptoAPI.addCrypto(crypto);
      setCryptos([...cryptos, response.data]);
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Crypto added successfully',
      });
      return response.data;
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to add crypto',
      });
    }
  };

  const addProperty = async (property) => {
    try {
      const response = await realEstateAPI.addProperty(property);
  
      setProperties([...properties, response.data]);
  
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Property added successfully',
      });
  
      return response.data; 
    } catch (error) {
      console.error('Error adding property:', error.response?.data || error.message); 
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to add property',
      });
      return null; 
    }
  };

  const addCashEntry = async (entry) => {
    try {
      const response = await cashAPI.addCashEntry(entry);
      setCashEntries([...cashEntries, response.data]);
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Cash entry added successfully',
      });
      return response.data;
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to add cash entry',
      });
    }
  };

  const deleteStock = async (id) => {
    try {
      const response = await assetAPI.deleteAsset(id);
      setStocks(stocks.filter(stock => stock.id !== id));
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Stock deleted successfully',
      });
      return response.data;
    } catch (error) {
      
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to delete stock',
      });
    }
  };

  const deleteCrypto = async (id) => {
    try {
      const response = await assetAPI.deleteAsset(id);
      setCryptos(cryptos.filter(crypto => crypto.id !== id));
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Crypto deleted successfully',
      });
      return response.data;
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to delete crypto',
      });
    }
  };

  const deleteProperty = async (id) => {
    try {
      const response = await assetAPI.deleteAsset(id);
      setProperties(properties.filter(property => property.id !== id));
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Property deleted successfully',
      });
      return response.data;
      
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to delete property',
      });
    }
  };

  const deleteCashEntry = async (id) => {
    try {
      const response = await assetAPI.deleteAsset(id);
      setCashEntries(cashEntries.filter(entry => entry.id !== id));
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Cash entry deleted successfully',
      });
      return response.data;
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to delete cash entry',
      });
    }
  };

  const calculateTotalAssets = () => {
    const stocksTotal = stocks.reduce((acc, stock) => 
      acc + (parseFloat(stock.quantity) * parseFloat(stock.currentPrice || stock.purchasePrice)), 0);
    
    const cryptosTotal = cryptos.reduce((acc, crypto) => 
      acc + (parseFloat(crypto.quantity) * parseFloat(crypto.currentPrice || crypto.purchasePrice)), 0);
    
    const propertiesTotal = properties.reduce((acc, property) => 
      acc + parseFloat(property.currentValue), 0);
    const cashTotal = cashEntries.reduce((acc, entry) => acc + parseFloat(entry.amount), 0);

    return {
      stocksTotal,
      cryptosTotal,
      propertiesTotal,
      cashTotal,
      total: stocksTotal + cryptosTotal + propertiesTotal + cashTotal,
    };
  };

  const updateStock = async (id, updatedStock) => {
    try {
      const response = await stockAPI.updateStock(id, updatedStock);
      setStocks(stocks.map(stock => 
        stock.id === id ? response.data : stock
      ));
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Stock updated successfully',
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to update stock',
      });
    }
  };

  const updateCrypto = async (updatedCrypto) => {
    const newCryptos = cryptos.map(crypto => 
      crypto.id === updatedCrypto.id ? updatedCrypto : crypto
    );
    setCryptos(newCryptos);
    await storeData('cryptos', newCryptos);
  };

  const updateProperty = async (updatedProperty) => {
    const newProperties = properties.map(property => 
      property.id === updatedProperty.id ? updatedProperty : property
    );
    setProperties(newProperties);
    await storeData('properties', newProperties);
  };

  return (
    <AssetContext.Provider
      value={{
        stocks,
        cryptos,
        properties,
        cashEntries,
        loading,
        addStock,
        addCrypto,
        addProperty,
        addCashEntry,
        deleteStock,
        deleteCrypto,
        deleteProperty,
        deleteCashEntry,
        updateStock,
        calculateTotalAssets,
        fetchAllAssets,
      }}
    >
      {children}
    </AssetContext.Provider>
  );
}; 