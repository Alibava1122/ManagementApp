import React, { createContext, useState, useEffect, useContext } from 'react';
import { chatAPI } from '../utils/api';
import { useAuth } from './AuthContext';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [conversations, setConversations] = useState({});
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated && !currentSessionId) {
      startNewSession();
    }
  }, [isAuthenticated]);

  const startNewSession = () => {
    const newSessionId = Date.now().toString();
    setCurrentSessionId(newSessionId);
    setConversations(prev => ({
      ...prev,
      [newSessionId]: []
    }));
  };

  const sendMessage = async (message) => {
    if (!currentSessionId) return;

    try {
      setLoading(true);
      setError(null);
      const response = await chatAPI.sendMessage(message);
      const userMessage = response.data.userMessage;
      const aiMessage = response.data.aiMessage;

      setConversations(prev => ({
        ...prev,
        [currentSessionId]: [
          ...(prev[currentSessionId] || []),
          userMessage,
          aiMessage
        ]
      }));

      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to send message');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const messages = conversations[currentSessionId] || [];

  return (
    <ChatContext.Provider
      value={{
        messages,
        conversations,
        currentSessionId,
        loading,
        error,
        sendMessage,
        startNewSession,
        setCurrentSessionId
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
