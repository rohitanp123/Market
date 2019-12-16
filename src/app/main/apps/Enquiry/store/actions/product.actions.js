import axios from 'axios';
import {FuseUtils} from '@fuse';
import {showMessage} from 'app/store/actions/fuse';
import { serviceApiUrl } from 'app/config';

export const GET_PRODUCT = '[E-COMMERCE APP] GET PRODUCT';
export const SAVE_PRODUCT = '[E-COMMERCE APP] SAVE PRODUCT';


export function getProduct(params)
{
    console.log(params);
    const { productId } = params;
   const request = axios.get(serviceApiUrl + '/api/e-commerce-app/product', {params});
   //const request = axios.get('/enq/'+ productId);
    
    console.log(productId);
  
  /* const request = axios.get(`https://localhost:44342/api/Products/${productId}`,{
        headers:{
        'Accept':'application/json'
        }
    });*/

    return (dispatch) =>
        request.then((response) => {
            console.log(response);
            dispatch({
                type   : GET_PRODUCT,
                payload: response.data
            })
        }
           
        );
}



export function saveProduct(data)
{
    /*const { id } = data;
    const { NewForm } = data;*/
    const request = axios.post( serviceApiUrl + '/api/e-commerce-app/product/save', data);
   /* var request;
    if(NewForm)
    request = axios.post(`https://localhost:44342/api/Products/`,data);    
    else request = axios.put(`https://localhost:44342/api/Products/${id}`,data);
    console.log(data);
*/
    

    return (dispatch) =>
        request.then((response) => {

                dispatch(showMessage({message: 'Product Saved'}));

                return dispatch({
                    type   : SAVE_PRODUCT,
                    payload: response.data
                })
            }
        );
}

export function newProduct()
{
    const data = {
        id              : FuseUtils.generateGUID(),
        name            : '',
        handle          : '',
        description     : '',
        categories      : [],
        tags            : [],
        images          : [],
        priceTaxExcl    : 0,
        priceTaxIncl    : 0,
        taxRate         : 0,
        comparedPrice   : 0,
        quantity        : 0,
        sku             : '',
        width           : '',
        height          : '',
        depth           : '',
        weight          : '',
        extraShippingFee: 0,
        active          : true,
        NewForm         : true
    };

    return {
        type   : GET_PRODUCT,
        payload: data
    }
}
