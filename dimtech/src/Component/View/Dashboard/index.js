import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
    Grid,
    Container,
} from '@material-ui/core';

const mapStateToProps = (state) => {
  return state
}

class Dashboard extends Component{

    async logout(){
        console.log('logout');
        localStorage.clear();
        await this.props.dispatch({type: 'SET_USER', value: {isLogged: false, email: null, token: null}})
    }

    render(){
        return(
            <Container>
                <Grid>
                    <h1>Dashboard</h1>
                    <h3>Vous êtes connecté avec l'e-mail suivant : {this.props.userData.email}</h3>
                    <button onClick={() => this.logout()}>Logout</button>
                </Grid>
            </Container>
      )
    }
}

export default connect(mapStateToProps)(Dashboard)
