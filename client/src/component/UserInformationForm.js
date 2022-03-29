import React,{ useState } from 'react';
import  './UserInformationForm.css';

function UserInformationForm() {

    // const [input, setInput] = useState({
    //     email : '',
    //     nickname : '',
    //     password :'',
    //     reenterpassword : ''
    // });

    // const { email, nickname, password, reenterpassword } = input;

    // const onChangeInput = (e) => {
    //     const { name, value } = e.target;
    //     setInput({
    //         ...input,
    //         [name]: value,
    //     });
    // };

    // const submitHandler = (event) => {
    //     event.preventDefault();
    //     if(password !== reenterpassword){
    //         return 
    //     }
    // }

    return (
    
      <div>
        <form className='inputform'>
            <div classname='email'>email</div>
              <input className='userinfo' type="text" placeholder='이메일을 입력하세요'/>
            <div className='nickname'>nickname</div>
              <input className='userinfo' type='text' placeholder='사용할 닉네임을입력하세요' />
            <div className='password'>password</div>
              <input className='userinfo' type='password' placeholder='비밀번호를 입력하세요' />
            <div className='reenterpassword'>reenterpassword</div>
              <input className='userinfo' type='password' placeholder='비밀번호 확인'/> 
        </form>
        <div className='button_bundle'>
          <a href='login' data-role="button" data-inline="true">
            <button className='signup_button'>Sign Up</button>
          </a>
          <a href=''  data-role="button" data-inline="true">
            <button className='cancel_button'>Cancel</button>
          </a>
        </div>
      </div>

    );
};

export default UserInformationForm;