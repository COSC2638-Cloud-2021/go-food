import { Flex, Text } from "@chakra-ui/react";
import { Link } from 'react-router-dom';
export default function Error404Page() {
    return (
        <Flex pt={4} direction='column' align='center' justify='center' height='100%'>
            <Text fontSize='4xl' >404 Not Found</Text>
            <Link to='/'><Text fontSize='lg' color='pink.300'  >Return to Home</Text></Link>
        </Flex>
    )
}