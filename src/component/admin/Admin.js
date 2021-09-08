import { Container, Row, Tab, Col, Tabs } from "react-bootstrap"
import { TiEdit, TiDelete  } from "react-icons/ti"
import {FaUserEdit} from "react-icons/fa"
import {IconButton} from "@chakra-ui/react"
export default function Admin () {
    return (
        <div>
            <SubMenu />
        </div>
    )
}

function SubMenu () {
    return (
        <Container>
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
    return (
        <div>
            <Row>
                <Col>Photo</Col>
                <Col>Member name</Col>
                <Col>Mobile</Col>
                <Col>Email</Col>
                <Col>Operation</Col>
            </Row>
            {Array.from({length: 5}).map((_, idx) => (
                <Row>
                    <Col xs={1}>Picture</Col>
                    <Col>George Lindelof</Col>
                    <Col>+4 315 23 63</Col>
                    <Col>george@gmail.com</Col>
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
        </div>
    )
}

function AdminComponent() {
    return (
        <div>This is admin component</div>
    )
}