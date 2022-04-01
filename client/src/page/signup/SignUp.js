import React from 'react';
import axios from axios;
import UserInformationForm from '../../components/userinformationform/UserInformationForm';
import GetFuel from '../../GetFuel.png';
import styles from './SignUp.module.css'

const SignUp = () => {


    return (
        <div>
            <div className={styles.GetFuelLogo}>
                <img className={styles.signup_logo} src={GetFuel} />
            </div>
            
            <UserInformationForm>

            </UserInformationForm>

            <div className={styles.button_bundle}>
          <a href='login' data-role="button" data-inline="true">
            <button className={styles.signup_button}>Sign Up</button>
          </a>
          <a href=''  data-role="button" data-inline="true">
            <button className={styles.cancel_button}>Cancel</button>
          </a>
        </div>
        </div>
    );
};

export default SignUp;