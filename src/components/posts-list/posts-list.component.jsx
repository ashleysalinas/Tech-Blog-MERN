import Post from '../post/post.component';

const PostList = ({ posts })=> {

      return(
        <div>
            {posts.map((post) => {
            return (<Post post={post} key={post._id}/>)
           })}
        </div>
      )
}

export default PostList;