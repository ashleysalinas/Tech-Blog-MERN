import Moment from 'moment';
import { Link } from 'react-router-dom';

const Post = ({ post }) => {
    const {postText, postTitle, date, creatorName, _id } = post;
    const { firstName, lastName } = creatorName[0];
    const newdate = date.toString()
    const formattedDate = Moment(newdate).format('DD-MM-YYYY');

    return(
        <div>
            <Link to={'/post/' + _id}>{postTitle}</Link>
            <p>Posted by {firstName} {lastName} on {formattedDate}</p>
            <p>{postText}</p>
        </div>
    )
}

export default Post;