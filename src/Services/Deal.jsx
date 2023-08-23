import axios from "axios";

const api = axios.create({
  baseURL: 'http://172.20.103.9:4000/api/',
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

export {
  getDealsService,
};