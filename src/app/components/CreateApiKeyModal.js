import { useState } from 'react';

export const CreateApiKeyModal = ({ isOpen, onClose, onSubmit }) => {
  const [newKeyName, setNewKeyName] = useState("");
  const [newKeyLimit, setNewKeyLimit] = useState(1000);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(newKeyName, newKeyLimit);
    setNewKeyName("");
    setNewKeyLimit(1000);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h3 className="text-lg font-semibold mb-4">Create a new API key</h3>
        <p className="text-sm text-gray-600 mb-4">Enter a name and limit for the new API key.</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="keyName" className="block text-sm font-medium text-gray-700 mb-1">
              Key Name — A unique name to identify this key
            </label>
            <input
              type="text"
              id="keyName"
              value={newKeyName}
              onChange={(e) => setNewKeyName(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Key Name"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="keyLimit" className="block text-sm font-medium text-gray-700 mb-1">
              Limit monthly usage*
            </label>
            <input
              type="number"
              id="keyLimit"
              value={newKeyLimit}
              onChange={(e) => setNewKeyLimit(parseInt(e.target.value))}
              className="w-full p-2 border rounded"
              min="1"
              required
            />
          </div>
          <p className="text-xs text-gray-500 mb-4">
            * If the combined usage of all your keys exceeds your plan&apos;s limit, all requests will be rejected.
          </p>
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
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}; 