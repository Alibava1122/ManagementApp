import React, { createContext, useContext, useState, useEffect } from 'react';
import { storeData, getData } from '../utils/storage';

const AssetContext = createContext();

export const useAssets = () => useContext(AssetContext);

export const AssetProvider = ({ children }) => {
  const [stocks, setStocks] = useState([]);
  const [cryptos, setCryptos] = useState([]);
  const [properties, setProperties] = useState([]);
  const [cashEntries, setCashEntries] = useState([]);

  const addStock = (stock) => {
    setStocks([...stocks, { ...stock, id: Date.now().toString() }]);
  };

  const addCrypto = (crypto) => {
    setCryptos([...cryptos, { ...crypto, id: Date.now().toString() }]);
  };

  const addProperty = (property) => {
    setProperties([...properties, { ...property, id: Date.now().toString() }]);
  };
  const addCashEntry = (entry) => {
    setCashEntries([...cashEntries, { ...entry, id: Date.now().toString() }]);
  };

  const deleteStock = (id) => {
    setStocks(stocks.filter(stock => stock.id !== id));
  };

  const deleteCrypto = (id) => {
    setCryptos(cryptos.filter(crypto => crypto.id !== id));
  };

  const deleteProperty = (id) => {
    setProperties(properties.filter(property => property.id !== id));
  };
  const deleteCashEntry = (id) => {
    setCashEntries(cashEntries.filter(entry => entry.id !== id));
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

  const updateStock = async (updatedStock) => {
    const newStocks = stocks.map(stock => 
      stock.id === updatedStock.id ? updatedStock : stock
    );
    setStocks(newStocks);
    await storeData('stocks', newStocks);
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

  useEffect(() => {
    const loadInitialData = async () => {
      const savedStocks = await getData('stocks');
      const savedCryptos = await getData('cryptos');
      const savedProperties = await getData('properties');
      const savedCashEntries = await getData('cashEntries');

      if (savedStocks) setStocks(savedStocks);
      if (savedCryptos) setCryptos(savedCryptos);
      if (savedProperties) setProperties(savedProperties);
      if (savedCashEntries) setCashEntries(savedCashEntries);
      
    };

    loadInitialData();
  }, []);

  return (
    <AssetContext.Provider
      value={{
        stocks,
        cryptos,
        properties,
        cashEntries,
        addStock,
        addCrypto,
        addProperty,
        addCashEntry,
        deleteStock,
        deleteCrypto,
        deleteProperty,
        deleteCashEntry,
        calculateTotalAssets,
        updateStock,
        updateCrypto,
        updateProperty,
      }}
    >
      {children}
    </AssetContext.Provider>
  );
}; 