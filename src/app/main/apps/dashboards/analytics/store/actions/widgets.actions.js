import axios from 'axios';
import { serviceApiUrl } from 'app/config';

export const GET_WIDGETS = '[ANALYTICS DASHBOARD APP] GET WIDGETS';
export const GET_WIDGET1 = '[ANALYTICS DASHBOARD APP] GET WIDGET1';
export const GET_WIDGET2 = '[ANALYTICS DASHBOARD APP] GET WIDGET2';
export const GET_WIDGET3 = '[ANALYTICS DASHBOARD APP] GET WIDGET3';
export const GET_WIDGET4 = '[ANALYTICS DASHBOARD APP] GET WIDGET4';

export function getWidgets()
{
    const request = axios.get('/api/analytics-dashboard-app/widgets');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_WIDGETS,
                payload: response.data
            })
        );
}

export function getWidget1(uuid)
{
    //const request = axios.get('/api/analytics-dashboard-app/widgets');
   // console.log(uuid);
    const request = axios.get( serviceApiUrl + '/dashboard/getallleads?analytic=LEADS&productOwnerId=' + uuid);



    let widget1 = {
        datasets:[], 
        chartType: 'line',
        labels   : ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
        options  : {
            spanGaps           : false,
            legend             : {
                display: false
            },
            maintainAspectRatio: false,
            layout             : {
                padding: {
                    top  : 32,
                    left : 32,
                    right: 32
                }
            },
            elements           : {
                point: {
                    radius          : 4,
                    borderWidth     : 2,
                    hoverRadius     : 4,
                    hoverBorderWidth: 2
                },
                line : {
                    tension: 0
                }
            },
            scales             : {
                xAxes: [
                    {
                        gridLines: {
                            display       : false,
                            drawBorder    : false,
                            tickMarkLength: 18
                        },
                        ticks    : {
                            fontColor: '#ffffff'
                        }
                    }
                ],
                yAxes: [
                    {
                        display: false,
                        ticks  : {
                            min     : 20,
                            max     : 0,
                            stepSize: 0.5
                        }
                    }
                ]
            },
            plugins            : {
                filler      : {
                    propagate: false
                },
                xLabelsOnTop: {
                    active: false
                }
            }
        }
}

    return (dispatch) =>
        request.then((response) =>  {
            widget1.datasets = response.data;
            dispatch({
                type   : GET_WIDGET1,
                payload: widget1
            })
            }
            
        );
}


export function getWidget2(uuid){

   // const request = axios.get('/dashboard?analytic=PRODUCT_ADDED&productOwnerId=' + uuid);
    const request = axios.get( serviceApiUrl + '/product/productcount?createdBy=' + uuid);
   
   
    let widget2 = {
        conversion: {
            value   : 492,
            ofTarget: 13
        },
        chartType : 'bar',
        datasets  : [],
        //labels    : ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        labels : ['Jan', "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        options   : {
            spanGaps           : false,
            legend             : {
                display: false
            },
            maintainAspectRatio: false,
            layout             : {
                padding: {
                    top   : 24,
                    left  : 16,
                    right : 16,
                    bottom: 16
                }
            },
            scales             : {
                xAxes: [
                    {
                        display: false
                    }
                ],
                yAxes: [
                    {
                        display: false,
                        ticks  : {
                            min: 0,
                            max: 20
                        }
                    }
                ]
            }
        }
    }

    return (dispatch) =>
        request.then((response) =>  {
            //console.log("response----dataset--",response);
            let dataSetArray = response.data[0].data;
            let arrayValueTotal = 0
            dataSetArray.forEach(item =>{
                arrayValueTotal = arrayValueTotal + item;
            });
            // console.log("arrayValueTotal", Math.max(dataSetArray));
            widget2.conversion.value = arrayValueTotal;
         widget2.datasets = response.data;

            dispatch({
                type   : GET_WIDGET2,
                payload: widget2
            })
            }
            
        );

}

export function getWidget3(){

    const request = axios.get( serviceApiUrl + '/anavisit?analytic=VISIT&uuid=5da68b74c8b1da6c3ae0df77');

    let widget3 = {
        impressions: {
            value   : '87k',
            ofTarget: 12
        },
        chartType  : 'line',
        datasets   : [],
        //labels     : ['Jan 1', 'Jan 2', 'Jan 3', 'Jan 4', 'Jan 5', 'Jan 6', 'Jan 7', 'Jan 8', 'Jan 9', 'Jan 10', 'Jan 11', 'Jan 12', 'Jan 13', 'Jan 14', 'Jan 15'],
        labels : ['Jan', "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        options    : {
            spanGaps           : false,
            legend             : {
                display: false
            },
            maintainAspectRatio: false,
            elements           : {
                point: {
                    radius          : 2,
                    borderWidth     : 1,
                    hoverRadius     : 2,
                    hoverBorderWidth: 1
                },
                line : {
                    tension: 0
                }
            },
            layout             : {
                padding: {
                    top   : 24,
                    left  : 16,
                    right : 16,
                    bottom: 16
                }
            },
            scales             : {
                xAxes: [
                    {
                        display: false
                    }
                ],
                yAxes: [
                    {
                        display: false,
                        ticks  : {
                            // min: 100,
                            // max: 500
                        }
                    }
                ]
            }
        }
    }

    return (dispatch) =>
        request.then((response) =>  {

         widget3.datasets = response.data[0].datasets;
            dispatch({
                type   : GET_WIDGET3,
                payload: widget3
            })
            }
            
        );

}

//192.168.0.55:4000/anawish?uuid=5da68b74c8b1da6c3ae0df77

export function getWidget4(uuid){

    const request = axios.get( serviceApiUrl + '/dashboard?analytic=VISIT&productOwnerId=' + uuid);

    let widget4 = {
        visits   : {
            value   : 10,
            ofTarget: -9
        },
        chartType: 'bar',
        datasets : [],
        //labels   : ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        labels : ['Jan', "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        options  : {
            spanGaps           : false,
            legend             : {
                display: false
            },
            maintainAspectRatio: false,
            layout             : {
                padding: {
                    top   : 24,
                    left  : 16,
                    right : 16,
                    bottom: 16
                }
            },
            scales             : {
                xAxes: [
                    {
                        display: false
                    }
                ],
                yAxes: [
                    {
                        display: false,
                        ticks  : {
                            min: 0,
                            max: 10
                        }
                    }
                ]
            }
        }
    }

    return (dispatch) =>
        request.then((response) =>  {
           console.log("response----dataset VISIT--",response);
           let dataSetArray = response.data[0].data;
           let arrayValueTotal = 0;          
           dataSetArray.forEach(item =>{
               arrayValueTotal = arrayValueTotal + item;
           });
           //console.log("arrayValueTotal", arrayValueTotal);
           widget4.visits.value = arrayValueTotal;
        widget4.datasets = response.data;
            dispatch({
                type   : GET_WIDGET4,
                payload: widget4
            })
            }
            
        );

}
