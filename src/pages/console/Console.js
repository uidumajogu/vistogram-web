import React, { Component } from 'react';
import Logo from '../../components/Logo';
import '../../styles/Console.css';
import SideBarLinks from '../../components/console/SideBarLinks';
import {AuthCode, VistocodeSKU} from '../../functions/AuthCodeGenerator';
import Firebase from '../../firebase/Config';
import {UserData} from '../../root/App';
import {format, addDays} from 'date-fns';
import AuthorizationCodePage from '../../components/console/authorizationCodePage/AuthorizationCodePage';
import DashboardPage from '../../components/console/dashboardPage/DashboardPage';
import LicencePage from '../../components/console/licencePage/LicencePage';
import VisitorsPage from '../../components/console/visitorsPage/VisitorsPage';
import InviteManagementPage from '../../components/console/inviteManagementPage/InviteManagementPage';
import {ValidateEmail} from '../../functions/Validators';
import axios from 'axios';


const db = Firebase.firestore();
export let SettingsArray = [];


export class Console extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeLink: 'dashboard',
      header: 'Dashboard',
      authCode: '',
      selectedSetting: '',
      authCodeButtonLabel: 'Submit',
      authCodeButtonDisabled: false,
      authCodeActiveStep: 0,
      settingsArray: [],
      authCodeArray: [],
      openSettingsDialog: false,
      openACDeleteDialog: false,
      acToDelete: '',
      pricingTable: false,
      enableGAC: false,
      currentVisitors: 0,
      todayVisitors: 0,
      dateToday: format(Date.now(),'YYYY-MM-DD'),
      activeDevices: 0,
      visitorsData: [],
      invitersData: [],
      registerInvertersForm: false,
      vRegStep: 0,
      vRegistering: false,
      userID:'',
      userIDChange: false,
      fullName:'',
      department:'',
      email:'',
      userIDError:'',
      fullNameError:'',
      departmentError:'',
      emailError:'',
      checkingEmail: false,
    };
  }

  componentWillMount() {
    if (UserData) {
      if (UserData.initialSetup) {
        let newSettingsArray = [];
        db.collection("settings-"+UserData.ID)
        .get()
        .then(querySnapshot=> {
            querySnapshot.forEach(doc=> {
              newSettingsArray.push(doc.id);
            });
            this.setState(state => ({
              settingsArray: newSettingsArray,
            }));
        })
        .catch(error=> {
            console.log("Error getting documents: ", error);
        });
    
    
        db.collection('licenceCodes').where('ID', '==', UserData.ID)
        .onSnapshot(querySnapshot=> {
          let newAuthCodeArray = [];
          let myActiveDevices = 0;
            querySnapshot.forEach(doc=> {
              newAuthCodeArray.push(doc.data());
              if (doc.data().status === 'Active') {
                myActiveDevices = myActiveDevices + 1;
              }
            });
    
            this.setState(state => ({
              authCodeArray: newAuthCodeArray,
            }));
        })

        db.collection('signedInTags-'+UserData.ID)
        .onSnapshot(querySnapshot=> {
          let myCurrentVisitors = 0;
            querySnapshot.forEach(doc=> {
              myCurrentVisitors = myCurrentVisitors + 1;
            });
            this.setState(state => ({
              currentVisitors: myCurrentVisitors,
            }));
        })

        db.collection('visitors-'+UserData.ID).where('signedInDate', '==', this.state.dateToday)
        .onSnapshot(querySnapshot=> {
          let myTodayVisitors = 0;
            querySnapshot.forEach(doc=> {
              myTodayVisitors = myTodayVisitors + 1;
            });
            this.setState(state => ({
              todayVisitors: myTodayVisitors,
            }));
        })


        db.collection('visitors-'+UserData.ID)
        .onSnapshot(querySnapshot=> {
          let myVisitors = [];
            querySnapshot.forEach(doc=> {
              myVisitors.push(doc.data());
            });
            this.setState(state => ({
              visitorsData: myVisitors,
            }));
        })

        db.collection('inviters-'+UserData.ID)
        .onSnapshot(querySnapshot=> {
          let myinviters = [];
            querySnapshot.forEach(doc=> {
              myinviters.push(doc.data());
            });
            this.setState(state => ({
              invitersData: myinviters,
            }));
        })

      } else {
        this.props.history.push("/settings");
      }
    } else {
      this.props.history.push({
        pathname: "/authentication",
        state: {
          authTypeIsLogin: true
        }
      });
    }
  }

  componentDidMount () {
    if (this.props.location.state) {
      this.setState({
        activeLink: this.props.location.state.activeLink,
        header: this.props.location.state.header,
      });
    }
  }

  submitAuthCode = () => {
    this.setState({
      authCodeButtonLabel: 'Submiting....',
      authCodeButtonDisabled: true,
      authCode: '',
      authCodeActiveStep: 0,
      settingsSelected: '',
      selectedSetting: '',
    });  

          db.collection('licenceCodes').doc(this.state.authCode).set({
            AC: this.state.authCode,
            ID: UserData.ID,
            AID: '',
            rAID: false,
            setup: this.state.selectedSetting,
            status: 'Inactive',
            licence: UserData.licences === 0 ? 'Trial' : 'Full',
            businessName: UserData.businessName,
            deviceDataPlatform: 'No Device',
            deviceData: 'No Device',
            createdDate: format(
              Date.now(),
              'YYYY-MM-DD HH:MM:SS'
            ),
            expiryDate: UserData.licences === 0 ? format(
              addDays(Date.now(),14),
              'YYYY-MM-DD HH:MM:SS'
            ) : 'Never',
            lastUsedDate: '',

          }).then(()=>{
            db.collection('users').doc(UserData.ID).update({
              generateTrialLicence: false,
              activeLicences: UserData.licences === 0 ? 0 : UserData.activeLicences + 1,
            }).then(()=>{
              this.setState({
                authCodeButtonLabel: 'Submit',
                authCodeButtonDisabled: false,
              });  
            }); 
          })
          

  };

  deleteAuthCode = d => {
    this.setState({ 
      openACDeleteDialog: false,
      acToDelete: '', });
      db.collection("licenceCodes").doc(d)
      .update({ 
        'rAID' : true,
        }).then(()=>{
          db.collection("licenceCodes").doc(d).delete()
          .then(()=> {
            db.collection('users').doc(UserData.ID).update({
              activeLicences: UserData.licences === 0 ? 0 : UserData.activeLicences - 1,
            })
            }).catch(function(error) {
                console.error("Error removing document: ", error);
            });
        })
  };

  authCodeActiveStepNext = () => {
    if(this.state.authCodeActiveStep < 2) {
    this.setState(state => ({
      authCodeActiveStep: state.authCodeActiveStep === 0 ? state.authCodeActiveStep + 1 : state.authCodeActiveStep,
      authCode: state.authCodeActiveStep === 0 ? AuthCode(24) : state.authCode,
      openSettingsDialog: state.authCodeActiveStep === 1 ? true : state.openSettingsDialog
    }));
  } else {

  }
  };

  authCodeActiveStepBack = () => {
    this.setState(state => ({
      authCodeActiveStep: state.authCodeActiveStep - 1,
      authCode: state.authCodeActiveStep === 0 + 1 ? "" : state.authCode,
      selectedSetting: state.authCodeActiveStep === 0 + 2 ? "" : state.selectedSetting
    }));
  };

  handleSideBarLinkClick = (l, h) => {
    this.setState({
      activeLink: l,
      header: h
    });  
  }

  generateAuthCode = () => {
    this.setState({
      authCode: AuthCode(24),
    });  
  }


  handleOpenDialog = (d) => {
    this.setState({ 
      [d]: true 
    
    });
  };

  handleCloseDialog = (d) => {
    this.setState({ [d]: false });
  };

  handleSelectSettings = event => {
    this.setState({ 
      authCodeActiveStep: this.state.authCodeActiveStep + 1,
      selectedSetting: event.target.value,
      openSettingsDialog: false
    });
  }

  handleACToDelete = ac => {
    this.setState({ 
      acToDelete: ac,
    });
  }
  
  purchaseLicence = () => {
    this.setState({
      pricingTable: true,
    });
  }

  enableRegisterInvitersForm = () => {
    this.setState({
      registerInvertersForm: true,
    });
  }

  goToSettingsPage = () => {
    this.props.history.push("/settings");
  }

  goToLicencePage = () => {
    this.setState({
      activeLink: 'licences',
      header: 'Your Licences',
      pricingTable: true,
    });
  }

  goToHomePage = () => {
    this.props.history.push("/");
  }

  handleEnableGAC = () => {
    this.setState({
      enableGAC: !this.state.enableGAC,
    });
  }

  nextVRegStep = () => {
    if(this.state.vRegStep < 1) {
      this.setState(state => ({
        userIDError: '',
        fullNameError: '',
        emailError: '',
        departmentError: '',
        vRegStep: state.vRegStep + 1,
      }));
    } else {
      this.vRegister();
    }

  }

  previousVRegStep = () => {
    this.setState(state => ({
      vRegStep: state.vRegStep - 1,
    }));
  }

  handleChange = (c) => event => {
      this.setState({
        [c]: event.target.value,
        [c + 'Error']: '',
      });
  }


  emailDeliverable = email => {
    axios.get('https://api.emailverifyapi.com/v3/lookups/json?key=6A2A5F1A86DEF543&email='+email)
      .then(response => console.log(response.data.deliverable))
  }

  checkRegisterInputs = () => {
    switch (this.state.vRegStep) {
      case 0:
          var regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
          if (this.state.fullName === '') {
            this.setState(state => ({ 
              fullNameError: 'Full Name is required',
            }));
        } else {
          if (!regName.test(this.state.fullName)) {
            this.setState(state => ({ 
              fullNameError: 'Enter First and Last Name' 
            }));
        } else {
          if (this.state.email === '') {
            this.setState(state => ({ 
              emailError: 'Email is incorrect',
            }));
        } else {
          this.setState(state => ({ 
            checkingEmail: true
          }));
          axios.get('https://api.emailverifyapi.com/v3/lookups/json?key=6A2A5F1A86DEF543&email='+this.state.email)
          .then(response => {
                  if (!response.data.deliverable) {
                    this.setState(state => ({ 
                      emailError: 'Email is incorrect' ,
                      checkingEmail: false,
                    }));
                } else {
                  this.setState(state => ({ 
                    checkingEmail: false,
                  }));
                  this.nextVRegStep();
            }
          })
        } 
        }
        }
      break;

      case 1:
          if (this.state.department === '') {
            this.setState(state => ({ 
              departmentError: 'Location is required',
            }));
          } else {
            this.nextVRegStep();
          }
      break;

      default:
      return null;
    }
  }

  vRegister = () => {
    this.setState(state => ({ 
      vRegistering: true,    
    }));
    var docRef = db.collection('inviters-'+UserData.ID).doc();
    db.collection('vistocodeUsers').doc(docRef.id).set({
      ID: UserData.ID,
      docID: docRef.id,
      userID: this.state.userID,
      fullName: this.state.fullName,
      email: this.state.email,
      phoneNumber: '',
      sku: VistocodeSKU(6),
      businessName: UserData.businessName,
      location: this.state.department,
      defaultPassword: true,
      createdDate: format(
        Date.now(),
        'YYYY-MM-DD HH:MM:SS'
      ),
      lastUsedDate: '',
      visitorSaveCount: 20,
    }).then(()=>{
        db.collection('inviters-'+UserData.ID).doc(docRef.id).set({
          userID: this.state.userID,
          ID: UserData.ID,
          docID: docRef.id,
          fullName: this.state.fullName,
          phoneNumber: '',
          email: this.state.email,
          location: this.state.department,
        }).then(()=>{
          this.setState(state => ({ 
            vRegistering: false,
            registerInvertersForm: false,
            vRegStep: 0,
            vRegistering: false,
            userID:'',
            userIDChange: false,
            fullName:'',
            department:'',
            email:'',
            userIDError:'',
            fullNameError:'',
            departmentError:'',
            emailError:'',
            checkingEmail: false,
          }));
        })
    })
  }

  render() {
    const { activeLink } = this.state;

    return (
      <div>

      <div className='console-container'>
      <div className='console-sidebar'>
      <div>
      <div 
        className='console-logo' 
        onClick={this.goToHomePage
        }>
      <Logo
      height='50px' 
      />
      </div>

      <div className='console-sidebar-content'>
        <SideBarLinks
        activeLink={this.state.activeLink}
        goToSettingsPage={this.goToSettingsPage}
        click={(link, header)=>this.handleSideBarLinkClick(link, header)}
        />
      </div>
      </div>

      <div className='console-sidebar-footer'>
          <h4 
            style={{
              color: '#FFC233', 
              margin: '0',
              fontSize: '18px',
              }}>{UserData.businessName}</h4>
          {UserData.email}
      </div>
      
      </div>

      <div className='console-content'>

      <div className='console-content-header'>
              {this.state.header}
      </div>

      <div className='console-content-children'>
      {
       activeLink === 'dashboard' ?
       <DashboardPage
        currentVisitors={this.state.currentVisitors}
        todayVisitors={this.state.todayVisitors}
        activeDevices={this.state.activeDevices}
        userData={UserData}
       />:

       activeLink === 'visitors' ?
       <VisitorsPage
        visitorsData={this.state.visitorsData}
        userData={UserData}
       />:

      activeLink === 'authorizationCode' ?
        <AuthorizationCodePage
          authCode={this.state.authCode}
          genAuthCode={this.generateAuthCode}
          subAuthCodeButtonDisabled={this.state.authCodeButtonDisabled}
          submitAuthCode={this.submitAuthCode}
          subAuthCodeButtonLabel={this.state.authCodeButtonLabel}
          stepNext={this.authCodeActiveStepNext}
          stepBack={this.authCodeActiveStepBack}
          activeStep={this.state.authCodeActiveStep}
          selectedSetting={this.state.selectedSetting}
          selectSettings={this.handleSelectSettings}
          settingsArray={this.state.settingsArray}
          authCodeArray={this.state.authCodeArray}
          deleteAuthCode={(d)=>this.deleteAuthCode(d)}
          openSettingsDialog={this.state.openSettingsDialog}
          openACDeleteDialog={this.state.openACDeleteDialog}
          handleOpenDialog={(d)=>this.handleOpenDialog(d)}
          handleCloseDialog={(d)=>this.handleCloseDialog(d)}
          handleACToDelete={(d)=>this.handleACToDelete(d)}
          acToDelete={this.state.acToDelete}
          goToSettingsPage={this.goToSettingsPage}
          userData={UserData}
          goToLicencePage={this.goToLicencePage}
          enableGAC={this.state.enableGAC}
          handleEnableGAC={this.handleEnableGAC}
        />
       : 
       
       activeLink === 'licences' ?
       <LicencePage
        pricingTable={this.state.pricingTable}
        purchaseLicence={this.purchaseLicence}
        userData={UserData}
       />:

       activeLink === 'inviteManagement' ?
       <InviteManagementPage
        invitersData={this.state.invitersData}
        userData={UserData}
        registerInvertersForm={this.state.registerInvertersForm}
        enableRegisterInvitersForm={this.enableRegisterInvitersForm}
        vRegStep={this.state.vRegStep}
        previousVRegStep={this.previousVRegStep}
        nextVRegStep={this.nextVRegStep}
        vRegistering={this.state.vRegistering}
        vRegister={this.vRegister}

        userID={this.state.userID}
        fullName={this.state.fullName}
        department={this.state.department}
        email={this.state.email}

        handleChange={(c)=>this.handleChange(c)}
        checkRegisterInputs={this.checkRegisterInputs}

        userIDError={this.state.userIDError}
        fullNameError={this.state.fullNameError}
        departmentError={this.state.departmentError}
        emailError={this.state.emailError}
        checkingEmail={this.state.checkingEmail}
       />:
       null }
      </div>

      </div>


      </div>
      </div>
    )
  }
}

export default Console;
