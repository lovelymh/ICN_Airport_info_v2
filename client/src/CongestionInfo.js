import React, { Component } from 'react';

class CongestionInfo extends Component {

  shouldComponentUpdate(nextProps, nextState){
    return (this.props.selected !== nextProps.selected && this.props.congestiondata !== nextProps.congestiondata)||
           this.props.terminalid !== nextProps.terminalid;
  }

  CheckCongestion = (data, terminal) => {
    if(terminal==='T1' && data < 7000 || terminal==='T2' && data < 3200) {
        return '한산';
    }else if(terminal==='T1' && data >= 7000 && data <= 7600
            || terminal==='T2' && data >= 3200 && data <= 3500) {
        return '보통';
    }else if(terminal==='T1' && data > 7600 && data <= 8200
            || terminal==='T2' && data > 3500 && data <= 3800) {
        return '약간혼잡';
    }else if(terminal==='T1' && data > 8200 && data <= 8600
            || terminal==='T2' && data > 3800 && data <= 4000) {
        return '혼잡';
    }else if(terminal==='T1' && data > 8600 || terminal==='T2' && data > 4000) {
        return '매우혼잡';
    }
  }

  render(){
    const { congestiondata, selected, terminalid } = this.props;

    let currenttime = new Date().toLocaleTimeString('en-US', { hour12: false,
                                             hour: "numeric",
                                             minute: "numeric"});
    currenttime = currenttime.substr(0, 2);

    const congestdatalist = congestiondata.map((data, index) => {

        if (String(data.atime).substr(0, 2) === currenttime) {
          if(selected === 'departure' && (terminalid === 'P01' || terminalid === 'P02')) { //출발이고, 1터미널 일때
             return (
               <div key={data.atime}>
                 <table className="table table-bordered">
                   <tbody>
                   <tr>
                     <th className="T1SUM5">T1 출국장1,2</th>
                     <th className="T1SUM6">T1 출국장3</th>
                     <th className="T1SUM7">T1 출국장4</th>
                     <th className="T1SUM8">T1 출국장5,6</th>
                   </tr>
                   <tr>
                     <td>{data.t1sum5} ({this.CheckCongestion(data.t1sum5,'T1')})</td>
                     <td>{data.t1sum6} ({this.CheckCongestion(data.t1sum6,'T1')})</td>
                     <td>{data.t1sum7} ({this.CheckCongestion(data.t1sum7,'T1')})</td>
                     <td>{data.t1sum8} ({this.CheckCongestion(data.t1sum8,'T1')})</td>
                   </tr>
                   </tbody>
                  </table>
               </div>
             )

          } else if(selected === 'arrival' && (terminalid === 'P01' || terminalid === 'P02')){ //도착이고, 1터미널 일때
            return (
              <div key={data.atime}>
                <table className="table table-bordered">
                  <tbody>
                  <tr>
                    <th className="T1SUM1">T1 입국장 동편(A,B)</th>
                    <th className="T1SUM2">T1 입국장 서편(E,F)</th>
                    <th className="T1SUM3">T1 입국심사(C)</th>
                    <th className="T1SUM4">T1 입국심사(D)</th>
                  </tr>
                  <tr>
                    <td>{data.t1sum1} ({this.CheckCongestion(data.t1sum1,'T1')})</td>
                    <td>{data.t1sum2} ({this.CheckCongestion(data.t1sum2,'T1')})</td>
                    <td>{data.t1sum3} ({this.CheckCongestion(data.t1sum3,'T1')})</td>
                    <td>{data.t1sum4} ({this.CheckCongestion(data.t1sum4,'T1')})</td>
                  </tr>
                  </tbody>
                 </table>
              </div>

            )
          } else if(selected === 'departure' && terminalid === 'P03') { //출발이고, 2터미널일때
             return (
               <div key={data.atime}>
                 <table className="table table-bordered">
                   <tbody>
                   <tr>
                     <th className="T2sum3">T2 출국장1</th>
                     <th className="T2sum4">T2 출국장2</th>
                   </tr>
                   <tr>
                     <td>{data.t2sum3} ({this.CheckCongestion(data.t2sum3,'T2')})</td>
                     <td>{data.t2sum4} ({this.CheckCongestion(data.t2sum4,'T2')})</td>
                   </tr>
                   </tbody>
                  </table>
               </div>

             )

          } else if(selected === 'arrival' && terminalid === 'P03') { //도착이고, 2터미널 일때
            return (
              <div key={data.atime}>
                <table className="table table-bordered">
                  <tbody>
                  <tr>
                    <th className="T2sum1">T2 출국장1</th>
                    <th className="T2sum2">T2 출국장2</th>
                  </tr>
                  <tr>
                    <td>{data.t2sum1} ({this.CheckCongestion(data.t2sum1,'T2')})</td>
                    <td>{data.t2sum2} ({this.CheckCongestion(data.t2sum2,'T2')})</td>
                  </tr>
                  </tbody>
                 </table>
              </div>

            )
          }
      }
    })

    return(
      <div>{congestdatalist}</div>
    );
  }
}

export default CongestionInfo;
