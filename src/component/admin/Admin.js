import { Container, Row, Tab, Col, Tabs } from "react-bootstrap"
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
            <Row>
                <Col xs={1}>Photo</Col>
                <Col>Member name</Col>
                <Col>Email</Col>
                <Col>Mobile</Col>
                <Col>Operation</Col>
            </Row>
            {loading ? <LoadingSpinner /> :
                <Container>
                {accounts.map(({ id, name, email, phoneNumber}) => (
                    <Row key={id}>
                        <Col xs={1}>Picture</Col>
                        <Col>{name}</Col>
                        <Col>{email}</Col>
                        <Col>{phoneNumber}</Col>
                        <Col>
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
                        </Col>
                    </Row>
                ))}
                </Container>
            }
        </div>
    )
}

function AdminComponent() {
    return (
        <div>This is admin component</div>
    )
}