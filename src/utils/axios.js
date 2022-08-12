import axios from 'axios';

const getPosts = (query) => {
    try {
        return axios.get('http://localhost:3001/api/posts')
    } catch (err) {
        console.log(err)
    }
}

export default getPosts;