import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';

export default class Main extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path='/' component={Login}/>
                    <Route path='/dashboard' component={Dashboard}/>
                </Switch>
            </div>
        )
    }
};
