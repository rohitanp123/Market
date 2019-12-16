import axios from 'axios';
import { showMessage } from 'app/store/actions';
import { serviceApiUrl } from 'app/config';
export const GET_ORDERS = '[E-COMMERCE APP] GET ORDERS';
export const SET_ORDERS_SEARCH_TEXT = '[E-COMMERCE APP] SET ORDERS SEARCH TEXT';

export function getOrders(uuid)
{
    //const request = axios.get('/api/e-commerce-app/orders');
    const request = axios.get(serviceApiUrl + '/enquiry/getinbox?uuid='+uuid);

    return (dispatch) =>
        request.then( response =>{
        console.log(response.data);
           dispatch({
                type   : GET_ORDERS,
                payload: response.data
            })
            
        })
        
           
}



export function getOrdersOutbox(uuid)
{
    //const request = axios.get('/api/e-commerce-app/orders');
    const request = axios.get( serviceApiUrl + '/enquiry/getoutbox?uuid='+uuid);

    return (dispatch) =>
        request.then( response =>{
        console.log(response.data);
           dispatch({
                type   : GET_ORDERS,
                payload: response.data
            })
            
        })
        
           
}

export function changeStatus(data,uuid){
    console.log(data);
    return (dispatch) => {
        axios.put( serviceApiUrl + '/enquiry/updatestatus',data).then( response => {
            if(response.data){
                dispatch(getOrders(uuid))
                dispatch(showMessage({message:'Status Updated!'}))
            }

        });
    }
}

export function setOrdersSearchText(event)
{
    return {
        type      : SET_ORDERS_SEARCH_TEXT,
        searchText: event.target.value
    }
}

