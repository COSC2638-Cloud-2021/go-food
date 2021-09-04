import { Flex, Text } from "@chakra-ui/react";
import { Link } from 'react-router-dom';
export default function Error404Page() {
    return (
        <Flex pt={4} direction='column' align='center' justify='center' height='100%'>
            <Text fontSize='6xl' >404 Not Found</Text>
            <Link to='/'><Text fontSize='2xl' color='yellow.500' fontWeight={600}  >Return to Home</Text></Link>
        </Flex>
    )
}