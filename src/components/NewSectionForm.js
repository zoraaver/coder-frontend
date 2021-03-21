import React from 'react';
import {Header, Segment, Form, Button} from 'semantic-ui-react';

function NewSectionForm({formTitle, formdata, setFormdata, handleSubmit}) {
    return (
        <Segment>
            <Header size = "small" >{formTitle}</Header>
            <Form onSubmit = {() => {handleSubmit(formdata); setFormdata({...formdata, title: ""});}}>
                <Form.Field>
                    <input 
                        onChange = {e =>setFormdata({...formdata, title: e.target.value})} 
                        value = {formdata.title}
                        placeholder='title' 
                    />
                    <Button positive compact type = "submit">Submit</Button>
                </Form.Field>
            </Form>
        </Segment>
    )
}

export default NewSectionForm;
