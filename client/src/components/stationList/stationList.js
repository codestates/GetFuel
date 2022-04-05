import React from 'react';
import styles from './stationList.module.css';
import SOL from '../../img/s-oil.png';
import HDO from '../../img/HDO.jpg';
import GSC from '../../img/GSC.jpeg';
import SKE from '../../img/SKE.jpg';

const StationList = ({ stations }) => {
  return (
    <ul styles={styles.price_ul}>
      {stations.map((station) => {
        return (
          <li className={styles.station_li}>
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
            <div className={styles.station_title}>{station.OS_NM}</div>
            <div className={styles.station_price}>{station.PRICE}원</div>
          </li>
        );
      })}
    </ul>
  );
};

export default StationList;
