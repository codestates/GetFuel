import axios from 'axios';
import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import Modal from '../../components/modal/SignUpModal'
import UserInformationForm from '../../components/userinformationform/UserInformationForm';
import GetFuel from '../../GetFuel1.png';
import styles from './SignUp.module.css'


const SignUp = () => {

  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reenterpassword, setreenterpassword] = useState("");

     // 모달 관련..
     const [modalOpen, setModalOpen] = useState(false);

     const openModal = () =>{
       setModalOpen(true);
     };
     const closeModal = () =>{
       setModalOpen(false);
     };

     const history = useHistory();



  // Signup버튼 클릭시 post
  const handleSignup = () => {
    axios.post(
      "http://localhost:3000/signup",
      //배포 끝나면 서버url로 교체
      // http://localhost:8080/auth/signin
        {
          email: email,
          name: nickname,
          password: password,
        },
        {
          headers: { "Content-Type" : "application/json"},
          withCredentials: true,
        }
    )
    .then((data) =>{
      history.push("/login");
    })
    .catch((err) => console.log(err));
  }


    return (
        <div>
            <div className={styles.GetFuelLogo}>
                <img className={styles.signup_logo} src={GetFuel} />
            </div>
            <Modal  open={modalOpen} close={closeModal}>
            </Modal>

            <UserInformationForm>
            
            </UserInformationForm>
            
            <div className={styles.button_bundle}>
              <button  onClick={ () => {
                handleSignup(); openModal(); } 
                } className={styles.signup_button}>
                Sign Up
              </button>
            
          <a href=''  data-role="button" data-inline="true">
            <button className={styles.cancel_button}>Cancel</button>
          </a>
        </div>
        </div>
    );
};

export default SignUp;