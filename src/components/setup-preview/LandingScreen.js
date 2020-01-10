import React from 'react';


const LandingScreen = props => {

    const landingScreenContainer = {
        height: '100%',
        width: '100%',
        backgroundColor: props.primaryColor + '73',
        color: 'white',
        backgroundImage: 'url(' + props.bgImgUrl + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
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
          backgroundPosition: 'center',
      }

      const buttonRow = {
        textAlign: 'center',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        left: '0',
        right: '0',
        marginTop: '15%',
        justifyContent: 'space-around',
      }

      const signInButton = {
        width: '180px',
        backgroundColor: props.primaryColor,
        color: 'white',
        display: 'inline-block',
        textAlign: 'center',
        borderRadius: '20px',
        padding: '5px',
        margin: '50px',
        fontWeight: 'bold',
        border: '1px white solid',
    }

    const signOutButton = {
        width: '100px',
        backgroundColor: 'white',
        color: props.secondaryColor,
        display: 'inline-block',
        textAlign: 'center',
        borderRadius: '20px',
        padding: '5px',
        margin: '50px',
        // fontSize: '14px',
        border: '1px white solid',
    }

    return (
        <div style={landingScreenContainer}>

        <div style={logo}>
        </div>

        <p>Visitor Register</p>

        <div style={buttonRow}>
            <div style={signInButton}>
            Sign IN
            </div>

            <div style={signOutButton}>
            Sign OUT
            </div>
        </div>

        </div>
    )
};

export default LandingScreen;