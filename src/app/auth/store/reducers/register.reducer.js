import * as Actions from '../actions';

const initialState = {
    success: false,
    error  : {
        username: null,
        password: null
    },
    user:null
};

const register = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.REGISTER_SUCCESS:
        {
            return {
                ...initialState,
                success: false
            };
        }
        case Actions.REGISTER_ERROR:
        {
            return {
                success: false,
                error  : action.payload
            };
        }
        case Actions.GET_SME_USER:
        {
            return {
                user  : action.payload
            };
        }
        default:
        {
            return state
        }
    }
};

export default register;