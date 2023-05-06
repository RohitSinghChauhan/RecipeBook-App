import { Flex, Text, Image, SimpleGrid, Box, Badge, Input, Spinner, Button } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRecipes } from '../redux/recipes/recipes.actions';
import { saveRecipeAPI } from '../utils/api';

const Home = () => {
    const { recipes, loading } = useSelector(store => store.recipe);
    const isAuth = useSelector(store => store.auth.isAuth);
    const dispatch = useDispatch();

    const [query, setQuery] = useState('');

    useEffect(() => {
        dispatch(getRecipes(query));
    }, [query]);

    const handleSaveRecipe = (recipe) => {
        if (!isAuth) {
            alert('Please login first');
        } else {
            saveRecipeAPI(recipe);
            alert('Recipe has been successfully added');
        }
    }

    return (
        <>
            <Flex gap='1rem' w='35vw' m='auto' mt='1rem'>
                <Input type='text' onChange={(e) => setQuery(e.target.value)} border='1px solid grey' placeholder='Write something here...' />
            </Flex>

            <SimpleGrid columns='3' spacing='5' mt='1rem'>
                {loading ? <Flex w='100vw' h='100vh' justifyContent='center' alignItems='center'><Spinner size='xl' /></Flex> : recipes?.map((item) => (
                    <Flex key={item.id} overflow='scroll' p='0 1rem' boxShadow='rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset' w='30vw' h='70vh' direction='column' gap='2rem' alignItems='start' justifyContent='space-evenly'>
                        <Image src={item.image} w='100%' h='30vh' />

                        <Flex w='100%' justifyContent='space-between' alignItems='center'>
                            <Text as='b' color='crimson'>{item.name}</Text>
                            <Button onClick={() => handleSaveRecipe(item)} bgColor='red.500' colorScheme='red'>Save recipe</Button>
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
                    </Flex>
                ))}
            </SimpleGrid>
        </>
    )
}

export default Home;