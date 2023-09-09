import axios from "axios";

const api = axios.create({
  baseURL: 'https://chollitos.net/api/',
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
    console.log(error)
    return error;
  }
};

const signUpService = async (email, password, username, birthday) => {
  try {
    const response = await api.post("user/register", {
      email: email,
      password: password,
      username: username,
      birthday: birthday
    });
    console.log(JSON.stringify(response));
    return response;
  } catch (error) {
    return error;
  }
};

const verifyCode = async (email, code) => {
  try {
    const response = await api.post("user/verify_code", {
      email: email,
      code: code
    });
    console.log(JSON.stringify(response));
    return response;
  } catch (error) {
    return error;
  }
}

const resendCode = async ( email ) => {
  try {
    const response = await api.post("user/resend_code", {
      email: email
    });
    console.log(JSON.stringify(response));
    return response;
  } catch (error) {
    return error;
  }
}

export {
  signInService,
  signUpService,
  verifyCode,
  resendCode
};