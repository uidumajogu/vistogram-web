import React from 'react';
import Button from '@material-ui/core/Button';
import LicenceImage from '../../../assets/06.png';

const LicenceHome = props => {


    const purchaseButton = {
        textTransform: 'none',
        borderRadius: '100px',
        fontSize: '16px',
        width: '300px',
        color:'#253061',
        // marginBottom: '30px',
    }

    const purchaseDetailsDiv = {
        width: '100%',
        height: '80vh',
        color: '253061',
        padding: '50px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

        backgroundImage: 'url(' + LicenceImage + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
    }

    const licenceDisplay = {
        padding: '50px',
        border: 'solid 1px #E0E5F6',
        borderRadius: '20px',
        backgroundColor: 'white',
        textAlign: 'center',
        width: '400px',
        height: '400px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between'
    }


  return (
    <div>
        <div style={purchaseDetailsDiv}>
        <div style={licenceDisplay}>
            <div>
            <p>You have</p>
            <h1 style={{
                fontSize: '90px', 
                color: '#8934FF',
                margin: '0'
                }}>{props.userData.licences}</h1>
            <p>licences</p>
            </div>

            <div style={{textAlign: 'center'}}>
            <Button
                style={purchaseButton}
                variant="contained"
                color="secondary"
                onClick={props.purchaseLicence}
            >
                Purchase
            </Button>
            </div>
        </div>
        </div>
    </div>
  )
}

export default LicenceHome;
