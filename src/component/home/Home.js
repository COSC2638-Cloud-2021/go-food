import { StarIcon } from '@chakra-ui/icons';
import { Box, Flex, Icon, SimpleGrid, Text, Input, Button, useDisclosure, Image } from '@chakra-ui/react';
import {
    Badge
} from "react-bootstrap";
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import images from '../../asset/image/images';
import useApiGet from '../../hook/useApiGet';
import useQuery from '../../hook/useQuery';
import useAuthStore from '../../store/useAuthStore';
import LoadingSpinner from '../shared/LoadingSpinner';
import AddStoreModal from '../admin/AddStoreModal'

export default function Home() {
    const query = useQuery()
    const searchTerm = query.get('q')
    const { data: restaurants, loading, error, refresh } = useApiGet({ defaultValue: [], endpoint: '/restaurants' })
    const filteredRestaurant = searchTerm ? restaurants.filter(({ name = '', address = '' }) =>
        `${name}/${address}`.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) : restaurants


    return (
        <Box h='100%'>
            <Box bgImage={images.home.banner} width='100%' height={600} backgroundSize='cover' backgroundRepeat='no-repeat' backgroundPosition='center'>
                <Flex flexDirection='column' align='center' justify='center' width='100%' height='100%' bgColor='blackAlpha.700'>
                    <Text lineHeight='100%' fontFamily='fantasy' fontSize='9xl' color='white'>GoFood</Text>
                    <Text mb={8} color='white' fontSize='2xl'>Go order your food</Text>
                    <form>
                        <Flex align='center' justify='center'>
                            <Input defaultValue={searchTerm} name='q' fontSize='lg' mr={2} p={7} w={[300, 400, 500, 600]} borderRadius='xl'
                                bgColor='white' variant='outlined' placeholder='Search for restaurants by name, address...' />
                            <Button fontSize='lg' colorScheme='yellow' p={7} type='submit'>Search</Button>
                        </Flex>
                    </form>

                </Flex>
            </Box>
            <Box minH='75%' mt={2} mx='auto' w={['100%', null, '90%', '80%']}>
                <Helmet title='GoFood' />
                <FilterItems refresh={refresh} />
                {
                    loading ? <LoadingSpinner /> :
                        <SimpleGrid spacing={5} columns={[1, 2, 3, 4]} >
                            {filteredRestaurant.map(({ id, name, address, image }) => (
                                <Box key={id} borderRadius='2xl' boxShadow='lg'  >
                                    <Link to={`stores/${id}`} style={{ color: 'inherit', textDecoration: 'inherit' }}>
                                        <Image src={image ?? images.logo} bgPosition='center' bgSize='cover' height={160} width='100%' objectFit='cover' borderRadius='2xl' />
                                        <Box mt={2} px={4} pb={2} w='100%' overflow='hidden'>
                                            <Flex>
                                                <Text maxW='sm' isTruncated fontWeight={600} fontSize='xl' textOverflow='ellipsis' >{name}</Text>
                                                <Flex px={2} ml='auto' align='center' justify='center' borderRadius='xl' bgColor='green.500' color='white'>
                                                    <Text fontSize='sm' fontWeight={600} mr={1}>5.0</Text>
                                                    <Icon boxSize='3' as={StarIcon}></Icon>
                                                </Flex>
                                            </Flex>
                                            <Text maxW='100%' isTruncated fontSize='sm' >{address}</Text>
                                        </Box>
                                    </Link>
                                </Box>
                            ))}
                        </SimpleGrid >
                }
            </Box>
        </Box>

    )
}

function FilterItems({ refresh }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const isAdmin = useAuthStore(s => s.user)?.role === 'admin'
    return (
        <Flex my={4}>
            <Button colorScheme='yellow' mr={2}>Filter</Button>
            <Button colorScheme='yellow' mr={2}>Rating</Button>
            <Button colorScheme='yellow' >Great offer</Button>
            {isAdmin &&
                <>
                    <Button onClick={onOpen} ml='auto' colorScheme='green'>Add store</Button>
                    <AddStoreModal refresh={refresh} onClose={onClose} isOpen={isOpen} />
                </>
            }
        </Flex>
    )
}