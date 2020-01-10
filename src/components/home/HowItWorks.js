import React from 'react';
import HowItWorksStep from '../home/HowItWorksStep';
import Step1Image from '../../assets/02.png';
import Step2Image from '../../assets/03.png';
import Step3Image from '../../assets/04.png';
import Step4Image from '../../assets/05.png';
import PlayStoreLogo from '../../assets/playStoreLogo.png';
import AppStoreLogo from '../../assets/appStoreLogo.png';
import { Link } from "react-router-dom";

  const HowItWorks = props => {
    const playStoreImage = {
      width: '180px',
      height: '50px',
      backgroundImage: 'url(' + PlayStoreLogo + ')',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
      display: 'inline-block',
      textAlign: 'center',
      backgroundPosition: 'center',
      // marginLeft: '100px'
  }

  const appStoreImage = {
      width: '180px',
      height: '50px',
      backgroundImage: 'url(' + AppStoreLogo + ')',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
      display: 'inline-block',
      textAlign: 'center',
      backgroundPosition: 'center',
      marginLeft: '10px'
  }

  return (
    <div className='home-howItWorks'>
    <h1>How It Works</h1>
    <p style={{
      color: '#253061',
      fontSize: '14px',
      padding: '0 20% 0 20%',
    }}>Everything is managed from the admin console and served 
    to the app front end which is available for download at both the iOS 
    App Store (for iPads) and Google Play Store (for android tablets).

    All visitor data is securely stored in the Google Cloud Platform 
    and is accessible at anytime by the admin via the VISTOGRAM 
    admin console.
    </p>

    <HowItWorksStep
    step='1'
    stepDirection='right'
    title='Register' 
    message={<p>Go to <Link to="/authentication" >www.vistogram.com/autherntication</Link> and enter your Business Name, email and password. Click on 
      "Get Started" to register.</p>}
    image={Step1Image}
    />

    <HowItWorksStep
    step='2'
    stepDirection='left'
    title='Make Changes' 
    message={
      <div>
      <p>Once registration is successful, you will be directed to the 
        settings page where you can make changes to fit your business 
        brand. Change the logo, colors, images, adverts, 
        form field preferences etc.</p>

      <p>They is a preview screen to show you how the changes will 
        look on the real app.</p> 
      </div>      
    }
    image={Step2Image}
    />

    <HowItWorksStep
    step='3'
    stepDirection='right'
    title='Generate Authorization Code' 
    message={
      <div>
      <p>From the settings page, you will be directed to the admin 
        console. Here is where you manage your VISTOGRAM. we have the 
        dashboard, visitors report, settings etc.</p>

      <p>Go to the "Authorization Code" tab and generate an 
        authorization code for the front desk staff to access your 
        VISTOGRAM.</p> 
      </div>      
    }
    image={Step3Image}
    />

    <HowItWorksStep
    step='4'
    stepDirection='left'
    title='You are ready!' 
    message={
      <div>
      <p>Use the generated authorization code to login to 
        the VISTOGRAM app on your iPad or Android Tablet.</p>
      
        <div>
        <div style={playStoreImage}></div>
        <div style={appStoreImage}></div>
        </div>

      </div>      
    }
    image={Step4Image}
    />
    </div>

    
  )
}

export default HowItWorks;
