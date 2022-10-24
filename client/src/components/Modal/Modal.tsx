import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";
import { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components'
import { SIGNUP_URL, LOGIN_URL } from '../../utils/constants';
import { Navigate, useNavigate } from 'react-router-dom'

interface ModalProps {
  text: string;
  variant: "primary" | "danger" | "secondary";
  isSignupFlow: boolean
}

const ErrorMessage = styled.p`
  color:red
`

const ModalComponent = ({ text, variant, isSignupFlow }: ModalProps) => {

  const [display, setDisplay] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleClose = () => setDisplay(false);
  const handleDisplay = () => setDisplay(true);
  const handleClick = async () => {
    let data;

    if(isSignupFlow) {
      const {data: signUpData} = await axios.post(SIGNUP_URL, {
        email,
        password
      });
      data = signUpData
      
      
    } else {
      const {data: loginData} = await axios.post(LOGIN_URL, {
        email,
        password
    });
      data = loginData
    }   

    if(data.errors.length){
      return setError(data.errors[0].msg)
    }

    localStorage.setItem('token', data.data.token)
    navigate("/articles")
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
          {error && <ErrorMessage>{error}</ErrorMessage>}
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