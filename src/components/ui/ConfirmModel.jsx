import React from 'react'
import { Button, Modal } from 'react-bootstrap'


const ConfirmModel = ({data}) => {
   

  const onCancel = () => {
    data.onModalClose();
  };

  const onOk =()=>{
    data.onDelete();
    data.onModalClose();

  }
 
  return (
    

    
          <Modal 
         show={true}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header >
          <Modal.Title>Ban Restaurant</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Are you sure you want to ban {data.name}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={onOk}>Ok</Button>
        </Modal.Footer>
      </Modal>

    
  )
}

export default ConfirmModel
