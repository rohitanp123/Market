import axios from 'axios';
import {FuseUtils} from '@fuse';
import {showMessage} from 'app/store/actions/fuse';
import { serviceApiUrl } from 'app/config';
export const GET_CATEGORY = '[E-COMMERCE APP] GET CATEGORY';
export const SAVE_CATEGORY = '[E-COMMERCE APP] SAVE CATEGORY';


export function getCategory(params)
{
   const request = axios.get( serviceApiUrl + '/api/e-commerce-app/category', {params});
    return (dispatch) =>
        request.then((response) => {
            console.log(response);
            dispatch({
                type   : GET_CATEGORY,
                payload: response.data
            })
        }
           
        );
}



export function saveCategory(data)
{
    const request = axios.post( serviceApiUrl + '/api/e-commerce-app/category/save', data);
    return (dispatch) =>
        request.then((response) => {

                dispatch(showMessage({message: 'Category Saved'}));

                return dispatch({
                    type   : SAVE_CATEGORY,
                    payload: response.data
                })
            }
        );
}

export function newCategory()
{
    const data = {
        id              : FuseUtils.generateGUID(),
        name            : '',       
        description     : '',
        status          : true,        
        active          : true,
        NewForm         : true
    };

    return {
        type   : GET_CATEGORY,
        payload: data
    }
}
