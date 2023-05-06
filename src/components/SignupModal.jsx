import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure, ModalFooter } from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

const initFormData = {
    email: '',
    password: ''
}

function SignupModal() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [formData, setFormData] = useState(initFormData);

    const dispatch = useDispatch();

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const signUp = async () => {
        await axios.post(`https://recipe-backend-46rd.onrender.com/user/signup`, formData);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.email !== '' && formData.password !== '') {
            signUp()
                .then(res => alert('Signed up successfully'))
                .catch(err => console.log(err));
        } else {
            alert('Please fill up the fields!');
        }

        setFormData(initFormData);
        onClose();
        alert('After sign up please login !');
    }

    return (
        <>
            <Button onClick={onOpen} bgColor='green.500' colorScheme='green'>Sign Up</Button>

            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create your account</ModalHeader>
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
                            Sign up
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
};

export default SignupModal;