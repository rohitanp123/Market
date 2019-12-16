import {FuseLoadable} from '@fuse';

export const ProfilePageConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/pages/profile/edit/:smecatId',
            component: FuseLoadable({
                loader: () => import('./tabs/EditProfile')
            })
        },
        {
            path     : '/pages/profile',
            component: FuseLoadable({
                loader: () => import('./ProfilePage')
            })
        }
       
    ]
};
