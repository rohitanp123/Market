import React from 'react';
import {FuseLoadable} from '@fuse';
import {Redirect} from 'react-router-dom';

export const ProductsAppConfig = {
    settings: {
        layout: {}
    },
    routes  : [       
        {
            path     : '/apps/productTerms',
            component: FuseLoadable({
                loader: () => import('../Product/Terms')
            })
        },      
        {
            path     : '/apps/pendinglisting',
            component: FuseLoadable({
                loader: () => import('../Product/pending/Products')
            }),
            exact:true
        },       
        {
            path     : '/apps/products',
            component: FuseLoadable({
                loader: () => import('../Product/Products')
            }),
            exact:true
        },
        {
            path     : '/apps/productAdmin',
            component: FuseLoadable({
                loader: () => import('../Product/admin/Products')
            }),
            exact:true,
            auth:['admin']
        },
        {
            path     : '/apps/productRM',
            component: FuseLoadable({
                loader: () => import('../Product/RM/Products')
            }),
            exact:true,
            auth:['rm']
        },
         {
             path     : '/apps/product/new',
             component: FuseLoadable({
                 loader: () => import('../Product/New/Product')
             }),
             exact:true,
             auth:['sme','admin']
         },
         {
            path     : '/apps/product/edit/:productId',
            component: FuseLoadable({
                loader: () => import('../Product/Edit/Product')
            }),
            exact:true,
            auth:['sme','admin']

        },
        {
            path     : '/apps/product/view/:productId',
            component: FuseLoadable({
                loader: () => import('../Product/view/Product')
            }),
            exact:true,
            auth:['sme','admin']
        },            
        {
            path     : '/apps/Product',
            component: () => <Redirect to="/apps/products/product"/>
        }
    ]
};
