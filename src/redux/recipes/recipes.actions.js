import axios from 'axios';
import { SUCCESS_RECIPES, REQUEST_RECIPES, ERROR_RECIPES } from './recipes.types';

export const getRecipes = (query = '') => async (dispatch) => {
    dispatch({ type: REQUEST_RECIPES });
    try {
        const res = await axios.get(`https://recipe-api-6uib.onrender.com/recipes?q=${query}`);
        dispatch({ type: SUCCESS_RECIPES, payload: res.data });
        return res.data;
    }
    catch (err) {
        dispatch({ type: ERROR_RECIPES });
    }
} 