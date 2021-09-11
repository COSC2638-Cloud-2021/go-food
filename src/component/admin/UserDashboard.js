import { IconButton, Table, Tbody, Td, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react"
import { useState } from "react"
import { Container, Tab, Tabs } from "react-bootstrap"
import { FaUserEdit } from "react-icons/fa"
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
        <Container className="mt-4">
            <Tabs onSelect={k => setFilter(k)} defaultActiveKey="member" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="user" title="User">
                </Tab>
                <Tab eventKey="admin" title="Admin">
                </Tab>
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
                            <Th>Operation</Th>
                        </tr>
                    </Thead>
                    <Tbody>
                        {
                            filteredAccounts.map((user) => (<UserRow key={user.id} refresh={refresh} user={user} onDelete={refresh} />))
                        }
                    </Tbody>
                </Table>
            }
        </Container>
    )
}

function UserRow({ user, onDelete, refresh }) {
    const { id, name, phoneNumber, address, email } = user
    const { isOpen, onOpen, onClose } = useDisclosure()
    const deleteAccount = async () => {
        try {
            const res = await api.delete(`/accounts/${id}`)
            onDelete()
        } catch (e) {
            console.log(e)
        }
    }
    return <Tr key={id} >
        <Td>{id}</Td>
        <Td>{name}</Td>
        <Td>{email}</Td>
        <Td>{phoneNumber}</Td>
        <Td>{address}</Td>
        <Td className='operation'>
            <IconButton
                onClick={onOpen}
                isRound
                variant='ghost'
                icon={<FaUserEdit />}>
            </IconButton>
            <EditUserModal user={user} onClose={onClose} isOpen={isOpen} refresh={refresh} />
            <IconButton
                isRound
                variant='ghost'
                onClick={deleteAccount}
                icon={<TiDelete />}>
            </IconButton>
        </Td>
    </Tr>
}