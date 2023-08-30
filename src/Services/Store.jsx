import axios from "axios";

const api = axios.create({
  baseURL: '/api/',
  // baseURL: process.env.API_BASE_URL,
});

const getStoresService = async () => {
  try {
    const response = await api.get('store/getall');
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getStoreByIdService = async (id) => {
  try {
    const response = await api.get('store/get/' + id);
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getStoreByNameService = async (name) => {
  try {
    const response = await api.get('store/getbyname/' + name);
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export {
  getStoresService,
  getStoreByIdService,
  getStoreByNameService
};