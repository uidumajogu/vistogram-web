import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';


export const CompanyAdverts = props => {

    let label = 'Upload your advert images';
    let description = '';
    if (props.advertImagesUrl.length < 1) {
        label = 'Upload your advert images';
        description = '';
    } else {
        label = 'Add more advert images';
        if (props.advertImagesUrl.length > 1) {
            description = props.advertImagesUrl.length + ' Adverts';
        } else {
            description = props.advertImagesUrl.length + ' Advert';
        }
    }
    
    const fieldset = { 
        display: 'block',
        marginLeft: '2px',
        marginRight: '0',
        paddingTop: '0.35em',
        paddingBottom: '0.625em',
        paddingLeft: '0.75em',
        paddingRight: '0',
        border: '1px solid #BEBEC0',
        borderRadius: '3px',
        color: props.advertImagesUrl.length < 1 ? '#656566' : '#aa00ff',
        textAlign: 'left',
        fontSize: '11px',
        padding: '10px',
        marginBottom: '5px'
      }
    
    const uploadButtonRow = {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        marginTop: '20px'
    }

    const uploadButton = {
        fontSize: '12px',
        border: '1px grey solid',
        borderRadius: '5px',
        padding: '5px',
        marginRight: '10px',
        color: '#656566'
    }

    const fileInput = {
        display: 'none',
    }

    const advertsContainer = {
        width: '100%',
        marginTop: '30px',
        padding: '10px',
    }

    const advertPreview = {
        width: '100px',
        height: '130px',
        borderRadius: '5px',
    }

    const advertPreviewRow = {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        marginBottom: '10px'
    }

    const descDiv = {
        color: '#aa00ff'
    }

    const deleteButton = {
        color: 'red',
        width: '50px',
        height: '50px',
        marginLeft: '-10px',
    }

    return (

        <fieldset style={fieldset}>
            <legend>Advert(s)</legend>
            <div style={uploadButtonRow}>
            <div>
            <label 
                style={uploadButton}
                htmlFor="files"
                >
                    {label}
            </label>
            <input 
                style={fileInput}
                accept="image/*"
                id="files"
                type="file" 
                name="advert" 
                multiple 
                onChange={props.onChange}
                />
            </div>
            <div style={descDiv}>
                {description}
            </div>
            
            </div>

            <div style={advertsContainer}>
            {props.advertImagesUrl.map((advert, index) => (
                <div 
                    key={index}
                    style={advertPreviewRow}
                >
                <img
                    style={advertPreview} 
                    src={advert}
                    alt={props.advertImageNames[index]}
                />

                <IconButton 
                    style={deleteButton}
                    aria-label="Delete"
                    onClick={()=>props.onDelete(index, advert, props.advertImageNames[index])}
                    >
                    <CloseOutlinedIcon />
                </IconButton>
                </div>
            ))}
            </div>
        </fieldset>

    )
}

export default CompanyAdverts;