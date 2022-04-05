import React, { useState } from 'react';
import styles from './stationList.module.css';
import SOL from '../../img/s-oil.png';
import HDO from '../../img/HDO.jpg';
import GSC from '../../img/GSC.jpeg';
import SKE from '../../img/SKE.jpg';
import ETC from '../../img/ETC.png';
import markerImageOver from '../../img/station1.png';
import markerImageLeave from '../../img/station.png';
const { kakao } = window;

const StationList = ({ stations, markers }) => {
  const handleClick = (i) => {
    const imageSrc = markerImageOver;
    const imageSize = new kakao.maps.Size(48, 48);
    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
    markers[i].setImage(markerImage);
  };

  const handleMouseLeve = (i) => {
    const imageSrc = markerImageLeave;
    const imageSize = new kakao.maps.Size(38, 38);
    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
    markers[i].setImage(markerImage);
  };

  return (
    <ul styles={styles.price_ul}>
      {stations.map((station, index) => {
        return (
          <li
            className={styles.station_li}
            key={station.UNI_ID}
            onClick={() => handleClick(index)}
            onMouseLeave={() => handleMouseLeve(index)}
          >
            {station.POLL_DIV_CD === 'SOL' && (
              <img
                src={SOL}
                alt="station_logo"
                className={styles.station_logo}
              />
            )}
            {station.POLL_DIV_CD === 'HDO' && (
              <img
                src={HDO}
                alt="station_logo"
                className={styles.station_logo}
              />
            )}
            {station.POLL_DIV_CD === 'GSC' && (
              <img
                src={GSC}
                alt="station_logo"
                className={styles.station_logo}
              />
            )}
            {station.POLL_DIV_CD === 'SKE' && (
              <img
                src={SKE}
                alt="station_logo"
                className={styles.station_logo}
              />
            )}
            {station.POLL_DIV_CD === 'ETC' && (
              <img
                src={ETC}
                alt="station_logo"
                className={styles.station_logo}
              />
            )}
            {station.POLL_DIV_CD ===
              ('RTO' || 'RTX' || 'NHO' || 'E1G' || 'SKG') && (
              <img
                src={ETC}
                alt="station_logo"
                className={styles.station_logo}
              />
            )}
            <div className={styles.station_title}>{station.OS_NM}</div>
            <div className={styles.station_price}>{station.PRICE}원</div>
          </li>
        );
      })}
    </ul>
  );
};

export default StationList;
