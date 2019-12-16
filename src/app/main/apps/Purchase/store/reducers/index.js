import {combineReducers} from 'redux';
import purchases from './purchases.reducer';
import purchase from './purchase.reducer';

const reducer = combineReducers({
    purchases,
    purchase
});

export default reducer;
