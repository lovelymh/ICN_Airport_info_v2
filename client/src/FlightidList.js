import React, { Component } from 'react';
import './FlightidList.css';

class FlightidList extends Component {
  render(){
    const { flightid, index, flightid_focusidx, onClickflightid } = this.props;

    return(
      <div className={`flightid_list && ${flightid_focusidx===index ? ' focused' : ''}`}
           onClick={()=>onClickflightid(index)}>
        {flightid}
      </div>
    );
  }
}

export default FlightidList;
