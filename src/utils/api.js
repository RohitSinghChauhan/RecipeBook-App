import axios from "axios";

export const saveRecipeAPI = async (payload = '') => {
    axios.post(`${process.env.REACT_APP_DB_URL}/recipe/create`, payload, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
        .then(res => console.log(res))
        .catch(err => console.log(err));
};

export const getRecipesAPI = async () => {
    const res = await axios(`${process.env.REACT_APP_DB_URL}/recipe`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
    const data = await res.data;
    return data;
};