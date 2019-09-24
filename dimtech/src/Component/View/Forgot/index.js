import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
    Grid,
    Container,
} from '@material-ui/core';

const mapStateToProps = (state) => {
    return state
}

class Forgot extends Component{
    render(){
        console.log(this.props);
        return(
            <Container>
                <Grid container justify={'center'} alignItems={'center'}>
                    <h1>Juste un titre 😄</h1>
                </Grid>
            </Container>
        )
    }
}

export default connect(mapStateToProps)(Forgot)
