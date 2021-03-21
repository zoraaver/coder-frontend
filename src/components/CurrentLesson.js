import React from 'react';
import {Button, Segment, Header} from 'semantic-ui-react'

function CurrentLesson({user}) {

    const currentLessons = JSON.parse(localStorage.currentLessons)
    const currentLesson = currentLessons.find(cl => cl.userEmail === user.email)

    if (!currentLesson) {
        localStorage.currentLessons = JSON.stringify([...currentLessons, {userEmail: user.email, lessonId: 0, lessonTitle: ""}]);
        return null;
    }
    if (!currentLesson.lessonTitle) return null;

    return (
        <Segment>
            <Header size = "huge">Current lesson: {currentLesson.lessonTitle}</Header>
            <Button positive as = "a" href = {`/lessons/${currentLesson.lessonId}`}>Continue</Button>
        </Segment>
    );
}

export default CurrentLesson;
