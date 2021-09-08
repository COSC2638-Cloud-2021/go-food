import { useEffect, useState } from "react"
import { Container, Row, Tab, Col, Tabs } from "react-bootstrap"
import { Table, TableCaption, Thead, Tr, Th, Td, Tbody, Tfoot } from "@chakra-ui/react"
import { TiEdit, TiDelete  } from "react-icons/ti"
import { Link } from 'react-router-dom'
import {FaUserEdit} from "react-icons/fa"
import {IconButton} from "@chakra-ui/react"
import useApiGet from "../../hook/useApiGet"
import LoadingSpinner from "../shared/LoadingSpinner"
import api from "../../api/api"
import axios from 'axios'
export default function Admin () {
    return (
        <div>
            <SubMenu />
        </div>
    )
}

function SubMenu () {
    return (
        <Container className="mt-4">
            <Tabs defaultActiveKey="member" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="member" title="Members">
                    <MemberComponent />
                </Tab>
                <Tab eventKey="admin" title="Admin">
                    <AdminComponent />
                </Tab>
            </Tabs>
        </Container>
    )
}

function MemberComponent() {
    // const { data: accounts, loading, error} = useApiGet({defaultValue: [], endpoint: '/accounts'})
    const URL = 'https://go-food-2021.herokuapp.com/accounts'
    const [accounts, setAccounts] = useState([])

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {

        const response = await axios.get(URL)
        setAccounts(response.data)
    }
    const removeData = (id) => {

        axios.delete(`${URL}/${id}`).then(res => {
            const del = accounts.filter(account => id !== account.id)
            setAccounts(del)
        })
    }
    const renderHeader = () => {
        let headerElement = ['id', 'name', 'email', 'phone', 'operation']

        return headerElement.map((key, index) => {
            return <Th key={index}>{key.toUpperCase()}</Th>
        })
    }
    const renderBody = () => {
        return accounts && accounts.map(({ id, name, email, phoneNumber }) => {
            return (
                <Tr key={id}>
                    <Td>{id}</Td>
                    <Td>{name}</Td>
                    <Td>{email}</Td>
                    <Td>{phoneNumber}</Td>
                    <Td className='opration'>
                        {/* <button className='button' onClick={() => removeData(id)}>Delete</button> */}
                        <Link to={`admin/${id}`} style={{ textDecoration: 'none' }}>
                            <IconButton
                                isRound
                                variant='ghost'
                                icon={<FaUserEdit />}>
                            </IconButton>
                        </Link>
                        <IconButton
                            isRound
                            variant='ghost'
                            onClick={() => removeData(id)}
                            icon={<TiDelete />}>
                        </IconButton>
                    </Td>
                </Tr>
            )
        })
    }
    return (
        <>
            {/* <h1 id='title'>React Table</h1> */}
            <Table id='account'>
                <Thead>
                    <tr>{renderHeader()}</tr>
                </Thead>
                <Tbody>
                    {renderBody()}
                </Tbody>
            </Table>
        </>
    )
}


function AdminComponent() {
    return (
        <div>This is admin component</div>
    )
}