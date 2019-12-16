import * as Actions from '../actions';

const initialState = {
    data: null
};

const categoryReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_CATEGORY:
        {
            return {
                ...state,
                data: action.payload
            };
        }
        case Actions.SAVE_CATEGORY:
        {
            return {
                ...state,
                data: action.payload
            };
        }      
        default:
        {
            return state;
        }
    }
};

export default categoryReducer;
