import React from 'react';
import UserInformationForm from '../component/UserInformationForm';
import GetFuel from '../GetFuel.png';
import './SignUp.css'

const SignUp = () => {
    return (
        <div>
            <div className='GetFuelLogo'>
                <img className='signup_logo' src={GetFuel} />
            </div>
            
            <UserInformationForm>

            </UserInformationForm>
        </div>
    );
};

export default SignUp;