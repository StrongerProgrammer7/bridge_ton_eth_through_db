import React from 'react'
import { Modal } from 'react-bootstrap'

const Message = ({ message, showModalMessage, handleCloseModalMessage }) => 
{
    return (
        <Modal show={ showModalMessage } onHide={ handleCloseModalMessage }>
            <Modal.Header closeButton>
                <Modal.Title>Message for you</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                { message }
            </Modal.Body>
        </Modal>
    )
}

export default Message;
