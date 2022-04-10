/* global kakao */
import React, { useState, useEffect } from 'react';
import { Route, useHistory, Link } from 'react-router-dom';
import {
  coordiEPSTtoKATEC,
  coordiKATECtoEPSG,
} from '../../utils/coordinate.js';
import SearchBar from '../../components/searchbar/SearchBar.js';
import './MapContainer.css';
import markerImg from '../../img/station1.png';
import geolacationImg from '../../img/geoImg.png';
import Loading from '../../components/loding/Loding.js';
const { kakao } = window;

const MapContainer = ({
  opinet,
  axiosInstance,
  userInfo,
  isLogin,
  setIsLogin,
  logoutHandler,
}) => {
  const [searchValue, setSearchValue] = useState('서울시청');
  const [kakaoMap, setKakaoMap] = useState(null);
  const [centerCoordi, setCenterCoordi] = useState([
    37.56683690482874, 126.9786564967784,
  ]);
  const [coordiKatec, setcoordiKatec] = useState([]);
  const [stations, setStations] = useState([]);
  const [markerPositions, setMarkerPositions] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [clickInfo, setClickInfo] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  // 위경도로 이루어진 중심좌표 -> centerCoordi -> convert -> coordiKatec
  function updateCoordi() {
    let latlng = kakaoMap.getCenter(); // 지도의 중심좌표를 얻어옵니다
    setIsLoading(true);
    setCenterCoordi([latlng.Ma, latlng.La]);
    const converted = coordiEPSTtoKATEC(centerCoordi[1], centerCoordi[0]);
    setcoordiKatec([...converted]);
    setIsLoading(false);
  }

  useEffect(() => {
    const container = document.getElementById('map');
    setIsLoading(true);
    const options = {
      center: new kakao.maps.LatLng(centerCoordi[0], centerCoordi[1]),
      level: 6,
    };
    const map = new kakao.maps.Map(container, options);
    setKakaoMap(map); //여기까지가 지도 생성
    
    

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude; //위도
        const lng = position.coords.longitude; //경도

        const locPosition = new kakao.maps.LatLng(lat, lng);
        console.log(locPosition);
        displayMarker(locPosition);
      });
    } else {
      const locPosition = new kakao.maps.LatLng([
        37.56683690482874, 126.9786564967784,
      ]);

      displayMarker(locPosition);
    }

    function displayMarker(locPosition) {
      const imageSrc = geolacationImg;
      const imageSize = new kakao.maps.Size(38, 38);
      const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
      
      new kakao.maps.Marker({ map, position: locPosition, image: markerImage });

      setCenterCoordi([locPosition.Ma, locPosition.La]);
      map.setCenter(locPosition);
      
    }
  }, []);

  useEffect(() => {
    if (kakaoMap === null) {
      return;
    }

    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(searchValue, placesSearchCB);
    // 키워드로 지도 검색
    function placesSearchCB(data, status) {
      if (status === kakao.maps.services.Status.OK) {
        const bounds = new kakao.maps.LatLngBounds();
        data.forEach((spot) => {
          bounds.extend(new kakao.maps.LatLng(spot.y, spot.x));
        });
        kakaoMap.setBounds(bounds);
      }
    }

    kakao.maps.event.addListener(
      kakaoMap,
      'center_changed',
      function callBack() {
        updateCoordi();
        kakao.maps.event.removeListener(kakaoMap, 'center_changed', callBack);
      }
    );
    kakao.maps.event.addListener(kakaoMap, 'dragend', updateCoordi);
  }, [searchValue, kakaoMap]);

  useEffect(() => {
    const converted = coordiEPSTtoKATEC(centerCoordi[1], centerCoordi[0]);
    setcoordiKatec([...converted]);
  }, [centerCoordi]);

  useEffect(async () => {
    if (!coordiKatec.length) {
      return;
    }
    const stationsInfo = await opinet.aroundStationGasoline(
      coordiKatec[0],
      coordiKatec[1]
    );
    const copiedStationsInfo = [...stationsInfo];
    const coordiConvert = copiedStationsInfo.map((station) => {
      const converted = coordiKATECtoEPSG(
        station.GIS_X_COOR,
        station.GIS_Y_COOR
      );
      station.GIS_X_COOR = converted[1];
      station.GIS_Y_COOR = converted[0];
      return station;
    });
    setStations([...coordiConvert]);
  }, [coordiKatec]);

  useEffect(() => {
    if (kakaoMap === null) {
      return;
    }
    const copiedStations = [...stations];
    const markerData = copiedStations.map((station) => {
      return {
        id: station.UNI_ID,
        title: station.OS_NM,
        latlng: new kakao.maps.LatLng(station.GIS_X_COOR, station.GIS_Y_COOR),
      };
    });
    setMarkerPositions([...markerData]);
  }, [stations, kakaoMap]);

  useEffect(() => {
    if (kakaoMap === null) {
      return;
    }
    const imageSrc = markerImg;
    const imageSize = new kakao.maps.Size(38, 38);
    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

    //make marker
    const newMarkers = markerPositions.map((position) => {
      const marker = new kakao.maps.Marker({
        map: kakaoMap,
        position: position.latlng,
        title: position.title,
        image: markerImage,
        clickable: true,
      });
      //add click event at clicked marker
      kakao.maps.event.addListener(marker, 'click', async () => {
        // marker 클릭시 중심좌표 이동
        setCenterCoordi([marker.getPosition().Ma, marker.getPosition().La]);
        // clicked marker의 주유소 이름으로 markerPositions에서 일치하는 정보를 찾고 (주유소 코드 사용하기 위함)
        const clicked = markerPositions.find(
          (position) => position.title === marker.Gb
        );
        // 주유소 코드로 axios 통신을 통해 해당 주유소 정보 가져옴 -> clikedInfo
        const clickedInfo = await opinet.stationInfo(clicked.id);
        // console.log(clickedInfo);
        setClickInfo(clickedInfo);
        // overlay HTML

        let content =
          '<div class="wrap">' +
          '  <div class="info">' +
          '    <div class="title">' +
          `      ${clickedInfo.OS_NM}` +
          `      <div id=${clickedInfo.UNI_ID} class="close">✕</div>` +
          '    </div>' +
          '    <div class="body">' +
          '      <div className="desc">' +
          `        <div className="adress" style="font-weight: 700;">주소 : ${clickedInfo.NEW_ADR}</div>` +
          `        <div className="tel" style="font-weight: 700;">연락처 : ${clickedInfo.TEL}</div>` +
          '      </div>' +
          '      <h3> • 유가정보 </h3>' +
          '      <ul>';
        if (clickedInfo.OIL_PRICE.find((oil) => oil.PRODCD === 'B034')) {
          content += `<li className="B034">
            <span class="oilname"> 고급휘발유 </span>
            <span class="oilprice"> --------- ${
              clickedInfo.OIL_PRICE.find((oil) => oil.PRODCD === 'B034').PRICE
            }원 </span>
            <span  class="updateTime"> (${clickedInfo.OIL_PRICE.find(
              (oil) => oil.PRODCD === 'B034'
            ).TRADE_DT.replace(
              /(\d{4})(\d{2})(\d{2})/,
              '$1-$2-$3'
            )} 기준) </span>
          </li>`;
        }
        if (clickedInfo.OIL_PRICE.find((oil) => oil.PRODCD === 'B027')) {
          content += `<li className="B027">
          <span class="oilname"> 휘발유 </span>
          <span class="oilprice"> ------------- ${
            clickedInfo.OIL_PRICE.find((oil) => oil.PRODCD === 'B027').PRICE
          }원 </span>
          <span class="updateTime">(${clickedInfo.OIL_PRICE.find(
            (oil) => oil.PRODCD === 'B027'
          ).TRADE_DT.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3')} 기준)</span>
        </li>`;
        }
        if (clickedInfo.OIL_PRICE.find((oil) => oil.PRODCD === 'D047')) {
          content += `<li className="D047">
          <span class="oilname"> 경유 </span>
          <span class="oilprice"> ---------------- ${
            clickedInfo.OIL_PRICE.find((oil) => oil.PRODCD === 'D047').PRICE
          }원 </span>
          <span class="updateTime"> (${clickedInfo.OIL_PRICE.find(
            (oil) => oil.PRODCD === 'D047'
          ).TRADE_DT.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3')} 기준)</span>
        </li>`;
        }
        content += '      </ul>' + '      <div class="tags">';
        if (clickedInfo.CAR_WASH_YN === 'Y') {
          content += '<span class="carwash">🚘 세차장</span>';
        }
        if (clickedInfo.MAINT_YN === 'Y') {
          content += '<span class="maint">🔧 경정비</span>';
        }
        if (clickedInfo.CVS_YN === 'Y') {
          content += '<span class="cvs">🏪 편의점</span>';
        }
        if (clickedInfo.LPG_YN === 'Y' || clickedInfo.LPG_YN === 'C') {
          content += '<span class="lpg">🔋 충전소</span>';
        }
        content +=
          '<div>' +
          `<button id=btn${clickedInfo.UNI_ID} class='review_btn'>주유소 리뷰보기</button>` +
          '</div>';
        // make customOverlay
        const overlay = new kakao.maps.CustomOverlay({
          map: kakaoMap,
          position: marker.getPosition(),
          content,
          zIndex: 3,
        });
        overlay.setMap(kakaoMap);
        // overlay close에 click event 줌.
        
        document
          .querySelector(`#btn${clickedInfo.UNI_ID}`)
          .addEventListener('click', function () {
            if(!isLogin){
              alert('로그인 후 사용 가능합니다.')
            }else if(isLogin){
            history.push({
              pathname: `/review/${clickedInfo.UNI_ID}`,
              state: { clickedInfo },
            })
          }else{
            history.push('/map')
          }
          }) 

        document
          .querySelector(`#${clickedInfo.UNI_ID}`)
          .addEventListener('click', function () {
            // console.log(clickedInfo)
            overlay.setMap(null);
          });
      });
      return marker;
    });
    //
    setMarkers((markers) => {
      markers.forEach((el) => el.setMap(null));
      //return markers.concat(newMarkers);
      return newMarkers;
    });
    // 검색시 markers 화면에 나오도록..
    const positions = markerPositions.map((position) => position.latlng);
    if (positions.length > 0) {
      const bounds = positions.reduce(
        (bounds, latlng) => bounds.extend(latlng),
        new kakao.maps.LatLngBounds()
      );
      kakaoMap.setBounds(bounds);
    }
    kakaoMap.setLevel(7);
  }, [kakaoMap, markerPositions]);
  return (
    <div>
      <SearchBar
        setSearchValue={setSearchValue}
        coordiKatec={coordiKatec}
        stations={stations}
        setStations={setStations}
        markers={markers}
        opinet={opinet}
        kakaoMap={kakaoMap}
        userInfo={userInfo}
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        logoutHandler={logoutHandler}
        axiosInstance={axiosInstance}
      />
      <div>
      {isLoading ? <Loading/> : ''}
      <div id="map" style={{ width: '100%', height: '750px' }}></div>
      </div>
    </div>
  );
};

export default MapContainer;
