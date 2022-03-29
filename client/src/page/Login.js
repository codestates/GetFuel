import React, { useEffect, useState } from 'react'
import './Login.css'
import GetFuel1 from '../GetFuel_logo.png'
//import axios from 'axios'
import { useHistory } from 'react-router-dom';
import Nav from '../component/Nav'

export default function Login(props) {
    //로그인 정보 상태


    return(
        <div>
            <Nav />
            <div>
                <img className='logo2' src={GetFuel1} />
            </div>
            <div className='user'>email</div>   
            <input className='userInfo' type='text'></input>
            <div className='user'>password</div>   
            <input className='userInfo' type='password'></input>
            <div>
            <a href='/'>
              <button className='loginbutton'>Login</button>
            </a>
            </div>
        </div>
    )
}

