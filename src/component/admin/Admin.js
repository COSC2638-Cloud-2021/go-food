import { Container, Row, Tab, Col, Tabs } from "react-bootstrap"
import { Table, TableCaption, Thead, Tr, Th, Td, Tbody, Tfoot } from "@chakra-ui/react"
import { TiEdit, TiDelete  } from "react-icons/ti"
import {FaUserEdit} from "react-icons/fa"
import {IconButton} from "@chakra-ui/react"
import useApiGet from "../../hook/useApiGet"
import LoadingSpinner from "../shared/LoadingSpinner"
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
    const { data: accounts, loading, error} = useApiGet({defaultValue: [], endpoint: '/accounts'})
    return (
        <div>
            {loading ? <LoadingSpinner /> :
                <Table>
                    <TableCaption>GoFood 2020-2021</TableCaption>
                    <Thead>
                        <Tr>
                        <Th>Photo</Th>
                        <Th>Member Name</Th>
                        <Th>Email</Th>
                        <Th>Mobile</Th>
                        <Th >Operation</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {accounts.map(({ id, name, email, phoneNumber}) => (
                    <Tr key={id}>
                        <Td>Picture</Td>
                        <Td>{name}</Td>
                        <Td>{email}</Td>
                        <Td>{phoneNumber}</Td>
                        <Td>
                            <IconButton
                                isRound
                                variant='ghost'
                                icon={<FaUserEdit />}>
                            </IconButton>
                            <IconButton
                                isRound
                                variant='ghost'
                                icon={<TiDelete />}>
                            </IconButton>
                        </Td>
                    </Tr>
                ))}
                    </Tbody>
                </Table>
            }
        </div>
    )
}

function AdminComponent() {
    return (
        <div>This is admin component</div>
    )
}