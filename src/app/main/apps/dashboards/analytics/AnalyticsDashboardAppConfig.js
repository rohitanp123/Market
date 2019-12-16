import {FuseLoadable} from '@fuse';
import { authRoles } from '../../../../../app/auth';
export const AnalyticsDashboardAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    auth    : ['admin','rm','sme'],
    routes  : [
        {
            path     : '/apps/dashboards/analytics',
            component: FuseLoadable({
                loader: () => import('./AnalyticsDashboardApp')
            })
        }
    ]
};
