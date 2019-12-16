import React, {Component} from 'react';
import Formsy from 'formsy-react';
import {TextFieldFormsy } from '@fuse';
import {Button, InputAdornment, Icon} from '@material-ui/core';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';
import * as authActions from 'app/auth/store/actions';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import {Tab, Tabs, Typography, Tooltip } from '@material-ui/core';
import {FuseAnimate, FusePageCarded} from '@fuse';
import {Link, } from 'react-router-dom';
import reducer from 'app/store/reducers';
import withReducer from 'app/store/withReducer';
import GoogleMap from 'google-map-react';

function Marker({text})
{
    return (
        <Tooltip title={text} placement="top">
            <Icon className="text-red">place</Icon>
        </Tooltip>
    );
}

class JWTRegisterTab extends Component {

    state = {
        canSubmit: false,
        Language:'english',
        tabValue: 0,
        form:null,
        registrationDate:'',
        address1:'',
        address2:'',
        website:'',
        companyprofile:'',
        defaultLocation:{
            lat:23.5880,
            lng:58.3829
        },
        addressLocation:{   lat:23.5880,
                            lng:58.3829
        },
        userAddressChanged:false
    };   

    form = React.createRef();

    disableButton = () => {
        this.setState({canSubmit: false});
    };

    enableButton = () => {
        this.setState({canSubmit: true});
    };

      handleChange = (event) => {
       //setValue(event.target.value);
       console.log(event.target.value);
        this.setState({Language: event.target.value});
      }

      handleChangeDate = (event) => {
          this.setState({ registrationDate:event.target.value })
      }

      handleFieldChange = (event) => {
          console.log(this.state);
          this.setState({ [event.target.name]:event.target.value });
      }

    onSubmit = (model) => {
        model.Language = this.state.Language;
       model._id = this.props.match.params.smecatId;
       model.registrationDate =  (this.state.registrationDate)? this.state.registrationDate: this.props.register.user.registrationDate;
       model.userType = 'sme';
       if( this.state.userAddressChanged ){
        model.locationX = this.state.addressLocation.lat;
        model.locationY = this.state.addressLocation.lng;
       }
       this.props.updateSmeUser(model);
    };

    componentDidMount(){
        const params = this.props.match.params;
        console.log(params)
        this.props.getSmeUser(params)
    }

    componentDidUpdate(prevProps, prevState)
    {
        if ( this.props.register.error && (this.props.register.error.username || this.props.register.error.password || this.props.register.error.email) )
        {
            this.form.updateInputsWithError({
                ...this.props.register.error
            });

            this.props.register.error = null;
            this.disableButton();
        }

       

        return null;
    }

    onClickMapHandle =({x, y, lat, lng, event}) => {
        console.log(x, y, lat, lng, event)

        this.setState({             
        addressLocation:{
            lat:lat,
            lng:lng
        }, 
        userAddressChanged:true  })

        console.log(this.state.addressLocation);
    }
   

