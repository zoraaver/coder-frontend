import React from 'react';
import {Route, Switch} from 'react-router-dom';
import CourseShowPage from '../containers/CourseShowPage.js';
import LessonShowPage from '../containers/LessonShowPage.js';
import AboutPage from './AboutPage.js';
import Homepage from './Homepage.js';
import EditNewLessonPage from '../containers/EditNewLessonPage.js';
import CoursesShowPage from '../containers/CoursesShowPage.js';

function AuthenticatedApp({user, setUser, setError}) {
    
    return (
        <Switch>
            <Route exact path = "/about">
                <AboutPage />
            </Route>
            <Route exact path = "/">
                <Homepage  user = {user}/>
            </Route>
            <Route path = "/courses/:id">
                <CourseShowPage admin = {user.admin} setError = {setError}/>
            </Route>
            <Route exact path = "/courses">
                <CoursesShowPage  setError = {setError} setUser = {setUser}/>
            </Route>
            <Route exact path = "/lessons/:id/edit">
                <EditNewLessonPage />
            </Route>
            <Route exact path = "/lessons/new">
                <EditNewLessonPage />
            </Route>
            <Route exact path = "/lessons/:id">
                <LessonShowPage user = {user} setError = {setError}/>               
            </Route>
            <Route>
                <Homepage  user = {user}/>
            </Route>
        </Switch>
    );
}

export default AuthenticatedApp;
