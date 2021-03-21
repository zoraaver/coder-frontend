import React, {useState} from 'react';
import {useHistory, Link} from "react-router-dom";
import API from '../adapters/API.js';
import {Button, Container, Form, Header} from 'semantic-ui-react';


function LoginForm({setError, setUser}) {

    const [formData, setFormData] = useState({email: "", password: ""});
    let history = useHistory();

    function handleChange(e) {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    function handleSubmit(e) {
        e.preventDefault();
        API.loginUser(formData)
            .then(user => {
                setUser(user);
                history.push("/");
            })
            .then(() => setError(false))
            .catch(errorPromise => {
                errorPromise.then(setError);
            });
    }


    return (
        <Container>
            <Header size = "large">Log in</Header>
            <Form onSubmit = {handleSubmit}>
                <Form.Field>
                    <label>email</label>
                    <input value = {formData.email} name = "email" placeholder = "email" onChange = {handleChange} />
                </Form.Field>
                <Form.Field>
                    <label>password</label>
                    <input type = "password" placeholder = "password" value = {formData.password} name = "password" onChange = {handleChange} />
                </Form.Field>
                <Button type = "submit">Log in</Button>
            </Form>
            <Link to="/signup">Create an account</Link>
        </Container>
    )
}

export default LoginForm;
