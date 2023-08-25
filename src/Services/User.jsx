import axios from "axios";

const api = axios.create({
  baseURL: 'http://5.75.224.135:4000/api/',
  // baseURL: process.env.API_BASE_URL,
});

const signInService = async (email, password) => {
  try {
    const response = await api.post("user/login", {
      email: email,
      password: password,
    });
    console.log(JSON.stringify(response));
    return response;
  } catch (error) {
    return error;
  }
};

const signUpService = async (email, password, username) => {
  try {
    const response = await api.post("user/register", {
      email: email,
      password: password,
      username: username,
    });
    console.log(JSON.stringify(response));
    return response;
  } catch (error) {
    return error;
  }
};

export {
  signInService, 
  signUpService,
};