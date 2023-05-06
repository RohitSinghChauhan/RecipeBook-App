import { useEffect, useState } from 'react';
import { getRecipesAPI } from '../utils/api';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Flex, Badge, Text, Box, Image } from '@chakra-ui/react';
import { CgProfile } from 'react-icons/cg';

const Profile = () => {
    const isAuth = useSelector(store => store.auth.isAuth);
    const navigate = useNavigate();

    if (!isAuth) {
        navigate('/');
    }

    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        getRecipesAPI()
            .then(res => setRecipes(res))
            .catch(err => console.log(err));
    }, []);

    return (<>
        <Text as='b' ml='1rem' fontSize='2rem'>My save recipes</Text>
        <Flex w='100vw' h='100vh'>
            {recipes.length >= 1 && recipes.map(item => (<Flex key={item.id} overflow='scroll' p='0 1rem' boxShadow='rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset' w='30vw' h='70vh' direction='column' gap='2rem' alignItems='start' justifyContent='space-evenly'>
                <Image src={item.image} w='100%' h='30vh' />

                <Flex w='100%' justifyContent='space-between' alignItems='center'>
                    <Text as='b' color='crimson'>{item.name}</Text>
                </Flex>

                <Box>
                    <Text as='b'>Ingredients:-</Text>
                    <Flex gap='.7rem' mt='.6rem'>
                        {item.ingredients?.map((i) => (
                            <Badge key={i} variant='solid' colorScheme='green'>
                                {i}
                            </Badge>
                        ))}</Flex>
                </Box>

                <Flex direction='column'>
                    <Text as='b'>Instructions:-</Text>
                    <Text as='i' >{item.instructions}.</Text>
                </Flex>
            </Flex>))}
        </Flex>
    </>
    )
}

export default Profile;