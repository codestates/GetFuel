import React from 'react';
import styles from './SearchBar.module.css';
import MapNav from '../mapNav/MapNav.js';
import StationList from '../stationList/stationList.js';
import { coordiKATECtoEPSG } from '../../utils/coordinate.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const SearchBar = ({
  setSearchValue,
  coordiKatec,
  stations,
  setStations,
  markers,
  opinet,
}) => {
  const inputRef = React.useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    const value = inputRef.current.value;
    setSearchValue(value);
    inputRef.current.value = '';
  };

  const saveOpinetData = (copiedStationsInfo) => {
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
  };

  const getGasoline = async () => {
    const stationsInfo = await opinet.aroundStationGasoline(
      coordiKatec[0],
      coordiKatec[1]
    );
    const copiedStationsInfo = [...stationsInfo];
    saveOpinetData(copiedStationsInfo);
  };

  const getDiesel = async () => {
    const stationsInfo = await opinet.aroundStationDiesel(
      coordiKatec[0],
      coordiKatec[1]
    );
    const copiedStationsInfo = [...stationsInfo];
    saveOpinetData(copiedStationsInfo);
  };

  const getPremium = async () => {
    const stationsInfo = await opinet.aroundStationPremium(
      coordiKatec[0],
      coordiKatec[1]
    );
    const copiedStationsInfo = [...stationsInfo];
    saveOpinetData(copiedStationsInfo);
  };
  return (
    <>
      <MapNav />
      <header className={styles.header}>
        <div className={styles.div}>
          <label className={styles.label}>
            <FontAwesomeIcon icon={faBars} className={styles.menu_img} />
            <input
              type="button"
              value={'가격순 보기'}
              className={styles.menu_btn}
            />
          </label>
          <section className={styles.section}>
            <button className={styles.oil_btn_g} onClick={getPremium}>
              고급휘발유
            </button>
            <button className={styles.oil_btn_g} onClick={getGasoline}>
              휘발유
            </button>
            <button className={styles.oil_btn_d} onClick={getDiesel}>
              경 유
            </button>
            <StationList stations={stations} />
          </section>
          <div className={styles.form_div}>
            <form className={styles.form} onSubmit={handleSubmit}>
              <input
                className={styles.input}
                type="search"
                placeholder="지역을 입력하세요..."
                ref={inputRef}
              />
              <button className={styles.button}>
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className={styles.img}
                />
              </button>
            </form>
          </div>
        </div>
      </header>
    </>
  );
};

export default SearchBar;
