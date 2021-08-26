import { Box, Flex, GridItem, Image, SimpleGrid, Text } from "@chakra-ui/react"
import { Fragment, useEffect } from "react"
import { Helmet } from "react-helmet-async"
import { Link, useParams } from "react-router-dom"
import logo from '../../asset/image/logo.png'
import useApiGet from "../../hook/useApiGet"
import mockStore from "../../mock/mockStore"
import Cart from "../cart/Cart"
import AppDivider from "../shared/AppDivider"
import LoadingSpinner from "../shared/LoadingSpinner"
import ProductMenu from "./ProductMenu"


export default function StorePage() {
    const { id } = useParams()
    const { data, error, loading, setLoading } = useApiGet({ endpoint: `/stores/${id}`, defaultValue: mockStore })
    const { name, address, description, image: { url: imageUrl } = {}, subMenus = [] } = data || {}

    useEffect(() => {
        setLoading(true)
    }, [id, setLoading])
    return (
        <Flex h='100%' w='80%' mx='auto' direction='column' align='center'>
            {loading ? <LoadingSpinner /> :
                (
                    <Fragment>
                        <Helmet title={name} />
                        <SimpleGrid columns={12} w={['100%', null, '50%']}>
                            <GridItem colSpan={[12, null, 3]}>
                                <Box p={4}>
                                    <Image fallbackSrc={logo} objectFit='cover' alt={name} h={[300, 200]} w='100%' src={imageUrl} />
                                </Box>
                            </GridItem>
                            <GridItem colSpan={[12, null, 9]}>
                                <Box p={4}>
                                    <Text fontSize='3xl' fontWeight={600}>{name}</Text>
                                    <Text fontSize='xl'>{address}</Text>
                                    <Text fontSize='md'>{description}</Text>
                                </Box>
                            </GridItem>
                        </SimpleGrid>
                        <SimpleGrid columns={12} w='100%'>
                            <GridItem colSpan={[12, null, null, 3]}>
                                <Box p={2}>
                                    <Text fontSize='2xl' fontWeight={600}>Menu</Text>
                                    {subMenus.map(menu =>
                                        <Link to='#' key={menu.id}><Text py={2} fontSize='md'>{menu.name} ({menu.products.length})</Text></Link>
                                    )}
                                </Box>
                            </GridItem>
                            <GridItem colSpan={[12, null, 8, 6]}>
                                {subMenus.map(menu => <ProductMenu key={menu.id} menu={menu} storeId={id} />)}
                            </GridItem>
                            <GridItem colSpan={[12, null, 4, 3]}>
                                <Box p={2}>
                                    <Text fontSize='2xl' fontWeight={600}>Cart</Text>
                                    <Cart storeId={id} />
                                </Box>
                            </GridItem>
                        </SimpleGrid>
                    </Fragment>
                )
            }
        </Flex >
    )
}