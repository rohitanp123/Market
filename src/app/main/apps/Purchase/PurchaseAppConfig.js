import React from 'react';
import {FuseLoadable} from '@fuse';
import {Redirect} from 'react-router-dom';

export const ECommerceAppConfig = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path     : '/apps/Purchase/orders/:orderId',
            component: FuseLoadable({
                loader: () => import('./order/Order')
            })
        },    
        {
            path     : '/apps/Purchase/orders',
            component: FuseLoadable({
                loader: () => import('./orders/Orders')
            })
        },
        {
            path     : '/apps/Purchase',
            component: () => <Redirect to="/apps/Purchase/orders"/>
        }
    ]
};
