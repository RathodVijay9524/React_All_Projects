/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

const apiService = {
  fetchAll: async (url: string) => {
    const response = await axios.get(url);
    return response.data;
  },
  add: async (url: string, item: any) => {
    const response = await axios.post(url, item);
    return response.data;
  },
  update: async (url: string, id: number, item: any) => {
    const response = await axios.put(`${url}/${id}`, item);
    return response.data;
  },
  remove: async (url: string, id: number) => {
    await axios.delete(`${url}/${id}`);
    return id;
  }
};

export default apiService;
