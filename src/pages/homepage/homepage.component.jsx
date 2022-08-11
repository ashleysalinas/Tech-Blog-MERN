import { useEffect, useState } from 'react';
import PostList from '../../components/posts-list/posts-list.component';
import getPosts from '../../utils/axios';

const Homepage = () => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getPosts()
        .then(response => {
            const res = response.data
            setPosts(res)
        })
    }, []) // don't forget brackets at the end to prevent infinite rendering

    return(
        <PostList posts={posts}/>
    )
}

export default Homepage;