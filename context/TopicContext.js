import React, { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from './AuthContext';
import { topicAPI } from '../utils/api';
import Toast from 'react-native-toast-message';

const TopicContext = createContext();

export const TopicProvider = ({ children }) => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchTopics();
    }
  }, [isAuthenticated]);

  const fetchTopics = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await topicAPI.getAllTopics();
      setTopics(response.data);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to fetch topics');
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to fetch topics',
      });
    } finally {
      setLoading(false);
    }
  };

  const addTopic = async (topicData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await topicAPI.addTopic(topicData);
      setTopics([...topics, response.data]);
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Topic added successfully',
      });
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to add topic');
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to add topic',
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteTopic = async (id) => {
    try {
      setLoading(true);
      setError(null);
      await topicAPI.deleteTopic(id);
      setTopics(topics.filter(topic => topic._id !== id));
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Topic deleted successfully',
      });
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to delete topic');
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to delete topic',
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateTopic = async (id, topicData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await topicAPI.updateTopic(id, topicData);
      setTopics(topics.map(topic => 
        topic._id === id ? response.data : topic
      ));
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Topic updated successfully',
      });
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update topic');
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to update topic',
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <TopicContext.Provider
      value={{
        topics,
        loading,
        error,
        fetchTopics,
        addTopic,
        deleteTopic,
        updateTopic,
      }}
    >
      {children}
    </TopicContext.Provider>
  );
};

export const useTopics = () => {
  const context = useContext(TopicContext);
  if (!context) {
    throw new Error('useTopics must be used within a TopicProvider');
  }
  return context;
};

export default TopicContext; 