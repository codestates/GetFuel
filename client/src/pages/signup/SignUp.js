import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import GetFuel from '../../image/GetFuel1.png';
import styles from './SignUp.module.css';
import SignuUpModal from './SignUpModal.js';

export default function SignUp() {
  const [signupInfo, setSignupInfo] = useState({
    nickname: '',
    email: '',
    password: '',
  });

  const [isNickname, setIsNickname] = useState('');
  const [isEmail, setIsEmail] = useState('');
  const [isPassword, setIsPassword] = useState('');

  //const history = useHistory();
  // 정보를 입력하는 함수
  const handleInputValue = (key) => (e) => {
    setSignupInfo({ ...signupInfo, [key]: e.target.value });
  };

  // Signup버튼 클릭시 post
  const handleSignup = () => {
    const { nickname, email, password } = signupInfo;

    if (nickname && email && password) {
      axios
        .post(
          'http://localhost:8080/auth/signup',
          { email, nickname, password },
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          }
        )
        .then((res) => {
          console.log(res);
          if (res) {
            SignupModalHandler();
          }
        })
        .catch((err) => {
          const messageFromServer = err;
          if (messageFromServer.response.data.field === 'password') {
            setIsPassword(messageFromServer.response.data.message);
          } else if (messageFromServer.response.data.field === 'email') {
            setIsEmail(messageFromServer.response.data.message);
          } else if (messageFromServer.response.data.field === 'nickname') {
            setIsNickname(messageFromServer.response.data.message);
          }
        });
    }
  };

  // 모달 온오프..
  const [isOpenSignUpModal, setIsOpenSignUpModal] = useState(false);

  const SignupModalHandler = () => {
    setIsOpenSignUpModal(!isOpenSignUpModal);
  };

  return (
    <div>
      <div className={styles.GetFuelLogo}>
        <img className={styles.signup_logo} src={GetFuel} />
      </div>

      <form className={styles.inputform} onSubmit={(e) => e.preventDefault()}>
        <div className={styles.email}>Email</div>
        <input
          className={styles.userinfo}
          type='text'
          placeholder='이메일을 입력하세요'
          onChange={handleInputValue('email')}
        />
        <div className={styles.errorword}>{isEmail}</div>

        <div className={styles.nickname}>Nickname</div>
        <input
          className={styles.userinfo}
          type='text'
          placeholder='사용할 닉네임을 입력하세요'
          onChange={handleInputValue('nickname')}
        />
        <div className={styles.errorword}>{isNickname}</div>

        <div className={styles.password}>Password</div>
        <input
          className={styles.userinfo}
          type='password'
          placeholder='비밀번호를 입력하세요'
          onChange={handleInputValue('password')}
        />
        <div className={styles.errorword}>{isPassword}</div>
        <div className={styles.reenterpassword}>Confirmpassword</div>
        <input
          className={styles.userinfo}
          type='password'
          placeholder='비밀번호 확인'
          onChange={handleInputValue('confirmpassword')}
        />

        <div className={styles.button_bundle}>
          <button onClick={handleSignup} className={styles.signup_button}>
            Sign Up
          </button>
          <Link to='/'>
            <button className={styles.cancel_button}>Cancel</button>
          </Link>
        </div>
      </form>
      <div>
        {isOpenSignUpModal ? (
          <SignuUpModal SignupModalHandler={SignupModalHandler} />
        ) : null}
      </div>
    </div>
  );
}
