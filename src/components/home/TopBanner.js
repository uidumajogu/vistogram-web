import React from 'react';
import '../../styles/Home.css';
import tbImage from '../../assets/01.png';
import Button from '@material-ui/core/Button';

const TopBanner = props => {

    const bkgImage = {
        // height: '800px',
        // width: '100%',
        // backgroundImage: 'url(' + Bkg + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        // display: 'inline-block',
        // textAlign: 'center',
        backgroundPosition: 'center',
    }

    const bannerImage = {
        height: '600px',
        width: '60%',
        backgroundImage: 'url(' + tbImage + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        display: 'inline-block',
        textAlign: 'center',
        backgroundPosition: 'center',
        zIndex: '1',
    }

    const message = {
        // height: '500px',
        width: '45%',
        // marginRight: '-100px',
        display: 'inline-block',
        textAlign: 'left',
        // paddingLeft: '100px',
        zIndex: '1',
    }

  return (
    <div>
        <div 
        className='home-topBanner' 
        style={bkgImage}
        >
        <div style={message}>
            <h1 
                style={{
                    fontSize: '40px',
                    color: '#8934FF',
                    // color: 'white',
                    marginBottom: '50px',
                    }}>Modernise your Visitor Registeration Process</h1>

            <p>Do away with paper logs/sign in sheets, and uncluster 
            your front desk. Create a good impression by using the 
            Vistogram app to register your Visitors.</p>

            <p>Your visitors will sign IN and sign OUT on your tablet 
            device (iOS or Android). It will capture their signature, photo, bio details, 
            address details, purpose of visit, and the details of who 
            they are visiting.</p>
                
            <p>It is a fully customisable cloud-based app and 
            visitor information is always available via your admin 
            console.</p>
            
            <div style={{textAlign: 'right', marginTop: '20px'}}>
            <Button
                style={{textTransform: 'none',}}
                variant="contained"
                color="secondary"
                onClick={props.goToRegisterPage}
            >
            Try It For Free
            </Button>
            </div>




        </div>

        <div style={bannerImage}>

        </div>

        </div>
      
    </div>
  )
}

export default TopBanner;
