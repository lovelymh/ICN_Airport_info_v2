import React, {Component} from 'react';
import './SearchForm.css';
import FlightidList from './FlightidList';

const Pretty_Flightid = ({ flightid, flightid_focusidx, onClickflightid }) => {
  //데이터 중복 제거
  const flightid_list = flightid.filter((flight_id, index) => {
    return flightid.indexOf(flight_id) === index;
  });
  return flightid_list.map((item, index) => {
    return (<FlightidList
              flightid={item}
              key={item}
              index={index}
              flightid_focusidx={flightid_focusidx}
              onClickflightid={onClickflightid}
              />);
  });
}

class SearchForm extends Component {
  render(){
    const {value, flightid, flightid_focusmode, flightid_focusidx, onClickflightid, flightRef,
           onChangevalue, onChangechk, onChangeselect, onSearch, onKeyPress, onKeyDown, onClickinput} = this.props;
           
    return (
          <div className="searchform">
            <div className="searchtext-auto">
              <input id="search-text" value={value}
                placeholder="항공편명을 입력하세요. 입/출국 정보와 터미널의 혼잡도, 주차장 현황을 한번에 볼 수 있습니다."
                onChange={onChangevalue} onKeyPress={onKeyPress} onKeyDown={onKeyDown}
                onClick={onClickinput}/>
              <div className={`'autoComplete' && ${value && flightid_focusmode ? 'visible' : 'invisible'}`} ref={flightRef}>
                {flightid ? <Pretty_Flightid
                                    flightid={flightid}
                                    flightid_focusidx={flightid_focusidx}
                                    onClickflightid={onClickflightid}/> : ''}
              </div>
            </div>
            <select className="selecttype" onChange={onChangeselect}>
              <option value="departure" defaultValue>출국</option>
              <option value="arrival" >입국</option>
            </select>
            <div className="search-button" onClick={onSearch}>
              검색
            </div>
            <input className="parkingchk" type="checkbox" onChange={onChangechk} style={{width: '17px', height: '17px'}}/>
            <label htmlFor="opt-in">주차장 정보 함께 보기</label>
          </div>
    );
  }
}

export default SearchForm;
