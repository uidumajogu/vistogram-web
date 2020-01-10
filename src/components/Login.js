import React, { Component } from 'react';
import '../styles/Login.css';
import '../styles/Common.css';
import Firebase from '../firebase/Config';
import { withRouter } from "react-router";
import NameLogo from '../components/NameLogo';
import {format} from 'date-fns';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import AlternateEmail from '@material-ui/icons/AlternateEmail';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import AuthTypeContext from '../context/authTypeContext';
import {ValidateEmail, ValidatePassword} from '../functions/Validators';

export class Login extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
            email: '',
            emailError: '',
            password: '',
            passwordError: '',
            showPassword: false,
            loggingIn: false,
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

    checkLoginInputs = () => {
       if (this.state.email === '') {
            this.setState(state => ({ emailError: 'Please enter your email' }));
        } else {
            if (!ValidateEmail(this.state.email)) {
                this.setState(state => ({ emailError: 'Your email is invalid' }));
            } else {
                if (this.state.password === '') {
                    this.setState(state => ({ passwordError: 'Enter a password' }));
                } else {
                    if (!ValidatePassword(this.state.password)) {
                        this.setState(state => ({ passwordError: 'Your password must be at least 6 characters' }));
                    } else {
                        this.login();
                    }
                }
            }
        }
    }


    login = async() => {
        const loginEmail = this.state.email;
        const loginPassword = this.state.password;
        const db = Firebase.firestore();

        this.setState({
            loggingIn: true,
          });
    
        try {
          await Firebase
            .auth()
            .signInWithEmailAndPassword(loginEmail, loginPassword).then(data =>{

                let docRef = db.collection("vistogramUsers").doc(data.user.uid);
                docRef.get().then((doc) => {
                    if (doc.exists) {
                        db.collection('vistogramUsers').doc(data.user.uid).update({
                            lastLoginDate: format(
                                Date.now(),
                                'YYYY-MM-DD HH:MM:SS'
                              )
                          }).then(()=>{
                            if (doc.data().initialSetup) {
                                this.props.history.push("/console");
                            } else {
                                this.props.history.push("/settings"); 
                            }
                          })
                    } else {
                        console.log("No such document!");
                    }
                })
                .catch(function(error) {
                    console.log("Error getting document:", error);
                });
                
            });
        } catch (error) {
          alert(error);
          this.setState({
            email: '',
            emailError: '',
            password: '',
            passwordError: '',
            showPassword: false,
          });
        }
    }

    goToHomePage = () => {
        this.props.history.push("/");
      }  

  render() {

    return (
    <div className='login-container'>
    <div className='login-form-area'>
    <div className='login-name-logo' onClick={this.goToHomePage}>
    <NameLogo 
    height='30px'
    />
        <p 
        className='login-typography-secondary'
        >
          admin
        </p>
      </div>


        <TextField
        className='input'
          id='lEmail'
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

    <div className='auth-button-row'>

        <Link
        className='auth-forgot'
        component="button"
        variant="body2"
        onClick={() => {
            alert("I'm a button.");
        }}
        >
        Forgot Password?
        </Link>

      < Button 
            className='auth-button'
            variant='contained' 
            color='primary' 
            size='large'
            disabled={this.state.loggingIn}
            onClick={this.checkLoginInputs}
            >
            {this.state.loggingIn ? 'Logging In...' : 'Login'}
        </Button>
    </div>

    </div>
      

<div 
className='login-notregistered-row'
>
<Typography 
component="p"
variant="body2"
>
   Don't have an account?
</Typography>

<AuthTypeContext.Consumer>
    {context => < Button 
        className='login-notregistered-button'
        variant='outlined' 
        color='primary' 
        size='small'
        onClick={context.changeAuthType}
        >
        Register
    </Button>
    }
</AuthTypeContext.Consumer>

</div>

</div>

    )
  }
}

export default withRouter(Login);
