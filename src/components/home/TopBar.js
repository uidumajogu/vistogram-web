import React from 'react';
import NameLogo from '../../components/NameLogo';
import '../../styles/Home.css';
import Button from '@material-ui/core/Button';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import PlayStoreLogo from '../../assets/playStoreLogo.png';
import AppStoreLogo from '../../assets/appStoreLogo.png';


const TopBar = props => {

  const redirectToPlayStore = () =>{
      window.open('https://play.google.com/store/apps/details?id=com.remphil.visitorregister', '_blank');
  }

    const playStoreImage = {
        width: '180px',
        height: '50px',
        backgroundImage: 'url(' + PlayStoreLogo + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        display: 'inline-block',
        textAlign: 'center',
        backgroundPosition: 'center',
        cursor: 'pointer',
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
        marginLeft: '10px',
        cursor: 'pointer',
    }

    const consoleButton = {
      textTransform: 'none',
      marginRight:'30px',
      padding: '10px',

    }

    const authButtons = {
      textTransform: 'none',
      marginRight:'30px',
      width: '150px',
      padding: '10px',
    }

    const orButton = {
      textTransform: 'none',
      margin:'0 0 0 -30px',
    }

    const ppats = props.ppats ? true : false;

  return (
    <div>
    <div className='home-topBar'>
        <div 
          style={{
            display: 'flex', 
            flexDirection: 'row',
            alignItems: 'center',
            }}>
        <div 
          style={{width: '200px', marginLeft: '30px', cursor: 'pointer'}}
          onClick={props.goToHomePage}
          >
          <NameLogo 
          height='60px'
          />
        </div>

        {/* <Button
          style={{textTransform: 'none'}}
          color='primary'
          onClick={props.goToConsolePage}
          >
            What Is Vistogram?
        </Button>

        <Button
          style={{textTransform: 'none'}}
          color='primary'
          onClick={props.goToConsolePage}
          >
            How it works
        </Button>

        <Button
          style={{textTransform: 'none'}}
          color='primary'
          onClick={props.goToConsolePage}
          >
            How It looks
        </Button>

        <Button
          style={{textTransform: 'none'}}
          color='primary'
          onClick={props.goToConsolePage}
          >
            Pricing
        </Button>

        <Button
          style={{textTransform: 'none'}}
          color='primary'
          onClick={props.goToConsolePage}
          >
            Our clients
        </Button>

        <Button
          style={{textTransform: 'none'}}
          color='primary'
          onClick={props.goToConsolePage}
          >
            Contact
        </Button>

        <Button
          style={{textTransform: 'none', borderRadius: '50px', marginLeft: '50px'}}
          variant="contained"
          color='primary'
          onClick={props.goToConsolePage}
          >
            Download
        </Button> */}
        </div>

        <div>{props.ppatst}</div>

        {ppats ? <div></div> : <div>
        <div style={playStoreImage}
              onClick={redirectToPlayStore}
        >
        </div>
        <div style={appStoreImage}>
        </div>
        </div>}



        {ppats ? <div></div> : props.userData ? <div>
        <Button
          style={consoleButton}
          color='primary'
          variant='outlined'
          onClick={props.goToConsolePage}
          >
            Go To Console
            <ChevronRightIcon />
        </Button>
        </div> : 
        <div>
          <Button
            style={authButtons}
            color='primary'
            variant='outlined'
            onClick={props.goToLoginPage}
            >
              Login
          </Button>

          <Button
          style={orButton}
            color='primary'
            disabled
            >
              Or
          </Button>

          <Button
            style={authButtons}
            color='primary'
            variant='contained'
            onClick={props.goToRegisterPage}
            >
              Register
          </Button>
        </div>}

        </div>
    </div>
  )
}

export default TopBar;
