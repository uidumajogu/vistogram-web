import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from '../pages/home/Home';
import Auth from '../pages/auth/Auth';
import Console from '../pages/console/Console';
import InitialSetup from '../pages/setup/InitialSetup';
import PrivateRoute from './PrivateRoute';
import Firebase from '../firebase/Config';

import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Logo from '../components/Logo';
import PrivacyPolicy from '../pages/privacyPolicy/PrivacyPolicy';
import TermsAndConditions from '../pages/termsAndConditions/TermsAndConditions';


export let AppData = null;
export let UserData = null;
export let BusinessCategories = [{id: 'SLCT', label: 'None', identifier: 'NA'},];
export let DefaultParameters = '';
export let DefaultLogo = '';
export let DefaultHomeBkgImage = '';
export let DefaultAdvert = '';
export let PurposeOfVisitOptions = '';
export let DefaultSettings = '';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },

  palette: {
    primary: {
      light: '#c167ff',
      main: '#8934FF',
      dark: '#4e00ca',
      contrastText: '#fafafa',
    },
    secondary: {
      light: '#fff468',
      main: '#ffc233',
      dark: '#c79200',
      contrastText: '#fafafa',
    },
    danger: {
      light: '#ff5934',
      main: '#ef0c00',
      dark: '#b30000',
      contrastText: '#fafafa',
    },
  },
});

class App extends Component {

  constructor(props) {
    super(props);

    this.state = { 
      loading: true, 
      authenticated: false, 
      currentUser: null,
       userData: null,
       appData: null,
      };
  }

  componentWillMount() {

    Firebase.auth().onAuthStateChanged(user => {
      if (user) {

        const db = Firebase.firestore();
        const userDataRef = db.collection("vistogramUsers").doc(user.uid);
        // const defaultLogoRef = db.collection("defaultParameters").doc('logoImage');
        // const defaultHomeBkgImageRef = db.collection("defaultParameters").doc('backgroundImage');
        // const defaultAdvertRef = db.collection("defaultParameters").doc('advertImage');
        const businessCategoryDataRef = db.collection("businessCategories");
        // const purposeOfVisitOptionsRef = db.collection("defaultParameters").doc("purposeOfVisitOptions");
        const defaultSettingsRef = db.collection("settings-default").doc("default");

        // userDataRef.get().then((doc) => {
          userDataRef.onSnapshot(doc=>{
            if (doc.exists) {
              UserData = doc.data();

              businessCategoryDataRef.get()
              .then((querySnapshot)=> {
                  querySnapshot.forEach((doc)=> {   
                      BusinessCategories.push(doc.data()); 
                  });

                  defaultSettingsRef.get().then((doc) => {
                    if (doc.exists) {
                      DefaultSettings = doc.data();

                        AppData = {
                          userData:UserData,
                          businessCategories:BusinessCategories,
                          defaultSettings:DefaultSettings,
                        };


                        this.setState({
                          authenticated: true,
                          currentUser: user,
                          userData: doc.data(),
                          loading: false,
                          appData: AppData,
                        })

                    } else {
                      this.setState({
                        authenticated: false,
                        currentUser: null,
                        userData: null,
                        loading: false,
                        appData: null,
                      });
                        console.log("No such document!");
                    }
                })
                .catch((error)=> {
                  this.setState({
                    authenticated: false,
                    currentUser: null,
                    userData: null,
                    loading: false,
                    appData: null,
                  });
                    console.log("Error getting document:", error);
                });
              })
              .catch((error)=> {
                this.setState({
                  authenticated: false,
                  currentUser: null,
                  userData: null,
                  loading: false,
                  appData: null,
                });
                  console.log("Error getting documents: ", error);
              });

            } else {
              this.setState({
                authenticated: false,
                currentUser: null,
                userData: null,
                loading: false,
                appData: null,
              });
                console.log("No such document!");
            }
            
        });

      } else {
        this.setState({
          authenticated: false,
          currentUser: null,
          userData: null,
          loading: false,
          appData: null,
        });
      }
    });
  }


  changeAuthenticated = () => {
    this.setState({
      authenticated: this.state.authenticated,
    });
  }

  render() {
    const { authenticated, loading } = this.state;

    if (loading) {
      return <div style = {{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <Logo height='40px'/>
      <MuiThemeProvider theme={theme}>
      <CircularProgress color='secondary' size={100} style={{marginTop: '-70px'}}/>
      </MuiThemeProvider>
    </div>
      // <p>Loading..</p>;
    }

    return (
      <Router>
      <div>
        <MuiThemeProvider theme={theme}>
      <CssBaseline />
          <PrivateRoute
              exact
              path="/settings"
              component={InitialSetup}
              authenticated={authenticated}
            />
            <PrivateRoute
              exact
              path="/console"
              component={Console}
              authenticated={authenticated}
            />
            <Route exact path="/terms-and-conditions" component={TermsAndConditions} />
            <Route exact path="/privacy-policy" component={PrivacyPolicy} />
            <Route exact path="/authentication" component={Auth} />
            <Route exact path="/" component={Home} />
        </MuiThemeProvider>
    </div> 
        
      </Router>
    );
  }
}


export default App;