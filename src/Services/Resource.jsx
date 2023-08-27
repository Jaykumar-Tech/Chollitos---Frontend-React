import axios from "axios";

const api = axios.create({
  baseURL: 'http://5.75.224.135:4000/api/',
  // baseURL: process.env.API_BASE_URL,
});


const getUrlUploadedService = async (formData) => {
  try {
    const auth_token = JSON.parse(localStorage.getItem('authToken'));
    const response = await api.post('resource/upload',
      formData, {
      headers: {
        authorization: auth_token.token_type + " " + auth_token.access_token,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  } catch (error) {
    return error;
  }
}

export {
  getUrlUploadedService,
};