import axios from "axios";

export const fetchFamilies = async (token) => {
    const response = await axios.get('/api/getFamilies',
        {params: {token}}
    );

    if (response.data.families){
        return response.data.families;
    }else{
        return [];
    }
};