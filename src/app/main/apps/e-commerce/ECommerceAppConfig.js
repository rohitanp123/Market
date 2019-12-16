import React from 'react';
import {FuseLoadable} from '@fuse';
import {Redirect} from 'react-router-dom';

export const ECommerceAppConfig = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path     : '/apps/e-commerce/orders/:orderId',
            component: FuseLoadable({
                loader: () => import('./order/Order')
            })
        },       
        {
            path     : '/apps/e-commerce/outbox/:orderId',
            component: FuseLoadable({
                loader: () => import('./outboxchat/Order')
            })
        },
        {
            path     : '/apps/e-commerce/outbox',
            component: FuseLoadable({
                loader: () => import('./outbox/Orders')
            })
        },
        {
            path     : '/apps/e-commerce/orders',
            component: FuseLoadable({
                loader: () => import('./orders/Orders')
            })
        },
        {
            path     : '/apps/e-commerce',
            component: () => <Redirect to="/apps/e-commerce/products"/>
        }
    ]
};

