import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/auth';

export const requestOTP = async (email) => {
    return await axios.post(`${API_BASE_URL}/password/forgot`, { email });
};

export const verifyOTP = async (email, otp) => {
    return await axios.post(`${API_BASE_URL}/password/verify-otp`, { email, otp });
};

export const resetPassword = async (email, oldPassword, newPassword) => {
    return await axios.post(`${API_BASE_URL}/password/reset`, { email, oldPassword, newPassword });
};
