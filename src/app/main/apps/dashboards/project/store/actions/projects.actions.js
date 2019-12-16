import axios from 'axios';
import { serviceApiUrl } from 'app/config';

export const GET_PROJECTS = '[PROJECT DASHBOARD APP] GET PROJECTS';

export function getProjects()
{
    const request = axios.get( serviceApiUrl + '/api/project-dashboard-app/projects');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_PROJECTS,
                payload: response.data
            })
        );
}
