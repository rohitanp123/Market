import axios from 'axios';
//import { showMessage } from "@fuse";
import {showMessage} from 'app/store/actions/fuse';
import { serviceApiUrl } from 'app/config';
export const GET_CATEGORIES = '[E-COMMERCE APP] GET CATEGORIES';
export const SET_CATEGORIES_SEARCH_TEXT = '[E-COMMERCE APP] SET CATEGORIES SEARCH TEXT';


export function getCategories()
{
    const request = axios.get(serviceApiUrl+ '/sme/getallrm');
    return (dispatch) =>
        request.then((response) =>{
            console.log(response);
            dispatch({
                type   : GET_CATEGORIES,
                payload: response.data
            })
        }
        
        );
}

export function changtuseStatus(data){
        const request = axios.post( serviceApiUrl + '/sme/updatestatus', data);
        return (dispatch) => {
            request.then((response) => {
                    dispatch(showMessage({message: 'Status Updated'}));
                    dispatch(getCategories())         
                }
            );
        }
        
    }



export function setCategoriesSearchText(event)
{
    return {
        type      : SET_CATEGORIES_SEARCH_TEXT,
        searchText: event.target.value
    }
}

