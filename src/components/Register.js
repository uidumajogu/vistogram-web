import React, { Component } from 'react';
import '../styles/Register.css';
import '../styles/Common.css';
import Firebase from '../firebase/Config';
import {format} from 'date-fns';
import { withRouter } from "react-router";
import NameLogo from '../components/NameLogo';

import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import Business from '@material-ui/icons/Business';
import AlternateEmail from '@material-ui/icons/AlternateEmail';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import AuthTypeContext from '../context/authTypeContext';
import UserDataContext from '../context/userDataContext';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import {ValidateEmail, ValidatePassword} from '../functions/Validators';


export class Register extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
            businessName: '',
            businessNameError: '',
            email: '',
            emailError: '',
            password: '',
            passwordError: '',
            showPassword: false,
            checkedBoxTP: false,
            checkedBoxTPError: false,
            registering: false,
            authenticated: false,
        };

      }

    handleChange = prop => event => {
        this.setState({ 
            [prop]: event.target.value,
            [prop + 'Error']: ''
         });
    };

    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    };

    handleClickedCheckedBoxTP = name => event => {
        this.setState({ 
            [name]: event.target.checked,
            [name + 'Error']: false,
        });
      };

    checkRegisterInputs = () => {
        if (this.state.businessName === '') {
            this.setState(state => ({ businessNameError: 'Your Business Name is required' }));
        } else {
            if (this.state.email === '') {
                this.setState(state => ({ emailError: 'Your email is required' }));
            } else {
                if (!ValidateEmail(this.state.email)) {
                    this.setState(state => ({ emailError: 'Email is invalid' }));
                } else {
                    if (this.state.password === '') {
                        this.setState(state => ({ passwordError: 'Enter a password' }));
                    } else {
                        if (!ValidatePassword(this.state.password)) {
                            this.setState(state => ({ passwordError: 'Your password must be at least 6 characters' }));
                        } else {
                            if (this.state.checkedBoxTP === false) {
                                this.setState(state => ({ checkedBoxTPError: true }));
                            } else {
                                this.register();
                            }
                        }
                    }
                }
            }

        }
    }

    register = async() => {

        const registerEmail = this.state.email;
        const registerPassword = this.state.password;
        const registerBusinessName = this.state.businessName;
        const db = Firebase.firestore();

        this.setState({
            registering: true,
          });
    
        try {
          await Firebase
            .auth()
            .createUserWithEmailAndPassword(registerEmail, registerPassword).then(data =>{
              db.collection('vistogramUsers').doc(data.user.uid).set({
                businessName: registerBusinessName,
                email: registerEmail,
                ID: data.user.uid,
                initialSetup: false,
                licences: 0,
                activeLicences: 0,
                generateTrialLicence: true,
                trialLicence: true,
                trialLicenceStartDate: '',
                trialLicenceEndDate: '',
                user: 'Super Admin',
                createdDate: format(
                  Date.now(),
                  'YYYY-MM-DD HH:MM:SS'
                ),
                lastLoginDate: format(
                    Date.now(),
                    'YYYY-MM-DD HH:MM:SS'
                  )
              }).then(()=>{
                this.setState({
                    authenticated: true,
                  });
                  this.props.history.push("/settings"); 
              }); 
            });
          
          
        } catch (error) {
          alert(error);
          this.setState({
            businessName: '',
            businessNameError: '',
            email: '',
            emailError: '',
            password: '',
            passwordError: '',
            showPassword: false,
            checkedBoxTP: false,
            checkedBoxTPError: false,
            registering: false,
          });
        }
      };

      goToHomePage = () => {
        this.props.history.push("/");
      }

  render() {
    return (
      <div className='register-container'>
      <div className='register-name-logo' onClick={this.goToHomePage}>
      <NameLogo 
      height='35px'
      />
      </div>
      
      <div className='register-message-form'>
      <div className='register-message'>
          <div>
            <div 
            className='register-message-content'>
                <p>Do away with cumbersome and 
                unreliable paper visitor register.
                With Vistogram you can digitize your 
                visitor registration process.</p>

                <p>Digitally Capture your visitors Bio, 
                Address, signature, picture, information 
                of the host, etc and store centrally
                in the cloud.</p>

                <p>Personalize your Vistogram and access 
                your visitor information centrally
                from the dashboard.</p>
                
                <p>Get added security by knowing who is 
                in your premises in real-time.</p>

                <p>Display your brand and advertisements, 
                and leave your visitors in awe of your
                professionalism.</p>

                <p>Mordernise your front desk 
                with Vistogram.</p>

            </div>
          </div>


          </div>
          <div className='register-form'>

          <div className='register-form-c'>
          <TextField
                className='input'
                id='rBusiness'
                variant='outlined'
                type='businessName'
                label='Business Name'
                value={this.state.businessName}
                onChange={this.handleChange('businessName')}
                fullWidth={true}
                helperText={this.state.businessNameError}
                error={this.state.businessNameError !== ''}
                InputProps={{
                    endAdornment: (
                    <InputAdornment position='end'>
                        <Icon className='input-icon'>
                        <Business />
                        </Icon>
                    </InputAdornment>
                    ),
                }}
                />

            <TextField
                className='input'
                id='rEmail'
                variant='outlined'
                type='email'
                label='Email'
                value={this.state.email}
                onChange={this.handleChange('email')}
                fullWidth={true}
                helperText={this.state.emailError}
                error={this.state.emailError !== ''}
                InputProps={{
                    endAdornment: (
                    <InputAdornment position='end'>
                        <Icon className='input-icon'>
                        <AlternateEmail/>
                        </Icon>
                    </InputAdornment>
                    ),
                }}
                />

            <TextField
            className='input'
            id='lPassword'
            variant='outlined'
            type={this.state.showPassword ? 'text' : 'password'}
            label='Password'
            value={this.state.password}
            onChange={this.handleChange('password')}
            fullWidth={true}
            helperText={this.state.passwordError}
            error={this.state.passwordError !== ''}
            InputProps={{
                endAdornment: (
                <InputAdornment position='end'>
                    <Icon
                    className='input-icon'
                    onClick={this.handleClickShowPassword}
                    >
                    {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                    </Icon>
                </InputAdornment>
                ),
            }}
            />

            <div className='register-tnc'>
            <FormControlLabel
            className='register-tnc-checkbox'
            color='primary'
                control={
                    <Checkbox
                    checked={this.state.checkedBoxTP}
                    onChange={this.handleClickedCheckedBoxTP('checkedBoxTP')}
                    value='checkedBoxTP'
                    />
                }
                />
            
            <p>By clicking on the 'Register' button below 
                you agree to our <a href='https://vistogram.com/terms-and-conditions'>Terms and Conditions</a> and <a href='https://vistogram.com/privacy-policy'>Privacy Policy</a>. </p>
            </div>

            {this.state.checkedBoxTPError ? 
            <p className='register-tnc-error'>^^^**You have not agreed to our 
                Terms of Service and Privacy Policy**</p> : <p></p>}

            <Divider 
            variant="middle"
            className='register-form-divider' 
            />

           
            <div className='auth-button-row'>

            <AuthTypeContext.Consumer>
                {context => <Link
                className='auth-forgot'
                component="button"
                variant="body2"
                onClick={context.changeAuthType}
                >
                Already registered?
                </Link>
                }

            </AuthTypeContext.Consumer>

                < Button 
                    className='auth-button'
                    variant='contained' 
                    color='primary' 
                    size='large'
                    disabled={this.state.registering}
                    onClick={this.checkRegisterInputs}
                    >
                    {this.state.registering ? 
                    'Registering.....' : 
                    'Get Started'}
                </Button>
            </div>

          </div>
         
          </div>
      </div>
         
      <UserDataContext.Provider value={{
                authenticated: this.state.authenticated,
                }} />
      </div>
    )
  }
}

export default withRouter(Register);
