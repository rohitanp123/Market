import axios from 'axios';
import {showMessage} from 'app/store/actions/fuse';
import { serviceApiUrl } from 'app/config';
export const GET_ORDER = '[E-COMMERCE APP] GET ORDER';
export const SAVE_ORDER = '[E-COMMERCE APP] SAVE ORDER';
export const DELETE_ORDER = '[E-COMMERCE APP] DELETE ORDER';

export function getOrder(params, uuid)
{
    console.log(params);
    const request = axios.get(serviceApiUrl + '/enquiry/' + params.orderId);

    return (dispatch) =>
        request.then((response) => {
            console.log(response.data);
            // if(response.data && response.data.length){
            // const SellerProducts = response.data[0].products.filter( product => {
            //     return product.createdBy === uuid
            // })

            // const EnqDetail = { ...response.data[0], products:SellerProducts }

            // }

            dispatch({
                type   : GET_ORDER,
                payload: response.data && response.data.length? response.data[0]:[]
            })
        }
    );
        
           
}

export function addComment(comment, enqId, uuid){
    console.log(comment,enqId,uuid);
   return (dispatch) => {
    //dispatch(showMessage({message: 'Enquiry Saved'}));
    const request = axios.post(serviceApiUrl + '/enquiry/replychat',{ id:enqId, reply: { chatText:comment, userId:uuid, chatDate:''}});    
        request.then((response) => {
                dispatch(showMessage({message: 'Comment Added'}));
                dispatch((getOrder({  orderId:enqId } )));                
            }
        );
   }

}

export function saveOrder(data)
{
    const request = axios.post( serviceApiUrl + '/api/e-commerce-app/order/save', data);

    return (dispatch) =>
        request.then((response) => {

                dispatch(showMessage({message: 'Enquiry Saved'}));

                return dispatch({
                    type   : SAVE_ORDER,
                    payload: response.data
                })
            }
        );
}
