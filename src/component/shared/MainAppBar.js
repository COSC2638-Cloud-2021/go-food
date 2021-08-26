import { SearchIcon } from "@chakra-ui/icons";
import { Box, Flex, Input, InputGroup, InputLeftElement, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
export default function MainAppBar() {
    return (
        <Flex py={2} px={8} align='center'>
            <Box flex={2}>
                <Link to='/'>
                    <Text color='black' fontSize='2xl' fontWeight={700}>GoFood</Text>
                </Link>
            </Box>
            <Box flex={8}>
                <form>
                    <InputGroup>
                        <InputLeftElement
                            pointerEvents="none"
                            children={<SearchIcon color="gray.300" />}
                        />
                        <Input variant='flushed' placeholder='Search for restaurants...' />
                    </InputGroup>
                </form>
            </Box>
            <Flex flex={2} justify='flex-end'>
                <Link to='/login'>
                    <Text ml='auto' mr={4} fontSize='lg' fontWeight={500}>Login</Text>
                </Link>
            </Flex>
        </Flex >
    )
}
