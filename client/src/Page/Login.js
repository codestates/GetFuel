import React, { useEffect, useState } from 'react'
import './Login.css'
import GetFuel from '../GetFuel_logo.png'
import axios from 'axios'
import { useHistory } from 'react-router-dom';
import Nav from '../component/nav'

export default function Login(props) {
    //로그인 정보 상태


    return(
        <div>
            <Nav />
            <div>
                 <img className='logo2' src={GetFuel} />
            </div>
            <div className='user'>email</div>   
            <input className='userInfo' type='text'></input>
            <div className='user'>password</div>   
            <input className='userInfo' type='password'></input>
            <div>
                <button className='button'>Login</button>
            </div>
        </div>
    )
}

