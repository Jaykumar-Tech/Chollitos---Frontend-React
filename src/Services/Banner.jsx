import axios from "axios";

const api = axios.create({
  baseURL: '/api/',
  // baseURL: process.env.API_BASE_URL,
});

const getBannerService = async (id) => {
  try {
    const response = await api.get('banner/load');
    return response?.data?.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

const saveBannerService = async (html) => {
  const auth_token = JSON.parse(localStorage.getItem('authToken'));
  try {
    const response = await api.post('banner/save', {
      html: html
    }, {
      headers: {
        authorization: auth_token.token_type + " " + auth_token.access_token,
      }
    });
    return response
  } catch (error) {
    console.log(error);
    return error;
  }
}

export {
  getBannerService,
  saveBannerService
}