import React from 'react';
import { Flex, Text, Button } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/auth/auth.actions';
import { Link, useNavigate } from 'react-router-dom';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import { CgProfile } from 'react-icons/cg';

const Navbar = () => {
    const isAuth = useSelector(store => store.auth.isAuth);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleClick = () => {
        if (isAuth) {
            dispatch(logout());
            navigate('/');
        }
    }

    return (
        <>
            <Flex bgColor='gray.800' color='white' p={['.3rem', '.5rem', '.6rem', '.7rem']} justifyContent='space-between' alignItems='center'>
                <Link to='/'>
                    <Text letterSpacing={['.3rem']} fontSize={['1.1rem']}>Recipe Book</Text>
                </Link>

                <Flex gap={['1.1rem', '1.1rem', '1.1rem', '1.1rem']} justifyContent='center' alignItems='center'>
                    {!isAuth ? <LoginModal /> :
                        <Button onClick={handleClick} borderRadius='none' bgColor='green.500' colorScheme='green'>Log out</Button>
                    }
                    <SignupModal />
                    <Link to='/profile'>
                        <CgProfile size='2rem' />
                    </Link>
                </Flex>
            </Flex>
        </>
    )
}

export default Navbar;