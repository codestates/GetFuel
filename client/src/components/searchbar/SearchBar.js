import React, { useState } from 'react';
import styles from './SearchBar.module.css';
import MapNav from '../mapNav/MapNav.js';
import StationList from '../stationList/stationList.js';
import { coordiKATECtoWGS } from '../../utils/coordinate.js';
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
  kakaoMap,
  userInfo,
  isLogin,
  setIsLogin,
  axiosInstance,
  loginType,
}) => {
  const [isClicked, setIsClicked] = useState(false);

  const inputRef = React.useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    const value = inputRef.current.value;
    setSearchValue(value);
    inputRef.current.value = '';
  };

  const handleSidebar = () => {
    setIsClicked(!isClicked);
    {
      isClicked ? kakaoMap.setLevel(6) : kakaoMap.setLevel(7);
    }
  };

  const saveOpinetData = (copiedStationsInfo) => {
    const coordiConvert = copiedStationsInfo.map((station) => {
      const converted = coordiKATECtoWGS(
        station.GIS_X_COOR,
        station.GIS_Y_COOR
      );
      station.GIS_X_COOR = Number(parseFloat(converted[1]).toFixed(5));
      station.GIS_Y_COOR = Number(parseFloat(converted[0]).toFixed(5));
      return station;
    });
    console.log(coordiConvert);
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
      <MapNav
        userInfo={userInfo}
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        axiosInstance={axiosInstance}
        loginType={loginType}
      />
      <header className={styles.header}>
        <div className={styles.div}>
          <label className={styles.label}>
            <FontAwesomeIcon icon={faBars} className={styles.menu_img} />
            <input
              type="button"
              value={'????????? ??????'}
              className={styles.menu_btn}
              onClick={handleSidebar}
            />
          </label>
          <section
            className={isClicked ? styles.clickedSection : styles.section}
          >
            <div className={styles.btn_div}>
              <button className={styles.oil_btn} onClick={getPremium}>
                ???????????????
              </button>
              <button className={styles.oil_btn} onClick={getGasoline}>
                ?????????
              </button>
              <button className={styles.oil_btn} onClick={getDiesel}>
                ??? ???
              </button>
            </div>
            <StationList stations={stations} markers={markers} />
          </section>
          <div className={styles.form_div}>
            <form className={styles.form} onSubmit={handleSubmit}>
              <input
                className={styles.input}
                type="search"
                placeholder="????????? ???????????????..."
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
