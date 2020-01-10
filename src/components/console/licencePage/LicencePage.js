import React from 'react';
import PricingTable from './PricingTable';
import LicenceHome from './LicenceHome';

const LicencePage = props => {
  return (
    <div>
      {!props.pricingTable ? <div>
        <LicenceHome 
          purchaseLicence={props.purchaseLicence}
          userData={props.userData}
        />
      </div>

    :<div style={{padding: '50px'}}>
    <div style={{padding: '0 300px 0 300px'}}>
      <h1 style={{color: '#FFC233'}}>Purchase a licence</h1>
    </div>
    <div className='console-pricing-container'>
     <div>
      <PricingTable 
        headerDivBkgColor='#FFC233'
        price='₦168,000'
        plan='One time license for 1 device'
        planRecommended=''
        devicePlan='1'
      />
      </div>

      <div>
      <PricingTable 
        headerDivBkgColor='#8934FF'
        price='₦136,500'
        plan='One time license per device for more than 10 devices'
        devicePlan='10'
        planRecommended='(Recomended)'
      />
      </div>
      </div>
      </div> }
    </div>
  )
}

export default LicencePage;
