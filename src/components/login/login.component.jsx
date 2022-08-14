import "./login.css";
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert'
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from "react";
import { addUser } from '../../utils/axios';

const Login = () => {
    const defaultFormFields = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    }

    const [show, setShow] = useState(false);
    const [formFields, setFormFields] = useState(defaultFormFields)
    
      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({...formFields, [name]: value})
    }

    const handleShow = () => {
        setShow(true)
    }
    const handleClose = () => setShow(false);
    const signUp = (event) => {
        event.preventDefault()
        const { firstName, lastName, email, password, confirmPassword} = formFields;
       if (password !== confirmPassword) {
           //add alert later
       }
       addUser(formFields);
    }
    
    return(
        <div>
            <h2>Login below</h2>
            <form>
                <label>Email:</label>
                <input type="text"></input>
                <label>Password:</label>
                <input type="password"></input>
                <button>Login</button>
            </form>
            <h2>Don't have an account yet? Sign up <a onClick={handleShow}> here</a></h2>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    Sign up using the form below
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={signUp}>
                        <label>First Name</label>
                        <input type="text" onChange={handleChange} name="firstName"></input>
                        <label>Last Name</label>
                        <input type="text" onChange={handleChange} name="lastName"></input>
                        <label>Email</label>
                        <input type="email" onChange={handleChange} name="email"></input>
                        <label>Password</label>
                        <input type="password" onChange={handleChange} name="password"></input>
                        <label>Confirm Password</label>
                        <input type="password" onChange={handleChange} name="confirmPassword"></input>
                        <button type="submit">Sign Up</button>
                    </form>
                </Modal.Body>
                <Alert variant='danger' show={show} dismissible>Passwords don't match!</Alert>
            </Modal>
        </div>
    )
}

export default Login;