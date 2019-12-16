import React, {Component} from 'react';
import {TextField, Button, Icon, Tab, Tabs, Typography} from '@material-ui/core';
import {FuseAnimate, FusePageCarded} from '@fuse';
import {Link, withRouter} from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';
import {bindActionCreators} from 'redux';
import moment from 'moment';
import withReducer from 'app/store/withReducer';
import OrdersStatus from './OrdersStatus';
import OrderInvoice from './OrderInvoice';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';

class Order extends Component {

    state = {
        tabValue: 0,
        form    : null,
        map     : 'shipping',
        comment:''
    };

    componentDidMount()
    {
        this.props.getOrder(this.props.match.params, this.props.auth.user._id);
    }

    handleChangeTab = (event, tabValue) => {
        this.setState({tabValue});
    };

    handleChangeComment = (event) => {
        this.setState({ comment:event.target.value })
    }

    render()
    {
        const {order} = this.props;
        const {tabValue, comment } = this.state;

        return (
            <FusePageCarded
                classes={{
                    content: "flex",
                    header : "min-h-72 h-72 sm:h-136 sm:min-h-136"
                }}
                header={
                    order && (
                        <div className="flex flex-1 w-full items-center justify-between">

                            <div className="flex flex-1 flex-col items-center sm:items-start">

                                <FuseAnimate animation="transition.slideRightIn" delay={300}>
                                    <Typography className="normal-case flex items-center sm:mb-12" component={Link} role="button" to="/apps/e-commerce/orders">
                                        <Icon className="mr-4 text-20">arrow_back</Icon>
                                        Enquiry
                                    </Typography>
                                </FuseAnimate>

                                <div className="flex flex-col min-w-0 items-center sm:items-start">

                                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                        <Typography className="text-16 sm:text-20 truncate">
                                            {'Enquiry ' + order.enquiry[0].chatText}
                                        </Typography>
                                    </FuseAnimate>

                                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                        <Typography variant="caption">
                                            {'From ' + order.sender[0].smeName}
                                        </Typography>
                                    </FuseAnimate>
                                </div>

                            </div>
                        </div>
                    )
                }
                contentToolbar={
                    <Tabs
                        value={tabValue}
                        onChange={this.handleChangeTab}
                        indicatorColor="secondary"
                        textColor="secondary"
                        variant="scrollable"
                        scrollButtons="auto"
                        classes={{root: "w-full h-64"}}
                    >
                        <Tab className="h-64 normal-case" label="Enquiry"/>
                        {/* <Tab className="h-64 normal-case" label="Details"/> */}
                        {/* <Tab className="h-64 normal-case" label="Invoice"/> */}
                    </Tabs>
                }
                content={
                    order && (
                        <div className="p-16 sm:p-24 max-w-2xl w-full">
                            {/*Order Details*/}
                            {tabValue === 0 &&
                            (
                                <div>
                                    <div className="pb-48">

                                        <div className="pb-16 flex items-center">
                                            <Icon className="mr-16" color="action">account_circle</Icon>
                                            {/* <Typography className="h2" color="textSecondary">Buyer Detail</Typography> */}
                                        </div>

                                        <div className="mb-24">

                                            <div className="table-responsive mb-16">
                                                <table className="simple">
                                                    <thead>
                                                        <tr>
                                                            <th>Name</th>
                                                            <th>Email</th>                             
                                                            <th>Company</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <div className="flex items-center">
                                                                    {/* <Avatar className="mr-8" src={order.customer.avatar}/> */}
                                                                    <Typography className="truncate">
                                                                        {order.sender[0].smeName}
                                                                    </Typography>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <Typography className="truncate">{order.sender[0].email}</Typography>
                                                            </td>                                                         
                                                            <td>
                                                                <span className="truncate">{order.sender[0].cr}</span>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        <div className="pb-16 flex items-center">
                                            <Icon className="mr-16" color="action">account_circle</Icon>
                                            <Typography className="h2" color="textSecondary">Product Detail</Typography>
                                        </div>                                     

                                            <div className="table-responsive mb-16">
                                                <table className="simple">
                                                    <thead>
                                                        <tr>
                                                            <th>Name</th>
                                                            <th>Description</th>                             
                                                            <th>Quantity</th>
                                                            <th>Price</th>
                                                            <th>Discount</th>
                                                            <th>Total</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <div className="flex items-center">
                                                                    {/* <Avatar className="mr-8" src={order.customer.avatar}/> */}
                                                                    <Typography className="truncate">
                                                                         {order.product[0].name}
                                                                    </Typography>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <Typography className="truncate">{order.product[0].description}</Typography>
                                                            </td>
                                                            <td>
                                                                <span className="truncate">{order.quantity}</span>
                                                            </td>                                                         
                                                            <td>
                                                                <span className="truncate">{order.unitPrice}</span>
                                                            </td>
                                                            <td>
                                                                <span className="truncate">{order.product[0].discount}</span>
                                                            </td>
                                                            <td>
                                                                <span className="truncate">{order.totalCost}</span>
                                                            </td>                                                                                       
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="pb-16 flex items-center">
                                            <Icon className="mr-16" color="action">account_circle</Icon>
                                                {/* <Icon className="mr-16" color="action">account_circle</Icon> */}
                                                <Typography className="h2" color="textSecondary">Conversation</Typography>
                                            </div>

                                            <div className="table-responsive mb-16">
                                                <table className="simple">
                                                    <thead>
                                                         { order.enquiry.map( (order) => (                                               
                                                                <tr>                                
                                                                    <th style={ (order.userId === this.props.auth.user._id)?{ textAlign:'right', backgroundColor:'#f5f5f5' }:{}} >
                                                                        { order.chatText} <br/>
                                                                        <small>{ moment(order.chatDate).format("dddd, MMM DD YYYY : HH:mm a") }</small>
                                                                    </th>                                
                                                                </tr>
                                                            ))      
                                                        }
                                                    </thead>
                                                    <tbody>

                                                    <tr><td> </td></tr>
                                                    {/* { order.products.map( (product) => (
                                                            
                                                        <tr key= { product.productId }>
                                                            <td>
                                                                <div className="flex items-center">                                                                    
                                                                    <Typography className="truncate">
                                                                        {product.name}
                                                                    </Typography>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <Typography className="truncate" style={{whiteSpace:'normal',wordWrap:'break-word'}}>{product.description}</Typography>
                                                            </td>                                                            
                                                        </tr>
                                                            
                                                    ))} */}
                                                        
                                                    </tbody>
                                                </table>
                                            </div>

                                            {/* <ExpansionPanel
                                                elevation={1}
                                                expanded={this.state.map === 'shipping'}
                                                onChange={() => this.setState({map: this.state.map !== 'shipping' ? 'shipping' : false})}
                                            > <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                                                    <Typography className="font-600">Shipping Address</Typography>
                                                </ExpansionPanelSummary>
                                                <ExpansionPanelDetails className="flex flex-col md:flex-row">
                                                    <Typography className="w-full md:max-w-256 mb-16 md:mb-0">{order.customer.shippingAddress.address}</Typography>
                                                    <div className="w-full h-320">
                                                        <GoogleMap
                                                            bootstrapURLKeys={{
                                                                key: process.env.REACT_APP_MAP_KEY
                                                            }}
                                                            defaultZoom={15}
                                                            defaultCenter={[order.customer.shippingAddress.lat, order.customer.shippingAddress.lng]}
                                                        >
                                                            <Marker
                                                                text={order.customer.shippingAddress.address}
                                                                lat={order.customer.shippingAddress.lat}
                                                                lng={order.customer.shippingAddress.lng}
                                                            />
                                                        </GoogleMap>
                                                    </div>
                                                </ExpansionPanelDetails>
                                            </ExpansionPanel>

                                            <ExpansionPanel
                                                elevation={1}
                                                expanded={this.state.map === 'invoice'}
                                                onChange={() => this.setState({map: this.state.map !== 'invoice' ? 'invoice' : false})}
                                            >
                                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                                                    <Typography className="font-600">Invoice Address</Typography>
                                                </ExpansionPanelSummary>
                                                <ExpansionPanelDetails className="flex flex-col md:flex-row">
                                                    <Typography className="w-full md:max-w-256 mb-16 md:mb-0">{order.customer.invoiceAddress.address}</Typography>
                                                    <div className="w-full h-320">
                                                        <GoogleMap
                                                            bootstrapURLKeys={{
                                                                key: process.env.REACT_APP_MAP_KEY
                                                            }}
                                                            defaultZoom={15}
                                                            defaultCenter={[order.customer.invoiceAddress.lat, order.customer.invoiceAddress.lng]}
                                                        >
                                                            <Marker
                                                                text={order.customer.invoiceAddress.address}
                                                                lat={order.customer.invoiceAddress.lat}
                                                                lng={order.customer.invoiceAddress.lng}
                                                            />
                                                        </GoogleMap>
                                                    </div>
                                                </ExpansionPanelDetails>
                                            </ExpansionPanel> */}
                                        </div>
                                    </div>

                                    <div className="pb-48">

                                        <div className="pb-16 flex items-center">
                                            <Icon className="mr-16" color="action">access_time</Icon>
                                            <Typography className="h2" color="textSecondary">Enquiry Status</Typography>
                                        </div>

                                        <div className="table-responsive">
                                            <table className="simple">
                                                <thead>
                                                    <tr>
                                                        <th>Status</th>
                                                        <th>Updated On</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {/* {order.status.map(status => ( */}
                                                        <tr>
                                                            <td>
                                                                <OrdersStatus name={order.status}/>
                                                            </td> 
                                                            <td>
                                                                <span>
                                                                    { moment(order.createdDate).format("dddd, MMM DD YYYY : HH:mm a") }
                                                                </span>
                                                            </td>                                                         
                                                        </tr>                              
                                                    {/* ))} */}
                                                </tbody>
                                            </table>

                                        </div>
                                        {/* <div className="pb-16 flex items-center">
                                            <Icon className="mr-16" color="action">access_time</Icon>
                                            <Typography className="h2" color="textSecondary">Comments</Typography>
                                        </div>

                                        <div className="table-responsive">
                                            <table className="simple">
                                                <thead>
                                                    <tr>
                                                        <th>Comments</th>
                                                        <th>Response Date</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {order.comments.map((cm,i) => (
                                                        <tr key={ i }>
                                                            <td>
                                                                <span>{cm.comment}</span>
                                                            </td> 
                                                            <td>
                                                                <span>
                                                                    { moment(cm.createdDate).format("dddd, MMM DD YYYY : HH:mm a") }
                                                                </span>
                                                            </td>                                                         
                                                        </tr>                              
                                                    ))}
                                                </tbody>
                                            </table>

                                        </div> */}
                                        <div className="table-responsive">
                                                <TextField
                                                className="mt-8 mb-16"
                                                id="comment"
                                                name="comment"
                                                onChange={this.handleChangeComment}
                                                label="Comment"
                                                type="text"
                                                value={ comment }
                                                multiline
                                                rows={5}
                                                variant="outlined"
                                                fullWidth
                                                />
                                        </div>
                                        <Button variant="contained" onClick={ ()=>this.props.addComment( comment, order._id, this.props.auth.user._id ) } color="secondary">
                                            Reply
                                        </Button>
                                    </div>

                                    {/* <div className="pb-48">

                                        <div className="pb-16 flex items-center">
                                            <Icon className="mr-16" color="action">attach_money</Icon>
                                            <Typography className="h2" color="textSecondary">Payment</Typography>
                                        </div>

                                        <div className="table-responsive">
                                            <table className="simple">
                                                <thead>
                                                    <tr>
                                                        <th>TransactionID</th>
                                                        <th>Payment Method</th>
                                                        <th>Amount</th>
                                                        <th>Date</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <span className="truncate">
                                                                {order.payment.transactionId}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <span className="truncate">
                                                                {order.payment.method}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <span className="truncate">
                                                                {order.payment.amount}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <span className="truncate">
                                                                {order.payment.date}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    <div className="pb-48">

                                        <div className="pb-16 flex items-center">
                                            <Icon className="mr-16" color="action">local_shipping</Icon>
                                            <Typography className="h2" color="textSecondary">Shipping</Typography>
                                        </div>

                                        <div className="table-responsive">
                                            <table className="simple">
                                                <thead>
                                                    <tr>
                                                        <th>Tracking Code</th>
                                                        <th>Carrier</th>
                                                        <th>Weight</th>
                                                        <th>Fee</th>
                                                        <th>Date</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {order.shippingDetails.map(shipping => (
                                                        <tr key={shipping.date}>
                                                            <td>
                                                                <span className="truncate">
                                                                    {shipping.tracking}
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <span className="truncate">
                                                                    {shipping.carrier}
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <span className="truncate">
                                                                    {shipping.weight}
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <span className="truncate">
                                                                    {shipping.fee}
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <span className="truncate">
                                                                    {shipping.date}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div> */}
                                </div>
                            )}
                            {/*Products*/}
                            {tabValue === 1 &&
                            (
                                <div className="table-responsive">
                                    <table className="simple">
                                        <thead>
                                            <tr>
                                                {/* <th>ID</th>
                                                <th>Image</th> */}
                                                <th>Product Name</th>
                                                {/* <th>Description</th> */}
                                                <th>Unit Price</th>
                                                <th>Quantity</th>
                                                <th>Dicount</th>
                                                <th>Total Cost</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {order.products.map(product => (
                                                <tr key={product.productId}>
                                                    {/* <td className="w-64">
                                                        {product.id}
                                                    </td> */}
                                                    {/* <td className="w-80">
                                                        <img className="product-image" src={product.image} alt="product"/>
                                                    </td> */}
                                                    <td className='w-64 text-left'>
                                                        <Typography
                                                            component={Link}
                                                            to={'/apps/product/edit/'+product.productId}
                                                            className="truncate"
                                                            style={{
                                                                color         : 'inherit',
                                                                textDecoration: 'underline'
                                                            }}
                                                        >
                                                            {product.name}
                                                        </Typography>
                                                    </td>
                                                    {/* <td className="w-32 text-left" style={{whiteSpace:'normal',wordWrap:'break-word'}}>
                                                        <span className="truncate" >
                                                            {product.description}
                                                        </span>
                                                    </td> */}
                                                    <td className="w-64 text-left" >
                                                        <span className="truncate">
                                                            OMR {product.unitPrice}
                                                        </span>
                                                    </td>
                                                    <td className="w-64 text-left">
                                                        <span className="truncate">
                                                            {product.quantity}
                                                        </span>
                                                    </td>
                                                    <td className="w-64 text-left">
                                                        <span className="truncate">
                                                            {product.discount}%
                                                        </span>
                                                    </td>
                                                    <td className="w-64 text-left">
                                                        <span className="truncate">
                                                            OMR {product.totalCost}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>

                                </div>
                            )}
                            {/*Invoice*/}
                            {tabValue === -2 &&
                            (
                                <OrderInvoice order={order}/>
                            )}
                        </div>
                    )
                }
                innerScroll
            />
        )
    };
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getOrder : Actions.getOrder,
        saveOrder: Actions.saveOrder,
        addComment:Actions.addComment
    }, dispatch);
}

function mapStateToProps({eCommerceApp, auth})
{
    return {
        order: eCommerceApp.order,
        auth:auth
    }
}

export default withReducer('eCommerceApp', reducer)(withRouter(connect(mapStateToProps, mapDispatchToProps)(Order)));
