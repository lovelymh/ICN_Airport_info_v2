import React, { Component } from 'react';
import './BasicInfo.css';
import DprtrBasicdata from './DprtrBasicdata';
import ArvlBasicdata from './ArvlBasicdata';

class BasicInfo extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.basicdata !== nextProps.basicdata;
  }

  render(){
    const { basicdata, selected, onClick } = this.props;

    if(selected==='departure') {
      const basicdatalist = basicdata.map(
         ({airport, airline, flightId, scheduleDateTime, estimatedDateTime, terminalid, chkinrange, gatenumber, remark, wimage}, index) => (
           <DprtrBasicdata
             terminalid={terminalid}
             airport={airport}
             airline={airline}
             flightid={flightId}
             scheduleDateTime={scheduleDateTime}
             estimatedDateTime={estimatedDateTime}
             chkinrange={chkinrange}
             gatenumber={gatenumber}
             remark={remark}
             wimage={wimage}
             key={flightId}
             index={index}
             onClick={onClick}
           />
          )
        );

      return(
        <table className="table table-bordered">
          <tbody>
            <tr>
              <th className="type">출/입국</th>
              <th className="airport">도착지</th>
              <th className="airline">항공사/운항편명</th>
              <th className="scheduleDateTime">출발예정시간</th>
              <th className="estimatedDateTime">출발변경시간</th>
              <th className="terminalid">터미널</th>
              <th className="chkinrange">체크인 카운터</th>
              <th className="gatenumber">탑승구번호</th>
              <th className="remark">현황</th>
              <th className="wimage">도착지 날씨</th>
           </tr>
            { basicdatalist }
           </tbody>
       </table>
     );
   } else if(selected==='arrival') {
     const basicdatalist = basicdata.map(
        ({airport, airline, flightId, scheduleDateTime, estimatedDateTime, terminalid, gatenumber, carousel, exitnumber, remark, wimage}, index) => (
          <ArvlBasicdata
            terminalid={terminalid}
            airport={airport}
            airline={airline}
            flightid={flightId}
            scheduleDateTime={scheduleDateTime}
            estimatedDateTime={estimatedDateTime}
            gatenumber={gatenumber}
            carousel={carousel}
            exitnumber={exitnumber}
            remark={remark}
            wimage={wimage}
            key={flightId}
            index={index}
            onClick={onClick}
          />)
        )

        return(
          <table className="table table-bordered">
            <tbody>
              <tr>
                <th className="type">출/입국</th>
                <th className="airport">출발지</th>
                <th className="airline">항공사/운항편명</th>
                <th className="scheduleDateTime">도착예정시간</th>
                <th className="estimatedDateTime">도착변경시간</th>
                <th className="terminalid">터미널</th>
                <th className="gatenumber">도착게이트 번호</th>
                <th className="carousel">수하물수취대 번호</th>
                <th className="exitnumber">출구</th>
                <th className="remark">현황</th>
                <th className="wimage">출발지 날씨</th>
              </tr>
              { basicdatalist }
            </tbody>
        </table>
     );
   }
  }
}

export default BasicInfo;
