import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import IcnAInfoTemplate from './IcnAInfoTemplate';
import SearchForm from './SearchForm';
import BasicInfo from './BasicInfo';
import CongestionInfo from './CongestionInfo';
import ParkingInfo from './ParkingInfo';
//import { Link } from 'react-router-dom';

class App extends Component {

    state = {
      input: '',
      checked: false,
      selected: 'departure',
      index: 0
    }

     _getBasicdata = async () => {
      const basicdatas = await this._callApi('/api/basic')

      this.setState({
        basicdata: basicdatas.data.item
      })
    }

    _getCongestiondata = async () => {
     const congestiondatas = await this._callApi('/api/congestion')

     this.setState({
       congestiondata: congestiondatas.data.item
     });
   }

   _getParkingdata = async () => {
    const parkingdatas = await this._callApi('/api/parking')

    this.setState({
      parkingdata: parkingdatas.data.item
    });
  }

  _callApi = (path) => {
    const { input, checked, selected } = this.state;

    return fetch(path, {
      method: 'POST',
      body: JSON.stringify({input: `${input.toUpperCase()}`,
                            selected: selected
                            }),
      headers: {
        'Content-Type': 'application/json', //request body에 담아 전송할 데이터의 MIME-type
        'Accept': 'application/json' //서버가 센드백할 데이터의 MIME-type
      }
    }).then(res => {
      if(res.ok) {
        return res.json();
      } else {
        throw new Error();
      }
    }).catch(res => {
      console.log('Error!');
    })

 }

  handleSubmit = () => {
    const { input, checked } = this.state;
    this.setState({
      basicdata: '',
      congestiondata: '',
      parkingdata: ''
    });

    if(input) {
      this._getBasicdata();
      this._getCongestiondata();
      if(checked) this._getParkingdata();
    } else {
      alert('항공편명을 입력해주세요');
    }
  }

  handleChangeValue = (e) => {
    this.setState({
      input: e.target.value
    });
  }

  handleChangeChk = (e) => {
    this.setState({
      checked: e.target.checked
    });
  }

  handleKeyPress = (e) => {
    if(e.key === 'Enter') {
      this.handleSubmit();
    }
  }

  handleChangeSelect = (e) => {
    this.setState({
      selected: e.target.value
    });
  }

  handleSelectindex = (id) => {
    this.setState({
      index: id
    });
  }

  handleClickimg = () => {
    this.setState({
      input: '',
      checked: false,
      selected: 'departure',
      index: 0,
      basicdata: '',
      congestiondata: '',
      parkingdata: ''
    });
  }

  render() {
    const { input, checked, selected, basicdata, congestiondata, index, parkingdata } = this.state;
    const {
      handleChangeValue,
      handleChangeChk,
      handleKeyPress,
      handleSubmit,
      handleChangeSelect,
      handleSelectindex,
      handleClickimg
    } = this;

    return (
      <div className="container">
        <header>
          <img src="/image/Incheon_airport.png" style={{width: '300px', height: '80px'}} onClick={handleClickimg}></img>
        </header>
        <IcnAInfoTemplate searchform={(
            <SearchForm
              value={input}
              onChangevalue={handleChangeValue}
              onChangechk={handleChangeChk}
              onChangeselect={handleChangeSelect}
              onKeyPress={handleKeyPress}
              onSearch={handleSubmit}
              />
          )}
            basicinfo={(
              <BasicInfo
                basicdata={basicdata}
                selected={selected}
                onClick={handleSelectindex}
                />
            )}
            congestioninfo={(
              <CongestionInfo
                congestiondata={congestiondata}
                selected={selected}
                terminalid={basicdata ? String(basicdata[index].terminalid) : ''}
                />
            )}
            parkinginfo={(
              <ParkingInfo
                parkingdata={parkingdata}
                terminalid={basicdata ? String(basicdata[index].terminalid) : ''}
                checked={checked}
                />
            )}
          basicdata={basicdata}
          congestiondata={congestiondata}
          parkingdata={parkingdata}
          />
        <footer>Copyright &copy; lovelymh with Incheon Airport</footer>
      </div>
    );
  }
}
export default App;