    render()
    {
        const {canSubmit} = this.state;
        const { Language, userAddressChanged } = this.state;
        const {tabValue} = this.state;
         const { user} = this.props.register;
         const { UserInfo } = this.props;
         if(user){
             let dt = new Date(user.registrationDate);
             console.log(dt.toDateString());
         }
        //const { user } = this.props.user;

        return (
            <FusePageCarded
                classes={{
                    toolbar: "p-0",
                    header : "min-h-72 h-72 sm:h-136 sm:min-h-136"
                }}
                header={
                    (
                        <div className="flex flex-1 w-full items-center justify-between" >

                            <div className="flex flex-col items-start max-w-full">

                                <FuseAnimate animation="transition.slideRightIn" delay={300}>
                                    <Typography className="normal-case flex items-center sm:mb-12" component={Link} role="button" to="/pages/profile">
                                        <Icon className="mr-4 text-20">arrow_back</Icon>
                                        My profile 
                                    </Typography>
                                </FuseAnimate>

                                <div className="flex items-center max-w-full">                                   
                                    <div className="flex flex-col min-w-0">
                                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                            <Typography className="text-16 sm:text-20 truncate">
                                                { 'Edit Profile' }
                                            </Typography>
                                        </FuseAnimate>
                                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                            <Typography variant="caption">Profile Detail</Typography>
                                        </FuseAnimate>
                                    </div>
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
                        <Tab className="h-64 normal-case" label="Basic Info"/>                       
                    </Tabs>
                }
                content={
                     (
                        <div className="p-16 sm:p-24 max-w-2xl" style = {{ textAlign:'center', width:'70%', margin:'auto'}}>
                            {tabValue === 0 && user &&
                            (
                                <Formsy
                                    onValidSubmit={this.onSubmit}
                                    onValid={this.enableButton}
                                    onInvalid={this.disableButton}
                                    ref={(form) => this.form = form}
                                    className="flex flex-col justify-center w-full"
                                >
                    {/* <TextFieldFormsy
                        className="mb-16"
                        type="text"
                        name="displayName"
                        label="Display name"
                        validations={{
                            minLength: 4
                        }}
                        validationErrors={{
                            minLength: 'Min character length is 4'
                        }}
                        InputProps={{
                            endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">person</Icon></InputAdornment>
                        }}
                        variant="outlined"
                        required
                    /> */}
                     <TextFieldFormsy
                        className="mb-16"
                        type="text"
                        name="userName"
                        label="Username"
                        value = { user.userName }
                        validations={{
                            minLength: 4
                        }}
                        validationErrors={{
                            minLength: 'Min character length is 4'
                        }}
                        InputProps={{
                            endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">person</Icon></InputAdornment>
                        }}
                        variant="outlined"
                        required
                        readonly
                        disabled
                    />

                    <TextFieldFormsy
                        className="mb-16"
                        type="text"
                        name="email"
                        label="Email"
                        value = { user.email }
                        validations="isEmail"
                        validationErrors={{
                            isEmail: 'Please enter a valid email'
                        }}
                        InputProps={{
                            endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">email</Icon></InputAdornment>
                        }}
                        variant="outlined"
                        required
                        disabled
                    />

                    {/* <TextFieldFormsy
                        className="mb-16"
                        type="password"
                        name="password"
                        label="Password"
                        value = { user.password }
                        validations="equalsField:password-confirm"
                        validationErrors={{
                            equalsField: 'Passwords do not match'
                        }}
                        InputProps={{
                            endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">vpn_key</Icon></InputAdornment>
                        }}
                        variant="outlined"
                        required
                    />

                    <TextFieldFormsy
                        className="mb-16"
                        type="password"
                        name="password-confirm"
                        label="Confirm Password"                        
                        validations="equalsField:password"
                        value = { user.password }
                        validationErrors={{
                            equalsField: 'Passwords do not match'
                        }}
                        InputProps={{
                            endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">vpn_key</Icon></InputAdornment>
                        }}
                        variant="outlined"
                        required
                    /> */}

                    <TextFieldFormsy
                        className="mb-16"
                        type="text"
                        name="smeName"
                        label="Commercial Registration Name"
                        value = { user.smeName }
                        validations={{
                            minLength: 4
                        }}
                        validationErrors={{
                            minLength: 'Min character length is 4'
                        }}
                        InputProps={{
                            endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">person</Icon></InputAdornment>
                        }}
                        variant="outlined"
                        required
                        disabled
                        hidden={ true }
                    />

                  

                    <TextFieldFormsy
                        className="mb-16"
                        type="text"
                        name="cr"
                        label="Commercial Registration Number"
                        value = { user.cr }
                        validations={{
                            minLength: 4
                        }}
                        validationErrors={{
                            minLength: 'Min character length is 4'
                        }}
                        InputProps={{
                            endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">person</Icon></InputAdornment>
                        }}
                        variant="outlined"
                        disabled
                        hidden                    
                    />
                    <TextField
                        id="registrationDate"
                        label="Commercial Registration Date"
                        type="date"
                        name="registrationDate"
                        onChange={(e) => this.handleChangeDate(e) }
                        //value = { user.registrationDate }
                        defaultValue={ (user.registrationDate)? user.registrationDate.split('T')[0] :'2017-05-17' }
                        //className={classes.textField}
                        InputLabelProps={{
                        shrink: true,
                        }}
                        disabled
                        hidden
                    />
<br/>
                    <TextFieldFormsy
                        className="mb-16"
                        type="text"
                        name="oabCustomerNumber"
                        label="OAB Account Number"
                        value = { user.oabCustomerNumber }
                        validations={{
                            minLength: 4
                        }}
                        validationErrors={{
                            minLength: 'Min character length is 4'
                        }}
                        InputProps={{
                            endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">person</Icon></InputAdornment>
                        }}
                        variant="outlined"
                        disabled
                        hidden                 
                    />

                    <FormControl component="fieldset">
                        <FormLabel component="legend">Language</FormLabel>
                        <RadioGroup aria-label="gender" name="gender1" value = {  Language } onChange={ (e) => this.handleChange(e) }>
                            <FormControlLabel value="english" control={<Radio />} label="English" />
                            <FormControlLabel value="arabic" control={<Radio />} label="Arabic" />                     
                        </RadioGroup>
                    </FormControl>

                    <TextFieldFormsy
                        className="mb-16"
                        type="text"
                        name="mobile"
                        label="Mobile"
                        value = { user.mobile }
                        validations={{
                            minLength: 4
                        }}
                        validationErrors={{
                            minLength: 'Min character length is 4'
                        }}
                        InputProps={{
                            endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">person</Icon></InputAdornment>
                        }}
                        variant="outlined"
                        disabled                      
                    />

                { UserInfo && UserInfo.role === 'sme' && <div style={{ display:'contents' }}>
                    <TextFieldFormsy
                        className="mb-16"
                        placeholder="Address 1"
                        multiline
                        name="address1"
                        label="Address 1"
                        value = { user.address1 }
                        variant="outlined"
                    />          

                    <TextFieldFormsy
                        className="mb-16"
                        placeholder="Address 1"
                        multiline
                        name="address2"
                        label="Address 2"
                        value = { user.address2 }
                        variant="outlined"
                    />

                    <TextFieldFormsy
                        className="mb-16"
                        placeholder="Address 1"
                        type="text"
                        name="city"
                        label="City"
                        value = { user.city }
                        variant="outlined"
                    />        

                   
                    <TextFieldFormsy
                        className="mb-16"
                        type="text"                       
                        name="postCode"
                        label="Post Code"
                        value = { user.postCode }               
                        variant="outlined"
                                              
                    />


                    <TextFieldFormsy
                        className="mb-16"
                        placeholder="Website"
                        multiline
                        name="website"
                        label="Website"
                        value = { user.website }
                        variant="outlined"
                    /> 

                    <TextFieldFormsy
                        className="mb-16"
                        placeholder="Company Profile"
                        multiline
                        name="companyprofile"
                        label="Company Profile"
                        value = { user.companyprofile }
                        variant="outlined"
                    /> 

                    <div className="w-full">
                        <Typography className="h2 mb-16">Select Address On Map</Typography>
                        <div className="w-full h-512">
                          { (!userAddressChanged)?   
                          <GoogleMap
                                bootstrapURLKeys={{
                                    key: 'AIzaSyDqtvJeZ4Qok8vZ61cYYUUb0sgnFMZZz-Q'
                                    //AIzaSyDqtvJeZ4Qok8vZ61cYYUUb0sgnFMZZz-Q
                                }}
                                defaultZoom={12}
                                defaultCenter={(!user.locationX)?this.state.defaultLocation:
                                    { lat: user.locationX, lng:user.locationY}
                                }
                                onClick={this.onClickMapHandle}
                            >
                                <Marker
                                    text="Selected Location is the adderess of seller"
                                    lat={ (user.locationX)?user.locationX: this.state.addressLocation.lat }
                                    lng={ (user.locationY)?user.locationY: this.state.addressLocation.lng }
                                />
                            </GoogleMap>
                            :
                            <GoogleMap
                                bootstrapURLKeys={{
                                    key: 'AIzaSyDqtvJeZ4Qok8vZ61cYYUUb0sgnFMZZz-Q'
                                    //AIzaSyDqtvJeZ4Qok8vZ61cYYUUb0sgnFMZZz-Q
                                }}
                                defaultZoom={12}
                                defaultCenter={this.state.defaultLocation}
                                onClick={this.onClickMapHandle}
                            >
                                <Marker
                                    text="Selected Location is the adderess of seller"
                                    lat={ this.state.addressLocation.lat }
                                    lng={ this.state.addressLocation.lng }
                                />
                            </GoogleMap>
                        }
                        </div>
                        </div>
                    </div>
                    }

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className="w-full mx-auto mt-16 normal-case"
                        aria-label="REGISTER"
                        disabled={!canSubmit}
                        value="legacy"
                    >
                        Update User
                    </Button>

                </Formsy>
                            )}                                                                                    
                        </div>
                    )
                }
                innerScroll
            />
            
                

            
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
       getSmeUser: authActions.getSmeUser,
      updateSmeUser:authActions.updateSmeUser
    }, dispatch);
}

function mapStateToProps({auth, RegisterApp})
{
    return {
        register: auth.register,
        user    : RegisterApp.user,
        UserInfo: auth.user
    }
}

export default withReducer('RegisterApp', reducer)(withRouter(connect(mapStateToProps, mapDispatchToProps)(JWTRegisterTab)));