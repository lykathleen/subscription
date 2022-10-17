import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";
import { useState } from 'react';

const ModalComponent = () => {

  const [display, setDisplay] = useState(false);

  const handleClose = () => setDisplay(false);
  const handleDisplay = () => setDisplay(true);

  return ( 
    <>
      <Button
        onClick={handleDisplay}
      >
        Signup
      </Button>

      <Modal
        show={display}
        onHide={handleClose}
      >

      </Modal>
    </>
   );
}
 
export default ModalComponent;