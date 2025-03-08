import { useState, useCallback } from 'react';
import { apiKeyService } from '../services/apiKeyService';

export const useApiKeys = () => {
  const [apiKeys, setApiKeys] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingKey, setEditingKey] = useState(null);
  const [visibleKeys, setVisibleKeys] = useState({});

  const fetchApiKeys = useCallback(async () => {
    try {
      const data = await apiKeyService.fetchApiKeys();
      setApiKeys(data);
    } catch (error) {
      throw new Error('Failed to fetch API keys');
    }
  }, []);

  const createApiKey = useCallback(async (name, limit) => {
    try {
      const newKey = await apiKeyService.createApiKey(name, limit);
      setApiKeys(prev => [...prev, newKey]);
      return newKey;
    } catch (error) {
      throw new Error('Failed to create API key');
    }
  }, []);

  const updateApiKey = useCallback(async (id, name) => {
    try {
      const updatedKey = await apiKeyService.updateApiKey(id, name);
      setApiKeys(prev => prev.map(key => key.id === id ? updatedKey : key));
      return updatedKey;
    } catch (error) {
      throw new Error('Failed to update API key');
    }
  }, []);

  const deleteApiKey = useCallback(async (id) => {
    try {
      await apiKeyService.deleteApiKey(id);
      setApiKeys(prev => prev.filter(key => key.id !== id));
    } catch (error) {
      throw new Error('Failed to delete API key');
    }
  }, []);

  const toggleKeyVisibility = useCallback((id) => {
    setVisibleKeys(prev => ({ ...prev, [id]: !prev[id] }));
  }, []);

  return {
    apiKeys,
    isCreateModalOpen,
    setIsCreateModalOpen,
    editingKey,
    setEditingKey,
    visibleKeys,
    fetchApiKeys,
    createApiKey,
    updateApiKey,
    deleteApiKey,
    toggleKeyVisibility
  };
}; 