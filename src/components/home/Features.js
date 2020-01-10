import React from 'react';
import FeaturesList from '../home/FeaturesList';
import BioInfoIcon from '@material-ui/icons/AssignmentInd';
import AddressDetailsIcon from '@material-ui/icons/LocationOn';
import PurposeOfVisitIcon from '@material-ui/icons/FilterTiltShift';
import SecurityDataIcon from '@material-ui/icons/Fingerprint';
import BrandingIcon from '@material-ui/icons/Wallpaper';
import StatsIcon from '@material-ui/icons/BarChart';
import AdvertIcon from '@material-ui/icons/Theaters';
import MultiOfficeIcon from '@material-ui/icons/Domain';
import Margin from '../../components/Margin';


const Features = props => {

    const fBkgImage = {
        // backgroundImage: 'url(' + BSh2 + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    }

    const featuresDiv = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        margin: '0 50px 50px 50px',
        // border: '1px #8934FF solid',
        // borderRadius: '20px',
        // backgroundColor: 'rgba(255, 255, 255 , 0.95)'
    }
    
    const leftFD = {
        textAlign: 'center',
        width: '28%',
    }
    
    const middleFD = {
        textAlign: 'center',
        width: '28%',
        // marginTop: '100px',
    }
    
    const rightFD = {
        textAlign: 'center',
        width: '28%',
        // marginTop: '200px',
    }

  return (
    <div className='home-features' style={fBkgImage}>
    <h1>Features</h1>

    <div style={featuresDiv}>
    <div style={leftFD}>
        <FeaturesList 
            icon={<BioInfoIcon style={{fontSize: 80, color: '#E0E5F6'}}/>}
            title='Bio Info'
            body='Collect Visitors Bio Info (First Name, Last Name, 
                Phone Number and Email). This feature can be enabled 
                or disabled and the fields can be selected based on 
                preference.'
        />
        <Margin
        height='50px'
        width='10px'/>
        <FeaturesList 
                icon={<SecurityDataIcon style={{fontSize: 80, color: '#E0E5F6'}}/>}
                title='Photo and Signature'
                body='The visitors photo is taken using the front camera and 
                the signature is captured directly on the tablet using 
                a finger or stylus - no third party device is required.'
            />
        <Margin
        height='50px'
        width='10px'/>
        <FeaturesList 
                icon={<BrandingIcon style={{fontSize: 80, color: '#E0E5F6'}}/>}
                title='Branding'
                body='Setup VISTOGRAM with your logo, brand colors, business 
                name and slogan. This can be done from the settings tab in 
                your admin console. Settings can be updated at any
                time.'
            />
    </div>
    <div style={middleFD}>
        <FeaturesList 
            icon={<AddressDetailsIcon style={{fontSize: 80, color: '#E0E5F6'}}/>}
            title='Address Details'
            body='Capture the address of the Visitor. The address 
            details includes address/street name, Zip Code, State, 
            Country. Any of this fields can be enabled or 
            disabled from the console.'
        />
        <Margin
        height='50px'
        width='10px'/>
        <FeaturesList 
                icon={<AdvertIcon style={{fontSize: 80, color: '#E0E5F6'}}/>}
                title='Advertisement'
                body='Advertise your business to your visitors as they 
                Sign IN and OUT on your VISTOGRAM. Turn your visitors to leads. 
                You can also place adverts for others and earn some money.'
            />
            <Margin
            height='50px'
            width='10px'/>
        <FeaturesList 
                icon={<MultiOfficeIcon style={{fontSize: 80, color: '#E0E5F6'}}/>}
                title='Multi-Office Feature'
                body='Handles visitors to multi-office buildings with 
                ease. Each office is added during setup. Offices can be 
                removed or added at any time and the changes take 
                effect in real-time.'
            />
    </div>
    <div style={rightFD}>
        <FeaturesList 
            icon={<PurposeOfVisitIcon style={{fontSize: 80, color: '#E0E5F6'}}/>}
            title='Purpose Of Visit'
            body='Get the visitors purpose of visit and the details of 
             who is been visited. This parameter and corresponding fields 
             can also be enabled or disabled according to preference.'
            />
            <Margin
            height='50px'
            width='10px'/>
            <FeaturesList 
                icon={<BrandingIcon style={{fontSize: 80, color: '#E0E5F6'}}/>}
                title='Branding'
                body='Setup VISTOGRAM with your logo, brand colors, business 
                name and slogan. This can be done from the settings tab in 
                your admin console. Settings can be updated at any
                time.'
            />
            <Margin
            height='50px'
            width='10px'/>
            <FeaturesList 
                icon={<StatsIcon style={{fontSize: 80, color: '#E0E5F6'}}/>}
                title='Realtime Statistics'
                body='See all Visitor statitics and chart on the Dashboard 
                of your admin console. Get details of current visitors, 
                visitors per day, week, month, year and any date or 
                date range.'
            />
    </div>
    </div>
      
    </div>
  )
}

export default Features;
