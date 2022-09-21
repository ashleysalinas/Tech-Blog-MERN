import { useEffect, useState } from 'react';
import PostList from '../../components/posts-list/posts-list.component';
import { getPosts } from '../../utils/axios';
import '../../styles.scss'

const Homepage = () => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getPosts()
        .then(response => {
            const res = response.data
            setPosts(res)
        })
    }, [posts]) // don't forget brackets at the end to prevent infinite rendering

    return(
        <div>
            <PostList posts={posts}/>
        </div>
    )
}

export default Homepage;