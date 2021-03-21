import React from 'react';
import Course from '../components/Course.js';
import {Header, Card, Segment} from 'semantic-ui-react';

function CoursesContainer({header,courses}) {
    return (
        <Segment>
            <Header size = "huge">{header}</Header>
            <Card.Group>
                {courses.map(c => <Course key = {c.id} course = {c} />)}
            </Card.Group>
        </Segment>
    );
}

export default CoursesContainer;
