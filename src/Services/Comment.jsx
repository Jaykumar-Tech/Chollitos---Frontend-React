import axios from "axios";

const api = axios.create({
  baseURL: 'http://5.75.224.135:4000/api/',
  // baseURL: process.env.API_BASE_URL,
});

const getCommentsByDealIdService = async (dealId) => {
  try {
    const response = await api.post('comment/find', {
      "type": "deal",
      "dest_id": dealId
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export {
  getCommentsByDealIdService,
};