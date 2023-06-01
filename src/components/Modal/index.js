import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Modals({show, setShow, handle, title, content, type}) {

  return (
    <Modal show={show} onHide={() => setShow(false)}>
    <Modal.Header closeButton>
    <h3 style={{textAlign: 'center', fontSize: '20px', fontWeight: '500'}}>{title}</h3>
       
    </Modal.Header>
    <Modal.Body style={{height: '300px;'}}>{content}</Modal.Body>
    <Modal.Footer>
        <Button variant="secondary" onClick={() => setShow(false)} size='lg'>
            Close
        </Button>
        <Button variant={type === 'save' ? 'primary' : 'danger'} onClick={handle} size='lg'>
            {type}
        </Button>
    </Modal.Footer>
    </Modal>
  );
}

export default Modals