import React, {Component} from 'react';
import { Table, TableBody, TableCell, TablePagination, TableRow, IconButton } from '@material-ui/core';
import {FuseScrollbars, FuseUtils} from '@fuse';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import _ from '@lodash';
import OrdersTableHead from './OrdersTableHead';
import OrdersStatus from '../order/OrdersStatus';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as Actions from '../store/actions';



class OrdersTable extends Component {

    state = {
        order      : 'asc',
        orderBy    : 'id',
        selected   : [],
        data       : this.props.orders,
        page       : 0,
        rowsPerPage: 10,
        anchorEl   :null,
        open       :false,
        selectedStatus:'',
        productId  :'',
        code:''
    };

    handleAgree = () => {
        this.setState({ open: false });
        const { productId, selectedStatus, code } = this.state;
        console.log( productId, selectedStatus,code );
        this.props.changeStatus({ enqId:productId, status: parseInt(code) },
            this.props.auth.user._id)
      };
    
      handleDisAgree = () => {
        this.setState({ open: false });
      };

      handleClickOpen = () => {
        this.setState({ open: true });
      }
  
    
      handleClickAction = (event,id) => {
        event.preventDefault();          
        this.setState({ anchorEl: event.currentTarget, productId:id });
      };
    
      handleClose = (event) => {
        console.log(event.currentTarget)
        this.setState({ anchorEl: null, 
            open:true, 
            selectedStatus:event.currentTarget.id,
            code:event.currentTarget.dataset.status
         });
      };

      setProd = ( id ) => {
          this.setState({ productId:id });
      }

      handleCloseMenu = (event) => {
        console.log(event.currentTarget)
        this.setState({ anchorEl: null});
      };

    componentDidMount()
    {
        this.props.getOrders(this.props.auth.user._id);
    }

    componentDidUpdate(prevProps, prevState)
    {
        if ( !_.isEqual(this.props.orders, prevProps.orders) || !_.isEqual(this.props.searchText, prevProps.searchText) )
        {
            const data = this.getFilteredArray(this.props.orders, this.props.searchText);
            this.setState({data})
        }
    }

    getFilteredArray = (data, searchText) => {
        if ( searchText.length === 0 )
        {
            return data;
        }
        return FuseUtils.filterArrayByString(data, searchText);
    };

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if ( this.state.orderBy === property && this.state.order === 'desc' )
        {
            order = 'asc';
        }

