import * as Actions from '../actions';

const initialState = {
    data      : [],
    searchText: ''
};

const categoriesReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_CATEGORIES:
        {
            return {
                ...state,
                data: action.payload
            };
        }
        case Actions.SET_CATEGORIES_SEARCH_TEXT:
        {
            return {
                ...state,
                searchText: action.searchText
            };
        }
        default:
        {
            return state;
        }
    }
};

export default categoriesReducer;
