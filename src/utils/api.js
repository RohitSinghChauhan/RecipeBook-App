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
