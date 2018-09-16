import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import IcnAInfoTemplate from './IcnAInfoTemplate';
import SearchForm from './SearchForm';
import BasicInfo from './BasicInfo';
import CongestionInfo from './CongestionInfo';
import ParkingInfo from './ParkingInfo';

class App extends Component {

    state = {
      input: '',
      checked: false,
      selected: 'departure',
      index: 0,
      flightid: '',
      flightid_focusidx: '',
      flightid_focusmode: true
    }

    constructor(props) {
      super(props);
      this.flightRef = React.createRef();
    }

     _getBasicdata = async (type) => {
      const basicdatas = await this._callApi('/api/basic')

      if(type==='flightid'){
        if(this.state.input && basicdatas.data){
           const flight_id = basicdatas.data.item.map((data, index) => {
             return data.flightId;
           })
           this.setState({
             flightid: flight_id
           })
       }
     } else {
       this.setState({
         basicdata: basicdatas.data.item
       })
     }
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
      this._getBasicdata('all');
      this._getCongestiondata();
      if(checked) this._getParkingdata();
    } else {
      alert('항공편명을 입력해주세요');
    }
  }

  handleChangeValue = (e) => {
    this.setState({
      input: e.target.value,
      flightid_focusmode: true,
      flightid_focusidx: ''
    }, () => {
      if(this.state.input) this._getBasicdata('flightid');
      this.flightRef.current.scrollTop = 0;
    });
  }

  handleChangeChk = (e) => {
    this.setState({
      checked: e.target.checked
    });
  }

  handleKeyPress = (e) => {
    const { flightid, flightid_focusmode, flightid_focusidx } = this.state;

    if(e.key === 'Enter') {
      if(flightid_focusmode) {
        const selected_data = flightid.filter((item,index) => {
          return index===flightid_focusidx;
        });
        this.setState({
          input: String(selected_data),
          flightid_focusmode: false,
          flightid_focusidx: ''
        }, ()=> {
            this.handleSubmit();
            this.flightRef.current.scrollTop = 0;
        });
      } else {
        this.handleSubmit();
      }

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
      flightid: '',
      basicdata: '',
      congestiondata: '',
      parkingdata: '',
      flightid_focusidx: '',
      flightid_focusmode: true
    });
  }

  handleKeyDown = (e) => {
    const { flightid, flightid_focusmode, flightid_focusidx } = this.state;
    let nextidx;

    if(e.key==='ArrowDown'){
      if(flightid_focusmode && flightid_focusidx===''){
        this.setState({
          input: String(flightid.filter((f, idx) => idx===0)),
          flightid_focusidx: 0
        });
      }else if(!flightid_focusmode && (flightid_focusidx==='' || flightid_focusidx===0)){
        this.setState({
          flightid_focusmode: true,
          flightid_focusidx: ''
        });
      }else if(flightid_focusmode && flightid_focusidx!==''){
        if(flightid.length-1===flightid_focusidx){
          this.setState({
            flightid_focusidx: ''
          });
          this.flightRef.current.scrollTop = 0;
        } else {
          nextidx = flightid_focusidx + 1;
          this.setState({
            input: String(flightid.filter((f, idx) => idx===nextidx)),
            flightid_focusidx: nextidx
          });
          this.flightRef.current.scrollTop += 14;
        }
      }
    } else if(e.key==='ArrowUp'){
      if(flightid_focusmode && flightid_focusidx===''){
        this.setState({
          flightid_focusmode: false,
          flightid_focusidx: ''
        });
      }else if(flightid_focusmode && flightid_focusidx!==''){
        if(flightid_focusidx===0){
          this.setState({
            flightid_focusidx: ''
          });
          this.flightRef.current.scrollTop = 0;
        } else {
          nextidx = flightid_focusidx - 1;
          this.setState({
            input: String(flightid.filter((f, idx) => idx===nextidx)),
            flightid_focusidx: nextidx
          });
          this.flightRef.current.scrollTop -= 14;
        }
      }
    }
  }

  handleClickflightid = (index) => {
    const { flightid } = this.state;
    const selected_data = flightid.filter((item, idx) => {
      return idx===index;
    });
    console.log(selected_data);
    this.setState({
      input: String(selected_data),
      flightid_focusmode: false,
      flightid_focusidx: ''
    });
  }

  handleClickinput = () => {
    const { flightid_focusmode } = this.state;
    this.setState({
      flightid_focusmode: !flightid_focusmode,
      flightid_focusidx: ''
    }, ()=> {
      if(this.state.input) this._getBasicdata('flightid');
      this.flightRef.current.scrollTop = 0;
    });
  }


  render() {
    const { input, checked, selected, flightid, basicdata, congestiondata, index,
            parkingdata, flightid_focusmode, flightid_focusidx } = this.state;
    const {
      handleChangeValue,
      handleChangeChk,
      handleKeyPress,
      handleSubmit,
      handleChangeSelect,
      handleSelectindex,
      handleClickimg,
      handleKeyDown,
      handleClickflightid,
      handleClickinput
    } = this;

    return (
      <div className="container">
        <header>
          <img src="/image/Incheon_airport.png" style={{width: '300px', height: '80px'}} onClick={handleClickimg}></img>
        </header>
        <IcnAInfoTemplate searchform={(
            <SearchForm
              value={input}
              flightid={flightid}
              flightid_focusmode={flightid_focusmode}
              flightid_focusidx={flightid_focusidx}
              onChangevalue={handleChangeValue}
              onChangechk={handleChangeChk}
              onChangeselect={handleChangeSelect}
              onKeyPress={handleKeyPress}
              onSearch={handleSubmit}
              onKeyDown={handleKeyDown}
              onClickflightid={handleClickflightid}
              onClickinput={handleClickinput}
              flightRef={this.flightRef}
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
