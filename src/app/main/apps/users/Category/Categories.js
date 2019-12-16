import React from 'react';
import {FusePageCarded} from '@fuse';
import withReducer from 'app/store/withReducer';
import CategoriesTable from './CategoriesTable';
import CategoriesHeader from './CategoriesHeader';
import reducer from '../store/reducers';

const Categories = () => {
    return (
        <FusePageCarded
            classes={{
                content: "flex",
                header : "min-h-72 h-72 sm:h-136 sm:min-h-136"
            }}
            header={
                <CategoriesHeader/>
            }
            content={
                <CategoriesTable/>
            }
            innerScroll
        />
    );
};

export default withReducer('SmeApp', reducer)(Categories);
