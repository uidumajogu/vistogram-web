import React from 'react';


const WelcomeScreen = props => {

    const welcomeScreenContainer = {
        height: '100%',
        width: '100%',
        backgroundColor: props.primaryColor + '73',
        color: 'white',
        textAlign: 'center',
        backgroundBlendMode: 'overlay',
      };

      const logo = {
          height: '50px',
          width: '100%',
          backgroundImage: 'url(' + props.logoUrl + ')',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          display: 'inline-block',
          textAlign: 'center',
          marginTop: '10%',
          marginBottom: '30px',
          backgroundPosition: 'center',
      }

      const companyName = {
        margin: '1px',
        padding: '0',
        fontSize: '16px'
      }

      const companySlogan = {
        margin: '0',
        padding: '0',
        fontSize: '10px'
      }

      const welcomeMessage = {
        margin: '5px',
        padding: '0',
      }

      const welcome = {
        margin: '0',
        padding: '0',
      }

    return (
        <div style={welcomeScreenContainer}>

        <div style={logo}>
        </div>

        <h2 style={welcome}>WELCOME</h2>
        <h5 style={companyName}>to {props.companyName} 
        {props.hasOutlet ? ' ('+props.outlet+')' : null}</h5>
        <p style={companySlogan}>{props.slogan}</p>
        <p style={welcomeMessage}>{props.welcomeMessage}</p>


        </div>
    )
};

export default WelcomeScreen;