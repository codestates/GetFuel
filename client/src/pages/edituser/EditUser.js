import React, { useState, useCallback } from 'react';
import GetFuel from '../../GetFuel.png';
import styles from './EditUser.module.css';
import axios from 'axios';
import edituser from './edituser.css';

export default function EditUser(userInfo) {
  console.log(userInfo);
  const [userid, setUserid] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [updateErrorMessage, setUpdateErrorMessage] = useState('');
  const [deleteErrorMessage, setDeleteErrorMessage] = useState('');
  const [password, setPassword] = useState('');
  const [reEnterPassword, setReEnterPassword] = useState('');

  const [passwordErrorMessage, setPasswordErrorMessage] = useState(false);
  const [passwordConfrimErrorMessage, setPasswordConfirmErrorMessage] =
    useState(false);
  const [isPassword, setIsPassword] = useState(true);
  const [isConfirmPassword, setIsConfirmPassword] = useState(true);

  // 현재 비밀번호
  const onChangePassword = useCallback((e) => {
    const passwordPattern =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
    setPassword(e.target.value);
    const passwordCurrent = e.target.value;
    if (!passwordPattern.test(passwordCurrent)) {
      setPasswordErrorMessage(
        '8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.'
      );
      setIsPassword(false);
    } else {
      setPasswordErrorMessage('안전한 비밀 번호에요!');
      setIsPassword(true);
    }
  }, []);

  // 변경 비밀번호
  const onChangePasswordConfirm = useCallback(
    (e) => {
      setReEnterPassword(e.target.value);
      const passwordConfirmCurrent = e.target.value;
      if (password === passwordConfirmCurrent) {
        setPasswordConfirmErrorMessage('비밀번호가 일치합니다.');
        setIsConfirmPassword(true);
      } else {
        setPasswordConfirmErrorMessage('비밀번호가 일치하지 않습니다.');
        setIsConfirmPassword(false);
      }
    },
    [password]
  );

  const handleUpdateUserInfo = () => {
    axios
      .put(`http://localhost:8080/updateinfo/${userid}`, {
        Authorization: `Bearer ${accessToken}`,
      })
      .then((res) => {
        if (res.status === '404') {
          return setUpdateErrorMessage('잘못된 회원정보 입니다.');
        } else if (res.status === '403') {
          return setUpdateErrorMessage('접근 권한이 없습니다.');
        } else {
          return setUpdateErrorMessage('');
        }
      })
      .catch((err) => {
        console.log(err, 'Failed to Update UserInfo');
      });
  };

  const handleDeleteUserInfo = () => {
    axios
      .delete(`http://localhost:8080/deleteaccount/${userid}`, {
        Authorization: `Bearer ${accessToken}`,
      })
      .then((res) => {
        if (res.status === '404') {
          return setDeleteErrorMessage('잘못된 회원정보 입니다.');
        } else if (res.status === '403') {
          return setDeleteErrorMessage('접근 권한이 없습니다.');
        } else {
          return setDeleteErrorMessage('');
        }
      })
      .catch((err) => {
        console.log(err, 'Failed to Delete UserInfo');
      });
  };

  return (
    <div>
      <div>
        <img className={styles.logo} src={GetFuel} />
        <form className={styles.inputform}>
          <div className={styles.email}>email</div>
          <input
            className={styles.userinfo}
            type='text'
            placeholder='이메일을 입력하세요'
            disabled
          />

          <div className={styles.nickname}>nickname</div>
          <input
            className={styles.userinfo}
            type='text'
            placeholder='사용할 닉네임을입력하세요'
            disabled
          />

          <div className={styles.password}>password</div>
          <input
            className={styles.userinfo}
            type='password'
            placeholder='비밀번호를 입력하세요'
            onChange={onChangePassword}
          />
          <div className='formbox'>
            {password.length > 0 && (
              <span className={`message ${isPassword ? 'success' : 'error'}`}>
                {passwordErrorMessage}
              </span>
            )}
          </div>

          <div className={styles.reenterpassword}>reenterpassword</div>
          <input
            className={styles.userinfo}
            type='password'
            placeholder='비밀번호 확인'
            onChange={onChangePasswordConfirm}
          />
          <div className='formbox'>
            {reEnterPassword.length > 0 && (
              <span
                className={`message ${isConfirmPassword ? 'success' : 'error'}`}
              >
                {passwordConfrimErrorMessage}
              </span>
            )}
          </div>
        </form>
        <div>{updateErrorMessage}</div>

        <div className={styles.button_bundle}>
          <button className={styles.button} onClick={handleUpdateUserInfo}>
            Comfirm
          </button>

          <button className={styles.button}>Cancel</button>

          <button className={styles.button} onClick={handleDeleteUserInfo}>
            Delete Account
          </button>
          <div>{deleteErrorMessage}</div>
        </div>
      </div>
    </div>
  );
}
