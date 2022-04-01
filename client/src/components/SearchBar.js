import React from 'react';
import styles from './SearchBar.module.css';

const SearchBar = ({ setSearchValue }) => {
  const inputRef = React.useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    const value = inputRef.current.value;
    setSearchValue(value);
    inputRef.current.value = '';
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img
          className={styles.img}
          src="../img/getfuel.png"
          alt="getfuel logo"
        />
        <h1 className={styles.title}>GetFuel</h1>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="search"
          placeholder="지역명..."
          ref={inputRef}
        />
        <button className={styles.button}>
          <img src="../img/search.png" alt="search img" />
        </button>
      </form>
    </header>
  );
};

export default SearchBar;
