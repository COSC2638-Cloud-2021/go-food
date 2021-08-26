import { Link } from 'react-router-dom';
import logo from '../../asset/image/logo.png'
import {
    Navbar,
    Nav,
    FormControl,
    Button,
    Container,
    Card,
    Row,
    Col,
    Badge,
    InputGroup,
    NavDropdown,
} from "react-bootstrap";
import { Image } from '@chakra-ui/react';


export default function Home() {
    return (
        <div>
            {/* <Menu/> */}
            {/* <Menu1/> */}
            <FilterItems />
            <VendorDisplay />
        </div>
    )
}

function FilterItems() {
    return (
        <Container className="mt-2">
            <div className="mb-4">
                <Button variant="outline-secondary" >Filter</Button>{'   '}
                <Button variant="outline-secondary">Rating</Button>{'   '}
                <Button variant="outline-secondary">Great offer</Button>{'  '}
            </div>
        </Container>


    )
}

function VendorDisplay() {
    const id = 1;
    return (
        <Container >
            <Row xs={1} md={3} className="g-4">
                {Array.from({ length: 10 }).map((_, idx) => ( //Define 'length' later
                    <Col>
                        <Card style={{ width: '26rem', textDecoration: 'none' }} >
                            <Link to={`stores/${id}`}>
                                <Image fallbackSrc={logo} height={160} width='100%' objectFit='cover' />
                                <Card.ImgOverlay>
                                    <Badge bg="secondary">Promotion</Badge>
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                    <Badge bg="primary" variant="dark">75% OFF</Badge>
                                </Card.ImgOverlay>
                                <Card.Body>
                                    <Row>
                                        <Col md={6}><Card.Title>RestaurantName</Card.Title></Col>
                                        <Col md={{ span: 1, offset: 4 }}><Badge bg="success" variant="light">3.8*</Badge></Col>
                                    </Row>
                                    <Card.Text>
                                        This content is a little bit longer.
                                    </Card.Text>
                                </Card.Body>
                            </Link>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container >

    )
}