import { useEffect, useState } from 'react';

import getPosts from '../../utils/axios';

const Homepage = () => {

    const [posts, setPosts] = useState([]);
    console.log(posts);

    useEffect(() => {
        getPosts()
        .then(response => {
            const res = response.data
            setPosts(res)
        })
    }, [])

    return(
        <h2>This will be the homepage</h2>
    )
}

export default Homepage;