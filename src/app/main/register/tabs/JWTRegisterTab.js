import React, {Component} from 'react';
import Formsy from 'formsy-react';
import {TextFieldFormsy} from '@fuse';
import {Button, InputAdornment, Icon, Checkbox} from '@material-ui/core';
import {bindActionCreators} from 'redux';
import {withRouter, Link} from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';
import * as authActions from 'app/auth/store/actions';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
//import /*FormHelperText*/ from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import Terms from '../../apps/Products/Product/TermsConditions';


// import Grid from '@material-ui/core/Grid';
// import DateFnsUtils from '@date-io/date-fns';
// import {
//     MuiPickersUtilsProvider,
//     KeyboardTimePicker,
//     KeyboardDatePicker,
//   } from '@material-ui/pickers';

class JWTRegisterTab extends Component {

    state = {
        canSubmit: false,
        isFormValid:false,
        Language:'English',
        isTermsChecked:false,
        registrationDate: new Date(),
        openTerm:false
    };

    form = React.createRef();

    disableButton = () => {
        this.setState({isFormValid: false, canSubmit:false});
    };

    enableButton = () => {
        if(this.state.isTermsChecked && this.state.isFormValid){
            this.setState({ canSubmit:true })
        }else{
            this.setState({isFormValid: true});
        }
    };

      handleChange = (event) => {
       //setValue(event.target.value);
       console.log(event.target.value);
        this.setState({Language: event.target.value});
      }

      handleChangeDate = (event) => {
        this.setState({ registrationDate:event.target.value});
      }

      ConfirmTerms = (e) => {
          if(this.state.isFormValid && e.target.checked){
              this.setState({ canSubmit:true, isTermsChecked:true })
          }   else {
            this.setState({ isTermsChecked:e.target.checked, canSubmit:false })
          }       
      }

      handleOpenTerm = (e) => {
        e.preventDefault();
     this.setState({ openTerm: true });
   };
 
    handleCloseTerm = () => {
     this.setState({ openTerm: false });
   };

    onSubmit = (model) => {
        model.Language = this.state.Language;
        model.userType = 'sme';
        model.registrationDate = this.state.registrationDate;
        console.log(model)
        this.props.submitRegister(model);
    };

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
        const { Language } = this.state;

        return (
            <div className="w-full">
                <Terms open = { this.state.openTerm }
                        onClose = { this.handleCloseTerm } 
                />
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

                    <TextFieldFormsy
                        className="mb-16"
                        type="password"
                        name="password"
                        label="Password"
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
                        type="text"
                        name="smeName"
                        label="Commercial Registration Name"
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
                        name="cr"
                        label="Commercial Registration Number"
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

                    <TextField
                        id="registrationDate"
                        label="Commercial Registration Date"
                        type="date"
                        name="registrationDate"
                        defaultValue = {new Date()}
                        onChange = { (e) => { this.handleChangeDate(e) } }
                        //className={classes.textField}
                        InputLabelProps={{
                        shrink: true,
                        }}
                        required
                    />
<br/>
                    <TextFieldFormsy
                        className="mb-16"
                        type="text"
                        name="oabCustomerNumber"
                        label="OAB Account Number"
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

                    
                    

                    <FormControl component="fieldset">
                        <FormLabel component="legend">Language</FormLabel>
                        <RadioGroup aria-label="gender" name="gender1" value = { Language } onChange={ (e) => this.handleChange(e) }>
                            <FormControlLabel value="english" control={<Radio />} label="English" />
                            <FormControlLabel value="arabic" control={<Radio />} label="Arabic" />                     
                        </RadioGroup>
                    </FormControl>

                    <TextFieldFormsy
                        className="mb-16"
                        // type="text"
                        name="mobile"
                        label="Mobile"
                        // inputProps={{
                        //     min: "0",
                        //     max:"8"
                        //   }}
                        validations={{
                            maxLength: 10
                        }}
                        validationErrors={{
                            maxLength: 'Maximum digit length is 10'
                        }}
                        InputProps={{
                            endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">person</Icon></InputAdornment>
                        }}
                        variant="outlined"
                        required                   
                    />
                            <div className="flex">
                                <Checkbox                                    
                                        disableRipple
                                        color="default"
                                        onChange = { (e)=> { this.ConfirmTerms(e) } }                 
                                />
                                <span style={{paddingRight:'15px', color:'black',paddingTop:'15px'}} > Please accept <Link to="" onClick={ (e) => { this.handleOpenTerm(e) } } target="_blank" >Terms & Conditions</Link></span>
                             </div>
 
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className="w-full mx-auto mt-16 normal-case"
                        aria-label="REGISTER"
                        disabled={ !canSubmit}
                        value="legacy"
                    >
                        Register
                    </Button>
                </Formsy>               
            </div>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        submitRegister: authActions.submitRegister
    }, dispatch);
}

function mapStateToProps({auth})
{
    return {
        register: auth.register,
        user    : auth.user
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(JWTRegisterTab));
