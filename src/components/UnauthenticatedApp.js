import React from 'react';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm.js';
import {Route, Switch} from "react-router-dom";

function UnauthenticatedApp({user, setError, setUser}) {

    return (
        <Switch>
            <Route exact path = "/login">
                <LoginForm setError = {setError} setUser = {setUser} />
            </Route>
            <Route exact path = "/signup">
                <SignupForm setError = {setError} setUser = {setUser} />                   
            </Route>
            <Route>
                <LoginForm setError = {setError} setUser = {setUser} />
            </Route>
        </Switch>
    );
}

export default UnauthenticatedApp;
