import React, { Component } from 'react';
import Login from '../../components/Login';
import Register from '../../components/Register';
import BottomBar from '../../components/BottomBar';
import '../../styles/Auth.css';
import '../../styles/BottomBar.css';
import authTypeContext from '../../context/authTypeContext';
import { withRouter } from "react-router";


export class Auth extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
            authTypeIsLogin: false,
        };
      }

      componentDidMount () {
        this.setState({authTypeIsLogin: this.props.location.state ? this.props.location.state.authTypeIsLogin : false});
      }

    changeAuthType = () => {
        this.setState({authTypeIsLogin: !this.state.authTypeIsLogin});
    }

    goToHomePage = () => {
        this.props.history.push("/");
      }

    goToPrivacyPolicyPage = () => {
        this.props.history.push("/privacy-policy");
      }
    
    goToTermsAndConditionsPage = () => {
        this.props.history.push("/terms-and-conditions");
      }

  render() {
    return (
        <div className='auth-body'>
            <authTypeContext.Provider value={{
                authTypeIsLogin: this.state.authTypeIsLogin,
                changeAuthType: this.changeAuthType
                }}>
            
            <div>
            <authTypeContext.Consumer>
                {context=> 
                    context.authTypeIsLogin ? 
                    <Login 
                    /> : 
                    <Register 
                    />
                }
            </authTypeContext.Consumer>
             
            </div>
            </authTypeContext.Provider>

            <BottomBar 
            rlAbs={true}
            goToPrivacyPolicyPage={this.goToPrivacyPolicyPage}
            goToTermsAndConditionsPage={this.goToTermsAndConditionsPage}
            /> 
        </div>
    )
  }
}

export default withRouter(Auth);
