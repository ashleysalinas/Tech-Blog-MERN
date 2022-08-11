import Moment from 'moment';

const Post = ({ post }) => {
    const {postText, postTitle, date } = post;
    const newdate = date.toString()
    const formattedDate = Moment(newdate).format('DD-MM-YYYY');
    console.log(formattedDate);


    return(
        <div>
            <h3>{postTitle}</h3>
            <h3>{formattedDate}</h3>
            <p>{postText}</p>
        </div>
    )
}

export default Post;