import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare, faCoffee } from '@fortawesome/fontawesome-free-solid'
import logo from '../../asset/image/logo.png'
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
        <Container className="mt-2 mb-4">
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
            <Col className="mt-2 mb-4" xs={11} lg={8} style={{padding:"20px 20px", backgroundColor:"white", borderRadius:"8px", border:"1px solid #cccccc"}}>
                <Row style={{borderBottom:" ", padding:"10px 10px", border:""}}>
                    <Col xs={6} lg={9} style={{border:" ", fontSize:"26px", fontWeight:"bold"}}>My cart</Col>
                    <Col xs={6} md={4} lg={2} style={{alignItems:"right", border:" "}}><button className="COsection__confirmButton">Confirm</button></Col>
                </Row>
                <Row ><ItemList/></Row>
                <Row ><Subtotal/></Row>
                <Row><DeliveryAddress/></Row>
            </Col>
            <Col xs={12} md={3}><TotalPayment/></Col>
        </Row>
    )
}

function TotalPayment() {
    return (
        <div>
            <Row className="mb-4">
                <Col md={6} style={{ fontSize: "30px", fontWeight: "bold"}}><h1>Total Payment</h1></Col>
            </Row>
            <Row style={{padding: "20px 20px", backgroundColor:""}}>
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
           
            </Row>
        </div>  
    )
}


function ItemList(){
    return(
        <Container  style={{border:" ", padding:"20px 20px"}}>
            <Row xs={12} md={8} className="mt-4">
                {Array.from({ length: 3 }).map((_, idx) => ( // 'length' depend on data
                    <Row className="mb-2">
                        <Col xs={3} sm={3} md={3} lg={3} style={{border:" "}}>
                            <Card style={{ width: '10rem'}} >
                                {/* <Image fallbackSrc={logo} height={160} width='100%' objectFit='cover' /> */}
                                <Card.Img variant="top" src="holder.js/160x130" />
                            </Card>
                        </Col>
                        <Col xs={8} xs={6} style={{border:"", padding:"10px 20px"}}>
                            <Row style={{fontWeight:"bold"}}>Item Name</Row>
                            <Row style={{color:"#999999"}}>Item description. This content can be longer. This content can be longer. This content can be longer.</Row>
                        </Col>
                        <Col xs={2} xs={3} style={{border:" ", textAlign:"right", fontWeight:"bold"}}>1x 18.00 VND</Col>
                    </Row>
                ))}
            </Row>
        </Container>
    )
}

function Subtotal() {
    return(
        <Container>
            <Row xs={12} md={8} className="mt-4" style={{borderTop:""}}>
                <Row className="mb-2">
                   
                    <Col xs={1} md={7} style={{border:""}}>
                    </Col>
                    <Col  md={5} xs={12} style={{borderTop:"1px solid #cccccc", textAlign:"", fontWeight:"bold", padding:"10px 20px"}}>
                        <Row style={{fontWeight: "bold"}} >
                            <Col xs={8} xs={5}>Subtotal</Col>
                            <Col xs={6} xs={5} style={{textAlign:"right"}} >144 VND</Col>
                        </Row>
                        <Row style={{color:"grey"}} >
                            <Col xs={6} xs={5}>Delivery fee</Col>
                            <Col xs={6} xs={5} style={{textAlign:"right"}} >144 VND</Col>
                        </Row>
                        <Row style={{color:"grey"}}>
                            <Col xs={8} xs={5}>Discount</Col>
                            <Col xs={4} xs={5} style={{textAlign:"right"}} >144 VND</Col>
                        </Row>
                        <br></br>
                        <Row style={{color:"grey"}}>
                            <Col xs={9} xs={5} style={{fontSize:"26px"}}>Total</Col>
                            <Col xs={8} xs={5} style={{textAlign:"right", fontSize:"20px"}} >144 VND</Col>
                        </Row>
                    </Col>
                </Row>
            </Row>
        </Container>
    )
}

function DeliveryAddress(){
    return(
        <Container style={{borderTop:"1px solid #cccccc"}}>
            <h1 className='mt-4' style={{fontWeight:"bold", fontSize:"20px"}}>Delivery information</h1>
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