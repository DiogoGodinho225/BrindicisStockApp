import axios from 'axios';

export const fetchCategories = async (token) => {
    const response = await axios.get('/api/getCategories', {
        params: { token },
    });

    if (response.data && response.data.categories) {
        return response.data.categories;
    } else {
        return [];
    }
    
};

export const createCategory = async (token, categoryName) => {
    const response = await axios.post('/api/create-category', {
        token: token,
        CategoryName: categoryName,
      });
      console.log(response.data);
    
      return response;
};

export const editCategory = async (token, category) => {
    const response = await axios.put('/api/edit-category', {
      id: category.id,
      CategoryName: category.name,
      status: category.status,
      token,
    });
  
    return response;
  };


