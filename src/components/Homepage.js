import React from 'react';
import CurrentLesson from './CurrentLesson.js';
import CoursesContainer from '../containers/CoursesContainer.js';

function Homepage({user}) {

    return (
        <>
             <CurrentLesson user = {user} />
            <CoursesContainer courses = {user.courses} header = "Your courses"/>
        </>
    );
}

export default Homepage;
