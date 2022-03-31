import React, { Component } from 'react'
<<<<<<< HEAD
import styles from'./Main.module.css'
import Nav from '../Component/Nav'
=======
import './Main.css'
import Nav from '../component/nav'
>>>>>>> c9b8d8d1c90ddf63f80f21002627f1f7a0364802
import image2 from '../image2.png'
import kakao from '../kakao.png'
import google from '../google.png'
import getfuel_experience from '../getfuel_experience.png'

class Main extends Component {
    constructor(props) {
        super(props);
    }

render() {
    return (
        <div>
        <Nav />
        <div>
<<<<<<< HEAD
        <img className={styles.image1} src={image2} />
        </div>
        <div className={styles.title}>나에게 알맞는 주유소를 찾아보세요!</div>
        <div>
            <div>
            <button className={styles.google}><img src={google}/></button>
            </div>
            <div>
            <button className={styles.kakao}><img src={kakao} /></button>
            </div>
            <div>
            <button className={styles.getfuel}><img className={styles.experience} src={getfuel_experience} /></button>
            </div>
            <img className={styles.image2} src={image2} />
=======
        <img className='image1' src={image2} />
        </div>
        <div className='title'>나에게 알맞는 주유소를 찾아보세요!</div>
        <div>
            <div>
            <button className='google'><img src={google}/></button>
            </div>
            <div>
            <button className='kakao'><img src={kakao} /></button>
            </div>
            <div>
            <button className='getfuel'><img className='experience' src={getfuel_experience} /></button>
            </div>
            <img className='image2' src={image2} />
>>>>>>> c9b8d8d1c90ddf63f80f21002627f1f7a0364802
        </div>
        </div>
    )
    }
}

export default Main;