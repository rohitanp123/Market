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
        label         : 'Company Name',
        sort          : true
    },
    {
        id            : 'email',
        align         : 'left',
        disablePadding: false,
        label         : 'Email',
        sort          : true
    },
    {
        id            : 'mobile',
        align         : 'left',
        disablePadding: false,
        label         : 'Mobile',
        sort          : true
    },
    
    {
        id            : 'edit',
        align         : 'left',
        disablePadding: false,
        label         : 'Edit',
        sort          : true
    },
    {
        id            : 'status',
        align         : 'left',
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

class CategoriesTableHead extends React.Component {
    state = {
        selectedCategoriesMenu: null
    };

    createSortHandler = property => event => {

        this.props.onRequestSort(event, property);
    };

    openSelectedCategoriesMenu = (event) => {
        this.setState({selectedCategoriesMenu: event.currentTarget});
    };

    closeSelectedCategoriesMenu = () => {
        this.setState({selectedCategoriesMenu: null});
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

export default withStyles(styles, {withTheme: true})(CategoriesTableHead);
