import { supabase } from '../lib/supabaseClient';

export const apiKeyService = {
  fetchApiKeys: async () => {
    const { data, error } = await supabase
      .from('api_keys')
      .select('*');
    
    if (error) throw error;
    return data;
  },

  createApiKey: async (name, limit) => {
    const newKeyValue = `dandi-${Date.now()}${Math.random().toString(36).substring(2, 15)}`;
    const { data, error } = await supabase
      .from('api_keys')
      .insert([
        { name, value: newKeyValue, usage: 0 }
      ])
      .select();

    if (error) throw error;
    return data[0];
  },

  updateApiKey: async (id, name) => {
    const { data, error } = await supabase
      .from('api_keys')
      .update({ name })
      .eq('id', id)
      .select();

    if (error) throw error;
    return data[0];
  },

  deleteApiKey: async (id) => {
    const { error } = await supabase
      .from('api_keys')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  }
}; 