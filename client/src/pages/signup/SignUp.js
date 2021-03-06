import axios from 'axios';
import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import GetFuel from '../../img/GetFuel1.png';
import styles from './SignUp.module.css';
import SignuUpModal from './SignUpModal.js';
import Nav from '../../components/nav/Nav';

export default function SignUp() {
  const history = useHistory();
  const [isOpenSignUpModal, setIsOpenSignUpModal] = useState(false);
  // 정보확인
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  // 오류 메시지 상태를 저장
  const [nicknameMessage, setNicknameMessage] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [confirmPasswordMessage, setConfirmPasswordMessage] = useState('');

  // 유효성 검사 상태 저장
  const [valNickname, setValNickname] = useState(false);
  const [valEmail, setValEmail] = useState(false);
  const [valPassword, setValPassword] = useState(false);
  const [valConfirmPassword, setValConfirmPassword] = useState(false);

  // 닉네임 유효성
  const onChangeNickname = useCallback((e) => {
    setNickname(e.target.value);
    if (e.target.value.length < 2) {
      setNicknameMessage('닉네임은 2글자 이상이여야합니다!');
      setValNickname(false);
    } else {
      setNicknameMessage(' ');
      setValNickname(true);
    }
  }, []);

  // 이메일 유효성
  const onChangeEmail = useCallback((e) => {
    const emailPattern =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const emailCurrent = e.target.value;
    setEmail(e.target.value);

    if (!emailPattern.test(emailCurrent)) {
      setEmailMessage('이메일 형식을 지켜주세요!');
      setValEmail(false);
    } else {
      setEmailMessage(' ');
      setValEmail(true);
    }
  }, []);

  // 비밀번호 유효성
  const onChangePassword = useCallback((e) => {
    const passwordPattern =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;

    setPassword(e.target.value);
    const passwordCurrent = e.target.value;

    if (!passwordPattern.test(passwordCurrent)) {
      setPasswordMessage(
        '비밀번호는 영문 대소문자 특수문자를 포함 8글자 이상이여야합니다'
      );
      setValPassword(false);
    } else {
      setPasswordMessage(' ');
      setValPassword(true);
    }
  }, []);

  // 비밀번호 확인?
  const onChangePasswordConfirm = useCallback(
    (e) => {
      const passwordConfirmPattern = e.target.value;
      setPasswordConfirm(passwordConfirmPattern);

      if (password === passwordConfirmPattern) {
        setConfirmPasswordMessage('비밀번호가 일치합니다!!');
        setValConfirmPassword(true);
      } else {
        setConfirmPasswordMessage(
          '비밀번호가 일치하지 않습니다. 다시 확인해주세요'
        );
        setValConfirmPassword(false);
      }
    },
    [password]
  );

  const [errorMessage, setErrorMessage] = useState('');

  // Signup버튼 클릭시 post
  const handleSignup = () => {
    if (nickname && email && password) {
      axios
        .post(
          `${process.env.REACT_APP_AWS_API_URL}/auth/signup`,
          { email, nickname, password },
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          }
        )
        .then((res) => {
          if (res) {
            signUpModalHandler();
          }
        })
        .catch((err) => console.error(err));
    } else {
      setErrorMessage('모든 항목은 필수입니다.');
    }
  };

  const signUpModalHandler = () => {
    setIsOpenSignUpModal(!isOpenSignUpModal);
  };

  return (
    <div>
      <Nav />
      <div className={styles.GetFuelLogo}>
        <img className={styles.signup_logo} src={GetFuel} />
      </div>
      <div>
        <form className={styles.inputform} onSubmit={(e) => e.preventDefault()}>
          <div className={styles.emailform}>
            <div className={styles.email}>Email</div>
            <input
              className={styles.userinfo}
              id="email"
              type="email"
              placeholder="이메일을 입력하세요"
              onChange={onChangeEmail}
              autoComplete="on"
            />
          </div>
          <div className={styles.formbox}>
            {email.length > 0 && (
              <span className={`message ${valEmail ? 'success' : 'error'}`}>
                {emailMessage}
              </span>
            )}
          </div>
          <div className={styles.nickanmeform}>
            <div className={styles.nickname}>Nickname</div>
            <input
              className={styles.userinfo}
              id="name"
              type="text"
              name="name"
              placeholder="사용할 닉네임을 입력하세요"
              autoComplete="on"
              onChange={onChangeNickname}
            />
          </div>
          <div className={styles.formbox}>
            {nickname.length > 0 && (
              <span className={`message ${valNickname ? 'success ' : 'error'}`}>
                {nicknameMessage}
              </span>
            )}
          </div>

          <div className={styles.passwordform}>
            <div className={styles.password}>Password</div>
            <input
              className={styles.userinfo}
              type="password"
              name="password"
              placeholder="비밀번호를 입력하세요"
              onChange={onChangePassword}
              autoComplete="off"
            />
          </div>
          <div className={styles.formbox}>
            {password.length > 0 && (
              <span className={`message ${valPassword ? 'success ' : 'error'}`}>
                {passwordMessage}
              </span>
            )}
          </div>

          <div className={styles.confirmform}>
            <div className={styles.confirmpassword}>Confirm password</div>
            <input
              className={styles.userinfo}
              type="password"
              name="passwordConfirm"
              placeholder="비밀번호 확인"
              onChange={onChangePasswordConfirm}
              autoComplete="off"
            />
          </div>
          <div className={styles.formbox}>
            {passwordConfirm.length > 0 && (
              <span
                className={`message ${
                  valConfirmPassword ? 'success ' : 'error'
                }`}
              >
                {confirmPasswordMessage}
              </span>
            )}
          </div>

          <div className={styles.button_bundle}>
            <button onClick={handleSignup} className={styles.button1}>
              Sign Up
            </button>
            <button
              className={styles.button2}
              onClick={() => history.push('/')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
      <div>
        {isOpenSignUpModal ? (
          <SignuUpModal signUpModalHandler={signUpModalHandler} />
        ) : null}
      </div>
    </div>
  );
}
