import React from 'react';
import {FuseLoadable} from '@fuse';
import {Redirect} from 'react-router-dom';

export const EnquiryAppConfig = {
    settings: {
        layout: {}
    },
    routes  : [          
        {
            path     : '/apps/Enquiry/products',
            component: FuseLoadable({
                loader: () => import('../Product/Products')
            }),           
        },
        //  {
        //      path     : '/apps/product/new',
        //      component: FuseLoadable({
        //          loader: () => import('../Product/New/Product')
        //      }),
        //      exact:true
        //  },
         {
            path     : '/apps/Enquiry/product/detail/:productId',
            component: FuseLoadable({
                loader: () => import('../Product/Details/Product')
            })            
        },          
        {
            path     : '/apps/Enquiry',
            component: () => <Redirect to="/apps/Enquiry/products"/>
        }
    ]
};
