import * as Actions from '../actions';

const initialState = {
    data: null,
    wid1: null,
    wid2: null,
    wid3: null,
    wid4: null
    
};

const widgetsReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_WIDGETS:
            return {
                ...state,
                data: {...action.payload}
            };
        case Actions.GET_WIDGET1:
            return {
                ...state,
                wid1: {...action.payload}
            };
        case Actions.GET_WIDGET2:
            return {
                ...state,
                wid2: {...action.payload}
            };
        case Actions.GET_WIDGET3:
            return {
                ...state,
                wid3: {...action.payload}
            };
        case Actions.GET_WIDGET4:
            return {
                ...state,
                wid4: {...action.payload}
            };                    
        default:
            return state;
    }
};

export default widgetsReducer;