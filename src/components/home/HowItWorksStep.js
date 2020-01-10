import React from 'react';

const HowItWorksStep = props => {

    const stepDiv = {
        height: '400px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        textAlign: 'left',
        margin: '0 100px 0 100px',
        // border: '0.5px solid #E0E5F6',
        borderRadius: '20px',
    }

    const stepimage = {
        height: '400px',
        width: '50%',
        backgroundImage: 'url(' + props.image + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
    }

  return (
   props.stepDirection === 'right' ? <div style={stepDiv}>

    <div style={stepimage}></div>

      <div style={{width: '40%'}}>
          <h1 style={{
          width: '10%', 
          fontSize: '80px',
          margin: 0, 
          color:'#FFC233'}}>{props.step}</h1>
          <h3>{props.title}</h3>
          <div 
          style={{
              fontSize: '14px', 
              color:'#253061'}}>
              {props.message}</div>
      </div>

    </div> : 

        <div style={stepDiv}>

        <div style={{width: '40%'}}>
            <h1 style={{
            width: '10%', 
            fontSize: '80px',
            margin: 0, 
            color:'#FFC233'}}>{props.step}</h1>
            <h3>{props.title}</h3>
            <div 
            style={{
                fontSize: '14px', 
                color:'#253061'}}>
                {props.message}</div>
        </div>

        <div style={stepimage}></div>

        </div>
  )
}

export default HowItWorksStep;
