import Moment from 'moment';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext} from '../../contexts/user.context'

const Post = ({ post }) => {
    const { currentUser } = useContext(UserContext)
    const {postText, postTitle, date, creatorName, _id } = post;
    const creatorID = creatorName[0]._id
    const { firstName, lastName } = creatorName[0];
    const newdate = date.toString()
    const formattedDate = Moment(newdate).format('MM-DD-YYYY');

    return(
        <div>
            <Link to={'/post/' + _id}>{postTitle}</Link>
            <p>Posted by <Link to={currentUser && currentUser._id === creatorID ? '/profile' : '/user/' + creatorID}>{firstName} {lastName}</Link> on {formattedDate}</p>
            <p>{postText}</p>
        </div>
    )
}

export default Post;