import jwtService from 'app/services/jwtService';
import {showMessage} from 'app/store/actions/fuse';
import axios from 'axios';
import { serviceApiUrl } from 'app/config';

export const REGISTER_ERROR = 'REGISTER_ERROR';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const GET_SME_USER = 'GET_SME_USER';

export function submitRegister(model)
{
    console.log("test---",model );
    return (dispatch) =>
        jwtService.createUser(model)
            .then((user) => {
                    dispatch(showMessage({
                        message:'Thank you for registering in Market Connect platform. Will contact you in 48 hours.',
                        variant:'info',
                        autoHideDuration:8000
                    }));
                    return dispatch({
                        type: REGISTER_SUCCESS
                    });
                }
            )
            .catch(error => {
                dispatch(showMessage({message:error}))
                return dispatch({
                    type   : REGISTER_ERROR,
                    payload: error
                });
            });
}

export function getSmeUser(params){
    const { smecatId } = params;

    return (dispatch)=> {
        axios.get( serviceApiUrl + '/sme/'+smecatId).then((response) =>{

            return dispatch({
                type   : GET_SME_USER,
                payload: response.data
            });

        })
    }
   
}

export function updateSmeUser(data){
    return (dispatch)=> {
        axios.put( serviceApiUrl + '/sme/'+ data._id, data).then( response => {
        dispatch(showMessage({message:'User updated'}));
    } )
    }
}

export function submitRegisterSme(model)
{
    return (dispatch) =>
        jwtService.createUserSme(model)
            .then((user) => {
                    dispatch(showMessage({message:'User added'}));
               }
            )
            .catch(error => {
                dispatch(showMessage({message:error}))
            })
}


