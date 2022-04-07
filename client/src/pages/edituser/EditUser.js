import React from 'react';
import GetFuel from '../../GetFuel1.png';
import styles from './EditUser.module.css'

const EditUser = () => {


  
  return (

    <div>
      <img className={styles.logo} src={GetFuel} />
      <form className={styles.inputform}>
        <div className={styles.email}>email</div>
          <input className={styles.userinfo} type="text" placeholder='이메일을 입력하세요' disabled />
        <div className={styles.nickname}>nickname</div>
          <input className={styles.userinfo} type='text' placeholder='사용할 닉네임을입력하세요' disabled />
        <div className={styles.password}>password</div>
          <input className={styles.userinfo} type='password' placeholder='비밀번호를 입력하세요' />
        <div className={styles.reenterpassword}>reenterpassword</div>
          <input className={styles.userinfo} type='password' placeholder='비밀번호 확인' />
      </form>

      <div className={styles.button_bundle}>
        <a href='login' data-role="button" data-inline="true">
          <button className={styles.button}>Comfirm</button>
        </a>
        <a href='' data-role="button" data-inline="true">
          <button className={styles.button}>Cancel</button>
        </a>
        <a href='' data-role="button" data-inline="true">
          <button className={styles.button}>Delete Account</button>
        </a>
      </div>
    </div>
  );
};

export default EditUser;