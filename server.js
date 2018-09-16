const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const request = require('request');
const xml2js = require('xml2js');
const app = express();
//promise를 사용하기 위함
const rq = require('request-promise');

// parse application/x-www-form-urlencoded
//client한테 json으로 받으려고 사용
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//react + booststrap 경로 잡기
app.use('/js', express.static(__dirname + '/client/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
//app.use('/js', express.static(__dirname + '/client/public/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/client/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
app.use('/image', express.static(__dirname + '/client/src')); // redirect CSS bootstrap
app.use(express.static(path.join(__dirname, 'client/build')));

let url='http://openapi.airport.kr/openapi/service/StatusOfPassengerWeahter/getPassengerDeparturesW?';
let url2='http://openapi.airport.kr/openapi/service/StatusOfPassengerWeahter/getPassengerArrivalsW?';
let url3='http://openapi.airport.kr/openapi/service/PassengerNoticeKR/getfPassengerNoticeIKR?';
let url4='http://openapi.airport.kr/openapi/service/StatusOfParking/getTrackingParking?';
let url_add ='/openapi/service/StatusOfPassengerWeahter/getPassengerDeparturesW?'
let ServiceKey='ServiceKey=vO6meNAKoskv2FfBIM3DYwD3rNolNJa80t87Alyf%2FKPC8xypeXMAL07hFwcWYrOlerLkaunEPYcKp4FwhtHgxQ%3D%3D';
let page = '&numOfRows=50';
let selectdate = '&selectdate=0'; //오늘일자 공항 혼잡도
let parser = new xml2js.Parser();
let data = '';
let ff = '&flight_id=';
let flight_id = '';
let parkchk = false;

const port = process.env.PORT || 5000;

function getData(selectedurl){
    if(flight_id === ''){ //안넣은 경우는 동작하지 않는다.
        console.log('flight_id 없음!');
    } else {
      data = '';
      return rq({
            url: selectedurl + ServiceKey + page+ ff + flight_id,
            method: 'GET'
          }, function (error, response, body) {
               parser.parseString(body, function(err, result){
                data = result.response.body[0].items[0];
                if (data){
                    console.log(`데이터 조회 결과 있음!`);
                } else {
                    console.log(`데이터 조회 결과 없음!`);
                }
              });
          });
    }
}

app.post('/api/basic', (req, res) => {
  flight_id = req.body.input;
  type = req.body.selected;

  getData(type==='departure'? url : url2)
    .then(resolve => res.send({data: data}))
    .catch(error => console.log(error));
});

app.post('/api/congestion', (req, res) => {
  flight_id = req.body.input;

  getData(url3)
    .then(resolve => res.send({data: data}))
    .catch(error => console.log(error));
});

app.post('/api/parking', (req, res) => {
  flight_id = req.body.input;

  getData(url4)
    .then(resolve => res.send({data: data}))
    .catch(error => console.log(error));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
