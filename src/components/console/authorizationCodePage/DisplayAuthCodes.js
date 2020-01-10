import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Close';
import Tooltip from '@material-ui/core/Tooltip';
import SimpleDialog from '../SimpleDialog';
import Button from '@material-ui/core/Button';
import {differenceInDays, parse} from 'date-fns';

const DisplayAuthCodes = props => {

    let licences = props.authCodeArray;

    const container = {
        border: 'solid 1px #E0E5F6'
    }

    const gridContainerHeader  = {
        display: 'grid',
        gridTemplateColumns: '30% 6% 6% 18% 12% 15% auto',
        // gridTemplateRows: '100px 300px',
        gridGap: '10px',
        backgroundColor: '#E0E5F6',
        padding: '10px',
        border: 'solid 1px #E0E5F6',
        // color: '#8934FF',
        textAlign: 'left',
        fontWeight: 'bold',
        fontSize: '12px'
      }

    const gridContainer  = {
        display: 'grid',
        gridTemplateColumns: '30% 6% 6% 18% 12% 15% auto',
        // gridTemplateRows: '100px 300px',
        gridGap: '10px',
        // background-color: #2196F3;
        padding: '1px 10px 1px 10px',
        border: 'solid 1px #E0E5F6',
        textAlign: 'left',
        alignItems:'center',
        fontSize: '14px'
      }

     
      const openACDeleteDialog = ac => {
        props.handleACToDelete(ac);
        props.handleOpenDialog('openACDeleteDialog');
      }

      const daysTillExpiry = s => {
          return differenceInDays(
            parse(s.replace(' ', 'T').replace(/\//g,'-')),
            Date.now()
          );
      }


  return (
    <div style={container}>
        <div style={gridContainerHeader}>
            <div>Authorization Code</div>
            <div>Type</div>
            <div>Status</div>  
            <div>Current Device</div>  
            <div>Setting</div>
            <div>Created On</div>
        </div>
        {licences.map(ac=>(
        <div key={ac.AC} style={gridContainer}>
            <div 
            style={{color: ac.licence === 'Trial' 
            ? '#253061' : '#8934FF'}}>{ac.AC}
            {
                ac.expiryDate === 'Never' ?
            <div></div> :

            daysTillExpiry(ac.expiryDate) === 0 ? 
            <div 
                style={{
                    color: '#FF5C61', 
                    fontSize: '10px'}}>Expired</div> :
              
            <div 
                style={{
                    color: '#FF5C61', 
                    fontSize: '10px'}}>
                    Expires in {daysTillExpiry(ac.expiryDate)} day{daysTillExpiry(ac.expiryDate) > 1 ? 's' : ''}
                    </div>}
                    </div>
            <div>{ac.licence}</div>
            <div>{ac.status}</div> 
            <div>{ac.deviceDataPlatform === 'Android' ? 
            ac.deviceData.brand + ' ' + ac.deviceData.device : 
            ac.deviceDataPlatform === 'iOS' ? 
            ac.deviceData.model + ' ' + ac.deviceData.utsnameMachine :
            'No Device'
            }</div>  
            <div>{ac.setup}</div>
            <div>{ac.createdDate}</div>
            <div style={{textAlign: 'right'}}>
                <Tooltip title='Delet((e Authorization Code'>
                <IconButton onClick={()=>openACDeleteDialog(ac.AC)}>
                <DeleteIcon fontSize="small" style={{color: '#ef0c00'}}/>
                </IconButton>
                </Tooltip>
            </div>
        </div>
        ))}

            <div>
                <SimpleDialog 
                openDialog={props.openACDeleteDialog}
                handleOpenDialog={()=>props.handleOpenDialog('openACDeleteDialog')}
                handleCloseDialog={()=>props.handleCloseDialog('openACDeleteDialog')}
                dialogContentWidth='500px'
                dialogContentPadding='0 20px 20px 20px'
                dialogTitleColor='#ef0c00'
                dialogTitle={'Are you sure?'}
                dialogContent={
                    <div>
                        <div 
                        style={{color:'#253061', 
                                border:'solid 1px #DC2048', 
                                borderRadius: '5px',
                                padding: '20px',
                                margin: '10px',
                                textAlign:'center'}}>
                        Once this Authorization Code is deleted, 
                        it cannot be undone. However, you can 
                        generate another one.
                        </div>


                        <div style={{margin:'30px', textAlign:'left'}}>
                        <div style={{fontSize: '10px'}}>Authorization Code</div>
                        <div style={{color: '#8934FF'}}>{props.acToDelete}</div>
                        </div>

                        <div style={{textAlign: 'right'}}>
                        <Button
                            style={{color: '#253061'}}
                            onClick={()=>props.handleCloseDialog('openACDeleteDialog')}
                            >
                            Cancel
                        </Button>

                        <Button
                            variant="contained"
                            style={{backgroundColor: "#DC2048", color: '#ffffff'}}
                            onClick={()=>props.deleteAuthCode(props.acToDelete)}
                            >
                                Delete
                        </Button>
                        </div>



                        
                    </div>
                }
                />
            </div>
    </div>
  )
}

export default DisplayAuthCodes;
