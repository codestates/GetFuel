import React from 'react';
import { Link } from 'react-router-dom';
import './SignUpModal.css';

function SignuUpModal({ signUpModalHandler }) {
  return (
    <div className="Signup_ModalContainer">
      <div className="Signup_ModalBackdrop">
        <div className="Signup_ModalView">
          <img
            className="logo"
            src={require('../../img/GetFuel1.png')}
            alt=""
          />
          <div className="Signup_title">회원가입이 완료되었습니다.</div>
          <Link to="/login">
            <button
              className="Signup_CloseBubtton w-btn"
              onClick={signUpModalHandler}
            >
              닫기
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignuUpModal;
