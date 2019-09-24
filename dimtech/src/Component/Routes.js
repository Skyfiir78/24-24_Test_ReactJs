import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Switch ,Route, Redirect } from "react-router-dom";

import Home from './View/Home/index'
import Dashboard from './View/Dashboard/index'
import Forgot from './View/Forgot/index'

const mapStateToProps = (state) => {
  return state
}

class Routes extends Component {

    protectedRoute(path, component, redirect){
        let { userData } = this.props
        if (userData.isLogged !== true) {
            return <Redirect exact path={path} to={redirect} />;
        }else {
            return <Route exact path={path} component={component} />;
        }
    }

    render() {
      return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/forgot" component={Forgot} />
            {this.protectedRoute("/dashboard", Dashboard, "/")}
        </Switch>
      );
    }
}

export default connect(mapStateToProps)(Routes)
