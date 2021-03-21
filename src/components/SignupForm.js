import React, {useState} from 'react';
import {Form, Header, Button, Container} from 'semantic-ui-react';
import {useHistory, Link} from 'react-router-dom'
import API from '../adapters/API.js'

function SignupForm({setError, setUser}) {

    const [formData, setFormData] = useState({email: "", password: "", password_confirmation: ""});
    let history = useHistory();

    function handleChange(e) {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    function handleSubmit(e) {
        e.preventDefault();
        API.signUp(formData)
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
            <Header size = "large">Sign up to Coder</Header>
            <Form onSubmit = {handleSubmit}>
                <Form.Field>
                    <label>email</label>
                    <input 
                    value = {formData.email} 
                    name = "email" 
                    placeholder = "email" 
                    onChange = {handleChange} 
                    />
                </Form.Field>
                <Form.Field>
                    <label>password</label>
                    <input 
                        type = "password" 
                        placeholder = "password" 
                        value = {formData.password} 
                        name = "password" 
                        onChange = {handleChange} 
                    />
                </Form.Field>
                <Form.Field>
                    <label>confirm password</label>
                    <input 
                        type = "password" 
                        placeholder = "confirm password" 
                        value = {formData.password_confirmation} 
                        name = "password_confirmation" 
                        onChange = {handleChange} 
                    />
                </Form.Field>
                <Button type = "submit">Submit</Button>
            </Form>
            <Link to="/login">Already have an account? Sign in</Link>
        </Container>
    )

}


export default SignupForm;
