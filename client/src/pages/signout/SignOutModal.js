import React from 'react';
import { Link } from 'react-router-dom';
import './SignOutModal.css';

function SignuUpModal({ SignupModalHandler }) {
  return (
    <div className='SignOut_ModalContainer'>
      <div className='SignOut_ModalBackdrop'>
        <div className='SignOut_ModalView'>
          <img
            className='logo'
            src={require('../../image/GetFuel1.png')}
            alt=''
          />
          <div className='SignOut_title'>정말 탈퇴 하시겠습니까?</div>
          <Link to='/login'>
            <button
              className='SignOut_CloseBubtton w-btn'
              onClick={SignupModalHandler}
            >
              확인
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignuUpModal;
