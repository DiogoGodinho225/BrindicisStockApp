import axios from "axios";

export const loginBackOffice = async (username, password) => {
    const response = await axios.post('/login-backOffice', {
        username,
        password,
    });
    return response;
}

export const loginFrontOffice = async (username, password) => {
    const response = await axios.post('/login-frontOffice', {
        username,
        password,
    });
    return response;
}