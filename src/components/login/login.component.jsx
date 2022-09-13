import "./login.css";
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert'
import Modal from 'react-bootstrap/Modal';
import { useState, useContext } from "react";
import { addUser, getUser } from '../../utils/axios';
import { UserContext } from '../../contexts/user.context';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();// redirect after successful login/signup

    const defaultFormFields = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    }

    const [show, setShow] = useState(false);
    const [formFields, setFormFields] = useState(defaultFormFields)
    const { currentUser, setCurrentUser } = useContext(UserContext)
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({...formFields, [name]: value})
    }

    const handleShow = () => {
        setShow(true)
    }
    const handleClose = () => setShow(false);

    const signUp = async (event) => {
        event.preventDefault()
        const { firstName, lastName, email, password, confirmPassword} = formFields;
       if (password !== confirmPassword) {
           //add alert later
       }
       addUser(formFields)
       .then(res => {
        const userData = res.data;
        setCurrentUser(userData)
        navigate('/redirect/profile')
       });
       //navigate('home')
    }
    //add functionality for existing user
    const logIn = async (event) => {
        event.preventDefault();
        const email = event.target[0].value
        const password = event.target[1].value
        getUser(email, password)
        .then(res => {
            const userData = res.data[0]
            setCurrentUser(userData)
            navigate('/redirect/profile')
        })

        //create alert when user not found
        //create forgot password function?
    }

    return(
        <div>
            <h2>Login below</h2>
            <form onSubmit={logIn}>
                <label>Email:</label>
                <input type="email" name='emailLogin'></input>
                <label>Password:</label>
                <input type="password" name='passwordLogin'></input>
                <button type='submit'>Login</button>
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