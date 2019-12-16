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
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

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
        const { additionalFields } = this.state.form;
        if(!additionalFields || additionalFields.length <= 0){
            this.setState( (PrevState) => ({
                form: {...PrevState.form,  additionalFields:[first] } 
            }));
        }
        else {
            const isIdExist = additionalFields.findIndex(field => {
                return id === field.id
            })
                if(isIdExist > -1)
                    this.addField();
                else
                    this.setState( (PrevState) => (
                    {form: { ...PrevState.form, additionalFields:[...PrevState.form.additionalFields, first ]}} 
                    )); 
        }        
    }

    removeField = (indexCurrent) => {
        const NewFileds = this.state.form.additionalFields.filter( (fld,index) =>{
            return index !== indexCurrent
        })

        this.setState( (PrevState) => (
           {form: { ...PrevState.form, additionalFields:NewFileds}} 
        ));
    }

    renderFields = () => {
        const { additionalFields } = this.state.form;     
        if(additionalFields)   
        return (            
            additionalFields.map( (field, index)  => {
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

        //this.props.newProduct();

        const params = this.props.match.params;
        //const {productId} = params;       
       
        this.props.getProduct(params);
        //this.props.getCats(this.props.user.uuid);
        this.props.getCats(this.state.listingType);
          
    };

    handleChangeTab = (event, tabValue) => {
        this.setState({tabValue});
    };

    handleFieldChange = (event) => {
            const { additionalFields } = this.state.form;
            const currentFieldRowIndex = additionalFields.findIndex( (field, index) => {
                return 'lable '+ index.toString() === event.target.name||
                        'value '+ index.toString() === event.target.name
            });          
            const NewFields = additionalFields.map( (field, index) => {
                if(currentFieldRowIndex === index){                    
                  if(event.target.name.indexOf('value')>-1)
                  field.valueField.fieldvalue = event.target.value;
                if(event.target.name.indexOf('lable')>-1)                
                    field.labelField.fieldvalue = event.target.value;
                }         
                return field;
            });      
            
            this.setState( prevState => (
                { form: {...prevState.form, additionalFields: NewFields } }
            ));       
        
    }

    handleChange = (event) => { 

        if(event.target.name === 'listingType'){
            this.props.getCats(event.target.value);
        }
        
        
        if(event.target.name === 'discount' && event.target.value < 5){
            //event.preventDefault();
            alert('Discount can not be less than 5% \n Use arrow keys to change the discount');
        }else if(event.target.name === 'discount' && event.target.value > 20 ){
            //event.preventDefault();
            alert('Discount can not be greater than 20% \n Use arrow keys to change the discount');
        } else if ( event.target.name === 'price' && event.target.value !== "" && event.target.value < 1 ){
            alert('Price can not be less than 1 OMR');
        } else if(event.target.name === 'quantity' && event.target.value < 0){
            event.preventDefault();
            alert('Quantity should be greater than or equal to 0');
        }
        else{

            this.setState({form: _.set({...this.state.form}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value)});

        }
        //this.setState({form: _.set({...this.state.form}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value)});
    };

    handleChipChange = (value, name) => {
        this.setState({form: _.set({...this.state.form}, name, value.map(item => item.value))});
    };

    handleChipChangeCat = (value, name) => {
        
        this.setState({form: _.set({...this.state.form}, name, value)});
    };

    addImage = (event) => {
        
        if (event.target.files && event.target.files[0]) {
            const imgUrl = URL.createObjectURL(event.target.files[0]);
            const { images }  = this.state.form;
            const newImages = (images && images.length) ? [...images, { url:imgUrl }] : [{ url:imgUrl }];
            const newimgs = newImages.map( (img, index) => {
                return { id: ( img.id)?img.id:index.toString(), url:img.url, isFeatured:false }
            })    

              this.setState( prevState =>( {
                    form: {...prevState.form, images: newimgs }
                })
              );
          }
          
    }

    setFeaturedImage = (id) => {
        const { images } = this.state.form;
        if(images && images.length){
            // const findex = images.findIndex( img => {
            //     return img.id === id;
            // })

            // const tempImgs = [...images];
            const newImages = images.map( (img, index) => {
                if(img.id === id)
                return { id: img.id, url:img.url, isFeatured:true }
                else
                return { id: img.id, url:img.url, isFeatured:false }
            })

            this.setState( prevState =>( {
                form: {...prevState.form, images: newImages }
            })
          );
        }
        //this.setState({form: _.set({...this.state.form}, 'featuredImageId', id)});
    };

    canBeSubmitted()
    {
        const {name} = this.state.form;
        return (
            name.length > 0 &&
            !_.isEqual(this.props.product.data, this.state.form)
        );
    }

    saveEditProductData = (data) => {
        if(data.price === "" || data.price <=0 ){
            alert('Please add price')
        }else{
        this.props.saveEditProduct(data)
      }
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
                                    disabled={!this.canBeSubmitted()}
                                    onClick={() => this.saveEditProductData(form)}
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
                        <Tab className="h-64 normal-case" label="Addional Fields"/>
                    </Tabs>
                }
                content={
                    form && (
                        <div className="p-16 sm:p-24 max-w-2xl">
                            {tabValue === 0 &&
                            (
                                <div>
                                    <input type='hidden' name="uuid" value={this.props.user.uuid} ></input>
                                    <FormControl component="fieldset">
                                        <FormLabel component="legend">Listing Type</FormLabel>
                                        <RadioGroup aria-label="listing Type" name="listingType" value = { form.listingType } onChange={ (e) => this.handleChange(e) }>
                                            <FormControlLabel value="service" control={<Radio />} label="Service" />
                                            <FormControlLabel value="product" control={<Radio />} label="Product" />                     
                                        </RadioGroup>
                                    </FormControl>
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
                                        value= {
                                            form.categories.map(item => ({
                                                 value: item,
                                                 label: item
                                                // value: item.label,
                                                // label: item.label,
                                                // key: item.id,
                                                // id:item.id,
                                                // status:item.status,
                                                // description:item.description
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
                                         options = {this.props.product.categories}
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
                                        {/* <div className="flex flex-1" style={ { margin: '15px'}}>
                                            <input
                                                accept="image/*"
                                                className={classes.input}
                                                id="contained-button-file"
                                                multiple
                                                type="file"
                                                hidden
                                                onChange = { (e) => { this.addImage(e) } }
                                            />
                                            <label htmlFor="contained-button-file">
                                                <ImgButton variant="contained" component="span" className={classes.button}>
                                                        Upload
                                                </ImgButton>
                                            </label>
                                        </div> */}
                                        
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

                                <TextField
                                        className="mt-8 mb-16"
                                        label="Price"
                                        id="price"
                                        name="price"
                                        value={form.price}
                                        onChange={this.handleChange}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">OMR</InputAdornment>
                                        }}
                                        type="number"
                                        variant="outlined"
                                        autoFocus
                                        fullWidth
                                    />

                                    <TextField
                                        className="mt-8 mb-16"
                                        label="Discount"
                                        id="discount"
                                        name="discount"
                                        value={form.discount}
                                        onChange={this.handleChange}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">%</InputAdornment>
                                        }}
                                        type="number"
                                        variant="outlined"
                                        fullWidth
                                        
                                    />

                                </div>
                            )}
                            {tabValue === 3 && (
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
                                        hidden
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
                            {tabValue === 4 && (
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
                                </div>
                            )}
                            {tabValue === 5 && (
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
