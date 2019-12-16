import React, {Component} from 'react';
import {withStyles, Button, Tab, Tabs,Icon, Typography} from '@material-ui/core';
import {FuseAnimate, FusePageCarded} from '@fuse';
import {orange} from '@material-ui/core/colors';
import {Link, withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import classNames from 'classnames';
import _ from '@lodash';
import withReducer from 'app/store/withReducer';
import * as Actions from '../../store/actions';
import reducer from '../../store/reducers';

const styles = theme => ({
    productImageFeaturedStar: {
        position: 'absolute',
        top     : 0,
        right   : 0,
        color   : orange[400],
        opacity : 0
    },
    productImageItem        : {
        transitionProperty      : 'box-shadow',
        transitionDuration      : theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut,
        '&:hover'               : {
            boxShadow                    : theme.shadows[5],
            '& $productImageFeaturedStar': {
                opacity: .8
            }
        },
        '&.featured'            : {
            pointerEvents                      : 'none',
            boxShadow                          : theme.shadows[3],
            '& $productImageFeaturedStar'      : {
                opacity: 1
            },
            '&:hover $productImageFeaturedStar': {
                opacity: 1
            }
        }
    }
});

class Product extends Component {

    state = {
        tabValue: 0,
        form    : null,
    };

    componentDidMount()
    {
        this.updateProductState();
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        if ( !_.isEqual(this.props.location, prevProps.location) )
        {
            this.updateProductState();
        }

        if (
            (this.props.product.data && !this.state.form) ||
            (this.props.product.data && this.state.form && this.props.product.data.id !== this.state.form.id)
        )
        {
            this.updateFormState();
        }
        if(this.state.form && this.state.form.images)
        console.log(this.state.form.images);
    }

    updateFormState = () => {
        this.setState({form: this.props.product.data})
    };
   updateProductState = () => {

        //this.props.newProduct();

        const params = this.props.match.params;
        //const {productId} = params;       
       
        this.props.getProduct(params);
        this.props.getCats(this.props.user.uuid);
          
    };

    handleChangeTab = (event, tabValue) => {
        this.setState({tabValue});
    };
  
    canBeSubmitted()
    {
        const {name} = this.state.form;
        return (
            name.length > 0 &&
            !_.isEqual(this.props.product.data, this.state.form)
        );
    }

    goToEditProduct = () => {
        const params = this.props.match.params;
        this.props.history.push('/apps/product/edit/' + params.productId);
    }

    renderFields = () => {
        const { additionalFields } = this.state.form;     
        if(additionalFields)   
        return (  
            <div className="table-responsive mb-16">
                    <table className="simple" style={{ width:"60%" }}>                                                    
                        <tbody>  
                            {additionalFields.map( (field, index)  => {               
                                let lableFieldvalue = field.labelField.fieldvalue || '';
                                let valueFieldvalue = field.valueField.fieldvalue || '';            
                                
                                return (
                                    
                                            <tr key = { index }>
                                                <td>
                                                    <div className="flex items-center">                                                                    
                                                        <Typography className="truncate">
                                                            {lableFieldvalue}
                                                        </Typography>
                                                    </div>
                                                </td>
                                                <td>
                                                <Typography className="truncate" >{valueFieldvalue}</Typography>
                                                </td>                                                            
                                        </tr>     
                                    )
                            })}                                                                                                                                        
                        </tbody>
                    </table>
             </div> )   
    }

    render()
    {
        const {classes} = this.props;
        const {tabValue, form} = this.state;

        return (
            <FusePageCarded
                classes={{
                    toolbar: "p-0",
                    header : "min-h-72 h-72 sm:h-136 sm:min-h-136"
                }}
                header={
                    form && (
                        <div className="flex flex-1 w-full items-center justify-between">

                            <div className="flex flex-col items-start max-w-full">

                                <FuseAnimate animation="transition.slideRightIn" delay={300}>
                                    <Typography className="normal-case flex items-center sm:mb-12" component={Link} role="button" to="/apps/products">
                                        <Icon className="mr-4 text-20">arrow_back</Icon>
                                        Products
                                    </Typography>
                                </FuseAnimate>

                                <div className="flex items-center max-w-full">
                                     <FuseAnimate animation="transition.expandIn" delay={300}>
                                        {(form.images.length > 0 && _.find(form.images, {isFeatured: true})) ? (
                                            <img className="w-32 sm:w-48 mr-8 sm:mr-16 rounded" src={_.find(form.images, {isFeatured: true}).url} alt={form.name}/>
                                        ) : (
                                            <img className="w-32 sm:w-48 mr-8 sm:mr-16 rounded" src="assets/images/ecommerce/product-image-placeholder.png" alt={form.name}/>
                                        )}
                                    </FuseAnimate> 
                                    <div className="flex flex-col min-w-0">
                                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                            <Typography className="text-16 sm:text-20 truncate">
                                                {form.name ? form.name : 'New Product'}
                                            </Typography>
                                        </FuseAnimate>
                                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                            <Typography variant="caption">Product Detail</Typography>
                                        </FuseAnimate>
                                    </div>
                                </div>
                            </div>    
                            <FuseAnimate animation="transition.slideRightIn" delay={300}>
                                <Button
                                    className="whitespace-no-wrap"
                                    variant="contained"                                   
                                    onClick={() => this.goToEditProduct()}
                                >
                                    Edit
                                </Button>
                            </FuseAnimate>                    
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
                        <Tab className="h-64 normal-case" label="Basic Info"/>
                        <Tab className="h-64 normal-case" label="Product Images"/>
                        <Tab className="h-64 normal-case" label="Pricing"/>
                        <Tab className="h-64 normal-case" label="Inventory"/>
                        <Tab className="h-64 normal-case" label="Shipping"/>
                        <Tab className="h-64 normal-case" label="Addional Fields"/>
                    </Tabs>
                }
                content={
                    form && (
                        <div className="p-16 sm:p-24 max-w-2xl">
                            {tabValue === 0 &&
                            (
                                <div>

                                            <div className="table-responsive mb-16">
                                                <table className="simple" style={{ width:"60%" }}>                                                    
                                                    <tbody>                                                
                                                        <tr>
                                                            <td>
                                                                <div className="flex items-center">                                                                    
                                                                    <Typography className="truncate">
                                                                        Name
                                                                    </Typography>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <Typography className="truncate" >{ form.name }</Typography>
                                                            </td>                                                            
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <div className="flex items-center">                                                                    
                                                                    <Typography className="truncate">
                                                                    Description
                                                                    </Typography>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <Typography className="truncate" >{ form.description }</Typography>
                                                            </td>                                                            
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <div className="flex items-center">                                                                    
                                                                    <Typography className="truncate">
                                                                    Categories
                                                                    </Typography>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <Typography className="truncate" >{ form.categories.join(", ") }</Typography>
                                                            </td>                                                            
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <div className="flex items-center">                                                                    
                                                                    <Typography className="truncate">
                                                                    Tags
                                                                    </Typography>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <Typography className="truncate" >{ form.tags.join(", ") }</Typography>
                                                            </td>                                                            
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <div className="flex items-center">                                                                    
                                                                    <Typography className="truncate">
                                                                    Listing Type
                                                                    </Typography>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <Typography className="truncate" >{ form.listingType }</Typography>
                                                            </td>                                                            
                                                        </tr>                                        
                                                    </tbody>
                                                </table>
                                            </div>   
                                </div>
                            )}
                            {tabValue === 1 && (
                                <div>
                                    <div className="flex justify-center sm:justify-start flex-wrap">                                  
                                        
                                        <div className="flex justify-center sm:justify-start flex-wrap" >
                                            {form.images.map(media => (
                                                <div
                                                    onClick={() => this.setFeaturedImage(media.id)}
                                                    className={
                                                        classNames(
                                                            classes.productImageItem,
                                                            "flex items-center justify-center relative w-128 h-128 rounded-4 mr-16 mb-16 overflow-hidden cursor-pointer",
                                                            (media.isFeatured) && 'featured')
                                                    }
                                                    key={media.id}
                                                >
                                                    <Icon className={classes.productImageFeaturedStar}>star</Icon>
                                                    <img className="max-w-none w-auto h-full" src={media.url} alt="product"/>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                            {tabValue === 2 && (
                                <div>

                                <div className="table-responsive mb-16">
                                                <table className="simple" style={{ width:"60%" }}>                                                    
                                                    <tbody>                                                
                                                        <tr>
                                                            <td>
                                                                <div className="flex items-center">                                                                    
                                                                    <Typography className="truncate">
                                                                        Price
                                                                    </Typography>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <Typography className="truncate" >{ form.price }</Typography>
                                                            </td>                                                            
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <div className="flex items-center">                                                                    
                                                                    <Typography className="truncate">
                                                                    Discount
                                                                    </Typography>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <Typography className="truncate" >{ form.discount }</Typography>
                                                            </td>                                                            
                                                        </tr>                                                                                               
                                                    </tbody>
                                                </table>
                                            </div>  
                                </div>
                            )}
                            {tabValue === 3 && (
                                <div>
                                            <div className="table-responsive mb-16">
                                                <table className="simple" style={{ width:"60%" }}>                                                    
                                                    <tbody>                                                
                                                        <tr>
                                                            <td>
                                                                <div className="flex items-center">                                                                    
                                                                    <Typography className="truncate">
                                                                        Quantity
                                                                    </Typography>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <Typography className="truncate" >{ form.quantity }</Typography>
                                                            </td>                                                            
                                                        </tr>                                                                                                                                                      
                                                    </tbody>
                                                </table>
                                            </div>                     
                                </div>
                            )}
                            {tabValue === 4 && (
                                <div>
                                            <div className="table-responsive mb-16">
                                                <table className="simple" style={{ width:"60%" }}>                                                    
                                                    <tbody>                                                
                                                        <tr>
                                                            <td>
                                                                <div className="flex items-center">                                                                    
                                                                    <Typography className="truncate">
                                                                        Width
                                                                    </Typography>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <Typography className="truncate" >{ form.width }</Typography>
                                                            </td>                                                            
                                                        </tr>  
                                                        <tr>
                                                            <td>
                                                                <div className="flex items-center">                                                                    
                                                                    <Typography className="truncate">
                                                                        Height
                                                                    </Typography>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <Typography className="truncate" >{ form.height }</Typography>
                                                            </td>                                                            
                                                        </tr> 
                                                        <tr>
                                                            <td>
                                                                <div className="flex items-center">                                                                    
                                                                    <Typography className="truncate">
                                                                        Depth
                                                                    </Typography>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <Typography className="truncate" >{ form.depth }</Typography>
                                                            </td>                                                            
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <div className="flex items-center">                                                                    
                                                                    <Typography className="truncate">
                                                                        Weight
                                                                    </Typography>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <Typography className="truncate" >{ form.weight }</Typography>
                                                            </td>                                                            
                                                        </tr>                                                                                                                                                       
                                                    </tbody>
                                                </table>
                                            </div>                                                                      
                                </div>
                            )}
                            {tabValue === 5 && (
                                <div>
                                     { this.renderFields() }
                                          
                                </div>
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
        getProduct : Actions.getProduct,
        saveEditProduct: Actions.saveEditProduct,
        getCats : Actions.getCats
    }, dispatch);
}

function mapStateToProps({ProductsApp,auth})
{
    return {
        product: ProductsApp.product,
        user: auth.user,
        categories: ProductsApp.categories
    }
}

export default withReducer('ProductsApp', reducer)(withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(Product))));
