"use client";

import { useEffect } from "react";
import { useApiKeys } from '../hooks/useApiKeys';
import { useNotification } from '../components/NotificationProvider';
import Sidebar from '../components/Sidebar';
import { Overview } from '../components/Overview';
import { ApiKeysList } from '../components/ApiKeysList';
import { CreateApiKeyModal } from '../components/CreateApiKeyModal';
import { EditApiKeyModal } from '../components/EditApiKeyModal';

export default function Dashboard() {
  const {
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
  } = useApiKeys();

  const { showNotification } = useNotification();

  useEffect(() => {
    fetchApiKeys().catch(error => {
      showNotification('Failed to fetch API keys', 'error');
    });
  }, [fetchApiKeys, showNotification]);

  const handleCreateKey = async (name, limit) => {
    try {
      await createApiKey(name, limit);
      showNotification('API key created successfully');
    } catch (error) {
      showNotification('Failed to create API key', 'error');
    }
  };

  const handleUpdateKey = async (updatedKey) => {
    try {
      await updateApiKey(updatedKey.id, updatedKey.name);
      setEditingKey(null);
      showNotification('API key updated successfully');
    } catch (error) {
      showNotification('Failed to update API key', 'error');
    }
  };

  const handleDeleteKey = async (id) => {
    try {
      await deleteApiKey(id);
      showNotification('API key deleted successfully');
    } catch (error) {
      showNotification('Failed to delete API key', 'error');
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      showNotification('Copied API Key to clipboard');
    } catch (err) {
      showNotification('Failed to copy API key. Please try again.', 'error');
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <div className="p-8 max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Overview</h1>
          
          <Overview usage={24} limit={1000} />

          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">API Keys</h2>
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                + Create New Key
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              The key is used to authenticate your requests to the Research API. To learn more, see the documentation page.
            </p>

            <ApiKeysList
              apiKeys={apiKeys}
              visibleKeys={visibleKeys}
              onToggleVisibility={toggleKeyVisibility}
              onCopy={copyToClipboard}
              onEdit={setEditingKey}
              onDelete={handleDeleteKey}
            />
          </div>

          <CreateApiKeyModal
            isOpen={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
            onSubmit={handleCreateKey}
          />

          <EditApiKeyModal
            apiKey={editingKey}
            isOpen={!!editingKey}
            onClose={() => setEditingKey(null)}
            onSubmit={handleUpdateKey}
          />
        </div>
      </div>
    </div>
  );
}