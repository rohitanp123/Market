import React, {Component} from 'react';
import Formsy from 'formsy-react';
import {TextFieldFormsy} from '@fuse';
import {Button, InputAdornment, Icon} from '@material-ui/core';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';
import * as authActions from 'app/auth/store/actions';
import {Tab, Tabs,Typography} from '@material-ui/core';
import {FuseAnimate, FusePageCarded} from '@fuse';
import {Link, } from 'react-router-dom';
import reducer from 'app/store/reducers';
import withReducer from 'app/store/withReducer';

class JWTRegisterTab extends Component {

    state = {
        canSubmit: false,
        Language:'english',
        tabValue: 0,
        form:null 
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

    onSubmit = (model) => {
        model.Language = this.state.Language;
       model._id = this.props.match.params.smecatId;
       model.registrationDate = this.props.register.user.registrationDate;
       model.userType = 'rm';
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
   

    render()
    {
        const {canSubmit} = this.state;
        const {tabValue} = this.state;
         const { user} = this.props.register;
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
                        <div className="flex flex-1 w-full items-center justify-between">

                            <div className="flex flex-col items-start max-w-full">

                                <FuseAnimate animation="transition.slideRightIn" delay={300}>
                                    <Typography className="normal-case flex items-center sm:mb-12" component={Link} role="button" to="/apps/users">
                                        <Icon className="mr-4 text-20">arrow_back</Icon>
                                        Users
                                    </Typography>
                                </FuseAnimate>

                                <div className="flex items-center max-w-full">                                   
                                    <div className="flex flex-col min-w-0">
                                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                            <Typography className="text-16 sm:text-20 truncate">
                                                { 'Edit-User' }
                                            </Typography>
                                        </FuseAnimate>
                                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                            <Typography variant="caption">User Detail</Typography>
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
                        <div className="p-16 sm:p-24 max-w-2xl" style = {{ width:'50%'}}>
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

                    {/* <TextFieldFormsy
                        className="mb-16"
                        type="text"
                        name="smeName"
                        label="Name of Company"
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
                    /> */}

                    {/* <TextFieldFormsy
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
                    /> */}

                    {/* <TextFieldFormsy
                        className="mb-16"
                        type="text"
                        name="cr"
                        label="C.R."
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
                    />
                    */}

                    {/* <FormControl component="fieldset">
                        <FormLabel component="legend">Language</FormLabel>
                        <RadioGroup aria-label="gender" name="gender1" value = {  Language } onChange={ (e) => this.handleChange(e) }>
                            <FormControlLabel value="english" control={<Radio />} label="English" />
                            <FormControlLabel value="arabic" control={<Radio />} label="Arabic" />                     
                        </RadioGroup>
                    </FormControl> */}

                    {/* <TextFieldFormsy
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
                    /> */}

                    <TextFieldFormsy
                        className="mb-16"
                        type="text"
                        name="oabStaffNumber"
                        label="OAB Staff Number"
                        value = { user.oabStaffNumber }
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
                    />

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
        user    : RegisterApp.user
    }
}

export default withReducer('RegisterApp', reducer)(withRouter(connect(mapStateToProps, mapDispatchToProps)(JWTRegisterTab)));