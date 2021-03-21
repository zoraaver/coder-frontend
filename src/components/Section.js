import React, {useState} from 'react';
import Subsection from './Subsection.js';
import {Confirm, Input, Segment, Button, Icon} from 'semantic-ui-react';
import NewSectionForm from './NewSectionForm.js';

function Section({handleSubsectionSubmit, handleSubsectionDelete, handleSubsectionEdit, handleSectionEdit, handleSectionDelete, section, authorized}) {

    const [clicked, setClicked] = useState(false);
    const [editClicked, setEditClicked] = useState(false);
    const [formdata, setFormdata] = useState({id: section.id, title: ""});
    const [newSubsectionFormdata, setNewSubsectionFormdata] = useState({section_id: section.id, title: ""})
    const [confirmWindowOpen, setConfirmWindowOpen] = useState(false)

    function colorToRender(status) {
        switch(status) {
            case 0:
                return "grey";
            case 1:
                return "yellow";
            case 2:
                return "green";
            default:
                return "";
        }
    }

    function iconToRender(status) {
        return <Icon size = "large" name = "dot circle" color = {colorToRender(status)} />
    }

    function renderEditButtons(setConfirmWindowOpen, setEditClicked, editClicked) {
        if (!authorized) return null;
        return <>
            <Button compact
                floated = "right" 
                negative 
                onClick = {() => setConfirmWindowOpen(true)}
            >Delete</Button>
            <Button compact
                floated = "right" 
                color = "yellow" 
                onClick = {() => setEditClicked(!editClicked)}
            >Edit</Button>
        </>
    }

    function renderEditInput(setFormdata, formdata, submitHandler) {
        return <>
                <Input 
                    placeholder = "new section title" 
                    value = {formdata.title} 
                    onChange = {e => setFormdata({...formdata, title: e.target.value})} 
                    type = "text" 
                /> 
                <Button compact primary type = "submit" onClick = {() => submitHandler(formdata)}>Submit</Button>
            </>
    }

    return (
        <Segment raised>
            <Icon name = { "triangle " + (clicked? "down": "right") } />
            <Button compact onClick = {() => setClicked(!clicked)}>{section.title}</Button>
            <Confirm
                open = {confirmWindowOpen}
                onCancel = {() => setConfirmWindowOpen(false)}
                onConfirm = {() => {handleSectionDelete(section.id); setConfirmWindowOpen(false)}}
                confirmButton = {`Delete section: ${section.title}`}
                content = { `Are you sure you want to delete '${section.title}'? All subsections and lessons belonging to this section will be destroyed.` }         
            />
            {iconToRender(section.completed)}
            {editClicked && renderEditInput(setFormdata, formdata, handleSectionEdit)}
            {renderEditButtons(setConfirmWindowOpen, setEditClicked, editClicked)} 
            {clicked && 
                <Segment.Group>
                    {section.subsections.map(s => 
                    <Subsection 
                        iconToRender = {iconToRender} 
                        subsection = {s} 
                        handleSubsectionDelete = {handleSubsectionDelete}
                        authorized = {authorized}
                        renderEditButtons = {renderEditButtons}
                        renderEditInput = {renderEditInput}
                        key = {s.id} 
                        handleSubsectionEdit = {handleSubsectionEdit}
                    />)}
                    {authorized && <NewSectionForm 
                        formdata = {newSubsectionFormdata} 
                        setFormdata ={setNewSubsectionFormdata} 
                        formTitle = "Add new subsection"
                        handleSubmit = {handleSubsectionSubmit} 
                    />} 
                </Segment.Group>
            }
        </Segment>
    );
}

export default Section;
