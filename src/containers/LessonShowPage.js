import React, {useState, useEffect} from 'react';
import API from '../adapters/API.js';
import {Icon, Button, Grid, Segment, Container, Header, Menu} from 'semantic-ui-react';
import CodeEditor from '../components/CodeEditor.js'
import ReactMarkdown from 'react-markdown/with-html';
import {useParams} from 'react-router-dom';


function LessonShowPage({user}) {

    const params = useParams();

    const [lesson, setLesson] = useState({title: "", paragraphs: [], starter_code: ""});
    const { nextLesson, previousLesson } = lesson;

    useEffect(() => {
        API.getLesson(params.id).then(lesson => {
            setLesson(lesson);
            document.title = lesson.title;
            const currentLessons = JSON.parse(localStorage.currentLessons);
            localStorage.currentLessons = JSON.stringify(currentLessons.map(cl => {
                if (cl.userEmail === user.email) return {...cl, lessonId: lesson.id, lessonTitle: lesson.title};
                return cl;
            }))
        })
    }, [params.id, user.email]);

    function handleCompleteClick(e, {value}) {
        API.completeLesson({id: lesson.id, status: lesson.status})
            .then(setLesson({...lesson, status: 2}))
            .catch(console.log);
    }

    function renderLessonStatus(lesson) {
        if (lesson.status === 2) {
            return <Menu.Item> Lesson completed <Icon name = "check" color = "green" /> </Menu.Item>
        } else if (lesson.test) {
            return undefined;
        } else {
            return <Menu.Item><Button onClick = {handleCompleteClick} positive>Complete lesson</Button></Menu.Item>;
        }
    }


    return (
            <Grid columns = {2}>
                    <Grid.Column floated = "left" width = {13}>
                        <Header size = "huge" textAlign = "center">{lesson.title}</Header>
                        <div className = "lesson" >
                            <ReactMarkdown source = {lesson.content} escapeHtml = {false} />
                        </div>
                        <Container >
                            {lesson.test && 
                            <CodeEditor 
                                language = {lesson.language} 
                                id = {lesson.id} 
                                starter_code = {lesson.code || lesson.starter_code} 
                            />}
                        </Container>
                    </Grid.Column>
                <Grid.Column floated = "right" width = {3}>
                        <Segment as={Menu} inverted vertical >
                            {renderLessonStatus(lesson)}
                            {nextLesson? 
                                <Menu.Item as = "a" href = { `/lessons/${nextLesson.id}` }>
                                    Next lesson: {nextLesson.title}
                                </Menu.Item>
                                : undefined}
                            {previousLesson?
                                <Menu.Item as = "a" href = {`/lessons/${previousLesson.id}`}>
                                    Previous lesson: {previousLesson.title} 
                                </Menu.Item> 
                                : undefined}
                        </Segment>
                </Grid.Column>
            </Grid>
    );
}

export default LessonShowPage;
