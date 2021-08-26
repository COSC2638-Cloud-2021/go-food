import { Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { 
    Nav,
    FormControl,  
    Container,
    Row,
    Col,
    InputGroup,
    Navbar
} from "react-bootstrap";

// export default function MainAppBar() {
//     return (
//         <Flex py={2} px={4} bgColor='gray.800' align='center' justify='space-between'>
//             <Link to='/'>
//                 <Text color='white' fontSize='2xl' fontWeight={700}>GoFood</Text>
//             </Link>
//             <Link to='/login'>
//                 <Text mr={4} color='white' fontSize='lg' fontWeight={700}>Login</Text>
//             </Link>
//         </Flex >
//     )
// }

export default function MainAppBar() {
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
