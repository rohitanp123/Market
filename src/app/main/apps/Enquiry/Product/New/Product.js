import React, {Component} from 'react';
import {withStyles, Button, Tab, Tabs,TextField, InputAdornment, Icon, Typography} from '@material-ui/core';
import {FuseAnimate, FusePageCarded, FuseChipSelect} from '@fuse';
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
    }

    updateFormState = () => {
        this.setState({form: this.props.product.data})
    };


    addField = () => {
        var id  = Math.round(Math.random() * 20);    
        let first = { id,
                        labelField: {            
                            fieldType:'text',
                            fieldvalue:''
                        },
                        valueField: {
                            fieldType:'text',
                            fieldvalue:''
                        }
                    }
        const { Fields } = this.state.form;
        if(!Fields || Fields.length <= 0){
            this.setState( (PrevState) => ({
                form: {...PrevState.form,  Fields:[first] } 
            }));
        }
        else {
            const isIdExist = Fields.findIndex(field => {
                return id === field.id
            })
                if(isIdExist > -1)
                    this.addField();
                else
                    this.setState( (PrevState) => (
                    {form: { ...PrevState.form, Fields:[...PrevState.form.Fields, first ]}} 
                    )); 
        }        
    }

    removeField = (indexCurrent) => {
        const NewFileds = this.state.form.Fields.filter( (fld,index) =>{
            return index !== indexCurrent
        })

        this.setState( (PrevState) => (
           {form: { ...PrevState.form, Fields:NewFileds}} 
        ));
    }

    renderFields = () => {
        const { Fields } = this.state.form;     
        if(Fields)   
        return (            
            Fields.map( (field, index)  => {
                let lableFieldId = "lable " + index.toString();
                let valueFieldId = "value " + index.toString();
                let lableFieldvalue = field.labelField.fieldvalue || '';
                let valueFieldvalue = field.valueField.fieldvalue || '';            
                
                return (
                    <div className="flex" key = { index }>                        
                        <TextField                        
                        className="mt-8 mb-16 mr-8"
                        label={lableFieldId}
                        id={lableFieldId}
                        name={lableFieldId}
                        value={lableFieldvalue}
                        onChange={this.handleFieldChange}
                        variant="outlined"
                        fullWidth
                        />
                        <TextField                        
                        className="mt-8 mb-16 mr-8"
                        label={valueFieldId}
                        id={valueFieldId}
                        name={valueFieldId}
                        value={valueFieldvalue}
                        onChange={this.handleFieldChange}
                        variant="outlined"
                        fullWidth
                        />
                        <div className="flex mt-8 mb-16 mr-8">
                        <FuseAnimate animation="transition.slideRightIn" delay={300}>                                    
                                            <Button
                                            className="whitespace-no-wrap"                                    
                                            variant="contained"                                   
                                            onClick={()=> {this.removeField(index)}}
                                            >
                                            Remove -
                                            </Button>                                        
                        </FuseAnimate>
                        </div>
                    </div>)
            })                   
        )
    }

    updateProductState = () => {

        this.props.newProduct();

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
        const {classes, saveProduct} = this.props;
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
                                        {form.images.length > 0 ? (
                                            <img className="w-32 sm:w-48 mr-8 sm:mr-16 rounded" src={_.find(form.images, {id: form.featuredImageId}).url} alt={form.name}/>
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
                        <Tab className="h-64 normal-case" label="Basic Info"/>
                        <Tab className="h-64 normal-case" label="Product Images"/>
                        <Tab className="h-64 normal-case" label="Pricing"/>
                        <Tab className="h-64 normal-case" label="Inventory"/>
                        <Tab className="h-64 normal-case" label="Shipping"/>
                        <Tab className="h-64 normal-case" label="Others"/>
                    </Tabs>
                }
                content={
                    form && (
                        <div className="p-16 sm:p-24 max-w-2xl">
                            {tabValue === 0 &&
                            (
                                <div>

                                    <TextField
                                        className="mt-8 mb-16"
                                        error={form.name === ''}
                                        required
                                        label="Name"
                                        autoFocus
                                        id="name"
                                        name="name"
                                        value={form.name}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        fullWidth
                                    />

                                    <TextField
                                        className="mt-8 mb-16"
                                        id="description"
                                        name="description"
                                        onChange={this.handleChange}
                                        label="Description"
                                        type="text"
                                        value={form.description}
                                        multiline
                                        rows={5}
                                        variant="outlined"
                                        fullWidth
                                    />

                                    <FuseChipSelect
                                        className="mt-8 mb-24"
                                        value={
                                            form.categories.map(item => ({
                                                value: item,
                                                label: item
                                            }))
                                        }
                                        onChange={(value) => this.handleChipChange(value, 'categories')}
                                        placeholder="Select multiple categories"
                                        textFieldProps={{
                                            label          : 'Categories',
                                            InputLabelProps: {
                                                shrink: true
                                            },
                                            variant        : 'outlined'
                                        }}
                                        isMulti
                                    />

                                    <FuseChipSelect
                                        className="mt-8 mb-16"
                                        value={
                                            form.tags.map(item => ({
                                                value: item,
                                                label: item
                                            }))
                                        }
                                        onChange={(value) => this.handleChipChange(value, 'tags')}
                                        placeholder="Select multiple tags"
                                        textFieldProps={{
                                            label          : 'Tags',
                                            InputLabelProps: {
                                                shrink: true
                                            },
                                            variant        : 'outlined'
                                        }}
                                        isMulti
                                    />
                                </div>
                            )}
                            {tabValue === 1 && (
                                <div>
                                    <div className="flex justify-center sm:justify-start flex-wrap">
                                        {form.images.map(media => (
                                            <div
                                                onClick={() => this.setFeaturedImage(media.id)}
                                                className={
                                                    classNames(
                                                        classes.productImageItem,
                                                        "flex items-center justify-center relative w-128 h-128 rounded-4 mr-16 mb-16 overflow-hidden cursor-pointer",
                                                        (media.id === form.featuredImageId) && 'featured')
                                                }
                                                key={media.id}
                                            >
                                                <Icon className={classes.productImageFeaturedStar}>star</Icon>
                                                <img className="max-w-none w-auto h-full" src={media.url} alt="product"/>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {tabValue === -1 && (
                                <div>

                                    <TextField
                                        className="mt-8 mb-16"
                                        label="Tax Excluded Price"
                                        id="priceTaxExcl"
                                        name="priceTaxExcl"
                                        value={form.priceTaxExcl}
                                        onChange={this.handleChange}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">$</InputAdornment>
                                        }}
                                        type="number"
                                        variant="outlined"
                                        autoFocus
                                        fullWidth
                                    />

                                    <TextField
                                        className="mt-8 mb-16"
                                        label="Tax Included Price"
                                        id="priceTaxIncl"
                                        name="priceTaxIncl"
                                        value={form.priceTaxIncl}
                                        onChange={this.handleChange}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">$</InputAdornment>
                                        }}
                                        type="number"
                                        variant="outlined"
                                        fullWidth
                                    />


                                    <TextField
                                        className="mt-8 mb-16"
                                        label="Tax Rate"
                                        id="taxRate"
                                        name="taxRate"
                                        value={form.taxRate}
                                        onChange={this.handleChange}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">$</InputAdornment>
                                        }}
                                        type="number"
                                        variant="outlined"
                                        fullWidth
                                    />

                                    <TextField
                                        className="mt-8 mb-16"
                                        label="Compared Price"
                                        id="comparedPrice"
                                        name="comparedPrice"
                                        value={form.comparedPrice}
                                        onChange={this.handleChange}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">$</InputAdornment>
                                        }}
                                        type="number"
                                        variant="outlined"
                                        fullWidth
                                        helperText="Add a compare price to show next to the real price"
                                    />

                                </div>
                            )}
                            {tabValue === 2 && (
                                <div>

                                    <TextField
                                        className="mt-8 mb-16"
                                        required
                                        label="SKU"
                                        autoFocus
                                        id="sku"
                                        name="sku"
                                        value={form.sku}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        fullWidth
                                    />

                                    <TextField
                                        className="mt-8 mb-16"
                                        label="Quantity"
                                        id="quantity"
                                        name="quantity"
                                        value={form.quantity}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        type="number"
                                        fullWidth
                                    />
                                </div>
                            )}
                            {tabValue === 3 && (
                                <div>
                                    <div className="flex">
                                        <TextField
                                            className="mt-8 mb-16 mr-8"
                                            label="Width"
                                            autoFocus
                                            id="width"
                                            name="width"
                                            value={form.width}
                                            onChange={this.handleChange}
                                            variant="outlined"
                                            fullWidth
                                        />

                                        <TextField
                                            className="mt-8 mb-16 mr-8"
                                            label="Height"
                                            id="height"
                                            name="height"
                                            value={form.height}
                                            onChange={this.handleChange}
                                            variant="outlined"
                                            fullWidth
                                        />

                                        <TextField
                                            className="mt-8 mb-16 mr-8"
                                            label="Depth"
                                            id="depth"
                                            name="depth"
                                            value={form.depth}
                                            onChange={this.handleChange}
                                            variant="outlined"
                                            fullWidth
                                        />

                                    </div>

                                    <TextField
                                        className="mt-8 mb-16"
                                        label="Weight"
                                        id="weight"
                                        name="weight"
                                        value={form.weight}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        fullWidth
                                    />

                                    <TextField
                                        className="mt-8 mb-16"
                                        label="Extra Shipping Fee"
                                        id="extraShippingFee"
                                        name="extraShippingFee"
                                        value={form.extraShippingFee}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">$</InputAdornment>
                                        }}
                                        fullWidth
                                    />

                                </div>
                            )}
                            {tabValue === 4 && (
                                <div>
                                { this.renderFields() }
                                    <FuseAnimate animation="transition.slideRightIn" delay={300}>
                                    <div style = {{ "margin-bottom": 10}}>
                                            <Button
                                            className="whitespace-no-wrap"                                    
                                            variant="contained"                                   
                                            onClick={()=> {this.addField()}}
                                            >
                                            Add +
                                            </Button>
                                        </div>
                                    </FuseAnimate>        
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
        newProduct : Actions.newProduct,
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
