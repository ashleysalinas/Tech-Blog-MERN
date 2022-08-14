import axios from 'axios';

const getPosts = (query) => {
    try {
        return axios.get('http://localhost:3001/api/posts')
    } catch (err) {
        console.log(err)
    }
}
const addUser = (formFields) => {
    try {
        return axios.post('http://localhost:3001/api/users', formFields)
    } catch (err) {
        console.log(err)
    }
}

export { getPosts, addUser };