import React from 'react';
import './SearchForm.css';

const SearchForm = ({value, onChangevalue, onChangechk, onChangeselect, onSearch, onKeyPress}) => {
  return (
        <div className="searchform">
          <input id="search-text" value={value}
            placeholder="항공편명을 입력하세요. 입/출국 정보와 터미널의 혼잡도, 주차장 현황을 한번에 볼 수 있습니다."
            onChange={onChangevalue} onKeyPress={onKeyPress}/>
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

export default SearchForm;
