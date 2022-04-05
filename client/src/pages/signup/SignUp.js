import axios from 'axios';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Modal from '../../components/modal/SignUpModal';
import GetFuel from '../../GetFuel1.png';
import styles from './SignUp.module.css';

axios.defaults.withCredentials = true;

export default function SignUp() {
  const [signupInfo, setSignupInfo] = useState({
    nickname: '',
    email: '',
    password: '',
  });

  const [isnicknamem, setIsNickname] = useState('');
  const [isEmail, setIsEmail] = useState('');
  const [isPassword, setIsPassword] = useState('');
  const [isConfirmPassword, setIsConfirmPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  //const history = useHistory();
  // 정보를 입력하는 함수
  const handleInputValue = (key) => (e) => {
    setSignupInfo({ ...signupInfo, [key]: e.target.value });
  };

  // Signup버튼 클릭시 post
  const handleSignup = () => {
    const { nickname, email, password } = signupInfo;

    if (signupInfo) {
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
          console.log(res.data);
          handleRespoaseSuccess();
        })
        .catch((err) => setErrorMessage('오류 투성이..'));
    } else {
      setErrorMessage('모든 항목은 필수입니다.');
      console.log('확인창');
    }
  };

  // 모달 온오프..
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const handleRespoaseSuccess = () => {
    openModal();
  };

  return (
    <div>
      <div className={styles.GetFuelLogo}>
        <img className={styles.signup_logo} src={GetFuel} />
      </div>

      {/* <Modal open={modalOpen} close={closeModal}></Modal> */}

      <form className={styles.inputform} onSubmit={(e) => e.preventDefault()}>
        <div className={styles.email}>Email</div>
        <input
          className={styles.userinfo}
          type='text'
          placeholder='이메일을 입력하세요'
          onChange={handleInputValue('email')}
        />
        <div className={styles.alert}>{errorMessage}</div>

        <div className={styles.nickname}>Nickname</div>
        <input
          className={styles.userinfo}
          type='text'
          placeholder='사용할 닉네임을 입력하세요'
          onChange={handleInputValue('nickname')}
        />

        <div className={styles.password}>Password</div>
        <input
          className={styles.userinfo}
          type='password'
          placeholder='비밀번호를 입력하세요'
          onChange={handleInputValue('password')}
        />

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

          <a href='/' data-role='button' data-inline='true'>
            <button className={styles.cancel_button}>Cancel</button>
          </a>
        </div>
      </form>
    </div>
  );
}
