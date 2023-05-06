import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure, ModalFooter } from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from '../redux/auth/auth.actions';

const initFormData = {
    email: '',
    password: ''
}

function LoginModal() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [formData, setFormData] = useState(initFormData);

    const isAuth = useSelector(store => store.auth.isAuth);
    const dispatch = useDispatch();

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.email !== '' && formData.password !== '') {
            dispatch(login(formData));
        } else {
            alert('Please fill up the fields!');
        }

        setFormData(initFormData);
        onClose();
    }

    return (
        <>
            <Button onClick={onOpen} bgColor='green.500' colorScheme='green'>Log in</Button>

            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Log in to your account</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Email</FormLabel>
                            <Input type='email' name='email' value={formData.email} onChange={handleChange} ref={initialRef} placeholder='Enter your email' />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Password</FormLabel>
                            <Input type='password' name='password' value={formData.password} onChange={handleChange} placeholder='Enter your password' />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={handleSubmit} colorScheme='blue' mr={3}>
                            Log in
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
};

export default LoginModal;