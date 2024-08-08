import axios from "axios";

export const baseURL = "http://localhost:4000";

const fetchData = async (endpoint, method = 'GET', data = {}, headers = {}) => {
    const config = {
        url: baseURL + endpoint,
        method: method.toUpperCase(),
        headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('auth_token') ? `Bearer ${localStorage.getItem('auth_token')}` : null,
            ...headers,
        },
        data,
    };
    // console.log("config:", config);

    try {
        const response = await axios(config);
        return response.data;
    } catch (error) {
        if (error?.response) {
            throw new Error(error?.response?.data?.message || 'An error occurred');
        } else if (error.request) {
            throw new Error('No response received from server');
        }
        else {
            throw new Error(error.message);
        }
    }
};

export default fetchData;