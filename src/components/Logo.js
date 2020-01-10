import React from 'react';
import VistogramLogo from '../assets/vistogramLogo.png';


const Logo = (props) => {

      const logo = {
          height: props.height,
          width: '100%',
          backgroundImage: 'url(' + VistogramLogo + ')',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          display: 'inline-block',
          textAlign: 'center',
          backgroundPosition: 'center',
      }

    return (
        <div style={logo}>
        </div>
    )
};

export default Logo;