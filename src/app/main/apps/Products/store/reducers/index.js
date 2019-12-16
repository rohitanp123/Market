import {combineReducers} from 'redux';
import products from './products.reducer';
import product from './product.reducer';
import categories from './categories.reducer';
import category from './category.reducer';


const reducer = combineReducers({
    products,
    product,
    categories,
    category
});

export default reducer;
