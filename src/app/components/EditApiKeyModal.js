"use client";

import { useState, useEffect } from 'react';

export const EditApiKeyModal = ({ apiKey, isOpen, onClose, onSubmit }) => {
  const [keyName, setKeyName] = useState('');

  useEffect(() => {
    if (apiKey) {
      setKeyName(apiKey.name);
    }
  }, [apiKey]);

  if (!isOpen || !apiKey) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit({ ...apiKey, name: keyName });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Edit API Key</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={keyName}
            onChange={(e) => setKeyName(e.target.value)}
            className="w-full p-2 border rounded mb-4"
            placeholder="API Key Name"
            required
          />
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}; 