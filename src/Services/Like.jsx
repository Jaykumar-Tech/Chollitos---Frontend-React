import axios from "axios";

const api = axios.create({
    baseURL: 'http://5.75.224.135:4000/api/',
    // baseURL: process.env.API_BASE_URL,
});

const addLikeDeal = async (data) => {
    console.log(data)
    try {
        const auth_token = JSON.parse(localStorage.getItem('authToken'));
        const response = await api.post('like/add', data, {
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

const isLikedDeal = async (data) => {
    try {
        const auth_token = JSON.parse(localStorage.getItem('authToken'));
        const response = await api.post('like/find', data, {
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
    addLikeDeal,
    isLikedDeal
};