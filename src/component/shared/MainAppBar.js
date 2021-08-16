import { Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function MainAppBar() {
    return (
        <Flex py={2} px={4} bgColor='gray.800' align='center' justify='space-between'>
            <Link to='/'>
                <Text color='white' fontSize='2xl' fontWeight={700}>GoFood</Text>
            </Link>
            <Link to='/login'>
                <Text mr={4} color='white' fontSize='lg' fontWeight={700}>Login</Text>
            </Link>
        </Flex >
    )
}