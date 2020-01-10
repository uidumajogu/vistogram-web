import React from 'react';
import novImage from '../../assets/noVisitor.png';
import Chip from '@material-ui/core/Chip';
import '../../styles/Console.css';

const NoData = props => {

    const container = {

        width: '100%',
        height: '80vh',
        color: '253061',
        padding: '50px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    }

    const text = {
        fontSize: '12px',
        width: '300px',
        padding: '10px',
        textAlign: 'center',
    }

  return (
    <div style={container}> 
    <div>
        <div style={text}>{props.remark}</div>

        <Chip
        className='console-noDataChip'
        label={props.message}
        onClick={props.clickChip ? props.onClickChip : null}
        />

        <div style={{
            display: 'block',
            margin: '20px auto',
            height: '300px',
            width: '300px',
            backgroundImage: 'url(' + novImage + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'center',}}></div>
    </div>
    </div>
  )
}

export default NoData;
