
import React from 'react';


const Margin = (props) => {

      const margin = {
          height: props.height,
          width: props.width === '' ? '100%' : props.width,
      }

    return (
        <div style={margin}>
        </div>
    )
};

export default Margin;