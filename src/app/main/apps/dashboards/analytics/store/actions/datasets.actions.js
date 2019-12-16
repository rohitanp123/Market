import axios from 'axios';
import { serviceApiUrl } from 'app/config';

export const GET_WID1 = '[ANALYTICS DASHBOARD APP] GET WID1';

export function getWid1(uuid)
{
    console.log('uuid....', uuid)
    const request = axios.get(serviceApiUrl + '/enquiry?uuid=5da68b74c8b1da6c3ae0df77');


//    const  datasets = {
//         '2017': [
//             {
//                 label: 'Sales',
//                 data : [1.9, 3, 3.4, 2.2, 2.9, 3.9, 2.5, 3.8, 4.1, 3.8, 3.2, 2.9],
//                 fill : 'start'
//             }
//         ],
//         '2018': [
//             {
//                 label: 'Sales',
//                 data : [2.2, 2.9, 3.9, 2.5, 3.8, 3.2, 2.9, 1.9, 3, 3.4, 4.1, 3.8],
//                 fill : 'start'
//             }
//         ],
//         '2019': [
//             {
//                 label: 'Sales',
//                 data : [2.9, 2.5, 3.8, 4.1, 1.9, 3, 3.8, 3.2, 2.9, 3.4, 2.2, 2.9],
//                 fill : 'start'
//             }
//         ]
//     }
    // return {
    //     type :GET_WID1,
    //     payload: datasets
    // }
    return (dispatch) =>
        request.then((response) =>
        {
            console.log("enquiry response", response);
            console.log(response.data[0].datasets[0]);
            dispatch({
                type   : GET_WID1,
                payload: response.data[0].datasets[0]
            })
        }
        );
}
