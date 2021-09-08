import { useEffect, useState } from "react"
import { Container, Row, Tab, Col, Tabs } from "react-bootstrap"
import { Table, TableCaption, Thead, Tr, Th, Td, Tbody, Tfoot, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, } from "@chakra-ui/react"
import { TiEdit, TiDelete } from "react-icons/ti"
import { Link } from 'react-router-dom'
import { FaUserEdit } from "react-icons/fa"
import { IconButton } from "@chakra-ui/react"
import useApiGet from "../../hook/useApiGet"
import LoadingSpinner from "../shared/LoadingSpinner"
import api from "../../api/api"
import axios from 'axios'
import EditUser from "./EditUser"

export default function UserDashboard() {
    const { data: accounts, loading, refresh } = useApiGet({ endpoint: '/accounts', defaultValue: [] })



    return (
        <Container className="mt-4">
            <Tabs defaultActiveKey="member" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="member" title="Members">
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
                            accounts.map((user) => (<UserRow user={user} onDelete={refresh} />))
                        }
                    </Tbody>
                </Table>
            }
        </Container>
    )
}

function UserRow({ user, onDelete }) {
    const { id, name, phoneNumber, address, email } = user
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
        <Td className='opration'>
            {/* <button className='button' onClick={() => removeData(id)}>Delete</button> */}
            <Link to={`/dashboard/users/${id}`} style={{ textDecoration: 'none' }}>
                <IconButton
                    isRound
                    variant='ghost'
                    icon={<FaUserEdit />}>
                </IconButton>
            </Link>
            <IconButton
                isRound
                variant='ghost'
                onClick={deleteAccount}
                icon={<TiDelete />}>
            </IconButton>
        </Td>
    </Tr>
}