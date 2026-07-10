import axios from "axios";

export const fetchStock = async (token) => {
    return await axios.get('/api/getStock', {
        params: { token: token },
    });
};

export const createProduct = async (formData) => {

    const response = await axios.post('/api/create-product', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.status;
};

export const fetchProducts = async (token) => {
    const response = await axios.get('/api/getProducts', {
        params: { token: token },
    });

    if(response.data && response.data.products) {
        return response.data.products;
    }else{
        return [];
    }
};

export const deleteProduct = async (token, productId) => {
    const response = await axios.delete('/api/delete-product', {
        data: {
            token: token,
            id: productId
        }
    });

    return response;
};

export const fetchProduct = async (token, productId) => {
    const response = await axios.get('/api/getProduct', {
        params: { token: token, id: productId },

    });

    if(response.data && response.data.product) {
        return response.data.product;
    }else{
        return null;
    }
};

export const editProduct = async (formData) => {
    const response = await axios.post('/api/edit-product', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.status;
};


