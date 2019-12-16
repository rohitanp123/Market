import React, {Component} from 'react';
import {withStyles, Button, Tab, Tabs,/*TextField, InputAdornment,*/ Icon, Typography } from '@material-ui/core';
import {FuseAnimate, FusePageCarded, /*FuseChipSelect*/} from '@fuse';
import {orange} from '@material-ui/core/colors';
import {Link, withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
//import classNames from 'classnames';
import _ from '@lodash';
import withReducer from 'app/store/withReducer';
import * as Actions from '../../store/actions';
import reducer from '../../store/reducers';
import Divider from '@material-ui/core/Divider';



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
    }

    updateFormState = () => {
        this.setState({form: this.props.product.data})
    };


    updateProductState = () => {
        const params = this.props.match.params;
        this.props.getProduct(params);

        /*const params = this.props.match.params;
        const {productId} = params;       
        if ( productId === 'new' )
        {
            this.props.newProduct();            
        }  else {
            this.props.getProduct(params);
        }*/     
    };

    handleChangeTab = (event, tabValue) => {
        this.setState({tabValue});
    };

    handleFieldChange = (event) => {
            const { Fields } = this.state.form;
            const currentFieldRowIndex = Fields.findIndex( (field, index) => {
                return 'lable '+ index.toString() === event.target.name||
                        'value '+ index.toString() === event.target.name
            });          
            const NewFields = Fields.map( (field, index) => {
                if(currentFieldRowIndex === index){                    
                  if(event.target.name.indexOf('value')>-1)
                  field.valueField.fieldvalue = event.target.value;
                if(event.target.name.indexOf('lable')>-1)                
                    field.labelField.fieldvalue = event.target.value;
                }         
                return field;
            });      
            
            this.setState( prevState => (
                { form: {...prevState.form, Fields: NewFields } }
            ));       
        
    }

    handleChange = (event) => {        
        this.setState({form: _.set({...this.state.form}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value)});
    };

    handleChipChange = (value, name) => {
        this.setState({form: _.set({...this.state.form}, name, value.map(item => item.value))});
    };

    setFeaturedImage = (id) => {
        this.setState({form: _.set({...this.state.form}, 'featuredImageId', id)});
    };

    canBeSubmitted()
    {
        const {name} = this.state.form;
        return (
            name.length > 0 &&
            !_.isEqual(this.props.product.data, this.state.form)
        );
    }

    render()
    {
        const {/*classes,*/ saveProduct} = this.props;
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
                                    <Typography className="normal-case flex items-center sm:mb-12" component={Link} role="button" to="/apps/Enquiry">
                                        <Icon className="mr-4 text-20">arrow_back</Icon>
                                        Enquiries
                                    </Typography>
                                </FuseAnimate>

                                <div className="flex items-center max-w-full">                                    
                                    <div className="flex flex-col min-w-0">                                       
                                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                            <Typography variant="caption">Enquiry Detail</Typography>
                                        </FuseAnimate>
                                    </div>
                                </div>
                            </div>
                            <FuseAnimate animation="transition.slideRightIn" delay={300}>
                                <Button
                                    className="whitespace-no-wrap"
                                    variant="contained"
                                    disabled={!this.canBeSubmitted()}
                                    onClick={() => saveProduct(form)}
                                >
                                    Save
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
                        <Tab className="h-64 normal-case" label="Products"/>
                        {/* <Tab className="h-64 normal-case" label="Enquiries"/> */}
                        {/* <Tab className="h-64 normal-case" label="Product Images"/>
                        <Tab className="h-64 normal-case" label="Pricing"/>
                        <Tab className="h-64 normal-case" label="Inventory"/>
                        <Tab className="h-64 normal-case" label="Shipping"/>
                        <Tab className="h-64 normal-case" label="Others"/> */}
                    </Tabs>
                }
                content={
                    form && (
                        <div className="p-16 sm:p-24 max-w-2xl">
                            {tabValue === 0 &&
                            (
                                <div>
                                    <div>
                                        <span>Enquiry</span> 
                                            <br/>
                                            <br/>
                                        <span>Description...</span>                                   
                                    </div>
                                    <Divider/>
                                    <br/>
                                    <div>
                                        <span>{ form.name }</span> 
                                            <br/>
                                            <br/>
                                        <span>{ form.description }</span>                                   
                                    </div>
                                    <br/>
                                    <br/>
                                    <div>
                                        <span>{ form.name }</span> 
                                            <br/>
                                            <br/>
                                        <span>{ form.description }</span>                                   
                                    </div>
                                </div>
                            )}
                            {tabValue === 1 && (
                                <div>
                                <table className="mb-16">
                                    <tbody>
                                        <tr>
                                            <td className="pr-16 pb-4">
                                                <Typography className="font-light" variant="h6" color="textSecondary">
                                                    INVOICE
                                                </Typography>
                                            </td>
                                            <td className="pb-4">
                                                <Typography className="font-light" variant="h6" color="inherit">
                                                    Test
                                                </Typography>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                                <Typography color="textSecondary">
                                    Test
                                </Typography>

                              
                                    <Typography color="textSecondary">
                                    Test
                                    </Typography>
                                
                                
                                    <Typography color="textSecondary">
                                    Test
                                    </Typography>
                                
                                
                                    <Typography color="textSecondary">
                                    Test
                                    </Typography>
                                
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
        saveProduct: Actions.saveProduct
    }, dispatch);
}

function mapStateToProps({EnquiryApp})
{
    return {
        product: EnquiryApp.product
    }
}

export default withReducer('EnquiryApp', reducer)(withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(Product))));
