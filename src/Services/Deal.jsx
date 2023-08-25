import axios from "axios";

const api = axios.create({
  baseURL: 'http://5.75.224.135:4000/api/',
  // baseURL: process.env.API_BASE_URL,
});

const getDealsService = async () => {
  try {
    const data = { start_at: 0, length: 10 };
    const response = await api.post('deal/find', data);
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

const createDeal = async (data) => {
  try {
    const auth_token = JSON.parse(localStorage.getItem('authToken'));
    const response = await api.post('deal/add', data, {
      headers: {
        authorization: auth_token.token_type + " " + auth_token.access_token,
      }
    });
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export {
  getDealsService,
  createDeal
};