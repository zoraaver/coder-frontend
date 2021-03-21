import React from 'react';
import {Link} from 'react-router-dom';
import {Image, Button, Card} from 'semantic-ui-react';

function Course({course}) {

    return (
        <Card>
            <Card.Content>
                <Image
                    floated = "right"
                    size = "mini"
                    src = {course.img_url}
                  />
                <Card.Header>{course.title}</Card.Header>
                <Card.Description>{course.description}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Link to ={`courses/${course.id}`}><Button primary>Start</Button></Link>
            </Card.Content>

        </Card>
    );
}

export default Course;
