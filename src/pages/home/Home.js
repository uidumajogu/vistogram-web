import React, { Component } from 'react';
import '../../styles/Home.css';
import TopBar from '../../components/home/TopBar';
import TopBanner from '../../components/home/TopBanner';
import HowItWorks from '../../components/home/HowItWorks';
import WhatIsVistogram from '../../components/home/WhatIsVistogram';
import Features from '../../components/home/Features';
import ContactUs from '../../components/home/ContactUs';
import BottomBar from '../../components/BottomBar';
import { UserData } from '../../root/App';
// import Firebase from '../../firebase/Config';



export class Home extends Component {


// updateSettings = () => {
//   Firebase.firestore().collection('settings-default').doc('default').set({
//     fields: {
//       "addressForm":[
//           {"active":true,"errorMessage":null,"field":"Address","hintText":"Address","key":"address","keyboardType":"text","maxLines":2,"suffixIcon":"map"},
//           {"active":true,"errorMessage":null,"field":"Zip Code","hintText":"Zip Code","key":"zipCode","keyboardType":"text","maxLines":1,"suffixIcon":"adjust"},
//           {"active":true,"errorMessage":null,"field":"State","hintText":"State","key":"state","keyboardType":"text","maxLines":1,"suffixIcon":"location_city"},
//           {"active":true,"errorMessage":null,"field":"Country","hintText":"Country","key":"country","keyboardType":"text","maxLines":1,"suffixIcon":"public"}],
//       "bioForm":[
//           {"active":true,"errorMessage":null,"field":"First Name","hintText":"First Name","key":"firstName","keyboardType":"text","maxLines":1,"suffixIcon":"person_outline"},
//           {"active":true,"errorMessage":null,"field":"Last Name","hintText":"Last Name","key":"lastName","keyboardType":"text","maxLines":1,"suffixIcon":"person"},
//           {"active":true,"errorMessage":null,"field":"Phone Number","hintText":"Phone Number","key":"phoneNumber","keyboardType":"number","maxLines":1,"suffixIcon":"phone"},
//           {"active":true,"errorMessage":null,"field":"Email","hintText":"Email","key":"email","keyboardType":"emailAddress","maxLines":1,"suffixIcon":"alternate_email"}],
//       "hostForm":[
//           {"active":false,"errorMessage":null,"field":"Company","hintText":"Select Company","key":"selectCompany","keyboardType":"text","maxLines":1,"suffixIcon":"account_balance"},
//           {"active":true,"errorMessage":null,"field":"Whom to See","hintText":"name of staff to See","key":"whomToSee","keyboardType":"text","maxLines":1,"suffixIcon":"person_pin"},
//           {"active":true,"errorMessage":null,"field":"Department or Unit","hintText":"Enter Department or Unit","key":"duOfwWomToSee","keyboardType":"text","maxLines":1,"suffixIcon":"work"},
//           {"active":true,"errorMessage":null,"field":"Purpose of Visit","hintText":"e.g. official or unnofficial","key":"purposeOfVisit","keyboardType":"text","maxLines":1,"suffixIcon":"all_out"}],
//       "inputParams":{"1bioForm":true,"2addressForm":true,"3hostForm":true,"4takePicture":true,"5signaturePad":true,"6tagForm":true},
//       "tagForm":[
//           {"active":true,"errorMessage":null,"field":"Tag Number","hintText":"Tag Number","key":"tagNumber","keyboardType":"number","maxLines":1,"suffixIcon":"picture_in_picture"}]
//       },
//     primaryColor: '#8934FF',
//     secondaryColor: '#FFC233',
//     businessBranch : "",
//     businessCategory : "",
//     businessMultiOffices : [],
//     businessName : "",
//     businessSlogan : "",
//     welcomeMessage : "",
//     logoImageDownloadUrl: 'https://firebasestorage.googleapis.com/v0/b/digitalvisitorregister.appspot.com/o/images-default%2FyourLogo.svg?alt=media&token=11223423-83e5-4305-b0a7-457cd4e98ae2',
//     backgroundImageDownloadUrl: 'https://firebasestorage.googleapis.com/v0/b/digitalvisitorregister.appspot.com/o/images-default%2FbkgImg.jpg?alt=media&token=24406544-80f0-4d6c-b728-78855721e78f',
//     advertsDownloadUrl: ['https://firebasestorage.googleapis.com/v0/b/digitalvisitorregister.appspot.com/o/images-default%2FadvImg.jpeg?alt=media&token=f8487a7c-9313-4c7e-8203-4b81fa5fc1c1'],
//     purposeOfVisitOptions: [
//       { 'option': 'Official', 'active': true,},
//       { 'option': 'Personal', 'active': true,},
//       { 'option': 'Delivery', 'active': true,},
//     ],
//   })
// }


  goToConsolePage = () => {
    // this.updateSettings();
    this.props.history.push("/console");
  }


  goToRegisterPage = () => {
    this.props.history.push("/authentication");
  }

  goToLoginPage = () => {
    this.props.history.push({
      pathname: "/authentication",
      state: {
        authTypeIsLogin: true
      }
    });
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
      <div className='home-body'>
        <TopBar
           userData={UserData}
           goToConsolePage={this.goToConsolePage}
           goToLoginPage={this.goToLoginPage}
           goToRegisterPage={this.goToRegisterPage}
           goToHomePage={this.goToHomePage}
          />

        <TopBanner 
        goToRegisterPage={this.goToRegisterPage}/>

        <WhatIsVistogram />

        <Features />

        <HowItWorks />

        <ContactUs />

        <BottomBar 
          goToPrivacyPolicyPage={this.goToPrivacyPolicyPage}
          goToTermsAndConditionsPage={this.goToTermsAndConditionsPage}
        />  
      </div>
    )
  }
}

export default Home;