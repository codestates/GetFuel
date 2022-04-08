import React, { useState, useCallback } from 'react';
import GetFuel from '../../GetFuel.png';
import styles from './EditUser.module.css';
import axios from 'axios';
import { useLocation } from 'react-router';
import { useHistory, Link } from 'react-router-dom';
import DeleteUserModal from './DeleteUserModal.js';
import './DeleteUserModal.css';

export default function EditUser() {
  const location = useLocation();
  const userInfo = location.state.userInfo;
  console.log(userInfo);
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
  const history = useHistory();
  const handleUpdateUserInfo = () => {
    const authorization = userInfo.accessToken;
    const userId = userInfo.userId;
    // console.log(authorization);
    // console.log(userId);

    axios
      .put(
        `http://localhost:8080/auth/updateinfo/${userId}`,
        { password },
        {
          headers: { Authorization: `Bearer ${authorization}` },
          withCredentials: true,
        }
      )
      .then((res) => {
        history.push('/login');
      })
      .catch((err) => {
        console.log(err, 'Failed to Update UserInfo');
      });
  };

  const [isOpenDeleteModal, setIsDeleteModal] = useState(false);
  const deleteModalHandler = () => {
    setIsDeleteModal(!isOpenDeleteModal);
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

        <div className={styles.button_bundle}>
          <button className={styles.button} onClick={handleUpdateUserInfo}>
            Comfirm
          </button>
          <Link to='/map'>
            <button className={styles.button}>Cancel</button>
          </Link>
          <span
            onClick={() => {
              history.push({
                pathname: '/deleteuser',
                state: { userInfo: userInfo },
              });
            }}
          >
            <button className={styles.button} onClick={deleteModalHandler}>
              Delete Account
            </button>
          </span>
        </div>
      </div>
      <div>
        {isOpenDeleteModal ? (
          <DeleteUserModal deleteModalHandler={deleteModalHandler} />
        ) : null}
      </div>
    </div>
  );
}
