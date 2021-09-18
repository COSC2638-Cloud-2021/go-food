import { IconButton, Table, Tbody, Td, Th, Thead, Tr, useDisclosure, Icon, Flex, Box, Tabs, TabList, Tab, Text } from "@chakra-ui/react"
import { useState } from "react"
import { Helmet } from "react-helmet-async"
import { FaUserEdit } from "react-icons/fa"
import { IoTrash } from "react-icons/io5"
import { TiDelete } from "react-icons/ti"
import api from "../../api/api"
import useApiGet from "../../hook/useApiGet"
import LoadingSpinner from "../shared/LoadingSpinner"
import EditUserModal from "./EditUserModal"

export default function UserDashboard() {
    const { data: accounts, loading, refresh } = useApiGet({ endpoint: '/accounts', defaultValue: [] })
    const [filter, setFilter] = useState('user')
    const filteredAccounts = accounts.filter(a => (!a.role && filter === 'user') || a.role === filter)

    return (
        <Box p={4}>
            <Helmet title='Users' />
            <Tabs my={4} onChange={(index) => setFilter(index === 0 ? 'user' : 'admin')} size="md">
                <TabList>
                    <Tab _focus={{ boxShadow: 'none' }}>
                        <Flex align='center'>
                            <Text>User</Text>
                        </Flex>
                    </Tab>
                    <Tab _focus={{ boxShadow: 'none' }}>
                        <Flex align='center'>
                            <Text>Admin</Text>
                        </Flex>
                    </Tab>
                </TabList>
            </Tabs>
            {loading ? <LoadingSpinner /> :
                <Table id='account'>
                    <Thead>
                        <tr>
                            <Th>ID</Th>
                            <Th>Name</Th>
                            <Th>Email</Th>
                            <Th>Phone number</Th>
                            <Th>Address</Th>
                            <Th textAlign='center'>Operation</Th>
                        </tr>
                    </Thead>
                    <Tbody>
                        {
                            filteredAccounts.map((user) => (<UserRow key={user.id} refresh={refresh} user={user} />))
                        }
                    </Tbody>
                </Table>
            }
        </Box>
    )
}

function UserRow({ user, refresh }) {
    const { id, name, phoneNumber, address, email } = user
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [deleting, setDeleting] = useState(false)

    const deleteAccount = async () => {
        setDeleting(true)
        try {
            const res = await api.delete(`/accounts/${id}`)
            refresh()
        } catch (e) {
            console.log(e)
        } finally {
            setDeleting(false)
        }
    }
    return <Tr key={id} >
        <Td>{id}</Td>
        <Td>{name}</Td>
        <Td>{email}</Td>
        <Td>{phoneNumber}</Td>
        <Td>{address}</Td>
        <Td>
            <Flex justify='center' align='center'>
                <IconButton
                    onClick={onOpen}
                    isRound
                    colorScheme='yellow'
                    variant='ghost'
                    icon={<Icon as={FaUserEdit} boxSize='20px' color='yellow.400' />}>
                </IconButton>
                <EditUserModal user={user} onClose={onClose} isOpen={isOpen} refresh={refresh} />
                <IconButton
                    isLoading={deleting}
                    isRound
                    colorScheme='red'
                    variant='ghost'
                    onClick={deleteAccount}
                    icon={<Icon as={IoTrash} boxSize='20px' color='red.400' />}>
                </IconButton>
            </Flex>
        </Td>
    </Tr>
}