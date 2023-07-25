import axios from 'axios';

let baseUrl = "http://localhost:4000";

if (process.env.NODE_ENV === 'production') {
  baseUrl = ""
} 

const instance = axios.create({
  baseURL: baseUrl
});

export default instance ;