import axios from 'axios';
import {FuseUtils} from '@fuse';
import {showMessage} from 'app/store/actions/fuse';
import { serviceApiUrl } from 'app/config';
export const GET_PRODUCT = '[E-COMMERCE APP] GET PRODUCT';
export const SAVE_PRODUCT = '[E-COMMERCE APP] SAVE PRODUCT';
export const GET_CATS = '[E-COMMERCE APP] GET CATS'


export function getProduct(params)
{
    const { productId } = params;
   const request = axios.get(serviceApiUrl +  '/product/' + productId);

    return (dispatch) =>
        request.then((response) => {
            console.log(response);
            dispatch({
                type   : GET_PRODUCT,
                payload: response.data[0]
            })
        }
           
        );
}

export function getCats(listingType)
{
 const request = axios.get( serviceApiUrl + '/productcategory?listingType='+ listingType);
 return (dispatch) =>
        request.then((response) =>{
            console.log("cats", response);
         //const suggestions = cats(response.data);

                const suggestions = response.data.map(item => ({
                    value: item.name,
                    label: item.name
                }));
            dispatch({
                type   : GET_CATS,
                payload: suggestions
            })
        }
        
        );
   
}       

export function createAnalystics(data){

    const request = axios.post( serviceApiUrl + '/dashboard/create', {
        productId:data._id,
        productOwnerId:data.createdBy,
        analytic:'PRODUCT_ADDED'
    });

    return (dispatch) =>
        request.then((response) => {
                console.log("dashboard-analytics-response", response);
                return dispatch({
                    type   : 'TES-TST',
                    payload: response.data
                })
            }
        );

}


export function saveProduct(data)
{
    const request = axios.post( serviceApiUrl + '/product/create', data);
    return (dispatch) =>
        request.then((response) => {
                console.log("product-response", response);
                dispatch(showMessage({message: 'Product Saved'}));
                dispatch(createAnalystics(response.data))

                return dispatch({
                    type   : SAVE_PRODUCT,
                    payload: response.data
                })
            }
        );
}


export function saveEditProduct(data)
{
    const request = axios.put( serviceApiUrl + '/product/' + data._id, data);
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

export function newProduct(uuid)
{
    const data = {
        id              : FuseUtils.generateGUID(),
        uuid            :uuid,
        name            : '',
        handle          : '',
        description     : '',
        categories      : [],
        tags            : [],
        images          : [],
        price           :'',
        listingType     :'service',
        starRating      :0,
        discount        :5,
        //priceTaxExcl    : 0,
        //priceTaxIncl    : 0,
        //taxRate         : 0,
        //comparedPrice   : 0,
        quantity        : 0,
        sku             : '',
        width           : '',
        height          : '',
        depth           : '',
        weight          : '',
       // extraShippingFee: 0,
        status          : 1,
       
    };

    return {
        type   : GET_PRODUCT,
        payload: data
    }
}
