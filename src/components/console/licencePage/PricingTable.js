import React from 'react';
import Button from '@material-ui/core/Button';

const PricingTable = props => {
    const headerDiv = {
        height: '40%',
        width: '100%',
        backgroundColor: props.headerDivBkgColor,
        borderRadius: '30px 30px 0 0',
        color: 'white',
        fontSize: '50px',
        padding: '50px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    }

    const selectButton = {
        textTransform: 'none',
        borderRadius: '100px',
        fontSize: '16px',
        width: '70%',
        marginBottom: '20px',
    }

  return (
    <div className='console-pricing-table'>
    <div style={headerDiv}>
    <div>
        {props.price}
        <p 
            style={{
                padding: '0', 
                margin: '0', 
                fontSize: '18px'
            }}>{props.plan}</p>
                <p 
            style={{
                // padding: '0', 
                // margin: '0', 
                fontSize: '14px'
            }}>{props.planRecommended}</p>
    </div>
    </div>
    <div>
        <p>All Features</p>
        <p>Free updates on New Features</p>
        <p>Support</p>
        <p>Training</p>
    </div>

    <div>
        <Button
            style={selectButton}
            variant="contained"
            color={props.devicePlan === '10' ? "primary" : "secondary"}
            // onClick={props.pay}
        >
            Select
        </Button>
    </div>
      
    </div>
  )
}

export default PricingTable;
