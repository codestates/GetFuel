import React, { Component } from 'react'
import styles from './Login.module.css'
import GetFuel from '../GetFuel_logo.png'
import Nav from '../Component/Nav'
import axios from 'axios'


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
        this.inputHandler = this.inputHandler.bind(this);
        this.loginRequestHandler = this.loginRequestHandler.bind(this);
    }

    inputHandler(e) {
        this.setState({ [e.target.name]: e.target.value});
    }

    loginRequestHandler() {
        const { email, password } = this.state;

        axios
        .post(
            'http://localhost:3000/login',
            { email, password },
            {headers: {'Content-type': 'application/json'}}
            ) // 배포완료되면 서버url로 변경
        .then((res) => {
            this.props.loginHandler(res.data);
        }) // 여기서 맵구현페이지로 보내주면 app.js에서 삼항연산자 안써도됨
        .catch((err) => {
            return alert('이메일 혹은 비밀번호를 확인하세요.')
        })
    
    }


    render() {
        return(
            <div>
            <Nav />
            <div>
                <img className={styles.logo2} src={GetFuel} />
            </div>
            <div className={styles.user}>email</div>   
            <input className={styles.userInfo}
                    type='text'
                    name='email'
                    onChange={(e) => this.inputHandler(e)}
                    value={this.state.email}
                    />
            <div className={styles.user}>password</div>   
            <input className={styles.userInfo}
                    type='password'
                    name='password'
                    onChange={(e) => this.inputHandler(e)}
                    value={this.state.password}
                    />
            <div>
                <button onClick={this.loginRequestHandler} className={styles.button}>Login</button>
            </div>
            </div>
    )
    }
}

export default Login;