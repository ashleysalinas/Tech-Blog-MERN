import Post from '../post/post.component';

const PostList = ({ posts })=> {
      return(
        <div>
            {posts.map((post) => {
            return (<Post post={post}/>)
           })}
        </div>
      )
}

export default PostList;