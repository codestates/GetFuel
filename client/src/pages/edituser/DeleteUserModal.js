import React from 'react';
import { Link } from 'react-router-dom';
import './DeleteUserModal.css';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router';

function DeleteUserModal() {
  const history = useHistory();
  const location = useLocation();
  const userInfo = location.state.userInfo;

  const handleDeleteUserInfo = async () => {
    const authorization = userInfo.accessToken;
    const userId = userInfo.userId;

    await axios
      .delete(`${process.env.REACT_APP_API_URL}auth/deleteaccount/${userId}`, {
        headers: {
          Authorization: `Bearer ${authorization}`,
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      .then((res) => {
        history.push('/');
      })
      .catch((err) => {
        console.log(err, 'Failed to Delete UserInfo');
      });
  };

  return (
    <div className='Delete_ModalContainer'>
      <div className='Delete_ModalBackdrop'>
        <div className='Delete_ModalView'>
          <img className='logo' src={require('../../GetFuel1.png')} alt='' />
          <div className='Delete_title'>정말 탈퇴 하시겠습니까?</div>
          <span>
            <Link to='/login'>
              <button
                className='Delete_CloseBubtton yes_btn'
                onClick={handleDeleteUserInfo}
              >
                예
              </button>
            </Link>
            <Link to='/map'>
              <button className='Delete_CloseBubtton no_btn'>아니오</button>
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default DeleteUserModal;
