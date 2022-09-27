import Post from '../post/post.component';
import '../../styles.scss'
const PostList = ({ posts })=> {

      return(
        <div className='postList'>
            {posts.map((post) => {
            return (<Post post={post} key={post._id}/>)
           })}
        </div>
      )
}

export default PostList;