import React from 'react';
import InputField from './InputField';
import signImage from '../../assets/signImg.png'
import cameraImage from '../../assets/cameraImg.png'
import '../../styles/InitialSetup.css';


const mainScreen = props => {

    const mainScreenContainer = {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
    };

    const advertsContainer = {
        width: '40%',
        height: '100%',
        backgroundImage: 'url(' + props.advert + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    };

    const fieldsContainer = {
        width: '60%',
        height: '100%',
        margin: '10px',
        textAlign: 'right'
    }

      const logo = {
          height: '30px',
          width: '100%',
          backgroundImage: 'url(' + props.logoUrl + ')',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          display: 'inline-block',
          backgroundPosition: 'center',
      }


      const fields = {
        // boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
        width: '100%',
        height: '70%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginTop: '20px'
      }

      const buttonRow = {
        textAlign: 'center',
        width: '80%',
        display: 'flex',
        flexDirection: 'row',
        left: '0',
        right: '0',
        margin: '20px',
        justifyContent: 'space-between',
        alignContent: 'center'
      }

      const nextButton = {
        backgroundColor: props.primaryColor,
        color: 'white',
        display: 'inline-block',
        textAlign: 'center',
        borderRadius: '5px',
        padding: '5px 20px 5px 20px',
        fontWeight: 'bold',
        border: '1px ' + props.primaryColor + ' solid',
    }

    const backButton = {
        backgroundColor: 'white',
        color: props.secondaryColor,
        display: 'inline-block',
        textAlign: 'center',
        borderRadius: '5px',
        padding: '5px 20px 5px 20px',
        border: '1px ' + props.secondaryColor + ' solid',
    }

    const fieldContents = {
        textAlign: 'left',
        padding: '10px',
    }

    const fieldDiv = {
        position: 'relative',
        padding: '10px',
    }

    const overlay = {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        zIndex: '10',
        backgroundColor: 'rgba(0,0,0,0.0)',
        fontSize: '45px',
        color: 'red',
      }

    const cameraContainer = {
        width: '100%',
        textAlign: 'center',
        display: 'inline-block',
    }

    const secImage = {
        height: '60px'
    }

    const cameraDiv = {
        width: '100px',
        height: '100px',
        border: '1px #E0E5F6 solid',
        borderRadius: '5px',
        padding: '10px',
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'center',
        display: 'inline-block',
    }

    const signatureDiv = {
        width: '90%',
        height: '100px',
        border: '1px #E0E5F6 solid',
        borderRadius: '5px',
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'center',
        display: 'inline-block',
    }

    const bioFormfields = (
        <div style={fieldDiv}>
        {!props.fields.inputParams['1bioForm'] ? 
        <div 
        style={overlay}
        ><p className='textRotation'>Disabled</p></div> : 
        <div></div>}
            <p>Tell us about yourself</p>
            {props.fields.bioForm.map((field, index) => (
                field.active ? <InputField 
                key={index}
                name={field.field}
                /> : null
            ))}
        </div>
    )


    const addressFormfields = (
        <div style={fieldDiv}>
        {!props.fields.inputParams['2addressForm'] ? 
        <div 
        style={overlay}
        ><p class='textRotation'>Disabled</p></div> : 
        <div></div>}
            <p>What's your address?</p>
            {props.fields.addressForm.map((field, index) => (
                field.active ? <InputField 
                key={index}
                name={field.field}
                /> : null
            ))}
        </div>
    )


    const hostFormfields = (
        <div style={fieldDiv}>
        {!props.fields.inputParams['3hostForm'] ? 
        <div 
        style={overlay}
        ><p class='textRotation'>Disabled</p></div> : 
        <div></div>}
            <p>Who are you visiting?</p>
            {props.fields.hostForm.map((field, index) => (
                field.active ? <InputField 
                key={index}
                name={field.field}
                /> : null
            ))}
        </div>
    )


    const picturePanel = (
        <div style={fieldDiv}>
        {!props.fields.inputParams['4takePicture'] ? 
        <div 
        style={overlay}
        ><p class='textRotation'>Disabled</p></div> : 
        <div></div>}
            <p>Take a Picture</p>

            <div style={cameraContainer}>
            <div style={cameraDiv}>
                <img
                    style={secImage} 
                    src={cameraImage}
                    alt='camera'
                /> 

            </div>
            </div>

        </div>
    )


    const signaturePad = (
        <div style={fieldDiv}>
        {!props.fields.inputParams['5signaturePad'] ? 
        <div 
        style={overlay}
        ><p class='textRotation'>Disabled</p></div> : 
        <div></div>}
            <p>Sign here</p>

            <div style={cameraContainer}>
            <div style={signatureDiv}>
                <img
                    style={secImage} 
                    src={signImage}
                    alt='signature'
                /> 

            </div>
            </div>

        </div>
    )


    const tagfield = (
        <div style={fieldDiv}>
        {!props.fields.inputParams['6tagForm'] ? 
        <div 
        style={overlay}
        ><p class='textRotation'>Disabled</p></div> : 
        <div></div>}
            <p>Enter tag number?</p>
            {props.fields.tagForm.map((field, index) => (
                field.active ? <InputField 
                key={index}
                name={field.field}
                /> : null
            ))}
        </div>
    )




    return (
        <div style={mainScreenContainer}>

        <div style={advertsContainer}>
        </div>

        <div style={fieldsContainer}>

        <div style={logo}>
        </div>

        <div style={fields}>
        <div style={fieldContents}>
        {
        props.activeStep < 6 ? 
            bioFormfields :
        props.activeStep === 6 ? 
            addressFormfields :
        props.activeStep === 7 ? 
            hostFormfields :
        props.activeStep === 8 ? 
            picturePanel : 
        props.activeStep === 9 ? 
            signaturePad : 
        props.activeStep === 10 ? 
                tagfield :   
            null
        }
        </div>

        <div style={buttonRow}>
        <div style={backButton}>
                Back
            </div>
            <div style={nextButton}>
                Next
            </div>
        </div>
        </div>
        </div>


        </div>
    )
};

export default mainScreen;