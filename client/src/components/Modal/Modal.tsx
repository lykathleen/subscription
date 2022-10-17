import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";
import { useState } from 'react';

interface ModalProps {
  text: string;
  variant: "primary" | "danger"
}

const ModalComponent = ({ text, variant }: ModalProps) => {

  const [display, setDisplay] = useState(false);

  const handleClose = () => setDisplay(false);
  const handleDisplay = () => setDisplay(true);

  return ( 
    <>
      <Button
        onClick={handleDisplay}
        variant={variant}
      >
        {text}
      </Button>

      <Modal
        show={display}
        onHide={handleClose}
      >
        <Modal.Header>
          <Modal.Title>
            {text}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <InputGroup className="mb-3">
            <InputGroup.Text>
              Email
            </InputGroup.Text>
            <FormControl
              type="email"
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text>
              Password
            </InputGroup.Text>
            <FormControl
              type="password"
            />
          </InputGroup>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button variant="primary">{text}</Button>

        </Modal.Footer>
      </Modal>
    </>
   );
}
 
export default ModalComponent;