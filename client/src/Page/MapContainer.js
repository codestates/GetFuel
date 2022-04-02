/* global kakao */
import React, { useState, useEffect } from 'react';
import { coordiEPSTtoKATEC, coordiKATECtoEPSG } from '../utils/coordinate.js';
import SearchBar from '../components/SearchBar.js';
import './MapContainer.css';
const { kakao } = window;

const MapContainer = ({ opinet }) => {
  const [searchValue, setSearchValue] = useState('서울시청');
  const [kakaoMap, setKakaoMap] = useState(null);
  const [centerCoordi, setCenterCoordi] = useState([
    37.56683690482874, 126.9786564967784,
  ]);
  const [coordiKatec, setcoordiKatec] = useState([]);
  const [stations, setStations] = useState([]);
  const [markerPositions, setMarkerPositions] = useState([]);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    /* geolocation 활용 https 환경에서만 작동.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude; //위도
        const lng = position.coords.longitude; //경도

        const container = document.getElementById('map');
        const options = {
          center: new kakao.maps.LatLng(lng, lat),
          level: 7,
        };
        const map = new kakao.maps.Map(container, options);
        setKakaoMap(map); //여기까지가 지도 생성
      });
    }
    */
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(centerCoordi[0], centerCoordi[1]),
      level: 7,
    };
    const map = new kakao.maps.Map(container, options);
    setKakaoMap(map); //여기까지가 지도 생성
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
    // 위경도로 이루어진 중심좌표 -> centerCoordi -> convert -> coordiKatec
    function updateCoordi() {
      let latlng = kakaoMap.getCenter(); // 지도의 중심좌표를 얻어옵니다
      setCenterCoordi([latlng.Ma, latlng.La]);
      const converted = coordiEPSTtoKATEC(centerCoordi[1], centerCoordi[0]);
      setcoordiKatec([...converted]);
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
    const stationsInfo = await opinet.aroundStation(
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
    const imageSrc =
      'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';
    const imageSize = new kakao.maps.Size(24, 34);
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
        const clicked = markerPositions.find(
          (position) => position.title === marker.Gb
        );
        const clickedInfo = await opinet.stationInfo(clicked.id);
        console.log(clickedInfo);
        let content =
          '<div class="wrap">' +
          '  <div class="info">' +
          '    <div class="title">' +
          `      ${clickedInfo.OS_NM}` +
          `      <div id=${clickedInfo.UNI_ID} class="close">✕</div>` +
          '    </div>' +
          '    <div class="body">' +
          '      <div className="desc">' +
          `        <div className="adress">주소 : ${clickedInfo.NEW_ADR}</div>` +
          `        <div className="tel">연락처 : ${clickedInfo.TEL}</div>` +
          '      </div>' +
          '      <h4> • 유가정보 </h4>' +
          '      <ul>';
        if (clickedInfo.OIL_PRICE.find((oil) => oil.PRODCD === 'B034')) {
          content += `<li className="B034">
            <span> <i class="fa-solid fa-car-wash"></i>고급휘발유 </span>
            <span> --------- ${
              clickedInfo.OIL_PRICE.find((oil) => oil.PRODCD === 'B034').PRICE
            }원 </span>
            <span>(${clickedInfo.OIL_PRICE.find(
              (oil) => oil.PRODCD === 'B034'
            ).TRADE_DT.replace(
              /(\d{4})(\d{2})(\d{2})/,
              '$1-$2-$3'
            )} 기준)</span>
          </li>`;
        }
        if (clickedInfo.OIL_PRICE.find((oil) => oil.PRODCD === 'B027')) {
          content += `<li className="B027">
          <span> 휘발유 </span>
          <span> ------------- ${
            clickedInfo.OIL_PRICE.find((oil) => oil.PRODCD === 'B027').PRICE
          }원 </span>
          <span>(${clickedInfo.OIL_PRICE.find(
            (oil) => oil.PRODCD === 'B027'
          ).TRADE_DT.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3')} 기준)</span>
        </li>`;
        }
        if (clickedInfo.OIL_PRICE.find((oil) => oil.PRODCD === 'D047')) {
          content += `<li className="D047">
          <span> 경유 </span>
          <span> --------------- ${
            clickedInfo.OIL_PRICE.find((oil) => oil.PRODCD === 'D047').PRICE
          }원 </span>
          <span>(${clickedInfo.OIL_PRICE.find(
            (oil) => oil.PRODCD === 'D047'
          ).TRADE_DT.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3')} 기준)</span>
        </li>`;
        }
        content += '      </ul>' + '    </div>' + '  </div>' + '</div>';

        const overlay = new kakao.maps.CustomOverlay({
          map: kakaoMap,
          position: marker.getPosition(),
          content,
          zIndex: 3,
        });
        overlay.setMap(kakaoMap);
        document
          .querySelector(`#${clickedInfo.UNI_ID}`)
          .addEventListener('click', function () {
            overlay.setMap(null);
          });
      });

      return marker;
    });

    setMarkers((markers) => {
      markers.forEach((el) => el.setMap(null));

      return markers.concat(newMarkers);
    });

    const positions = markerPositions.map((position) => position.latlng);
    if (positions.length > 0) {
      const bounds = positions.reduce(
        (bounds, latlng) => bounds.extend(latlng),
        new kakao.maps.LatLngBounds()
      );
      kakaoMap.setBounds(bounds);
    }
    kakaoMap.setLevel(6);
  }, [kakaoMap, markerPositions]);
  return (
    <div>
      <SearchBar setSearchValue={setSearchValue} />
      <div id="map" style={{ width: '100%', height: '585px' }}></div>
    </div>
  );
};

export default MapContainer;
