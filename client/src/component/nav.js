import React from 'react'
import './nav.css'
import GetFuel from '../GetFuel_logo.png'


function Nav () {
    return (
        <div className='nav'>
                <img className='logo' src={GetFuel} />
                <div className='menu'>
                <a href=''>Sign up</a>
                <a href='login'>Login</a>
                </div>
            </div>
    )
}

export default Nav;