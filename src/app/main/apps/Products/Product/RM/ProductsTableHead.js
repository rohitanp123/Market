import React from 'react';
import {
    TableHead,
    TableSortLabel,
    TableCell,
    TableRow,
    Tooltip,
    withStyles
} from '@material-ui/core';

const rows = [
    {
        id            : 'name',
        align         : 'left',
        disablePadding: false,
        label         : 'Product Name',
        sort          : true
    },   
    {
        id            : 'name',
        align         : 'left',
        disablePadding: false,
        label         : 'Seller',
        sort          : true
    }, 
    {
        id            : 'categories',
        align         : 'left',
        disablePadding: false,
        label         : 'Category',
        sort          : true
    },
    {
        id            : 'price',
        align         : 'left',
        disablePadding: false,
        label         : 'Price(OMR)',
        sort          : true
    },
    {
        id            : 'quantity',
        align         : 'right',
        disablePadding: false,
        label         : 'Quantity',
        sort          : true
    },
    {
        id            : 'view',
        align         : 'right',
        disablePadding: false,
        label         : 'View',
        sort          : true
    },
    {
        id            : 'status',
        align         : 'center',
        disablePadding: false,
        label         : 'Status',
        sort          : true
    },
    {
        id            : 'action',
        align         : 'left',
        disablePadding: false,
        label         : 'Action',
        sort          : true
    }
];

const styles = theme => ({
    actionsButtonWrapper: {
        background: theme.palette.background.paper
    }
});

class ProductsTableHead extends React.Component {
    state = {
        selectedProductsMenu: null
    };

    createSortHandler = property => event => {

        this.props.onRequestSort(event, property);
    };

    openSelectedProductsMenu = (event) => {
        this.setState({selectedProductsMenu: event.currentTarget});
    };

    closeSelectedProductsMenu = () => {
        this.setState({selectedProductsMenu: null});
    };

    render()
    {
        const { order, orderBy } = this.props;

        return (
            <TableHead>
                 <TableRow className="h-64">                    
                    {rows.map(row => {
                        return (
                            <TableCell
                                key={row.id}
                                align={row.align}
                                padding={row.disablePadding ? 'none' : 'default'}
                                sortDirection={orderBy === row.id ? order : false}
                            >
                                {row.sort && (
                                    <Tooltip
                                        title="Sort"
                                        placement={row.align === "right" ? 'bottom-end' : 'bottom-start'}
                                        enterDelay={300}
                                    >
                                        <TableSortLabel
                                            active={orderBy === row.id}
                                            direction={order}
                                            onClick={this.createSortHandler(row.id)}
                                        >
                                            {row.label}
                                        </TableSortLabel>
                                    </Tooltip>
                                )}
                            </TableCell>
                        );
                    }, this)}
                </TableRow>
            </TableHead>
        );
    }
}

export default withStyles(styles, {withTheme: true})(ProductsTableHead);
