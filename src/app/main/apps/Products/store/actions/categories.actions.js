import axios from 'axios';
import { serviceApiUrl } from 'app/config';

export const GET_CATEGORIES = '[E-COMMERCE APP] GET CATEGORIES';
export const SET_CATEGORIES_SEARCH_TEXT = '[E-COMMERCE APP] SET CATEGORIES SEARCH TEXT';


export function getCategories(uuid)
{
    const request = axios.get( serviceApiUrl + '/productcategory?uuid=' + uuid);
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



export function setCategoriesSearchText(event)
{
    return {
        type      : SET_CATEGORIES_SEARCH_TEXT,
        searchText: event.target.value
    }
}

