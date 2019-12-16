import React, {Component} from 'react';
import {Icon, Table, TableBody, TableCell, TablePagination, TableRow, IconButton, Button } from '@material-ui/core';
import {FuseScrollbars} from '@fuse';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import _ from '@lodash';
import CategoriesTableHead from './CategoriesTableHead';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import * as Actions from '../store/actions'

class CategoriesTable extends Component {

    state = {
        order      : 'asc',
        orderBy    : null,
        selected   : [],
        data       : this.props.categories,
        page       : 0,
        rowsPerPage: 10,
        anchorEl   :null,
    };
    handleAgree = () => {
        this.setState({ open: false });
        console.log(this.state.status,this.state.smeId);
        this.props.changeStatus({ smeId:this.state.smeId, status:this.state.status })
      };

    handleDisAgree = () => {
        this.setState({ open: false });
      };

      handleClickOpen = () => {
        this.setState({ open: true});
      }

      handleCloseDig = () => {
        this.setState({ anchorEl: null, open:true });
      }

      handleClose = (id, status) => {
        this.setState({ anchorEl: null, open:true, status: status });
      };

      selectedSme = ( id ) => {
          this.setState({ smeId:id });
      }

      handleCloseMenu = (event) => {
        console.log(event.currentTarget)
        this.setState({ anchorEl: null});
      };
      handleClickAction = event => {
        event.preventDefault(); 
      };

      handleClickActionAdmin = event => {
          this.setState({ anchorEl:event.currentTarget });
      }

    componentDidMount()
    {
        this.props.getCategories();
    }

    componentDidUpdate(prevProps, prevState)
    {
        if ( !_.isEqual(this.props.categories, prevProps.categories) || !_.isEqual(this.props.searchText, prevProps.searchText) )
        {
            const data = this.getFilteredArray(this.props.categories, this.props.searchText);
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
        this.props.history.push('/apps/smes/edit/' + item._id);
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

                        <CategoriesTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={this.handleSelectAllClick}
                            onRequestSort={this.handleRequestSort}
                            rowCount={data.length}
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
                                    const isSelected = this.isSelected(n._id);
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
                                                {n.smeName}
                                            </TableCell>                                            

                                            <TableCell component="th" scope="row" align="left">                                               
                                                {n.email}
                                            </TableCell>
                                            <TableCell component="th" scope="row" align="left">                                               
                                                {n.mobile}
                                            </TableCell>

                                            <TableCell component="th" scope="row" align="left">
                                                <span onClick={event => this.handleClick(n)}> Edit </span>
                                              
                                            </TableCell>

                                             <TableCell component="th" scope="row" align="left">
                                                { ( (n.status === 1)?
                                                  <Icon className="text-yellow text-20">remove_circle</Icon>:
                                                   (n.status === 2)?
                                                   <Icon className="text-green text-20">check_circle</Icon>: 
                                                   <Icon className="text-red text-20">remove_circle</Icon>
                                                  )
                                                    
                                                }
                                            </TableCell> 

                                            <TableCell component="th" scope="row" align="left">
                                                    <div>
                                                        <IconButton onClick={this.handleClickActionAdmin} aria-label="delete"  size="small">
                                                        <ArrowDownwardIcon fontSize="inherit" onClick = { () => this.selectedSme(n._id) }/>
                                                        </IconButton>
                                                        <Menu
                                                        id="simple-menu"
                                                        anchorEl={anchorEl}
                                                        open={Boolean(anchorEl)}
                                                        onClose={this.handleCloseMenu}
                                                        
                                                        >
                                                        <MenuItem id ="Approved" data-status="2" data-smeid={ n.smeName } onClick={ () => this.handleClose(n._id,"2")}>Approve</MenuItem>
                                                        <MenuItem id="Rejected" data-status="3" data-smeid={ n.smeName } onClick={() => this.handleClose(n._id,"3")}>Reject</MenuItem>
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
                                        onClose={this.handleCloseDig}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                >    
                                    <DialogTitle id="alert-dialog-title">{"Action Alert!"}</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-description">
                                            This action will change the SME user status. Do you want to proceed with action?
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
        getCategories: Actions.getCategories,
        changeStatus:Actions.changtuseStatus
    }, dispatch);
}

function mapStateToProps({SmeApp})
{
    return {
        categories  : SmeApp.categories.data,
        searchText: SmeApp.categories.searchText
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CategoriesTable));
