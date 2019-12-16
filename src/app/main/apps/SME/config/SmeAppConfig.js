import React from 'react';
import {FuseLoadable} from '@fuse';
import {Redirect} from 'react-router-dom';

export const SmeAppConfig = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path     : '/apps/smes',
            component: FuseLoadable({
                loader: () => import('../Category/Categories')
            }),
            exact:true
        },
         {
             path     : '/apps/smes/new',
             component: FuseLoadable({
                 loader: () => import('../Category/New/Category')
             }),
             exact:true
         },
         {
            path     : '/apps/smes/edit/:smecatId',
            component: FuseLoadable({
                loader: () => import('../Category/Edit/Category')
            }),
            exact:true
        },              
        {
            path     : '/apps/sme',
            component: () => <Redirect to="/apps/smes/"/>
        }
    ]
};
