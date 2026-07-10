import axios from "axios";

export const fetchProductLogs = async (productId, token) => {
    const response = await axios.get('/api/getLogs', {
        params: { token: token, id: productId },
    });

    return response;
}; 