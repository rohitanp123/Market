import * as Actions from '../actions';

const initialState = {
    data: {
        Datasets:[], 
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
                            min     : 1.5,
                            max     : 5,
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
                    active: true
                }
            }
        }
    }
};

const datasetsReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_WID1:
            return {
                ...state,
                data : { ...state.data, Datasets: action.payload }
            };
        default:
            return state;
    }
};

export default datasetsReducer;