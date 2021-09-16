import { EmailIcon, PhoneIcon } from '@chakra-ui/icons';
import { Box, Button, Divider, Flex, Icon, IconButton, Input, SimpleGrid, Text, useDisclosure } from '@chakra-ui/react';
import { Helmet } from 'react-helmet-async';
import { FaFacebook, FaInstagramSquare, FaPinterest, FaTwitter } from "react-icons/fa";
import images from '../../asset/image/images';
import useApiGet from '../../hook/useApiGet';
import useQuery from '../../hook/useQuery';
import useAuthStore from '../../store/useAuthStore';
import AddStoreModal from '../admin/AddStoreModal';
import LoadingSpinner from '../shared/LoadingSpinner';
import StoreCard from './StoreCard';


export default function Home() {
    const query = useQuery()
    const searchTerm = query.get('q')
    const { data: restaurants, loading, error, refresh } = useApiGet({ defaultValue: [], endpoint: '/restaurants' })
    const filteredRestaurant = searchTerm ? restaurants.filter(({ name = '', address = '' }) =>
        `${name}/${address}`.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) : restaurants


    return (
        <Box h='100%'>
            <Helmet title='GoFood' />
            <Box bgImage={images.home.banner2} width='100%' height={600} backgroundSize='cover' backgroundRepeat='no-repeat' backgroundPosition='center'>
                <Flex flexDirection='column' align='center' justify='center' width='100%' height='100%' bgColor='blackAlpha.800'>
                    <Text lineHeight='100%' fontFamily='fantasy' fontSize='9xl' color='white' textShadow='2px 2px #000000'>GoFood</Text>
                    <Text mb={8} color='white' fontSize='2xl' color='white' fontWeight={600} textShadow='2px 2px #000000'>Go order your food</Text>
                    <form>
                        <Flex align='center' justify='center'>
                            <Input boxShadow='lg' defaultValue={searchTerm} name='q' fontSize='lg' mr={2} p={6} w={[300, 400, 500, 600]} borderRadius='3xl'
                                bgColor='white' variant='outlined' placeholder='Search for restaurants by name, address...' />
                            <Button boxShadow='lg' borderRadius='3xl' fontSize='lg' colorScheme='yellow' p={6} type='submit'>Search</Button>
                        </Flex>
                    </form>

                </Flex>
            </Box>
            <Box minH='75%' mt={2} mx='auto' w={['100%', null, '90%', '80%']}>
                <FilterItems refresh={refresh} />
                {
                    loading ? <LoadingSpinner /> :
                        <SimpleGrid spacing={5} columns={[1, 2, 3, 4]} >
                            {filteredRestaurant.map(store => (
                                <StoreCard key={store.id} store={store} />
                            ))}
                        </SimpleGrid >
                }
            </Box>
            <Footer />
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

function Footer() {
    return (
        <Box mt={4} py={12} px={4} bgColor='#222222'>
            <Flex align='center' justify='center'>
                <IconButton
                    isRound
                    mr={4}
                    colorScheme='yellow'
                    _focus={{ boxShadow: 'none' }}
                    icon={<Icon as={FaFacebook} />}>
                </IconButton>
                <IconButton
                    isRound
                    mr={4}
                    colorScheme='yellow'
                    _focus={{ boxShadow: 'none' }}
                    icon={<Icon as={FaPinterest} />}>
                </IconButton>
                <IconButton
                    isRound
                    mr={4}
                    colorScheme='yellow'
                    _focus={{ boxShadow: 'none' }}
                    icon={<Icon as={FaInstagramSquare} />}>
                </IconButton>
                <IconButton
                    isRound
                    colorScheme='yellow'
                    _focus={{ boxShadow: 'none' }}
                    icon={<Icon as={FaTwitter} />}>
                </IconButton>
            </Flex>
            <Flex mt={4} direction='column' align='center' color='white'>
                <Text mb={2} fontWeight={600} fontSize='xl'>Contact us</Text>
                <Flex align='center' height={25}>
                    <Icon as={PhoneIcon} />
                    <Text mx={2}>+84 90 123 4567</Text>
                    <Divider orientation='vertical' size='lg' />
                    <Icon ml={2} as={EmailIcon} />
                    <Text mx={2}>support@gofood.com</Text>
                </Flex>
            </Flex>

        </Box>
    )
}