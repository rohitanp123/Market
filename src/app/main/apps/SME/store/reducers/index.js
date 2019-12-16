import {combineReducers} from 'redux';
import categories from './categories.reducer';
import category from './category.reducer';


const reducer = combineReducers({
    categories,
    category
});

export default reducer;
