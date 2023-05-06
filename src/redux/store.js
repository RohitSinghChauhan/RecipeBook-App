import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { authReducer } from './auth/auth.reducer';
import { recipesReducer } from './recipes/recipes.reducer';

const rootReducer = combineReducers({
    recipe: recipesReducer,
    auth: authReducer
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));