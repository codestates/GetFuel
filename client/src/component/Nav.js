import React from 'react'
import './Nav.css'
import GetFuel from '../GetFuel.png'



function Nav () {
    return (
        <div className='nav'>
                <img className='logo' src={GetFuel} />
                <div className='navmenu'>
                <a href='signup'><div className='sigunupbutton'>Sign up</div></a>
                <a href='login'><div className='loginbutton'>Login</div></a>
                </div>
            </div>
    )
}

export default Nav;