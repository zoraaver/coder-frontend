import React, {useEffect, useState} from 'react';
import Navbar from './Navbar.js';
import API from '../adapters/API.js';
import AuthenticatedApp from './AuthenticatedApp.js';
import UnauthenticatedApp from './UnauthenticatedApp.js';
import {Container, Segment} from 'semantic-ui-react';

function App() {
    const [user, setUser] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (API.hasToken()) {
            API.validate().then(setUser)
                .then(() => setError(false))
                .catch(errorPromise => {
                    if (!errorPromise) errorPromise.then(setError);
                    else setError({message: "Server is currently offline. Please try later"})
                });
        }
    }, []) 

    if (!localStorage.currentLessons) localStorage.currentLessons = JSON.stringify([]);

    return (
        <Container id = "main-content">
            <Navbar user = {user} setUser = {setUser} />
            {error && <Segment textAlign = "center" color = "red" inverted> <h2>{error.message}</h2></Segment> }
            {user? 
                <AuthenticatedApp user = {user} setError = {setError} setUser = {setUser} /> :
                <UnauthenticatedApp setUser = {setUser} setError = {setError} user = {user} /> 
            }
                  
        </Container>
    );
}

export default App;
