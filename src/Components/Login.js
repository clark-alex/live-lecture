import React, { Component } from 'react';
import {getUser} from '../ducks/reducer';
import axios from 'axios';
import { connect } from 'react-redux';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeLogin: '',
            username: '',
            password: '',
        }
    }
    activateLogin = (activeName) => {
        this.setState({
            activeLogin: activeName,
            username: '',
            password: '',
            warning: '',
            validated: false
        })
    }
    formValidation = () => {
        const usernameLength = 5
        const passwordLength = 1
        const { username, password } = this.state
        let warning = ''
        if (username.length < usernameLength) {
            warning += `username must be at least ${usernameLength} characters`
        }
        if (password.length < passwordLength) {
            warning += ` password must be at least ${passwordLength} characters`
        }
        this.setState({ warning })
        return warning ? false : true
    }
    successRedirect(){
        this.props.getUser()
        this.props.history.push('/dashboard')
    }
    login = () => {
        const body = {
            username: this.state.username,
            password: this.state.password
        }
        this.formValidation() ?
            axios.post('/auth/login', body).then((res) => {
                res.data === 'welcome' ?  this.successRedirect(): ''
            })
            : null
    }
    register = (status) => {
        const body = {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            status: status
        }
        this.formValidation() ?
            axios.post('/auth/register', body).then(() => this.successRedirect())
            : null
    }
    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        console.log(this.state)
        return (
            <div>
                <section className='loginBox'>
                    <h1 className='loginTitle'>Welcome to Live-Lesson</h1>
                    <div className='loginBody'>
                        {
                            !this.state.activeLogin ?
                                <div>
                                    <h2 onClick={() => this.activateLogin('teacher')}>Teacher Login</h2>
                                    <h2 onClick={() => this.activateLogin('student')}>Student Login</h2>
                                    <h2 onClick={() => this.activateLogin('signUp')}>Register as teacher</h2>
                                </div>
                                : null
                        }
                        {/* ====== Teacher Login ====== */}
                        {
                            this.state.activeLogin === 'teacher' ?
                                <div className='login'>
                                    <h3>Teacher Login</h3>
                                    <input onChange={this.handleInput} name='username' placeholder='username' />
                                    <input onChange={this.handleInput} name='password' placeholder='password' type='password' />
                                    <button onClick={this.login}>Login</button>
                                    <div className='warning'>{this.state.warning}</div>
                                </div>
                                : null
                        }
                        {/* ====== Student Login ====== */}
                        {
                            this.state.activeLogin === 'student' ?
                                <div className='login'>
                                    <h3>Student Login</h3>
                                </div>
                                : null
                        }
                        {/* ====== Register ====== */}
                        {
                            this.state.activeLogin === 'signUp' ?
                                <div className='signUp'>
                                    <h3>sign up!</h3>
                                    <input onChange={this.handleInput} name='username' placeholder='username' />
                                    <input onChange={this.handleInput} name='password' placeholder='password' type='password' />
                                    <input onChange={this.handleInput} name='email' placeholder='email address' />
                                    <button onClick={() => this.register('teacher')}>register!</button>
                                    <div className='warning'>{this.state.warning}</div>
                                </div>
                                : null
                        }
                        {/* ====== goBack button ======= */}
                        {
                            this.state.activeLogin ?
                                <div className='goBack' onClick={() => this.activateLogin('')}><i class="material-icons">arrow_left</i><p>go back</p></div> : ''
                        }
                    </div>
                </section>
            </div>
        )
    }
};
function mapStateToProps(state){
    return{
        user:state.user
    }
} 
export default connect(mapStateToProps, {getUser})(Login)
