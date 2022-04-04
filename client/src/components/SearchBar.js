import React from 'react';
import styles from './SearchBar.module.css';
<<<<<<< HEAD
import Nav from './nav/Nav.js';
=======
import Nav from './nav';
>>>>>>> 3a513b67eae4b7bd5cb7154d723198649fa1f508
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
const SearchBar = ({ setSearchValue }) => {
  const inputRef = React.useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    const value = inputRef.current.value;
    setSearchValue(value);
    inputRef.current.value = '';
  };

  return (
    <>
      <Nav />
      <header className={styles.header}>
        <div className={styles.div}>
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
      </header>
    </>
  );
};

export default SearchBar;
