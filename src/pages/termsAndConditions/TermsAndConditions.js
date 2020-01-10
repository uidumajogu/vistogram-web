import React, { Component } from 'react';
import '../../styles/Home.css';
import TopBar from '../../components/home/TopBar';
import { UserData } from '../../root/App';

export class TermsAndConditions extends Component {

    goToConsolePage = () => {
        this.props.history.push("/console");
      }
    
    goToRegisterPage = () => {
        this.props.history.push("/authentication");
      }
    
    goToLoginPage = () => {
        this.props.history.push({
          pathname: "/authentication",
          state: {
            authTypeIsLogin: true
          }
        });
      }

    goToHomePage = () => {
        this.props.history.push("/");
      }


  render() {

    const pp = {
        width: '100%',
        color: '#253061',
        padding: '50px',
        textAlign: 'left',
    }

    return (
      <div className='home-body'>
        <TopBar
           userData={UserData}
           goToConsolePage={this.goToConsolePage}
           goToLoginPage={this.goToLoginPage}
           goToRegisterPage={this.goToRegisterPage}
           goToHomePage={this.goToHomePage}
           ppats={true}
           ppatst={<h1 style={{textAlign: 'center', color: '#8934FF', fontSize: '32px'}}>Terms And Conditions</h1>}
          />

          <div style={pp}>
          <div style={{marginTop: '50px'}}>
          {/* <h1 style={{margin: '100px 0 30px 0', textAlign: 'center', color: '#8934FF'}}>Terms And Conditions</h1> */}

          <p>These terms and conditions (&quot;Terms&quot;, &quot;Agreement&quot;) are an agreement between Remphil Services Limited (&quot;Remphil Services Limited&quot;, &quot;us&quot;, &quot;we&quot; or &quot;our&quot;) and you (&quot;User&quot;, &quot;you&quot; or &quot;your&quot;). This Agreement sets forth the general terms and conditions of your use of the Vistogram mobile application and any of its products or services (collectively, &quot;Mobile Application&quot; or &quot;Services&quot;).</p>

            <h2>Accounts and membership</h2>

            <p>If you create an account in the Mobile Application, you are responsible for maintaining the security of your account and you are fully responsible for all activities that occur under the account and any other actions taken in connection with it. We may, but have no obligation to, monitor and review new accounts before you may sign in and use our Services. Providing false contact information of any kind may result in the termination of your account. You must immediately notify us of any unauthorized uses of your account or any other breaches of security. We will not be liable for any acts or omissions by you, including any damages of any kind incurred as a result of such acts or omissions. We may suspend, disable, or delete your account (or any part thereof) if we determine that you have violated any provision of this Agreement or that your conduct or content would tend to damage our reputation and goodwill. If we delete your account for the foregoing reasons, you may not re-register for our Services. We may block your email address and Internet protocol address to prevent further registration.</p>

            <h2>Backups</h2>

            <p>We are not responsible for Content residing in the Mobile Application. In no event shall we be held liable for any loss of any Content. It is your sole responsibility to maintain appropriate backup of your Content. Notwithstanding the foregoing, on some occasions and in certain circumstances, with absolutely no obligation, we may be able to restore some or all of your data that has been deleted as of a certain date and time when we may have backed up data for our own purposes. We make no guarantee that the data you need will be available.</p>

            <h2>Links to other mobile applications</h2>

            <p>Although this Mobile Application may link to other mobile applications, we are not, directly or indirectly, implying any approval, association, sponsorship, endorsement, or affiliation with any linked mobile application, unless specifically stated herein. We are not responsible for examining or evaluating, and we do not warrant the offerings of, any businesses or individuals or the content of their mobile applications. We do not assume any responsibility or liability for the actions, products, services, and content of any other third-parties. You should carefully review the legal statements and other conditions of use of any mobile application which you access through a link from this Mobile Application. Your linking to any other off-site mobile applications is at your own risk.</p>

            <h2>Prohibited uses</h2>

            <p>In addition to other terms as set forth in the Agreement, you are prohibited from using the Mobile Application or its Content: (a) for any unlawful purpose; (b) to solicit others to perform or participate in any unlawful acts; (c) to violate any international, federal, provincial or state regulations, rules, laws, or local ordinances; (d) to infringe upon or violate our intellectual property rights or the intellectual property rights of others; (e) to harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate based on gender, sexual orientation, religion, ethnicity, race, age, national origin, or disability; (f) to submit false or misleading information; (g) to upload or transmit viruses or any other type of malicious code that will or may be used in any way that will affect the functionality or operation of the Service or of any related mobile application, other mobile applications, or the Internet; (h) to collect or track the personal information of others; (i) to spam, phish, pharm, pretext, spider, crawl, or scrape; (j) for any obscene or immoral purpose; or (k) to interfere with or circumvent the security features of the Service or any related mobile application, other mobile applications, or the Internet. We reserve the right to terminate your use of the Service or any related mobile application for violating any of the prohibited uses.</p>

            <h2>Intellectual property rights</h2>

            <p>This Agreement does not transfer to you any intellectual property owned by Remphil Services Limited or third-parties, and all rights, titles, and interests in and to such property will remain (as between the parties) solely with Remphil Services Limited. All trademarks, service marks, graphics and logos used in connection with our Mobile Application or Services, are trademarks or registered trademarks of Remphil Services Limited or Remphil Services Limited licensors. Other trademarks, service marks, graphics and logos used in connection with our Mobile Application or Services may be the trademarks of other third-parties. Your use of our Mobile Application and Services grants you no right or license to reproduce or otherwise use any Remphil Services Limited or third-party trademarks.</p>

            <h2>Disclaimer of warranty</h2>

            <p>You agree that your use of our Mobile Application or Services is solely at your own risk. You agree that such Service is provided on an &quot;as is&quot; and &quot;as available&quot; basis. We expressly disclaim all warranties of any kind, whether express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose and non-infringement. We make no warranty that the Services will meet your requirements, or that the Service will be uninterrupted, timely, secure, or error-free; nor do we make any warranty as to the results that may be obtained from the use of the Service or as to the accuracy or reliability of any information obtained through the Service or that defects in the Service will be corrected. You understand and agree that any material and/or data downloaded or otherwise obtained through the use of Service is done at your own discretion and risk and that you will be solely responsible for any damage to your computer system or loss of data that results from the download of such material and/or data. We make no warranty regarding any goods or services purchased or obtained through the Service or any transactions entered into through the Service. No advice or information, whether oral or written, obtained by you from us or through the Service shall create any warranty not expressly made herein.</p>

            <h2>Limitation of liability</h2>

            <p>To the fullest extent permitted by applicable law, in no event will Remphil Services Limited, its affiliates, officers, directors, employees, agents, suppliers or licensors be liable to any person for (a): any indirect, incidental, special, punitive, cover or consequential damages (including, without limitation, damages for lost profits, revenue, sales, goodwill, use or content, impact on business, business interruption, loss of anticipated savings, loss of business opportunity) however caused, under any theory of liability, including, without limitation, contract, tort, warranty, breach of statutory duty, negligence or otherwise, even if Remphil Services Limited has been advised as to the possibility of such damages or could have foreseen such damages. To the maximum extent permitted by applicable law, the aggregate liability of Remphil Services Limited and its affiliates, officers, employees, agents, suppliers and licensors, relating to the services will be limited to an amount greater of one dollar or any amounts actually paid in cash by you to Remphil Services Limited for the prior one month period prior to the first event or occurrence giving rise to such liability. The limitations and exclusions also apply if this remedy does not fully compensate you for any losses or fails of its essential purpose.</p>

            <h2>Indemnification</h2>

            <p>You agree to indemnify and hold Remphil Services Limited and its affiliates, directors, officers, employees, and agents harmless from and against any liabilities, losses, damages or costs, including reasonable attorneys' fees, incurred in connection with or arising from any third-party allegations, claims, actions, disputes, or demands asserted against any of them as a result of or relating to your Content, your use of the Mobile Application or Services or any willful misconduct on your part.</p>

            <h2>Severability</h2>

            <p>All rights and restrictions contained in this Agreement may be exercised and shall be applicable and binding only to the extent that they do not violate any applicable laws and are intended to be limited to the extent necessary so that they will not render this Agreement illegal, invalid or unenforceable. If any provision or portion of any provision of this Agreement shall be held to be illegal, invalid or unenforceable by a court of competent jurisdiction, it is the intention of the parties that the remaining provisions or portions thereof shall constitute their agreement with respect to the subject matter hereof, and all such remaining provisions or portions thereof shall remain in full force and effect.</p>

            <h2>Dispute resolution</h2>

            <p>The formation, interpretation, and performance of this Agreement and any disputes arising out of it shall be governed by the substantive and procedural laws of Lagos, Nigeria without regard to its rules on conflicts or choice of law and, to the extent applicable, the laws of Nigeria. The exclusive jurisdiction and venue for actions related to the subject matter hereof shall be the state and federal courts located in Lagos, Nigeria, and you hereby submit to the personal jurisdiction of such courts. You hereby waive any right to a jury trial in any proceeding arising out of or related to this Agreement. The United Nations Convention on Contracts for the International Sale of Goods does not apply to this Agreement.</p>

            <h2>Assignment</h2>

            <p>You may not assign, resell, sub-license or otherwise transfer or delegate any of your rights or obligations hereunder, in whole or in part, without our prior written consent, which consent shall be at our own sole discretion and without obligation; any such assignment or transfer shall be null and void. We are is free to assign any of its rights or obligations hereunder, in whole or in part, to any third-party as part of the sale of all or substantially all of its assets or stock or as part of a merger.</p>

            <h2>Changes and amendments</h2>

            <p>We reserve the right to modify this Agreement or its policies relating to the Mobile Application or Services at any time, effective upon posting of an updated version of this Agreement in the Mobile Application. When we do, we will revise the updated date at the bottom of this page. Continued use of the Mobile Application after any such changes shall constitute your consent to such changes.</p>

            <h2>Acceptance of these terms</h2>

            <p>You acknowledge that you have read this Agreement and agree to all its terms and conditions. By using the Mobile Application or its Services you agree to be bound by this Agreement. If you do not agree to abide by the terms of this Agreement, you are not authorized to use or access the Mobile Application and its Services.</p>

            <h2>Contacting us</h2>

            <p>If you have any questions about this Agreement, please contact us.</p>

            <p>This document was last updated on May 1, 2019</p>

            </div>
            </div>
                    
      </div>
    )
  }
}

export default TermsAndConditions;

