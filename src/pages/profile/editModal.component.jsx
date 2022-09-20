import Modal from 'react-bootstrap/Modal'
import { updatePost } from '../../utils/axios';

const EditModal = ({show, closeModal, postData}) => {
    const { postTitle, postText, _id } = postData;

    const handleSubmit = (event) => {
        event.preventDefault()
        const newTitle = event.target[0].value;
        const newText = event.target[1].value;
        updatePost({newTitle, newText, _id})
        closeModal();
    }

    return(
        <Modal show={show} onHide={closeModal} dismissible>
        <Modal.Header closeButton>
            <Modal.Title>Edit Post</Modal.Title>
        </Modal.Header>
       <Modal.Body>
       <form onSubmit={handleSubmit}>
           <textarea name='newTitle' defaultValue={postTitle}></textarea>
           <textarea name='newText' defaultValue={postText}></textarea>
           <button type='submit'>Edit</button>
        </form>
       </Modal.Body>
    </Modal>
    )
}

export default EditModal