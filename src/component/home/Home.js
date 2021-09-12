import { StarIcon } from '@chakra-ui/icons';
import { Image, Box, Flex, Text } from '@chakra-ui/react';
import {
    Badge, Button, Card, Col, Container, Row
} from "react-bootstrap";
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import logo from '../../asset/image/logo.png';
import useApiGet from '../../hook/useApiGet';
import LoadingSpinner from '../shared/LoadingSpinner';
import {FaFacebook, FaPinterest, FaInstagramSquare, FaTwitter} from "react-icons/fa";
import * as Icons from "react-icons/fa"
import {IconButton, Heading} from "@chakra-ui/react"


export default function Home() {
    const { data: restaurants, loading, error } = useApiGet({ defaultValue: [], endpoint: '/restaurants' })
    return (
        <Box>
            <Helmet title='GoFood'/>
            <FilterItems />
            {
                loading ? <LoadingSpinner /> :
                    <Container >
                        <Row xs={1} md={3} className="g-4">
                            {restaurants.map(({ id, name, address }) => (
                                <Col key={id}>
                                    <Card style={{ width: '26rem', }} >
                                        <Link to={`stores/${id}`} style={{ textDecoration: 'none' }}>
                                            <Box>
                                                <Image fallbackSrc={logo} height={160} width='100%' objectFit='cover' />
                                                <Card.ImgOverlay>
                                                    <Badge bg="secondary">Promotion</Badge>
                                                    <br></br>
                                                    <br></br>
                                                    <br></br>
                                                    <br></br>
                                                    <Badge bg="primary" variant="dark">20% OFF</Badge>
                                                </Card.ImgOverlay>
                                                <Card.Body>
                                                    <Row>
                                                        <Col md={6}><Card.Title>{name}</Card.Title></Col>
                                                        <Col md={{ span: 1, offset: 4 }}>
                                                            <Badge bg="success" variant="light">
                                                                <Flex align='center'>
                                                                    <Text mr={1}>5.0</Text>
                                                                    <StarIcon boxSize={2.5} />
                                                                </Flex>
                                                            </Badge>
                                                        </Col>
                                                    </Row>
                                                    <Card.Text>
                                                        {address}
                                                    </Card.Text>
                                                </Card.Body>
                                            </Box>
                                        </Link>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Container >
            }
            <Footer />
        </Box>
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

function Footer () {
    return(
        <div className="mt-4" >
            <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        }}>
                <IconButton
                    isRound
                    variant='ghost'
                    icon={<FaFacebook />}>
                </IconButton>
                <IconButton
                    isRound
                    variant='ghost'
                    icon={<FaPinterest />}>
                </IconButton>
                <IconButton
                    isRound
                    variant='ghost'
                    icon={<FaInstagramSquare />}>
                </IconButton>
                <IconButton
                    isRound
                    variant='ghost'
                    icon={<FaTwitter />}>
                </IconButton>
            </div>
            <div style={{backgroundColor: "#333333"}}>
            <Heading as="h5" size="sm" style={{textAlign: "center", padding: "10px 10px", color: "white", fontFamily: "New Century Schoolbook, serif"}}>{renderCategory()}</Heading>
            </div>  
            <div style={{background: "green", textAlign: "center", padding: "10px 10px", fontFamily: "Helvetica Narrow, sans-serif"}}><span style={{textTransform: "uppercase", color: "white"}}>healthy fast casual food, craft with love in minneapolis</span></div>
        </div>
    )
}

const renderCategory = () => {
    let categoryElement = ['home', 'menu', 'story', 'detox', 'locations']

    return categoryElement.map((key, index) => {
        return<span key={index} style={{marginRight: '3rem'}}>{key.toUpperCase()}</span>
    })
}

// const renderSlogan = () => {
//     var slogan = ['healthy fast casual food, craft with love in minneapolis']

//     return<span>{slogan.toUpperCase()}</span>
// }