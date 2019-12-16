import React from 'react';
import {FuseLoadable} from '@fuse';
import {Redirect} from 'react-router-dom';

export const UserAppConfig = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path     : '/apps/users',
            component: FuseLoadable({
                loader: () => import('../Category/Categories')
            }),
            exact:true
        },
         {
             path     : '/apps/users/new',
             component: FuseLoadable({
                 loader: () => import('../Category/New/Category')
             }),
             exact:true
         },
         {
            path     : '/apps/users/edit/:smecatId',
            component: FuseLoadable({
                loader: () => import('../Category/Edit/Category')
            }),
            exact:true
        },              
        {
            path     : '/apps/users',
            component: () => <Redirect to="/apps/users/"/>
        }
    ]
};
