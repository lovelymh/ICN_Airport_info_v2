import React, { Component } from 'react';

class ParkingInfo extends Component {

    shouldComponentUpdate(nextProps, nextState){
      return this.props.terminalid !== nextProps.terminalid ||
             (this.props.checked !== nextProps.checked && this.props.parkingdata !== nextProps.parkingdata);
    }

    render(){
      const { parkingdata, terminalid, checked } = this.props;

      const parkingdatalist = parkingdata.map(({ floor, parking, parkingarea }) => {
        let possible = parkingarea-parking;
        if(possible < 0) possible = 0;

        if((terminalid === 'P01' || terminalid === 'P02') && String(floor).includes('T1')) { //1터미널 일때
            return(
                  <tr key={floor}>
                    <td>{String(floor).replace('T1', '제1 터미널')}</td>
                    <td>{possible} / {parkingarea}</td>
                  </tr>
           );
         } else if(terminalid === 'P03' && String(floor).includes('T2')) { //2터미널 일때
              return(
                    <tr key={floor}>
                      <td>{String(floor).replace('T1', '제2 터미널')}</td>
                      <td>{possible} / {parkingarea}</td>
                    </tr>
             );
          }
        }
      )

      return(
        <table className="table table-hover">
          <tbody>
          <tr className="table-primary">
            <th className="T2sum1">주차장 구분</th>
            <th className="T2sum2">주차 가능 면수 / 총 주차장 면수</th>
          </tr>
            { parkingdatalist }
          </tbody>
        </table>
      );
    }
}

export default ParkingInfo;
