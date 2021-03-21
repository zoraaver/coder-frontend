import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import Lesson from './Lesson.js';
import {Confirm, Segment, Icon, Button} from 'semantic-ui-react';

function Subsection({handleSubsectionDelete, renderEditInput, renderEditButtons, authorized, handleSubsectionEdit, subsection, iconToRender}) {

    const [clicked, setClicked] = useState(false);
    const [editClicked, setEditClicked] = useState(false);
    const [confirmWindowOpen, setConfirmWindowOpen] = useState(false)
    const [formdata, setFormdata] = useState({id: subsection.id, title: ""})

    return (
        <Segment compact raised >
            <Icon name = { "triangle " + (clicked? "down": "right") } />
            <Button compact onClick = {() => setClicked(!clicked)} as='a'>{subsection.title}</Button>
            {iconToRender(subsection.completed)}
            {editClicked && renderEditInput(setFormdata, formdata, handleSubsectionEdit)}
            {renderEditButtons(setConfirmWindowOpen, setEditClicked, editClicked)}
            <Confirm
                open = {confirmWindowOpen}
                onCancel = {() => setConfirmWindowOpen(false)}
                onConfirm = {() => {handleSubsectionDelete(subsection.id); setConfirmWindowOpen(false)}}
                confirmButton = {`Delete subsection: ${subsection.title}`}
                content = { `Are you sure you want to delete '${subsection.title}'? All lessons belonging to this subsection will be destroyed.` }         
            />
            {clicked && <Segment.Group>{subsection.lessons.map(l => 
                <Lesson 
                    iconToRender = {iconToRender} 
                    lesson = {l} 
                    subsection = {subsection}
                    authorized = {authorized}
                    key = {l.id} 
                />)}
                {authorized && <Segment>
                    <Link to = {{pathname: "/lessons/new", state: {subsection}}}>
                        <Button compact positive>New lesson</Button>
                    </Link>
                </Segment>}
            </Segment.Group>}
        </Segment>
    );
}

export default Subsection;
