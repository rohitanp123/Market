import axios from 'axios';
import {showMessage} from 'app/store/actions/fuse';
import { serviceApiUrl } from 'app/config';

export const GET_PRODUCTS = '[E-COMMERCE APP] GET PRODUCTS';
export const SET_PRODUCTS_SEARCH_TEXT = '[E-COMMERCE APP] SET PRODUCTS SEARCH TEXT';
export const DELETE_PRODUCTS = '[E-COMMERCE APP] SET PRODUCTS SEARCH TEXT';

export function getProducts(uuid)
{
    let request
    request = axios.get(serviceApiUrl + '/product?createdBy=' + uuid);
    return (dispatch) =>
        request.then((response) =>{
            console.log(response);
            dispatch({
                type   : GET_PRODUCTS,
                payload: response.data
            })
        }
        
        );
}


export function getProductPending(uuid)
{
    let request

    request = axios.get( serviceApiUrl + '/product?createdBy=' + uuid);
    return (dispatch) =>
        request.then((response) =>{
            console.log(response);
            dispatch({
                type   : GET_PRODUCTS,
                payload: response.data
            })
        }
        
        );
}

export function changeStatus(data,uuid){
    const request = axios.post(serviceApiUrl + '/product/updatestatus', data);
    return (dispatch) => {
        request.then((response) => {
                dispatch(showMessage({message: 'Status Updated'}));
                dispatch(getProducts(uuid))         
            }
        );
    }
    
}

export function changeStatusAdmin(data,uuid){
        const request = axios.post( serviceApiUrl + '/product/updateapprove', data);
        return (dispatch) => {
            request.then((response) => {
                    dispatch(showMessage({message: 'Status Updated'}));
                    dispatch(getProducts(uuid))         
                }
            );
        }
        
    }

export function setProductsSearchText(event)
{
    return {
        type      : SET_PRODUCTS_SEARCH_TEXT,
        searchText: event.target.value
    }
}

