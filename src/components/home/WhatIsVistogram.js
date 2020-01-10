import React from 'react';
import PlayStoreLogo from '../../assets/playStoreLogo.png';
import AppStoreLogo from '../../assets/appStoreLogo.png';
import BSh1 from '../../assets/bSh1.png';

const WhatIsVistogram = props => {

    const redirectToPlayStore = () =>{
        window.open('https://play.google.com/store/apps/details?id=com.remphil.visitorregister', '_blank');
    }


    const playStoreImage = {
        width: '200px',
        height: '50px',
        backgroundImage: 'url(' + PlayStoreLogo + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        display: 'inline-block',
        textAlign: 'center',
        backgroundPosition: 'center',
        cursor: 'pointer',
    }

    const appStoreImage = {
        width: '200px',
        height: '50px',
        backgroundImage: 'url(' + AppStoreLogo + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        display: 'inline-block',
        textAlign: 'center',
        backgroundPosition: 'center',
        cursor: 'pointer',
    }

    const wivImage = {
        width: '60%',
        height: '500px',
        marginRight: '40px',
        backgroundImage: 'url(' + BSh1 + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
    }


  return (
    <div className='home-whatIsVistogram'>
    <div style={wivImage}></div>

    <div className='home-message'>
    <h1>What Is <span style={{color: '#8934FF', fontWeight: 'bold'}}>vistogram?</span></h1>
    <p><span style={{fontSize: '18px', fontWeight: 'bold',}}>vistogram</span> is a Visitor Registration and Management app that 
        allows businesses to handle visitor registration securely, 
        smartly and speedily on an iPad or Android tablet device.  
    </p>
    <p>It is Cloud-Based and fully customizable. It captures the 
        Visitors Bio Information, Address, Purpose Of Visit, Photo, 
        Signature and Tag Number. You can upload your business logo and 
        apply your business branding.
    </p>
    <p>The Visitors information fields are fully customizable, 
        for example, if you do not want to capture the visitors photo,
        you can deactivate it, if you want only First and Last Names, 
        you can activate them and deactivate the other fields. It is 
        all within your control. 
    </p>
    <p>It also has a functionality for advert placement; the visitors 
        will see your adverts as they sign IN/OUT. Adverts are loaded 
        randomely during the sign IN/OUT process. You can also make 
        more money by placing adverts for others on your vistogram.
    </p>
 

    <div
       style={{
        display: 'flex', 
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: '30px',

    }}>
    <div 
        style={playStoreImage}
        onClick={redirectToPlayStore}
    ></div>
    <div style={appStoreImage}></div>
    </div>
    </div>
    </div>
  )
}

export default WhatIsVistogram;