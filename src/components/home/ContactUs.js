import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Margin from '../../components/Margin';
import AddressIcon from '@material-ui/icons/Home';
import SupportIcon from '@material-ui/icons/Build';
import InquiryIcon from '@material-ui/icons/Info';
import PhoneIcon from '@material-ui/icons/PhonelinkRing';


const ContactUs = props => {

    const row = {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    }

  return (
    <div className='home-contactUs'>

    <div style={{width: '40%', textAlign: 'left'}}>
    <h1>Contact <span style={{color: '#8934FF'}}>Us</span></h1>
    <Margin
        height='50px'
        width='10px'/>

    <h3>DO NOT HESITATE TO CONTACT US FOR ANY SUPPORT OR INQUIRY ON 
        VISTOGRAM
    </h3>
    <Margin
        height='10px'
        width='10px'/>

    <div style={row}>
    <AddressIcon style={{marginRight: '10px', color: '#8934FF'}}/> 
    <p>25 Admiralty Road, Lekki Phase 1, Lagos State, Nigeria</p>
    </div>

    <div style={row}>
    <SupportIcon style={{marginRight: '10px', color: '#8934FF'}}/> 
    <p>support@vistogram.com</p>
    </div>

    <div style={row}>
    <InquiryIcon style={{marginRight: '10px', color: '#8934FF'}}/> 
    <p>inquiry@vistogram.com</p>
    </div>
    
    <div style={row}>
    <PhoneIcon style={{marginRight: '10px', color: '#8934FF'}}/> 
    <p>+234 802-285-0200</p>
    </div>
    </div>
    
    <div style={{width: '40%'}}>
        <div>
        <TextField
            id="email"
            label="Email"
            type="email"
            name="email"
            margin="normal"
            variant="outlined"
            fullWidth
            />
        </div>

        <div>
        <TextField
          id="phone#"
          label="Phone Number"
          type="number"
          name="phone#"
          margin="normal"
          variant="outlined"
          fullWidth
        />
        </div>

        <div>
        <TextField
          id="subject"
          label="Subject"
          type="text"
          name="subject"
          margin="normal"
          variant="outlined"
          fullWidth
        />
        </div>

        <div>
        <TextField
          id="message"
          label="Message"
          type="text"
          name="message"
          multiline
          rows="8"
          margin="normal"
          variant="outlined"
          fullWidth
        />
        </div>

        <div>
        <Button
        style={{textTransform: 'none', fontSize: '16px'}}
          color='secondary'
          variant='contained'
          fullWidth
        //   onClick={props.goToConsolePage}
          >
            Submit
        </Button>
        </div>
    </div>

      
    </div>
  )
}

export default ContactUs;
