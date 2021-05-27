import React, {Component, Fragment} from 'react'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import ReactDOM from 'react-dom'
import Header from './layout/Header'
import Dashboard from './weather/Dashboard'

import {Provider} from 'react-redux'
import store from '../store'
import { loadUser } from '../actions/auth';

import Login from './accounts/Login';
import Register from './accounts/Register';
import PrivateRoute from './common/PrivateRoute';

class App extends Component{

    componentDidMount() {
        store.dispatch(loadUser());
      }
    render(){
        return (
            <Provider store={store}>
                <Router>
                    <Fragment>
                        <Header />
                        <div className="container">
                            <Switch>
                                <PrivateRoute exact path="/" component={Dashboard} />
                                <Route exact path="/register" component={Register} />
                                <Route exact path="/login" component={Login} />
                            </Switch>
                        </div>
                    </Fragment>
                </Router>
            </Provider>
            
            
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'))