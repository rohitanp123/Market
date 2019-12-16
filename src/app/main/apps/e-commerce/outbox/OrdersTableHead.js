import React, {Component} from 'react';
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
        id            : 'reference',
        align         : 'left',
        disablePadding: false,
        label         : 'Buyer',
        sort          : true
    },
    {
        id            : 'customer',
        align         : 'left',
        disablePadding: false,
        label         : 'Description',
        sort          : true
    },
    {
        id            : 'view',
        align         : 'left',
        disablePadding: false,
        label         : 'View',
        sort          : true
    },
    {
        id            : 'status',
        align         : 'left',
        disablePadding: false,
        label         : 'Status',
        sort          : true
    } 
];

const styles = theme => ({
    actionsButtonWrapper: {
        background: theme.palette.background.paper
    }
});

class OrdersTableHead extends Component {

    state = {
        selectedOrdersMenu: null
    };

    createSortHandler = property => event => {

        this.props.onRequestSort(event, property);
    };

    openSelectedOrdersMenu = (event) => {
        this.setState({selectedOrdersMenu: event.currentTarget});
    };

    closeSelectedOrdersMenu = () => {
        this.setState({selectedOrdersMenu: null});
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

export default withStyles(styles, {withTheme: true})(OrdersTableHead);
