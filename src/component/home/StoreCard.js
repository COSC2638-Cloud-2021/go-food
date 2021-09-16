import { StarIcon } from '@chakra-ui/icons';
import { Box, Flex, Icon, Image, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import images from '../../asset/image/images';


export default function StoreCard({ store }) {
    const { id, image, name, address } = store
    return (
        <Box borderRadius='2xl' boxShadow='lg'  >
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
    )
}