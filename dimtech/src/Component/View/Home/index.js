import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import AuthServices from '../../../Services/AuthServices'
import {
    Grid,
    Container,
} from '@material-ui/core';

import './style.css';
import logo from './logo2x.png';

const mapStateToProps = (state) => {
  return state
}

class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: '',
            errorMessage: null,
            redirection: false,
        }
        this.login = this.login.bind(this)
        this.onChangeInput = this.onChangeInput.bind(this);
    }

    async onChangeInput(e){
        await this.setState({[e.target.name]: e.target.value, errorMessage: null});
    }

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    async login(){
        let { email, password } = this.state
        if (await this.validateEmail(email) === true) {
            if (password.length > 5) {
                let res = await AuthServices.login({email, password});
                if (res.token) {
                  await localStorage.setItem('userData', JSON.stringify({email: email, token: res.token}));
                  await this.props.dispatch({type: 'SET_USER', value: {isLogged: true, email: email, token: res.token}})
                  await this.setState({redirection: true})
                }else {
                  this.setState({errorMessage: 'Probleme de connexion'})
                }
            }else {
                this.setState({errorMessage: 'Mot de passe non valide'})
            }
        }else {
            this.setState({errorMessage: 'E-Mail non valide'})
        }
    }

    render(){
        if (this.state.redirection) {
          return(
            <Redirect to='/dashboard'/>
          );
        }
        return(
                    <Grid className={'globalContainer'} container>
                        <Grid className={'containerLayout1'} style={{width: '100%'}} item md={7}>
                                <Container maxWidth='md'>
                                    <div className={'gridLayout1'}>
                                        <div className={'content'}>
                                        <img className={'logo'} src={logo} alt='dimtech-logo'/>
                                            <div className={'title'}>
                                                <h1>Hi, <br/>Welcome on Dimtech.</h1>
                                            </div>
                                            <div>
                                                <p id={'describe'}>
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                                                    dolor in reprehenderit.
                                                </p>
                                            </div>
                                            <div>
                                                <button onClick={() => this.login()} className={'button'}>LEARN MORE</button>
                                            </div>
                                        </div>
                                    </div>
                                </Container>
                        </Grid>
                        <Grid className={'containerLayout2'} style={{ width: '100%'}} item md={5}>
                            <Container maxWidth='sm'>
                                <div className={'gridLayout2'}>
                                    <div className={'content'}>
                                        <h1 style={{color: 'white'}}>Sign-In</h1>
                                        <label>E-Mail<input style={{marginBottom: 55}} name='email' onChange={(e) => this.onChangeInput(e)} type='text' className={'input'}/></label>
                                        <label>Password<input type='password' name='password' onChange={(e) => this.onChangeInput(e)} className={'input'}/></label>
                                        {
                                          this.errorMessage !== null ? (<p style={{color: 'red'}}>{this.state.errorMessage}</p>) : (null)
                                        }
                                        <Grid container direction='row' justify='space-between'>
                                            <div className={'dFlexRow'}>
                                                <input type='checkbox'/>
                                                <p>Keep me logged</p>
                                            </div>
                                            <p><a className={'forgot'} href='/forgot'>&nbsp;Forgot your password ?</a></p>
                                        </Grid>
                                        <button onClick={() => this.login()} id={'login'} className={'button'}>LOGIN</button>
                                        <p className={'signupParent'}>Need an account ? <a className={'signup'} href='#'>Sign up</a></p>
                                    </div>
                                </div>
                            </Container>
                        </Grid>
                    </Grid>
        )
    }
}

export default connect(mapStateToProps)(Home)
