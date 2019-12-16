import axios from 'axios';
import {FuseUtils} from '@fuse';
import {showMessage} from 'app/store/actions/fuse';
import { serviceApiUrl } from 'app/config';

export const GET_CATEGORY = '[E-COMMERCE APP] GET CATEGORY';
export const SAVE_CATEGORY = '[E-COMMERCE APP] SAVE CATEGORY';


export function getCategory(params)
{
    const { categoryId } = params;
   const request = axios.get(serviceApiUrl + '/productcategory/' + categoryId);
    return (dispatch) =>
        request.then((response) => {
            //console.log(response);
            dispatch({
                type   : GET_CATEGORY,
                payload: response.data
            })
        }
           
        );
}



export function saveCategory(data,uuid)
{
  
    data.createdBy = uuid;

    const request = axios.post( serviceApiUrl + '/productcategory/create', data);
 
    return (dispatch) =>
        request.then((response) => {
//console.log("response---",response);
                dispatch(showMessage({message: 'Category Saved'}));

                return dispatch({
                    type   : SAVE_CATEGORY,
                    payload: response.data
                })
            }
        );
}

export function saveEditCategory(data,uuid)
{
    
    if( typeof(data.createdBy) === undefined)
    data.createdBy = uuid;
    const request = axios.put( serviceApiUrl + '/productcategory/' + data.id, data);

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
