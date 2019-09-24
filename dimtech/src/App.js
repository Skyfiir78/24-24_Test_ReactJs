import React, { Component } from 'react';
import { connect } from 'react-redux'

import Routes from './Component/Routes'

const mapStateToProps = (state) => {
    return state
}

class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            loading: true,
        }
    }

    async componentDidMount() {
        let userStorageData = JSON.parse(localStorage.getItem('userData'));
        if (userStorageData !== null) {
            if (userStorageData.token) {
                await this.props.dispatch({type: 'SET_USER', value: {isLogged: true, email: userStorageData.email, token: userStorageData.token}})
            }
        }
        await this.setState({loading: false})
    }

    render() {
        if (this.state.loading !== true) {
            return (
                <Routes/>
            );
        }else {
            return(
                <h1>Loading</h1>
            )
        }
    }
}

export default connect(mapStateToProps)(App)
