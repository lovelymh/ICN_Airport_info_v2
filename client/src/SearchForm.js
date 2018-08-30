import React from 'react';
import './SearchForm.css';

const SearchForm = ({value, onChangevalue, onChangechk, onChangeselect, onSearch, onKeyPress}) => {
  return (
        <div className="searchform">
          <input id="search-text" value={value} placeholder="항공편명" onChange={onChangevalue} onKeyPress={onKeyPress}/>
          <select className="selecttype" onChange={onChangeselect}>
            <option value="departure" defaultValue>출국</option>
            <option value="arrival" >입국</option>
          </select>
          <div className="search-button" onClick={onSearch}>
            검색
          </div>
          <input className="parkingchk" type="checkbox" onChange={onChangechk} style={{width: '20px', height: '15px'}}/>
          <label htmlFor="opt-in">주차장 정보 함께 보기</label>
        </div>
  );
}

export default SearchForm;
