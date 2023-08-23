import axios from "axios";

const api = axios.create({
  baseURL: 'http://172.20.103.9:4000/api/',
  // baseURL: process.env.API_BASE_URL,
});

const getCategoriesService = async () => {
  try {
    const response = await api.get('category/getall');
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export {
  getCategoriesService,
};