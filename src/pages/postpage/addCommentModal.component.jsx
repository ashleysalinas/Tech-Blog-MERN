import Modal from 'react-bootstrap/Modal';
import { addComment } from '../../utils/axios';
const AddCommentModal = ({show, closeModal, id, userID}) => {

    const handleSubmit = (event) => {
        event.preventDefault();
        const { value } = event.target[0];
        addComment(id, userID, value);
        closeModal()
    }

    return(
        <Modal show={show} onHide={closeModal} dismissible>
        <Modal.Header closeButton>
            <Modal.Title>Add a Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form onSubmit={handleSubmit}>
                <textarea placeholder="What's on your mind?"></textarea>
                <button>Add</button>
            </form>
        </Modal.Body>
        </Modal>
    )
}

export default AddCommentModal;