import React from 'react';
import Section from '../components/Section.js';
import {Segment} from 'semantic-ui-react';

function SectionsContainer({handleSubsectionSubmit, handleSubsectionDelete, handleSubsectionEdit, handleSectionEdit, handleSectionDelete, authorized, sections}) {
    return (
        <Segment.Group raised>
            {sections.map(s => <Section 
                handleSectionDelete = {handleSectionDelete} 
                authorized = {authorized} 
                handleSubsectionSubmit = {handleSubsectionSubmit}
                handleSectionEdit = {handleSectionEdit}
                handleSubsectionEdit = {handleSubsectionEdit}
                handleSubsectionDelete = {handleSubsectionDelete}
                key = {s.id} 
                section = {s} 
            />)}
        </Segment.Group>
    );
}

export default SectionsContainer;


