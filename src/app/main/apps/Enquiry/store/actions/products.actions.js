import axios from 'axios';
import { serviceApiUrl } from 'app/config';

export const GET_PRODUCTS = '[E-COMMERCE APP] GET PRODUCTS';
export const SET_PRODUCTS_SEARCH_TEXT = '[E-COMMERCE APP] SET PRODUCTS SEARCH TEXT';
export const DELETE_PRODUCTS = '[E-COMMERCE APP] SET PRODUCTS SEARCH TEXT';

export function getProducts()
{
    //const request = axios.get('/api/e-commerce-app/products');
    const request = axios.get(serviceApiUrl + '/enq?uuid=5da68b74c8b1da6c3ae0df77');

   

   /* const request = axios.get('https://localhost:44342/api/Products',{
        headers:{
            'Accept':'application/json'
        }
    });/*/

    return (dispatch) =>
        request.then((response) =>{
            console.log("enqui",response);
            dispatch({
                type   : GET_PRODUCTS,
                payload: response.data
            })
        }
        
        );
}

export function deleteProducts(data){
    
}

export function setProductsSearchText(event)
{
    return {
        type      : SET_PRODUCTS_SEARCH_TEXT,
        searchText: event.target.value
    }
}

