import React from 'react';
import API from '../adapters/API.js';
import {Menu} from 'semantic-ui-react';
import {useHistory} from 'react-router-dom';

function Navbar({setUser, user}) {

    let history = useHistory();

    if (!user) return (
        <Menu fixed = "top" inverted fluid>
            <Menu.Item header>
                {"{...coder}"}
            </Menu.Item>
            <Menu.Item as = "p" position = "right">
                Learn to code. 
            </Menu.Item>
        </Menu>
    )

    return (
        <Menu tabular fixed = "top" inverted fluid>
            <Menu.Item as = "a" href = "/" header name = "All courses">
                {"{...coder}"}
            </Menu.Item>
            <Menu.Item as = "a" href = "/courses" header name = "All courses">
                All courses
            </Menu.Item>
            <Menu.Item as = "a" href = "/about" header name = "About">
                About
            </Menu.Item>
            <Menu.Item  onClick = {() => {API.clearToken(); setUser(false); history.push("/login")}} position = "right" header name = "Logout" >
                Logout
            </Menu.Item>
        </Menu>
    );
}

export default Navbar;
