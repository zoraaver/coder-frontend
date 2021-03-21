import React from 'react';
import {Button, Segment} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

function Lesson({authorized, lesson, iconToRender, subsection}) {
    return (
        <Segment>
            {iconToRender(lesson.completed)}
            <strong>{lesson.title}</strong>
            {authorized? 
                <Link to = {{pathname: `/lessons/${lesson.id}/edit`, state: {subsection}}}>
                    <Button compact color = "yellow" floated = "right">Edit</Button>
                </Link>
                :
                <Button floated = "right" as = "a" href ={`/lessons/${lesson.id}`} inverted compact color = "green">Start</Button>
            }

        </Segment>
    );
}

export default Lesson;