        this.setState({
            order,
            orderBy
        });
    };

    handleSelectAllClick = event => {
        if ( event.target.checked )
        {
            this.setState(state => ({selected: this.state.data.map(n => n._id)}));
            return;
        }
        this.setState({selected: []});
    };

    handleClick = (item) => {
        this.props.history.push('/apps/e-commerce/orders/' + item._id);
    };

    handleCheck = (event, id) => {
        const {selected} = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if ( selectedIndex === -1 )
        {
            newSelected = newSelected.concat(selected, id);
        }
        else if ( selectedIndex === 0 )
        {
            newSelected = newSelected.concat(selected.slice(1));
        }
        else if ( selectedIndex === selected.length - 1 )
        {
            newSelected = newSelected.concat(selected.slice(0, -1));
        }
        else if ( selectedIndex > 0 )
        {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }

        this.setState({selected: newSelected});
    };

    handleChangePage = (event, page) => {
        this.setState({page});
    };

    handleChangeRowsPerPage = event => {
        this.setState({rowsPerPage: event.target.value});
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    render()
    {
        const {order, orderBy, selected, rowsPerPage, page, data, anchorEl } = this.state;

        return (
            <div className="w-full flex flex-col">

                <FuseScrollbars className="flex-grow overflow-x-auto">

                    <Table className="min-w-xl" aria-labelledby="tableTitle">

                        <OrdersTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={this.handleSelectAllClick}
                            onRequestSort={this.handleRequestSort}
                            rowCount={data.length}
                        />

                        <TableBody>
                            {
                                _.orderBy(data, [
                                    (o) => {
                                        switch ( orderBy )
                                        {
                                            case 'id':
                                            {
                                                return parseInt(o.id, 10);
                                            }
                                            case 'customer':
                                            {
                                                return o.customer.firstName;
                                            }
                                            case 'payment':
                                            {
                                                return o.payment.method;
                                            }
                                            case 'status':
                                            {
                                                return o.status.name;
                                            }
                                            default:
                                            {
                                                return o[orderBy];
                                            }
                                        }
                                    }
                                ], [order])
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((n,i) => {
                                        
                                        const isSelected = this.isSelected(n._id);
                                        return (
                                            <TableRow
                                                className="h-64 cursor-pointer"
                                                hover
                                                role="checkbox"
                                                aria-checked={isSelected}
                                                tabIndex={-1}
                                                key={i}
                                                selected={isSelected}
                                                
                                               
                                            >
                                                {/* <TableCell className="w-48 pl-4 sm:pl-12" padding="checkbox">
                                                    <Checkbox
                                                        checked={isSelected}
                                                        onClick={event => event.stopPropagation()}
                                                        onChange={event => this.handleCheck(event, n.id)}
                                                    />
                                                </TableCell> */}

                                                {/* <TableCell component="th" scope="row">
                                                    {n._id}
                                                </TableCell> */}

                                                <TableCell component="th" scope="row" style={{'padding-left':'49px'}}>
                                                    {n.sender[0].smeName}
                                                </TableCell>

                                                <TableCell className="truncate" style={{'padding-left':'49px',whiteSpace:'normal',wordWrap:'break-word'}} component="th" scope="row">
                                                    { n.enquiry[0].chatText }
                                                </TableCell>

                                                {/* <TableCell component="th" scope="row" align="right">
                                                    <span>$</span>
                                                    {n.total}
                                                </TableCell> */}

                                                {/* <TableCell component="th" scope="row">
                                                    {n.payment.method}
                                                </TableCell> */}

                                               

                                                <TableCell component="th" scope="row" style={{'padding-left':'49px'}}>
                                                    <span  onClick={event => this.handleClick(n)}>view</span>
                                                </TableCell>
                                                <TableCell component="th" scope="row" style={{'padding-left':'49px'}}>
                                                    <OrdersStatus name={n.status}/>
                                                </TableCell>
                                                <TableCell component="th" scope="row" style={{'padding-left':'49px'}}>
                                                <div>
                                                        {/* <Button
                                                        aria-owns={anchorEl ? 'simple-menu' : undefined}
                                                        aria-haspopup="true"
                                                        onClick={this.handleClickAction}
                                                        >
                                                        <Icon className="text-green text-20">check_circle</Icon>
                                                        </Button> */}
                                                        <IconButton onClick={(e) => this.handleClickAction(e,n._id)} aria-label="delete"  size="small">
                                                        <ArrowDownwardIcon fontSize="inherit" />
                                                        </IconButton>
                                                        <Menu
                                                        id="simple-menu"
                                                        anchorEl={anchorEl}
                                                        open={Boolean(anchorEl)}
                                                        onClose={this.handleCloseMenu}
                                                        >
                                                        <MenuItem id ="Pending" data-status="1" data-productid={ n._id } onClick={this.handleClose}>Pending</MenuItem>
                                                        <MenuItem id="Processed" data-status="2" data-productid={ n._id } onClick={this.handleClose}>Processed</MenuItem>
                                                        <MenuItem id="Delivered" data-status="3" data-productid={ n._id } onClick={this.handleClose}>Delivered</MenuItem>
                                                        <MenuItem id="Declined" data-status="4" data-productid={ n._id } onClick={this.handleClose}>Declined</MenuItem>
                                                        </Menu>
                                                    </div>
                                                </TableCell>

                                            </TableRow>
                                        );
                                        
                                    })}
                        </TableBody>
                    </Table>
                </FuseScrollbars>

                <TablePagination
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page'
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page'
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
                                <Dialog
                                        open={this.state.open}
                                        onClose={this.handleClose}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                >    
                                    <DialogTitle id="alert-dialog-title">{"Action Alert!"}</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-description">
                                            This action will change the current status of enquiry. Do you want to proceed with action?
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={this.handleDisAgree} variant="contained" color="primary">
                                        Disagree
                                        </Button>
                                        <Button onClick={this.handleAgree} variant="contained" color="primary" autoFocus>
                                        Agree
                                        </Button>
                                    </DialogActions>
                                </Dialog>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getOrders: Actions.getOrders,
        changeStatus:Actions.changeStatus
    }, dispatch);
}

function mapStateToProps({eCommerceApp, auth})
{
    return {
        orders    : eCommerceApp.orders.data,
        searchText: eCommerceApp.orders.searchText,
        auth: auth
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OrdersTable));
