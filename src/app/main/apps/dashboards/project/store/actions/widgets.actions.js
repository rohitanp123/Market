import axios from 'axios';
import { serviceApiUrl } from 'app/config';

export const GET_WIDGETS = '[PROJECT DASHBOARD APP] GET WIDGETS';

export function getWidgets()
{
    const request = axios.get( serviceApiUrl + '/api/project-dashboard-app/widgets');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_WIDGETS,
                payload: response.data
            })
        );
}
