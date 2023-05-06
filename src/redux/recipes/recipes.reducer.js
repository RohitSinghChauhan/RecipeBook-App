import { REQUEST_RECIPES, SUCCESS_RECIPES, ERROR_RECIPES } from '../recipes/recipes.types';

const initState = {
    recipes: [],
    loading: false,
    error: false
};

export const recipesReducer = (state = initState, { type, payload }) => {
    switch (type) {
        case SUCCESS_RECIPES: {
            return {
                ...state,
                recipes: payload,
                loading: false,
                error: false
            }
        }
        case REQUEST_RECIPES: {
            return {
                ...state,
                loading: true,
                error: false
            }
        }
        case ERROR_RECIPES: {
            return {
                ...state,
                loading: false,
                error: true
            }
        }
        default: return state;
    }
}; 