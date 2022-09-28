import "./login.css";
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
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

    const [showModal, setShowModal] = useState(false);
    const [showSignupAlert, setShowSignupAlert] = useState(false);
    const [showEmailAlert, setShowEmailAlert] = useState(false);
    const [showLoginAlert, setShowLoginAlert] = useState(false);
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { setCurrentUser } = useContext(UserContext);
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({...formFields, [name]: value})
    }


    const signUp = async (event) => {
        event.preventDefault()
        const { firstName, lastName, email, password, confirmPassword} = formFields;
       if (password !== confirmPassword) {
           setShowSignupAlert(true)
       } else {
        addUser(formFields)
        .then(res => {
            if (res.data == 'email exists') {
                setShowEmailAlert(true);
            } else {
                const userData = res.data;
                window.localStorage.setItem('session-user', JSON.stringify(userData))
                setCurrentUser(userData)
                navigate('/redirect/profile')
            }
        });
       }
    }
    const logIn = async (event) => {
        event.preventDefault();
        const email = event.target[0].value
        const password = event.target[1].value
        getUser(email, password)
       .then(res => {
        if (res.data === 'no') { //no user or password match
            setShowLoginAlert(true) 
        } else {
            let userData = res.data
            window.localStorage.setItem('session-user', JSON.stringify(userData))
            setCurrentUser(userData)
            navigate('/redirect/profile') 
        }
        })
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
                <Alert show={showLoginAlert} onClose={() => setShowLoginAlert(false)} dismissible variant='danger'>Incorrect Email/Password</Alert>
            </form>
            <h2>Don't have an account yet? Sign up <a onClick={() => setShowModal(true)}> here</a></h2>

            <Modal show={showModal} onHide={() => setShowModal(false)} dismissable>
                <Modal.Header closeButton>
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
                        <Alert show={showSignupAlert} onClose={() => setShowSignupAlert(false)} dismissible variant='danger'>Passwords don't match. Try again!</Alert>
                        <Alert show={showEmailAlert} onClose={() => setShowEmailAlert(false)}dismissible variant='danger'>Existing email with account. Try <a onClick={() => setShowModal(false)}>logging in</a>?</Alert>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Login;