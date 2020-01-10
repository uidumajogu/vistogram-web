import React from 'react';
import VistogramNameLogo from '../assets/vistogramNameLogo.png';


const NameLogo = (props) => {

      const nameLogo = {
          height: props.height,
          width: '100%',
          backgroundImage: 'url(' + VistogramNameLogo + ')',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          display: 'inline-block',
          textAlign: 'center',
          backgroundPosition: 'center',
      }

    return (
        <div style={nameLogo}>
        </div>
    )
};

export default NameLogo;