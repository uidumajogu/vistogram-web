import React, { Component } from 'react';
import LandingScreenPreview from '../../components/setup-preview/LandingScreen';
import WelcomeScreenPreview from '../../components/setup-preview/WelcomeScreen';
import MainScreenPreview from '../../components/setup-preview/MainScreen';
import Logo from '../../components/Logo';
import '../../styles/InitialSetup.css';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import {UserData, BusinessCategories, DefaultSettings} from '../../root/App';
import CompanyInfo from '../../components/initial-setup/CompanyInfo';
import CompanyColors from '../../components/initial-setup/CompanyColors';
import CompanyAssets from '../../components/initial-setup/CompanyAssets';
import WelcomeInfo from '../../components/initial-setup/WelcomeInfo';
import CompanyAdverts from '../../components/initial-setup/CompanyAdverts';
import Form from '../../components/initial-setup/Form';
import SecurityData from '../../components/initial-setup/SecurityData';
import Margin from '../../components/Margin';
import Firebase from '../../firebase/Config';
import TextField from '@material-ui/core/TextField';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {format} from 'date-fns';


let advertNum = 0;

const db = Firebase.firestore();
const storage = Firebase.storage();

let imagesRef = '';
let logoImageDUrl = '';
let backgroundImageDUrl = '';
let advertsDUrl = [];


