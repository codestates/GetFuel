import React from 'react';
import styles from './EditForm.module.css';

function EditForm() {

    return (

      <div>
        <form className={styles.inputform}>
          <div className={styles.email}>email</div>
            <input className={styles.userinfo} type="text" placeholder='이메일을 입력하세요' disabled />
          <div className={styles.nickname}>nickname</div>
            <input className={styles.userinfo} type='text' placeholder='사용할 닉네임을입력하세요' disabled />
          <div className={styles.password}>password</div>
            <input className={styles.userinfo} type='password' placeholder='비밀번호를 입력하세요' />
          <div className={styles.reenterpassword}>reenterpassword</div>
            <input className={styles.userinfo} type='password' placeholder='비밀번호 확인'/> 
        </form> 
      </div>
    );
};

export default EditForm;