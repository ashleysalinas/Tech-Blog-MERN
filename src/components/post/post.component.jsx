import Moment from 'moment';

const Post = ({ post }) => {
    const {postText, postTitle, date, creatorName } = post;
    const { firstName, lastName } = creatorName[0];
    const newdate = date.toString()
    const formattedDate = Moment(newdate).format('DD-MM-YYYY');

    return(
        <div>
            <h3>{postTitle}</h3>
            <h3>Posted by {firstName} {lastName} on {formattedDate}</h3>
            <p>{postText}</p>
        </div>
    )
}

export default Post;