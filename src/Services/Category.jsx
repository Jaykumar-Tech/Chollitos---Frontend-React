import axios from "axios";

const api = axios.create({
  baseURL: 'http://5.75.224.135:4000/api/',
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

const getCategoryBySlugService = async (slug) => {
  try {
    const response = await api.get('category/getbyslug/' + slug);
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getCategoryByIdService = async (id) => {
  try {
    const response = await api.get('category/getbyid/' + id);
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export {
  getCategoriesService,
  getCategoryBySlugService,
  getCategoryByIdService,
};