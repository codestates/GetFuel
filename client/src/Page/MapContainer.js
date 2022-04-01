/* global kakao */
import React, { useState, useEffect } from 'react';
import SearchBar from '../component/SearchBar.js';

const { kakao } = window;

const MapContainer = () => {
  const [searchValue, setSearchValue] = useState('서울시청');
  const [kakaoMap, setKakaoMap] = useState(null);
  const [centerCoordi, setCenterCoordi] = useState([
    37.56683690482874, 126.9786564967784,
  ]);

  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(centerCoordi[0], centerCoordi[1]),
      level: 7,
    };
    const map = new kakao.maps.Map(container, options);
    setKakaoMap(map); //여기까지가 지도 생성
  }, []);

  return (
    <div>
      <SearchBar setSearchValue={setSearchValue} />
      <div id="map" style={{ width: '100%', height: '585px' }}></div>
    </div>
  );
};

export default MapContainer;
