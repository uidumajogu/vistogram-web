import React from "react";
import Link from '@material-ui/core/Link';
import '../styles/BottomBar.css'

const BottomBar = props => {

    const rlAbs = {
            bottom: '0',
            position: 'fixed'
    }

  return (
  <div className='bottombar' style={props.rlAbs ? rlAbs : null}>

        <Link
            className='bottombar-tnc'
            component="button"
            variant="body2"
            onClick={props.goToTermsAndConditionsPage}
            >
            TERMS AND CONDITIONS
        </Link>

        <Link
            className='bottombar-tnc'
            component="button"
            variant="body2"
            onClick={props.goToPrivacyPolicyPage}
            >
            PRIVACY POLICY
        </Link>
    
    <p className='bottombar-cr'>© 2019 VISTOGRAM</p>
  </div>
  )
};

export default BottomBar;