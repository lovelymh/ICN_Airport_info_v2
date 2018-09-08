import React from 'react';
import './DprtrBasicdata.css';

const DprtrBasicdata = ({onClick, index, airport, airline, flightid, scheduleDateTime, estimatedDateTime, terminalid, chkinrange, gatenumber, remark, wimage, selected}) => {
    let terminal='';
    switch(String(terminalid)) {
       case 'P01' :
        terminal = '제1 터미널';
        break;
       case 'P02' :
        terminal = '제1 터미널-탑승동';
        break;
       case 'P03' :
        terminal = '제2 터미널';
        break;
       case 'C01', 'C03' :
         terminal = '화물터미널 남측';
        break;
       case 'C02' :
         terminal = '화물터미널 북측';
        break;
       default:
        terminal = '';
    }
      return(
            <tr key={flightid} className={flightid} onClick={()=>{onClick(index)}}>
              <td>출국</td>
              <td>{airport}</td>
              <td>{airline}({flightid})</td>
              <td>{scheduleDateTime}</td>
              <td>{estimatedDateTime}</td>
              <td>{terminal}</td>
              <td>{chkinrange}</td>
              <td>{gatenumber}</td>
              <td>{remark}</td>
              <td><img src={wimage} alt='weather' className='wimage'></img></td>
            </tr>
     );
}

export default DprtrBasicdata;
