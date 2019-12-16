import jwtService from 'app/services/jwtService';
import {setUserData} from './user.actions';
import * as Actions from 'app/store/actions';
import history from '../../../../history';
import Cookies from 'js-cookie';
import { buyersiteurl } from '../../../main/apps/config';

export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export  function loginSuccess(){
    return ({
        type: LOGIN_SUCCESS
    });
}

export function submitLogin(data)
{
    return (dispatch) =>
        jwtService.signInWithEmailAndPassword(data)
            .then((user) => {
                    dispatch(setUserData(user));
                    dispatch(loginSuccess());      
                    console.log(Cookies.get('jwt_token'));
                    console.log("user-data",user);
                    if(user.role === 'sme')
                    { 
                    history.push('/apps/productTerms')
                     window.location.href = buyersiteurl;
                    }
                     if(user.role === 'rm')
                        history.push('/apps/productRm')
                     if(user.role === 'admin')
                        history.push('/apps/productAdmin')
                }
            )
            .catch(error => {
                dispatch(Actions.showMessage({message: error.message}));
                return dispatch({
                    type   : LOGIN_ERROR,
                    payload: error
                });
            });
}