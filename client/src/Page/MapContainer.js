import React, { useState } from 'react';
import SearchBar from '../component/SearchBar.js';

const MapContainer = () => {
  const [searchValue, setSearchValue] = useState('서울시청');
  console.log(searchValue);
  return (
    <div>
      <SearchBar setSearchValue={setSearchValue} />
    </div>
  );
};

export default MapContainer;
