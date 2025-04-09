import React, { createContext, useState, useEffect, useContext } from 'react';
import { chatAPI } from '../utils/api';
import { useAuth } from './AuthContext';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchChatHistory();
    }
  }, [isAuthenticated]);

  const fetchChatHistory = async (page = 1) => {
    try {
      setLoading(true);
      setError(null);
      const response = await chatAPI.getChatHistory(page);
      setMessages(page === 1 ? response.data.messages : [...messages, ...response.data.messages]);
      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to fetch chat history');
      console.error('Error fetching chat history:', error);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (message) => {
    try {
      setLoading(true);
      setError(null);
      const response = await chatAPI.sendMessage(message);
      setMessages([
        response.data.aiMessage,
        response.data.userMessage,
        ...messages,
      ]);
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to send message');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (!loading && currentPage < totalPages) {
      fetchChatHistory(currentPage + 1);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        loading,
        error,
        sendMessage,
        loadMore,
        hasMore: currentPage < totalPages,
        refresh: () => fetchChatHistory(1),
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

export default ChatContext; 