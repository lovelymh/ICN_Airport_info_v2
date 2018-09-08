import React from 'react';
import './IcnAInfoTemplate.css';

const IcnAInfoTemplate = ({ searchform, basicinfo, basicdata, congestiondata, congestioninfo, parkingdata, parkinginfo }) => {

  if (!basicdata) {
    return(
      <main className="icn-airport-info">
       <section className="search-info-wrapper">
         { searchform }
       </section>
      </main>
    );
  } else {
    return(
      <main className="icn-airport-info">
       <section className="search-info-wrapper">
         { searchform }
       </section>
       <section className="basic-info-wrapper">
         <p> { basicdata ? '항공편 기본정보' : ''}</p>
         { basicdata ? basicinfo : '' }
       </section>
       <section className="congestion-info-wrapper">
         <p>{ basicdata && congestiondata ? '터미널 혼잡도 현황' : ''}</p>
         { basicdata && congestiondata ? congestioninfo : '' }
         <p className="explanation">{ basicdata && congestiondata ? '현재 시간대 기준 혼잡도이며, 시간당 명수(혼잡도)를 의미함' : ''}</p>
       </section>
       <section className="parking-info-wrapper">
         <p>{ basicdata && parkingdata ? '주차장 현황' : ''}</p>
         { basicdata && parkingdata ? parkinginfo : '' }
       </section>
      </main>
    );
  }
};

export default IcnAInfoTemplate;
