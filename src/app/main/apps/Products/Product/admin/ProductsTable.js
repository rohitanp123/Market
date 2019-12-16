import React, {Component} from 'react';
import {Icon, Table, TableBody, TableCell, TablePagination, TableRow, IconButton /*Checkbox*/} from '@material-ui/core';
import {FuseScrollbars} from '@fuse';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import classNames from 'classnames';
import _ from '@lodash';
import ProductsTableHead from './ProductsTableHead';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { buyersiteurl }  from '../../../config';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import * as Actions from '../../store/actions';
import Cookies from 'js-cookie';

class ProductsTable extends Component {

    state = {
        order      : 'asc',
        orderBy    : null,
        selected   : [],
        data       : this.props.products,
        page       : 0,
        rowsPerPage: 10,
        anchorEl   :null,
        open        :false,
        productId   : ""
    };

    handleAgree = () => {
        this.setState({ open: false });
        console.log(this.state.status,this.state.productId);

        // this.props.changeStatus({ productId:this.state.productId, status:( parseInt(this.state.status)>=1)? 0:1 },
        // this.props.user._id )

        this.props.changeStatusAdmin({ productId:this.state.productId, status:this.state.status },
          this.props.user._id )
        //const data = {...this.state.form, createdBy: this.props.user._id} ;
        //this.props.saveProduct(data);
      };

        handleDisAgree = () => {
        this.setState({ open: false });
      };

    //   handleClickOpen = () => {
    //     this.setState({ open: true});
    //   }
      handleClose = (event) => {
        console.log(event.currentTarget)
        this.setState({ anchorEl: null});
      };
      handleCloseMenu = (event) => {
        console.log(event.currentTarget)
        this.setState({ anchorEl: null});
      };
    //   handleClickAction = event => {
    //     event.preventDefault(); 
       
    //     this.setState({ open: true, productId: event.currentTarget.dataset.productid, status: event.currentTarget.dataset.status  });

    //     // this.setState({ anchorEl: event.currentTarget });
    //   };

      handleAdmin = ( event ) => {
          this.setState( { status: event.currentTarget.dataset.status });
          this.setState({ open: true });
          this.setState({ anchorEl: null});

      }

      selectedSme = ( id ) => {
        this.setState({ productId:id });
    }

      handleClickActionAdmin = event => {
          this.setState({ anchorEl:event.currentTarget });
      }

    componentDidMount()
    {
        //setTimeout(myFunction, 3000);
        
        console.log("id from cookie",Cookies.get("userId"));
        //this.props.getProducts(this.props.user._id);
        this.props.getProducts(Cookies.get("userId"));
    }

    componentDidUpdate(prevProps, prevState)
    {
        if ( !_.isEqual(this.props.products, prevProps.products) || !_.isEqual(this.props.searchText, prevProps.searchText) )
        {
            const data = this.getFilteredArray(this.props.products, this.props.searchText);
            this.setState({data})
        }
    }

    getFilteredArray = (data, searchText) => {
        if ( searchText.length === 0 )
        {
            return data;
        }
        return _.filter(data, item => item.name.toLowerCase().includes(searchText.toLowerCase()));
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
            this.setState(state => ({selected: this.state.data.map(n => n.id)}));
            return;
        }
        this.setState({selected: []});
    };

    handleClick = (item) => {
        // this.props.history.push('/apps/e-commerce/products/' + item.id + '/' + item.handle);
        this.props.history.push('/apps/product/edit/' + item._id);
    };
    handleClickBuyer = (item) => {
        // this.props.history.push('/apps/e-commerce/products/' + item.id + '/' + item.handle);
        window.location.href = buyersiteurl+"/Product?id="+item._id
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
        const {order, orderBy, selected, rowsPerPage, page, data, anchorEl} = this.state;

        return (
            <div className="w-full flex flex-col">

                <FuseScrollbars className="flex-grow overflow-x-auto">

                    <Table className="min-w-xl" aria-labelledby="tableTitle">

                        <ProductsTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={this.handleSelectAllClick}
                            onRequestSort={this.handleRequestSort}
                            rowCount={data.length}
                            user={this.props.user}
                        />

                        <TableBody>
                            {_.orderBy(data, [
                                (o) => {
                                    switch ( orderBy )
                                    {
                                        case 'categories':
                                        {
                                            return o.categories[0];
                                        }
                                        default:
                                        {
                                            return o[orderBy];
                                        }
                                    }
                                }
                            ], [order])
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(n => {
                                    const isSelected = this.isSelected(n.id);
                                    return (
                                        <TableRow
                                            className="h-64 cursor-pointer"
                                            hover
                                            role="checkbox"
                                            aria-checked={isSelected}
                                            tabIndex={-1}
                                            key={n._id}
                                            selected={isSelected}                                            
                                        >
                                          <TableCell component="th" scope="row">
                                                {n.name}
                                            </TableCell>
                                            <TableCell className="truncate" component="th" scope="row">
                                                {n.customer[0].smeName}
                                            </TableCell>                                            
                                            <TableCell className="truncate" component="th" scope="row">
                                                {n.categories.join(', ')}
                                            </TableCell>

                                            <TableCell className="truncate" component="th" scope="row" align="left">                                               
                                                {n.price}
                                            </TableCell>

                                            <TableCell component="th" scope="row" align="center">
                                                {n.quantity}
                                                <i className={classNames("inline-block w-8 h-8 rounded ml-8", n.quantity <= 5 && "bg-red", n.quantity > 5 && n.quantity <= 25 && "bg-orange", n.quantity > 25 && "bg-green")}/>
                                            </TableCell>

                                            <TableCell component="th" scope="row" align="right">
                                            <a onClick={event => this.handleClick(n)}>Edit/</a><a onClick={event => this.handleClickBuyer(n)}> View </a>
                                            </TableCell>
                                            <TableCell component="th" scope="row" align="right">
                                            { ( (n.approveStatus === 2)?
                                                  <Icon className="text-yellow text-20">remove_circle</Icon>:
                                                   (n.approveStatus === 1)?
                                                   <Icon className="text-green text-20">check_circle</Icon>: 
                                                   <Icon className="text-red text-20">remove_circle</Icon>
                                                  )
                                                    
                                                }
                                            </TableCell>       
                                            <TableCell component="th" scope="row" align="left">
                                                    <div>                                                       
                                                        <IconButton onClick={this.handleClickActionAdmin} aria-label="delete"  size="small">
                                                        <ArrowDownwardIcon onClick = { () => this.selectedSme(n._id)} fontSize="inherit" />
                                                        </IconButton>
                                                        <Menu
                                                        id="simple-menu"
                                                        anchorEl={anchorEl}
                                                        open={Boolean(anchorEl)}
                                                        onClose={this.handleCloseMenu}
                                                        >
                                                        <MenuItem id ="Approved" data-status="1" data-productid={ n._id } onClick={this.handleAdmin}>Approve</MenuItem>
                                                        <MenuItem id="Rejected" data-status="0" data-productid={ n._id } onClick={this.handleAdmin}>Reject</MenuItem>
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
                                            This action will change the current status of Product. Do you want to proceed with action?
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
        getProducts: Actions.getProducts,
        changeStatus:Actions.changeStatus,
        changeStatusAdmin:Actions.changeStatusAdmin
    }, dispatch);
}

function mapStateToProps({ProductsApp, auth})
{
    return {
        products  : ProductsApp.products.data,
        searchText: ProductsApp.products.searchText,
        user : auth.user
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductsTable));
