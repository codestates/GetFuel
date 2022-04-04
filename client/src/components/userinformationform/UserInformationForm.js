import React,{ useState } from 'react';
import styles from './UserInformationForm.module.css';

function UserInformationForm() {
  // 회원가입 정보 데이터베이스에 넘겨줄 코드
   

    return (
    
      <div>
        <form className={styles.inputform}>
            <div className={styles.email}>Email</div>
              <input className={styles.userinfo} type="text" placeholder='이메일을 입력하세요'/>
            <div className={styles.nickname}>Nickname</div>
              <input className={styles.userinfo} type='text' placeholder='사용할 닉네임을입력하세요' />
            <div className={styles.password}>Password</div>
              <input className={styles.userinfo} type='password' placeholder='비밀번호를 입력하세요' />
            <div className={styles.reenterpassword}>Confirmpassword</div>
              <input className={styles.userinfo} type='password' placeholder='비밀번호 확인'/> 
        </form>
        
      </div>

    );
};

export default UserInformationForm;