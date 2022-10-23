import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";
import { useState } from 'react';
import axios from 'axios';

import { SIGNUP_URL, LOGIN_URL } from '../../utils/constants'

interface ModalProps {
  text: string;
  variant: "primary" | "danger" | "secondary";
  isSignupFlow: boolean
}

const ModalComponent = ({ text, variant, isSignupFlow }: ModalProps) => {

  const [display, setDisplay] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleClose = () => setDisplay(false);
  const handleDisplay = () => setDisplay(true);
  const handleClick = async () => {
    let data;

    if(isSignupFlow) {
      const response = await axios.post("http://localhost:8080/auth/signup", {
        email,
        password
      });
      console.log(response);
      
    } else {
      const response = await axios.post(LOGIN_URL, {
        email,
        password
    })}   

  }

  return ( 
    <>
      <Button
        onClick={handleDisplay}
        variant={variant}
        size="lg"
        style={{marginRight: '1rem', padding: '0.5rem 3rem'}}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text>
              Password
            </InputGroup.Text>
            <FormControl
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputGroup>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button variant="primary" onClick={handleClick}>{text}</Button>

        </Modal.Footer>
      </Modal>
    </>
   );
}
 
export default ModalComponent;