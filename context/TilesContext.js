import React, { createContext, useState, useEffect, useContext } from 'react';
import { tilesAPI } from '../utils/api';
import { useAuth } from './AuthContext';

const TilesContext = createContext();

export const TilesProvider = ({ children }) => {
  const [tiles, setTiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth();

  // Fetch tiles when user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchTiles();
    }
  }, [isAuthenticated]);

  const fetchTiles = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await tilesAPI.getTiles();
      setTiles(response.data);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to fetch tiles');
      console.error('Error fetching tiles:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateTilePosition = async (id, position) => {
    try {
      setLoading(true);
      setError(null);
      const response = await tilesAPI.updateTilePosition(id, position);
      
      // Update the tile in the local state
      setTiles(prevTiles => 
        prevTiles.map(tile => 
          tile._id === id ? { ...tile, position } : tile
        )
      );
      
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update tile position');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getTileById = async (id) => {
    try {
      setLoading(true);
      setError(null);
      const response = await tilesAPI.getTileById(id);
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to fetch tile');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <TilesContext.Provider
      value={{
        tiles,
        loading,
        error,
        fetchTiles,
        updateTilePosition,
        getTileById,
      }}
    >
      {children}
    </TilesContext.Provider>
  );
};

export const useTiles = () => {
  const context = useContext(TilesContext);
  if (!context) {
    throw new Error('useTiles must be used within a TilesProvider');
  }
  return context;
};

export default TilesContext; 