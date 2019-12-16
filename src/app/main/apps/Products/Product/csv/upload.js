import React, {Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {withStyles} from '@material-ui/core';
import {FusePageSimple,FuseChipSelect} from '@fuse';
import ImgButton from '@material-ui/core/Button';
import { Button, Checkbox, Typography } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import * as Actions from '../../store/actions';
import { Link } from 'react-router-dom';
import axios from 'axios';
import _ from '@lodash';
import Terms from '../TermsConditions';
import { serviceApiUrl } from 'app/config';

const styles = theme => ({
    layoutRoot: {}
});

class Upload extends Component {
    state = {
        openTerm:false,
        isTermsChecked:false,
        file:'',
        //listingType:'service',
        form:{
            categories:[],
            listingType:'service'
        }
    }

    handleOpenTerm = (e) => {
        e.preventDefault();
     this.setState({ openTerm: true });
   };
 
    handleCloseTerm = () => {
     this.setState({ openTerm: false });
   };

   ConfirmTerms = (e) => {
       this.setState({ isTermsChecked:e.target.checked })
   }

   handleChange = (event) => {   
    if(event.target.name === 'listingType'){
        this.props.getCats(event.target.value);
    }
    this.setState({form: _.set({...this.state.form}, event.target.name, event.target.value )});
    }

    handleChipChange = (value, name) => {
        this.setState({form: _.set({...this.state.form}, name, value.map(item => item.value))});
    };

   UploadCSV = (e) => {
    this.setState( { isTermsChecked:false })
    const { file } = this.state;
    if(file !== null && file !== ''){
        const data = new FormData();
            data.append('file', this.state.file)
            data.append('listingType', this.state.form.listingType)
            data.append('categories', this.state.form.categories)
            data.append('uuid', this.props.user._id)
            axios.post( serviceApiUrl + '/product/csvimport', data).then( response => {
                    alert(response.data.message);
                    this.setState({ file:'',form:{ categories:[],listingType:''}, isTermsChecked:false })
                    this.props.closeCSV()
            })
    }else{
        alert('Please select csv file')
     }       
   }

    addFile = (event) => {
        
        if (event.target.files && event.target.files[0]) {
            this.setState({ file: event.target.files[0]})
        }
    }   

    render()
    {
        const {classes} = this.props;
        const { isTermsChecked, form } = this.state;       
        return (
            <FusePageSimple
                classes={{
                    root: classes.layoutRoot
                }}
                // header={
                //    <div>
                //         <div className="p-24"><h4>CSV Export</h4></div>
                       
                //    </div> 
                // }                
                content={
                    <div>
                    <Terms 
                            open = { this.state.openTerm }
                            onClose = { this.handleCloseTerm } 
                    />
                    <div className="p-16 sm:p-24 max-w-2xl" style={{ margin:0,textAlign:'center' }}>

                                    <FormControl component="fieldset">
                                        <FormLabel component="legend">Listing Type</FormLabel>
                                        <RadioGroup aria-label="listing Type" name="listingType" value = { form.listingType } onChange={ (e) => this.handleChange(e) }>
                                            <FormControlLabel value="service" control={<Radio />} label="Service" />
                                            <FormControlLabel value="product" control={<Radio />} label="Product" />                     
                                        </RadioGroup>
                                    </FormControl>  
                                    <FuseChipSelect
                                        className="mt-8 mb-24"
                                        value= {
                                            form.categories.map( (item, index) => ({
                                                value: item,
                                                label: item,
                                               // key: index,
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
                                        <input
                                            accept="csv/*"
                                            className={classes.input}
                                            id="contained-button-file"
                                            multiple
                                            type="file"
                                            hidden
                                            onChange = { (e) => { this.addFile(e) } }
                                        />                                        
                                        <label htmlFor="contained-button-file">
                                            <ImgButton variant="contained" component="span" className={classes.button} >
                                                    Upload
                                            </ImgButton>
                                        </label>
                                        <Typography variant="h6" component="h6">
                                            { this.state.file.name }
                                        </Typography>
                                        <div style={{paddingTop:"25px"}}>
                                            <Checkbox                                    
                                                disableRipple
                                                color="default"
                                                onChange = { (e)=> { this.ConfirmTerms(e) } }  
                                                checked = { isTermsChecked }               
                                            />                                            
                                            <span  style={{ paddingRight:"15px" }} > Please accept <Link to="" style={{ color:'deepSkyBlue' }} onClick={ (e) =>{ this.handleOpenTerm(e) } } >Terms & Conditions</Link></span>    
                                            <Button 
                                                variant="contained"
                                                className='primary'
                                                disabled={ !isTermsChecked }
                                                onClick={ () => { this.UploadCSV() } }                                      
                                            >
                                            Submit
                                            </Button>
                                                                                      
                                        </div>
                                        
                    </div>
                    </div>
                }
            />
        )
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({           
        getCats : Actions.getCats
    }, dispatch);
}

function mapStateToProps({ProductsApp,auth})
{
    return {      
        product: ProductsApp.product,
        user: auth.user,   
    }
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps,mapDispatchToProps)(Upload));