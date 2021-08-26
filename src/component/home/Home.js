import 'holderjs';
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


export default function Home() {
    return (
        <div>
            {/* <Menu/> */}
            {/* <Menu1/> */}
            <FilterItems/>
            <VendorDisplay/>
        </div>
    )
}

function Menu(){
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
            <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                <Nav.Link href="#features">Features</Nav.Link>
                <Nav.Link href="#pricing">Pricing</Nav.Link>
                <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown>
                </Nav>
                <Nav>
                <Nav.Link href="#deets">More deets</Nav.Link>
                <Nav.Link eventKey={2} href="#memes">
                    Dank memes
                </Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Container>
            </Navbar>
    )
}
function Menu1(){
    return (
        <Container className="mt-2" bg="light" variant="light">
            <Row >
                <Col  xs="2">
                    <Row xs="1">
                        <Col style={{ fontSize: "30px", fontWeight: "bold", fontStyle: "italic", fontFamily: "Times New Roman" }} href="#">GoFood</Col>
                        {/* <Col href="#"><Nav.Link href="#signin" >Home</Nav.Link></Col> */}
                    </Row>
                </Col>
                <Col xs="8">
                    <Row>
                        <Col xs="2" href="#"><Nav.Link href="#signin" >Home</Nav.Link></Col>
                        <Col md="10">
                            <InputGroup>
                                <FormControl placeholder="Search"/>
                            </InputGroup>
                        </Col>
                    </Row>
                </Col>
                <Col xs="2">
                    <Row xs="2">
                        <Nav.Link href="#signin" >Sign in</Nav.Link>
                        <Nav.Link href="#login">Log in</Nav.Link>
                    </Row>
                </Col>
            </Row>    
        </Container>
    )
}
function FilterItems(){
    return(
        <Container className="mt-2">
             <div className="mb-4">
                <Button variant="outline-secondary" >Filter</Button>{'   '}
                <Button variant="outline-secondary">Rating</Button>{'   '}
                <Button variant="outline-secondary">Great offer</Button>{'  '}
            </div>
        </Container>
        

    )
}

function VendorDisplay(){
    return(
        <Container>
            <Row xs={1} md={3} className="g-4">
                {Array.from({ length: 10 }).map((_, idx) => ( //Define 'length' later
                    <Col>
                    <Card style={{ width: '26rem' }} >
                        <Card.Img variant="top" src="holder.js/100px160" />
                        <Card.ImgOverlay>
                            <Badge bg="secondary">Promotion</Badge>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <Badge  bg="primary" variant="dark">75% OFF</Badge>
                        </Card.ImgOverlay>
                        <Card.Body>
                            <Row>
                                <Col md={6}><Card.Title>RestaurantName</Card.Title></Col>
                                <Col md={{ span: 1, offset: 4 }}><Badge  bg="success" variant="light">3.8*</Badge></Col>
                            </Row>
                            <Card.Text>
                                This content is a little bit longer.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    </Col>
                ))}
            </Row>
        </Container>
        
    )
}