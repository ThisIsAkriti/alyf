import React from 'react';
import '../styles/_scss/pages/_staticBg.scss';

const StaticBg = () => {
  return (
    <div className="staticBackground">
      <div className="textOverlay">
        <div className="branding">
          <img src="/logo.svg" alt="Range Logo" className="logo" />
        
           <p className="copyright">
              © 2025 Range Ras Al Khaimah. All Rights Reserved.
          </p>
          
        </div>
        
        <div className="section">
          <h4>RESORTS</h4>

          <div className='descriptions'>

            <p>Island Heights<br />The Beach Residence<br /></p>
            <p>The Beach Vista<br />The Beach House</p>
            

          </div>
         
        </div>

        <div className="section">
          <h4>RAS AL KHAIMAH</h4>
          <p>Boulevard Plaza, Tower 2, Office 1104,</p>
          <p>Dubai, United Arab Emirates</p>
        </div>

        <div className="section">
          <h4>CONTACT US</h4>
          <p>info@rangerak.ae<br />+971 4 325 3447</p>
        </div>

        <div className="section">
          <h4>FOLLOW US</h4>
          <div className="socialIcons">
            <p>ln</p>
            <p>tw</p>
          </div>
        </div>
      

      </div>
    </div>
  );
};

export default StaticBg;