export class Setup extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
            logoImageUrl: DefaultSettings.logoImageDownloadUrl,
            backgroundImageUrl: DefaultSettings.backgroundImageDownloadUrl,
            advertImagesUrl: [],
            primaryColor: DefaultSettings.primaryColor,
            primaryColorChange: false,
            secondaryColor: DefaultSettings.secondaryColor,
            secondaryColorChange: false,
            activeStep: 0,
            businessCategory: 'None',
            businessCategoryError: false,
            businessCategoryChange: false,
            businessMultiOffices: '',
            businessMultiOfficesArray: [],
            businessMultiOfficesError: false,
            businessMultiOfficesChange: false,
            businessSlogan: '',
            businessSloganChange: false,
            businessBranch: '',
            businessBranchError: false,
            businessBranchChange: false,
            welcomeMessage: '',
            welcomeMessageError: false,
            welcomeMessageChange: false,
            openColorDialog: false,
            activeColorSelect: 'Primary Color',
            backgroundImage: '',
            backgroundImageValue: '',
            backgroundImageType: 'file',
            backgroundImageChange: false,
            logoImage: '',
            logoImageValue: '',
            logoImageType: 'file',
            logoImageChange: false,
            logoImageError: false,
            advertImages: [],
            advertImageNames: [],
            advertImagesChange: false,
            fields: DefaultSettings.fields,
            purposeOfVisitOptions: DefaultSettings.purposeOfVisitOptions,
            settingsName: '',
            settingsNameChange: false,
            settingsNameError: false,
            submiting: false,
            initialSettings: UserData.initialSetup,
            scpPresetColors: ['#8934FF', '#3C2F5A', '#D0021B', 
                              '#F5A623', '#F8E71C', '#8B572A', 
                              '#7ED321', '#417505', '#BD10E0', 
                              '#4A90E2', '#50E3C2', '#B8E986', 
                              '#000000', '#4A4A4A', '#9B9B9B', 
                              '#FFFFFF', ]
        };
      }

      goToConsolePage = () => {
        this.props.history.push("/console");
      }
  
      goToGenerateAuthorizationCode = () => {
        this.props.history.push({
          pathname: "/console",
          state: {
            activeLink: 'authorizationCode',
            header: 'Manage Your Authorization Codes',
          }
        });
      }
  
      goToHomePage = () => {
        this.props.history.push("/");
      }

      submitSettings = async () => {
        this.setState(state => ({
          submiting: true
        })); 

        imagesRef = storage.ref().child(UserData.ID);
        
        let uploadLogoImage = this.state.logoImage;
        imagesRef.child('logoImage').put(uploadLogoImage).then(snapshot=> {
          imagesRef.child('logoImage').getDownloadURL().then(lIDUrl=>{
              logoImageDUrl = lIDUrl;
              this.uploadHomeBackgroundImg();
            });
          });
      }


      uploadHomeBackgroundImg = () => {
        let uploadHomeBackgroundImage = this.state.backgroundImage;
        
        if (uploadHomeBackgroundImage === '') {
          backgroundImageDUrl = DefaultSettings.backgroundImageDownloadUrl;
          this.uploadAdvertImgs();
        } else {
          imagesRef.child('homeBackgroundImage').put(uploadHomeBackgroundImage).then(snapshot=>{
            imagesRef.child('homeBackgroundImage').getDownloadURL().then(bIDUrl=>{
              backgroundImageDUrl = bIDUrl;
              this.uploadAdvertImgs();
            });
          });
        }
      }


      uploadAdvertImgs = () => {
        let uploadAdverts = this.state.advertImages;
        if (uploadAdverts.length === 0) {
          advertsDUrl.push(DefaultSettings.advertsDownloadUrl,);
          this.updateSettings();
        } else {
          uploadAdverts.forEach((uploadAdvert, index) => {
            imagesRef.child('advert' + [index + 1]).put(uploadAdvert).then(snapshot=>{
              imagesRef.child('advert' + [index + 1]).getDownloadURL().then(aDUrl=>{
                advertsDUrl.push(aDUrl);

                if (uploadAdverts.indexOf(uploadAdvert) === uploadAdverts.length - 1) {
                  this.updateSettings();
                }
              });
            });
        });
        }
      }


      updateSettings = () => {
        db.collection('settings-' + UserData.ID).doc(this.state.settingsName).set({
          fields: this.state.fields,
          primaryColor: this.state.primaryColor,
          secondaryColor: this.state.secondaryColor,
          businessCategory: this.state.businessCategory,
          businessName: UserData.businessName,
          businessSlogan: this.state.businessSlogan,
          businessBranch: this.state.businessBranch,
          welcomeMessage: this.state.welcomeMessage,
          logoImageDownloadUrl: logoImageDUrl,
          backgroundImageDownloadUrl: backgroundImageDUrl,
          advertsDownloadUrl: advertsDUrl,
          businessMultiOffices: this.state.businessMultiOfficesArray,
          purposeOfVisitOptions: this.state.purposeOfVisitOptions,
          createdDate:format(
            Date.now(),
            ' YYYY-MM-DD HH:MM:SS'
          ),
        }).then(()=>{
          db.collection('vistogramUsers').doc(UserData.ID).update({
            initialSetup: true,
          }).then(()=>{
            if (this.state.initialSettings) {
              this.goToConsolePage();
            } else {
              this.goToGenerateAuthorizationCode();
            }
               
        }); 
      }); 
      }


    getSteps = () => {
        return [
        'Provide Basic Information',
        'Set Brand Colors', 
        'Upload Logo & Background Image',
        'Configure Welcome Message',
        'Upload Adverts',
        'Set Visitor Bio Fields',
        'set Visitor Address Fields',
        'Set Visitor Host Parameters',
        'Set Visitor Security Data',
        ];
    }

    handleNext = () => {
          switch (this.state.activeStep) {
            case 0:
            if (this.state.businessCategory === 'None') {
              this.setState(state => ({
                businessCategoryError: true
              }));               
            } else {
              if (this.state.businessCategory === 'Multi-Tenant Office Building' && this.state.businessMultiOffices === '') {
                this.setState(state => ({
                  businessMultiOfficesError: true
                }));               
              } else {
                if(this.state.businessCategory === 'Multi-Tenant Office Building' && this.state.businessMultiOffices !== '') {
                  let nFields = this.state.fields;
                  nFields['hostForm'][0]['active'] = true;
                  this.setState(state => ({
                    fields: nFields,
                  })); 
                  this.nextStep();
                } else {
                  if(this.state.businessCategory !== 'Multi-Tenant Office Building'){
                    let nFields = this.state.fields;
                    nFields['hostForm'][0]['active'] = false;
                    this.setState(state => ({
                      businessMultiOffices: '',
                      fields: nFields,
                    })); 
                  }
                  this.nextStep();
                }
              }
            }
            break;

            case 1:
              this.nextStep();
              break;

            case 2:
              if (this.state.logoImageChange === false) {
                this.setState(state => ({
                  logoImageError: true
                }));
              } else {
                  this.nextStep();
              }
              break;

            case 3:
                this.nextStep();
              break;

            case 4:
              this.nextStep();
              break;
            case 5:
              this.nextStep();
              break;
            case 6:
              this.nextStep();
              break;
            case 7:
              this.nextStep();
              break;
            case 8:
              this.nextStep();
              break;
            case 9:
              this.nextStep();
              break;
            case 10:
            if (this.state.settingsName === '') {
              this.setState(state => ({
                settingsNameError: true
              }));
            } else {
              this.submitSettings();
            }   
              break;
            default:
              return this.nextStep();
          }
      };

      nextStep = () => {
        this.setState(state => ({
          activeStep: state.activeStep + 1,
        }));
      }
    
      handleBack = () => {
        this.setState(state => ({
          activeStep: state.activeStep - 1,
        }));
      };

      handleChange = name => event => {
        let fieldsC = this.state.fields;
        if(name === 'businessCategory' && event.target.value !== 'None') {

          for (let x =0; x < BusinessCategories.length; x++) {
            if (BusinessCategories[x].label === event.target.value) { 
              fieldsC.hostForm[2].field = BusinessCategories[x].identifier;
              fieldsC.hostForm[2].hintText = BusinessCategories[x].hint;
            }
          }

        }

        let multiOffices = [];
        if (name === 'businessMultiOffices') {
          if (event.target.value === "") {
            multiOffices = [];
          } else {
            multiOffices = event.target.value.split(',');
          }

          let trimedMultiOffices = multiOffices.map(str => str.trim());
          multiOffices = trimedMultiOffices;
        }

        this.setState({
          [name]: event.target.value,
          [name + 'Error']: false,
          [name + 'Change']: event.target.value === 'None' ? false : event.target.value !== ''  ? true : false,
          fields: fieldsC,
          [name + 'Array']: multiOffices,
        });
      };

      handleOpenColorDialog = color => {
        this.setState({ 
          openColorDialog: true,
          activeColorSelect: color,
        });
      }

      handleCloseColorDialog = () => {
        let newScpPresetColors = this.state.scpPresetColors;
        let newColor = this.state.activeColorSelect === 'Primary Color' ?
        this.state.primaryColor : this.state.secondaryColor;
        let inColArr = false;

        for (let i =0; i < newScpPresetColors.length; i++) {
          if (newScpPresetColors[i] === newColor) {
            newScpPresetColors.splice(i, 1);
            inColArr = true;
          }
        }

        if (!inColArr) {
          newScpPresetColors.pop();
        }
        newScpPresetColors.unshift(newColor);
        this.setState({ 
          openColorDialog: false,
          scpPresetColors: newScpPresetColors
        });
      };

      handleSelectColor = (color) => {
        if (this.state.activeColorSelect === 'Primary Color') {
          this.setState({ 
            primaryColor: (color.hex),
            primaryColorChange: true,
           });
        }

        if (this.state.activeColorSelect === 'Secondary Color') {
          this.setState({ 
            secondaryColor: (color.hex),
            secondaryColorChange: true,
          });
        }
    }

    

    handleAssetChange = name => event => {
      this.setState({
        [name]: event.target.files[0],
        [name + 'Value']: event.target.files[0].name,
        [name + 'Type']: name,
        [name + 'Change']: true,
        [name + 'Error']: false,
        [name + 'Url']: URL.createObjectURL(event.target.files[0])
      });
    }

    handleAssetDelete = name => {
      this.setState({
        [name]: '',
        [name + 'Value']: '',
        [name + 'Type']: 'file',
        [name + 'Change']: false,
        [name + 'Error']: false,
        [name + 'Url']: 
          name === 'logoImage' ? DefaultSettings.logoImageDownloadUrl : 
          name === 'backgroundImage' ? DefaultSettings.backgroundImageDownloadUrl : null
      });
    }


    handleAdvertChange = event => {
      let advertImages = this.state.advertImages;
      let advertImagesUrl = this.state.advertImagesUrl;
      let advertImageNames = this.state.advertImageNames;

      for (let x = 0; x < event.target.files.length; x++) {
        advertImages.push(event.target.files[x]);
        advertImagesUrl.push(URL.createObjectURL(event.target.files[x]));
        
        advertImageNames.push(event.target.files[x].name);
      }
      this.setState({
        advertImages: advertImages,
        advertImagesChange: true,
        advertImagesUrl: advertImagesUrl,
        advertImageNames: advertImageNames
      });
    }

    handleAdvertDelete = (index, advert, advertName) => {
      let filteredAdvertsUrl = this.state.advertImagesUrl.filter(advertItem => advertItem !== advert);

      let filteredAdverts = this.state.advertImages.filter(advertItem => this.state.advertImages.indexOf(advertItem) !== index);

      let filteredAdvertNames = this.state.advertImages.filter(advertNameItem => advertNameItem !== advertName);

      advertNum=0;

      this.setState({
        advertImages: filteredAdverts,
        advertImagesChange: filteredAdverts.length > 0 ? true : false,
        advertImagesUrl: filteredAdvertsUrl.length > 0 ? filteredAdvertsUrl : [],
        advertImageNames: filteredAdvertNames
      });
    }


    handleFormChange = (form, formidf) => {
      let thisfields = this.state.fields;
      thisfields.inputParams[form] = !thisfields.inputParams[form];

      if (thisfields.inputParams[form] === true) {
      if(thisfields[formidf]) {
        let anyFieldActive = false;

          for (let x = 0; x < thisfields[formidf].length; x++) {
            if(thisfields[formidf][x].active === true) {
              anyFieldActive = true;
            }    
          }

          if (!anyFieldActive) {
            for (let x = 0; x < thisfields[formidf].length; x++) {
              thisfields[formidf][x].active = true;
            }
          }
        }
      }

      this.setState({
        fields: thisfields,
      });
    }

    handleFieldChange = (form, formidf, index) => {
      let thisfields = this.state.fields;
      thisfields.inputParams[form] = false;
      thisfields[formidf][index].active = !thisfields[formidf][index].active;

      for (let x = 0; x < thisfields[formidf].length; x++) {
        if (thisfields[formidf][x].active === true) {
          thisfields.inputParams[form] = true;
        }
      }

      this.setState({
        fields: thisfields,
      });
    }


  render() {

    const steps = this.getSteps();
    const { activeStep } = this.state;
    const businessCategories = BusinessCategories;
    let previewAdvertImage = '';
    

    if (this.state.advertImages.length === 0) {
      previewAdvertImage = DefaultSettings.advertsDownloadUrl;
    } else {
        previewAdvertImage = this.state.advertImagesUrl[advertNum];
        if (advertNum === this.state.advertImagesUrl.length - 1) {
          advertNum=0;
        } else {
          advertNum=advertNum+1;
        }
    }


    return (
    <div>

      <div className='setup-container'>
      <div className='setup-sidebar'>
      <div>
      <div className='setup-logo' onClick={this.goToHomePage}>
      <Logo
      height='50px' 
      />
      </div>

      <div className='setup-sidebar-content'>
      <p>
      Configure a setting to be applied to your VISTOGRAM. 
      This will give a unique look and feel to your VISTOGRAM.
      </p>

      <p>
          You can modify or add more configurations at 
          anytime from the settings tab on your console.
      </p>

      <p>
        Upload your Logo, 
        change background images, 
        edit Bio fields, upload advert images etc.
      </p>

      <div>
      {UserData.initialSetup ? <Button
          style={{textTransform: 'none', marginTop: '50px'}}
          color='secondary'
          variant="outlined"
          onClick={this.goToConsolePage}
          >
          <ChevronLeftIcon />
            Back To Console
      </Button> : null}
      </div>
      </div>
      </div>

      <div className='setup-sidebar-footer'>
          <h4 
            style={{
              color: '#FFC233', 
              margin: '0', 
              fontSize: '18px',}}
              >{UserData.businessName}</h4>
          {UserData.email}
      </div>
      
      </div>

      <div className='setup-content'>
      <div className='setup-content-header'>
      <div>Configure a setting for your VISTOGRAM</div>             
      </div>
      <div className='setup-stepper'>
      <Stepper
        activeStep={activeStep < 8 ? activeStep : 8} 
        alternativeLabel
        >
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>

    <div className='setup-content-children'>

      <div className='setup-configure'>
      <div>
        {
    activeStep === 0 ? 
        <CompanyInfo
          bcError={this.state.businessCategoryError}
          moError={this.state.businessMultiOfficesError}
          bcValue={this.state.businessCategory}
          moValue={this.state.businessMultiOffices}
          bcOnChange={this.handleChange('businessCategory')}
          moOnChange={this.handleChange('businessMultiOffices')}
          bcArray={businessCategories}
          moArray={this.state.businessMultiOfficesArray}
          bsValue={this.state.businessSlogan}
          bsOnChange={this.handleChange('businessSlogan')}
          bcFocus={this.state.businessCategoryChange}
          bsFocus={this.state.businessSloganChange}
          moFocus={this.state.businessMultiOfficesChange}
        /> :

    activeStep === 1 ? 
        <div>
            <h5 className='nMP'>Your Brand Primary and Secondary Colors</h5>
            <p className='colorC'>Click on the color circles to 
                                pick and change</p>
            <p className='colorC'>Primary and Secondary Brand Colors</p>
          <div className='setup-configure-fields'>
            <CompanyColors
              click={()=>{
                this.handleOpenColorDialog('Primary Color')
              }}
              name='primaryColor'
              label='Primary Color'
              focus={this.state.primaryColorChange}
              activeColorSelect={this.state.activeColorSelect}
              color={this.state.primaryColor}
              dialogIsOpen={this.state.openColorDialog}
              closeColorDialog={this.handleCloseColorDialog}
              handleSelectColor={this.handleSelectColor}
              pcpBkgColor={this.state.primaryColor}
              scpBkgColor={this.state.secondaryColor}
              presetColors={this.state.scpPresetColors}
              /> 

            <Margin 
              height='10px'
              width='100%'/>

            <CompanyColors
              click={()=>{
                this.handleOpenColorDialog('Secondary Color')
              }}
              name='secondaryColor'
              label='Secondary Color'
              focus={this.state.secondaryColorChange}
              activeColorSelect={this.state.activeColorSelect}
              color={this.state.secondaryColor}
              dialogIsOpen={this.state.openColorDialog}
              closeColorDialog={this.handleCloseColorDialog}
              handleSelectColor={this.handleSelectColor}
              pcpBkgColor={this.state.primaryColor}
              scpBkgColor={this.state.secondaryColor}
              presetColors={this.state.scpPresetColors}
              /> 
          </div>
        </div>: 

        activeStep === 2 ? 
        <div>
        <h5 className='nMP'>Logo and Background Image for Landing Screen</h5>
        <div className='setup-configure-fields'>
        <CompanyAssets
          name='logoImage'
          value={this.state.logoImageValue}
          label='Logo'
          type={this.state.logoImageType}
          focus={this.state.logoImageChange}
          error={this.state.logoImageError}
          src={this.state.logoImageUrl}
          helperText='We recommend a transaparent logo of at least 600px by 600px'
          onChange={this.handleAssetChange('logoImage')}
          onDelete={()=>this.handleAssetDelete('logoImage')}
        />

        <Margin 
            height='10px'
            width='100%'/>

        <CompanyAssets
          name='backgroundImage'
          label='Background Image'
          type={this.state.backgroundImageType}
          value={this.state.backgroundImageValue}
          focus={this.state.backgroundImageChange}
          error={this.state.backgroundImageError}
          src={this.state.backgroundImageUrl}
          helperText='We recommend a 1024px by 768px image'
          onChange={this.handleAssetChange('backgroundImage')}
          onDelete={()=>this.handleAssetDelete('backgroundImage')}
        />
        </div>
        </div>:


        activeStep === 3 ? 
        <div>
        <h5 className='nMP'>Welcome Information</h5>
        <div className='setup-configure-fields'>
          <WelcomeInfo
            id="businessBranch"
            label="Outlet"
            type="businessBranch"
            name="businessBranch"
            helperText='Enter the name of the outlet where this instance of VISTOGRAM will be deployed. e.g "Lagos Office 1" or "Head Office". (Optional)'
            multiline={false}
            rows="1"
            onChange={this.handleChange('businessBranch')}
            error={this.state.businessBranchError}
            value={this.state.businessBranch}
            focus={this.state.businessBranchChange}
          />

          <Margin
              height='10px'
              width='100%'/>

          <WelcomeInfo
            id="welcomeMessage"
            label="Welcome Message"
            type="welcomeMessage"
            name="welcomeMessage"
            helperText='Enter a welcome message for the visitor (optional)'
            multiline='multiline'
            rows={4}
            onChange={this.handleChange('welcomeMessage')}
            error={this.state.welcomeMessageError}
            value={this.state.welcomeMessage}
            focus={this.state.welcomeMessageChange}
          />
      </div>
      </div>: 


      activeStep === 4 ? 
      <div>
      <h5 className='nMP'>Advert(s) to display</h5>
      <div className='setup-configure-fields'>
        <CompanyAdverts 
          advertImagesUrl={this.state.advertImagesUrl}
          advertImageNames={this.state.advertImageNames}
          onChange={this.handleAdvertChange}
          onDelete={(index, advert, advertName)=>this.handleAdvertDelete(index, advert, advertName)}
        />
        <p 
          style={{
            fontSize: '10px',
            margin: '0',
            padding: '0'
            }}>
            We recommend advert images of 668px by 1024px
          </p>
      </div>
      </div>:


      activeStep === 5 ? 
      <div>
      <h5 className='nMP'>Bio Info</h5>
      <div className='setup-configure-fields'>
        <Form 
          name='Bio Form'
          id='1bioForm'
          idf='bioForm'
          fields={this.state.fields}
          formOnChange={(form, formidf)=>this.handleFormChange(form, formidf)}
          fieldOnChange={(form, formidf, index)=>this.handleFieldChange(form, formidf, index)}
        />
      </div>
      </div> :


      activeStep === 6 ? 
      <div>
      <h5 className='nMP'>Address Info</h5>
      <div className='setup-configure-fields'>
        <Form 
          name='Address Form'
          id='2addressForm'
          idf='addressForm'
          fields={this.state.fields}
          formOnChange={(form, formidf)=>this.handleFormChange(form, formidf)}
          fieldOnChange={(form, formidf, index)=>this.handleFieldChange(form, formidf, index)}
        />
      </div>
      </div> :
      
      
      activeStep === 7 ? 
      <div>
      <h5 className='nMP'>Host Info</h5>
      <div className='setup-configure-fields'>
        <Form 
          name='Host Form'
          id='3hostForm'
          idf='hostForm'
          fields={this.state.fields}
          formOnChange={(form, formidf)=>this.handleFormChange(form, formidf)}
          fieldOnChange={(form, formidf, index)=>this.handleFieldChange(form, formidf, index)}
        />
      </div>
      </div> : 
      


      activeStep === 8 ? 
      <div>
          <h5 className='nMP'>Configure Picture</h5>
          <div className='setup-configure-fields'>
            <SecurityData 
              name='Picture'
              id='4takePicture'
              idf='takePicture'
              fields={this.state.fields}
              formOnChange={(form, formidf)=>this.handleFormChange(form, formidf)}
            />

            <p 
              style={{
                color: '#8934FF', 
                fontSize: '12px',
                textAlign: 'left'}}
                >
                {this.state.fields.inputParams['4takePicture'] ? 
                'The Visitors picture will be taken at Sign IN.' :
                'The Visitors picture will not be required.'}</p>
        </div>
        </div> : 



      activeStep === 9 ? 
      <div>
        <h5 className='nMP'>Configure Signature</h5>
          <div className='setup-configure-fields'>
            <SecurityData 
              name='Signature'
              id='5signaturePad'
              idf='signaturePad'
              fields={this.state.fields}
              formOnChange={(form, formidf)=>this.handleFormChange(form,formidf)}
            />


            <p 
              style={{
                color: '#8934FF', 
                fontSize: '12px',
                textAlign: 'left'}}
                >
                {this.state.fields.inputParams['5signaturePad'] ? 
                'The Visitors signature will be required at Sign IN and Sign OUT.' :
                'The Visitors signature will not be required.'}</p>
      </div>
      </div> : 
      

      activeStep === 10 ? 
      <div>
      <h5 className='nMP'>Visitor Tag Number</h5>
      <div className='setup-configure-fields'>
        <Form 
          name='Tag Form'
          id='6tagForm'
          idf='tagForm'
          fields={this.state.fields}
          formOnChange={(form, formidf)=>this.handleFormChange(form, formidf)}
          fieldOnChange={(form, formidf, index)=>this.handleFieldChange(form, formidf, index)}
        />

        <p 
        style={{
          color: '#8934FF', 
          textAlign: 'left',
          fontSize: '14px',
          }}>
        Changes cannot be made to the Tag Form. 
        This is to enable VISTOGRAM match the visitor 
        Sign Out with the Sign In credentials.</p>

        <Margin 
              height='10px'
              width='100%'/>

        <TextField
            id="settingsName"
            fullWidth
            label="Name of Setting"
            type="settingsName"
            name="settingsName"
            value={this.state.settingsName}
            error={this.state.settingsNameError}
            helperText="Enter a name for this setting e.g. 'Default'."
            margin="normal"
            variant="outlined"
            onChange={this.handleChange('settingsName')}

            InputLabelProps={{
                focused: this.state.settingsNameChange
              }}
          />
      </div>
      </div> : 
      null
        }

      </div>

        {this.state.submiting ? 
        <div style={{color: '#8934FF'}}>
        <Margin 
              height='10px'
              width='100%'/>
        
        <p>Uploading Setting...</p>

        </div> :
        
        <div className='setup-button-row'>
        <Button
            disabled={activeStep === 0}
            onClick={this.handleBack}
            >
                Back
            </Button>
            <Button 
            variant="contained" 
            disabled={this.state.submiting}
            color="primary"
            className='setup-button-large'
            onClick={this.handleNext}>
                {activeStep === steps.length + 1 ? 'Finish' : 'Next'}
            </Button>
        </div>}
        </div>


 <div className='setup-preview'>
        <h5>Preview</h5>
        <div className='setup-preview-tablet'>
          { activeStep < 3 ? 
        <LandingScreenPreview
            logoUrl={this.state.logoImageUrl}
            bgImgUrl={this.state.backgroundImageUrl}
            primaryColor={this.state.primaryColor}
            secondaryColor={this.state.secondaryColor}
        /> :


        activeStep === 3 ? 
          <WelcomeScreenPreview 
              logoUrl={this.state.logoImageUrl}
              bgImgUrl={this.state.backgroundImageUrl}
              primaryColor={this.state.primaryColor}
              secondaryColor={this.state.secondaryColor}
              companyName={UserData.businessName}
              slogan={this.state.businessSlogan}
              outlet={this.state.businessBranch}
              hasOutlet={this.state.businessBranchChange}
              welcomeMessage={this.state.welcomeMessage}
              /> :


        activeStep > 3 ? 
              <MainScreenPreview 
              logoUrl={this.state.logoImageUrl}
              advert={previewAdvertImage}
              primaryColor={this.state.primaryColor}
              secondaryColor={this.state.secondaryColor}
              companyName={UserData.businessName}
              activeStep={activeStep}
              fields={this.state.fields}
              /> : null
          }
        </div>
        </div>
      </div>
      </div>


      </div>
      </div>
    )
  }
}

export default Setup;
