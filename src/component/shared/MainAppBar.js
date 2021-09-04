import { SearchIcon } from "@chakra-ui/icons";
import { Box, Flex, Icon, IconButton, Input, InputGroup, InputLeftElement, Text } from "@chakra-ui/react";
import { HiUserCircle } from 'react-icons/hi';
import { RiDashboardFill, RiLogoutCircleRLine } from "react-icons/ri";
import { Link, useHistory } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";


function AppBarItems() {
    const user = useAuthStore(state => state.user)
    const isAdmin = user?.role === 'admin'
    const history = useHistory()
    const logout = useAuthStore(state => state.logout)
    if (user) return (
        <>
            {
                isAdmin &&
                <Link to='/dashboard'>
                    <IconButton
                        icon={<Icon boxSize={25} as={RiDashboardFill} color='orange.400' />}
                        variant='ghost'
                        isRound
                        colorScheme='blackAlpha'
                        _focus={{ boxShadow: 'none' }}
                    />
                </Link>
            }
            <Link to='/profile'>
                <IconButton
                    icon={<Icon boxSize={25} as={HiUserCircle} color='yellow.500' />}
                    variant='ghost'
                    isRound
                    colorScheme='blackAlpha'
                    _focus={{ boxShadow: 'none' }}
                />
            </Link>
            <IconButton
                onClick={() => {
                    logout()
                    history.push('/')
                }}
                isRound
                variant='ghost'
                colorScheme='blackAlpha'
                _focus={{ boxShadow: 'none' }}
                icon={<Icon boxSize={25} as={RiLogoutCircleRLine} color='yellow.500' />}
            />
        </ >
    )
    return (
        <>
            <Link to='/login'>
                <Text ml='auto' mr={4} fontSize='lg' fontWeight={500}>Login</Text>
            </Link>
        </>
    )
}

export default function MainAppBar() {
    const user = useAuthStore(s => s.user)
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
                <AppBarItems />
            </Flex>
        </Flex >
    )
}
