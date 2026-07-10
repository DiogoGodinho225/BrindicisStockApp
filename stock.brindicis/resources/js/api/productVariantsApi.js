import axios from 'axios';

export const fetchProductVariants = async (token, productId) => {
    const response = await axios.get('/api/getProductVariants', {
        params: {
            token: token,
            id_product: productId,
    }});

    if(response.data.productVariants){
        return response.data.productVariants;
    }else{
        return [];
    }
}

export const fetchVariants = async (token) => {
    const response = await axios.get('/api/getVariants', {
        params: {
            token: token,
    }});

    if(response.data.variants){
        return response.data.variants;
    }else{
        return [];
    }
}
