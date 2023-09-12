import axios from "axios";

const api = axios.create({
  baseURL: 'https://chollitos.net/api/',
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
    return response.data.data[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getCategoryByIdService = async (id) => {
  try {
    const response = await api.get('category/getbyid/' + id);
    return response.data.data[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const activateCategoryService = async (id) => {
  try {
    const response = await api.get('category/activate/' + id);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

const deactivateCategoryService = async (id) => {
  try {
    const response = await api.get('category/deactivate/' + id);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

const createCategoryService = async (data) => {
  try {
    const response = await api.post('category/add', data);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

const editCategoryService = async (data) => {
  try {
    const response = await api.post('category/edit', data);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export {
  getCategoriesService,
  getCategoryBySlugService,
  getCategoryByIdService,
  activateCategoryService,
  deactivateCategoryService,
  createCategoryService,
  editCategoryService,
};