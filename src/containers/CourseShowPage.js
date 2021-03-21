import React, {useState, useEffect} from 'react';
import {useHistory, useParams, useLocation} from 'react-router-dom';
import API from '../adapters/API.js';
import SectionsContainer from './SectionsContainer.js';
import NewSectionForm from '../components/NewSectionForm.js';
import {Button, Image, Header, Container} from 'semantic-ui-react';

function CourseShowPage({setError, admin}) {

    const params = useParams();
    const history = useHistory();
    const [course, setCourse] = useState({sections: []});
    const [formdata, setFormdata] = useState({title: "", course_id: params.id});
    const {pathname} = useLocation();
    const authorized = admin && pathname === `/courses/${params.id}/edit`;

    useEffect(() => {
        API.getCourse(params.id).then(setCourse)
            .catch(errorPromise => errorPromise.then(setError))
    }, [params.id, setError]);

    function handleSectionSubmit(formdata) {
        API.postSection(formdata)
            .then(newSection => setCourse({...course, sections: [...course.sections, newSection]}))
            .catch(errorPromise => {
                if (errorPromise) errorPromise.then(setError)
            })
    }

    function handleSubsectionEdit(subsection_id) {
        API.patchSubsection(subsection_id)
            .then(updatedSubsection => setCourse({...course, sections: course.sections.map(s => {
                if (s.id === updatedSubsection.section_id) {
                    return {...s, subsections: s.subsections.map(sub => {
                        if (sub.id === updatedSubsection.id) sub.title = updatedSubsection.title;
                        return sub;
                    })}
                }
                return s;
            })})).catch(console.log)
    }

    function handleSectionDelete(section_id) {
        API.deleteSection(section_id)
            .then(deletedSectionId => {
                setCourse({...course, sections: course.sections.filter(s => s.id !== deletedSectionId)});
            })
            .catch(console.log);

    }

    function handleSubsectionDelete(subsection_id) {
        API.deleteSubsection(subsection_id)
            .then(deletedSubsection => {
                setCourse({...course, sections: course.sections.map(s => {
                    if (s.id === deletedSubsection.section_id) {
                        return {...s, subsections: s.subsections.filter(sub => sub.id !== deletedSubsection.id)};
                    }
                    return s;
                })})
            }).catch(console.log);
    }

    function handleSectionEdit(section) {
        API.patchSection(section)
            .then(updatedSection => setCourse({...course, sections: course.sections.map(s => {
                if (s.id === updatedSection.id) s.title = updatedSection.title;
                return s;
            })}))
            .catch(console.log);
    }

    function handleSubsectionSubmit(formdata) {
        API.postSubsection(formdata)
            .then(newSubsection => {
                setCourse({...course, sections: course.sections.map(s => {
                    if (s.id === newSubsection.section_id) {
                        return {...s, subsections: [...s.subsections, newSubsection.subsection]};
                    }
                    return s;
                })})
            }).catch(console.log);
    }


    return (
        <Container>
            <Image size = "mini" floated = "left" src = {course.img_url} />
            <Header size = "huge">{course.title}</Header>
            {!authorized && admin? <Button color = "yellow" compact onClick = {() => history.push(`/courses/${params.id}/edit`)}>Edit</Button> : null}
            <SectionsContainer 
                handleSectionDelete = {handleSectionDelete} 
                authorized = {authorized} 
                sections = {course.sections}
                handleSectionEdit = {handleSectionEdit}
                handleSubsectionEdit = {handleSubsectionEdit}
                handleSubsectionDelete = {handleSubsectionDelete}
                handleSubsectionSubmit = {handleSubsectionSubmit}
            />
            {authorized && 
            <NewSectionForm 
                handleSubmit = {handleSectionSubmit} 
                formdata = {formdata} 
                formTitle = "Add new section"
                setFormdata ={setFormdata} 
            />}
        </Container>
    );
}

export default CourseShowPage;
