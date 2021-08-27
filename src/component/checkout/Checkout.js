import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare, faCoffee } from '@fortawesome/fontawesome-free-solid'
import { 
    Button,
    ButtonGroup,
    Card,
    Col, 
    Container,
    Image,
    Badge,
    Form,
    Row 
} from "react-bootstrap";
import 'holderjs';
import './Checkout.css';

export default function Checkout() {
    return (
        <Container className="mt-2">
            <Header/>
            <Body/>
        </Container>
    )
}

function Header() {
    return (
        <div>
            <h1 style={{ fontSize: "30px", fontWeight: "bold", fontFamily: "Times New Roman" }}>Order Checkout</h1>
        </div>
        
    )
}

function Body() {
    return (
        <Row className="mt-4 mb-4">
            <Col lg={8} style={{padding:"20px 20px", backgroundColor:"white", borderRadius:"8px", border:"1px solid #cccccc"}}>
                <Row style={{borderBottom:" ", padding:"10px 10px", border:""}}>
                    <Col lg={9} style={{border:" ", fontSize:"26px", fontWeight:"bold"}}>My cart</Col>
                    <Col lg={2} style={{alignItems:"right", border:" "}}><button className="COsection__confirmButton">Confirm</button></Col>
                </Row>
                <Row ><ItemList/></Row>
                <Row ><Subtotal/></Row>
                <Row><DeliveryAddress/></Row>

            </Col>
            <Col xs={4}><TotalPayment/></Col>
            
        </Row>
    )
}

function TotalPayment() {
    return (
        <div>
            <Row className="mb-4">
                <Col md={6} style={{ fontSize: "30px", fontWeight: "bold"}}><h1>Total Payment</h1></Col>
            </Row>
            <div style={{padding: "20px 20px", backgroundColor:""}}>
                <div >
                    <Row style={{fontWeight: "bold"}} >
                        <Col xs={7}>Subtotal</Col>
                        <Col xs={4} style={{textAlign:"right"}} >144 VND</Col>
                    </Row>
                    <Row style={{color:"grey"}} >
                        <Col xs={7}>Delivery fee</Col>
                        <Col xs={4} style={{textAlign:"right"}} >144 VND</Col>
                    </Row>
                    <Row style={{color:"grey"}}>
                        <Col xs={7}>Discount</Col>
                        <Col xs={4} style={{textAlign:"right"}} >144 VND</Col>
                    </Row>
                </div>
                <div className="mt-4">
                    <Row >
                        <Col xs={7}>Paid</Col>
                        <Col xs={4} style={{textAlign:"right"}} >144 VND</Col>
                        
                    </Row>
                    <Row style={{fontWeight: "bold"}} >
                        <Col xs={7}>Remaining amount</Col>
                        <Col xs={4} style={{textAlign:"right"}}>14400 VND</Col>
                        
                    </Row>
                </div>
                <div className="mt-4">
                    <Row className="justify-content-md-center" >
                        <Col md="auto"><button className="COsection_sendOrderButton" >Send order</button></Col>
                    </Row>
                </div>
           
            </div>
        </div>  
    )
}
function ItemList(){
    return(
        <Container style={{border:" ", padding:"20px 20px"}}>
            <Row md={8} className="mt-4">
                {Array.from({ length: 3 }).map((_, idx) => ( // 'length' depend on data
                    <Row className="mb-2">
                        <Col xs={3} style={{border:" "}}>
                            <Card style={{ width: '10rem', alignItems:"center"}} >
                                <Card.Img variant="top" src="holder.js/160x130" />
                            </Card>
                        </Col>
                        <Col xs={6} style={{border:"", padding:"10px 20px"}}>
                            <Row style={{fontWeight:"bold"}}>Item Name</Row>
                            <Row style={{color:"#999999"}}>Item description. This content can be longer.</Row>
                        </Col>
                        <Col style={{border:" ", textAlign:"right", fontWeight:"bold"}}>1x 18.00 VND</Col>
                    </Row>
                ))}
            </Row>
        </Container>
    )
}

function Subtotal() {
    return(
        <Container>
            <Row md={8} className="mt-4">
                <Row className="mb-2">
                    <Col xs={3} style={{border:""}}>
                    </Col>
                    <Col xs={4} style={{border:"", padding:"10px 20px"}}>
                    </Col>
                    <Col style={{border:"", textAlign:"", fontWeight:"bold"}}>
                         <Row style={{fontWeight: "bold"}} >
                            <Col xs={7}>Subtotal</Col>
                            <Col xs={4} style={{textAlign:"right"}} >144 VND</Col>
                        </Row>
                        <Row style={{color:"grey"}} >
                            <Col xs={7}>Delivery fee</Col>
                            <Col xs={4} style={{textAlign:"right"}} >144 VND</Col>
                        </Row>
                        <Row style={{color:"grey"}}>
                            <Col xs={7}>Discount</Col>
                            <Col xs={4} style={{textAlign:"right"}} >144 VND</Col>
                        </Row>
                        <br></br>
                        <Row style={{color:"grey"}}>
                            <Col xs={7} style={{fontSize:"26px"}}>Total</Col>
                            <Col xs={4} style={{textAlign:"right", fontSize:"20px"}} >144 VND</Col>
                        </Row>
                    </Col>
                </Row>
            </Row>
        </Container>
    )
}

function DeliveryAddress(){
    return(
        <Container>
            <h1 style={{fontWeight:"bold", fontSize:"20px"}}>Delivery information</h1>
            <div style={{padding:"10px 10px"}}>
                {['Name', 'Phone', 'Address', 'Note',].map((value) => (
            <Form.Group as={Row} className="mb-3" controlId={`Form.ControlInput${value}`}>
                <Form.Label column sm="2">{value}</Form.Label>
                <Col sm="8">
                <Form.Control type={value === 'Note' ? 'textarea' : 'text'} placeholder={value} />
                </Col>
            </Form.Group>
        ))}
            </div>
        </Container>
    )
}

function Beverage() {
    return (
        <div>
            <FontAwesomeIcon icon={faCoffee} />
        </div>
    )
}