import { DeleteIcon, EditIcon } from "@chakra-ui/icons"
import { Box, Button, Flex, GridItem, Icon, Image, Input, SimpleGrid, Text, useDisclosure } from "@chakra-ui/react"
import { Fragment, useEffect, useRef, useState } from "react"
import { Helmet } from "react-helmet-async"
import { RiDashboardFill } from 'react-icons/ri'
import { Link, useHistory, useParams } from "react-router-dom"
import { HashLink } from "react-router-hash-link"
import api from "../../api/api"
import logo from '../../asset/image/logo.png'
import useApiGet from "../../hook/useApiGet"
import useInput from "../../hook/useInput"
import useAuthStore from "../../store/useAuthStore"
import EditStoreModal from "../admin/EditStoreModal"
import Cart from "../cart/Cart"
import DeleteAlertDialog from "../shared/DeleteAlertDialog"
import Error404Page from "../shared/Error404Page"
import LoadingSpinner from "../shared/LoadingSpinner"
import { useErrorToast } from "../shared/toast"
import ProductMenu from "./ProductMenu"

function MenuList({ menus, onAdded, storeId }) {
    const { value: menuInput, onInput: onMenuInput, reset: resetMenuInput } = useInput('')
    const [menuSubmitting, setMenuSubmitting] = useState(false)
    const errorToast = useErrorToast()
    const isAdmin = useAuthStore(s => s.user)?.role === 'admin'

    async function addMenu(e) {
        e.preventDefault()
        setMenuSubmitting(true)
        try {
            await api.post(`/restaurants/${storeId}/menus`, { name: menuInput })
            onAdded()
        } catch (e) {
            errorToast({ title: 'Add menu failed', description: e.response.data.message })
        } finally {
            resetMenuInput()
            setMenuSubmitting(false)
        }
    }

    return (
        <Box p={2}>
            <Flex justify='space-between'>
                <Text fontSize='2xl' fontWeight={600}>Menu</Text>
            </Flex>
            {isAdmin &&
                <form onSubmit={addMenu}>
                    <Flex align='center' my={2}>
                        <Input size='sm' value={menuInput} onInput={onMenuInput} placeholder='Menu name' mr={2} required />
                        <Button size='sm' w={150} isLoading={menuSubmitting} type='submit' colorScheme='green'>Add menu</Button>
                    </Flex>
                </form>
            }

            {menus.map(menu =>
                <HashLink to={`#${menu.id}`} key={menu.id}>
                    <Text py={2} fontSize='md'>{menu.name} ({menu.products.length})</Text>
                </HashLink>
            )}
        </Box>
    )
}

export default function StorePage() {
    const { id } = useParams()
    const { data: store, error, loading, setLoading, refresh } = useApiGet({ endpoint: `/restaurants/${id}` })
    const { name, address, description, image, menus = [] } = store || {}
    const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure()
    const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure()
    const [deleting, setDeleting] = useState(false)
    const history = useHistory()
    const cancelDeleteRef = useRef()
    const user = useAuthStore(s => s.user)
    const isOwner = useAuthStore(s => s.isOwner)(id)
    const isAdmin = user?.role === 'admin'
    const errorToast = useErrorToast()

    useEffect(() => {
        setLoading(true)
    }, [id, setLoading])
    async function deleteStore() {
        setDeleting(true)
        try {
            await api.delete(`/restaurants/${id}`)
            history.push("/")
        } catch (e) {
            errorToast({ title: 'Delete store failed!' })
        } finally {
            setDeleting(false)
        }
    }
    console.log(store)

    if (!loading && !store) return (<Error404Page />)
    return (
        <Flex h='100%' w='80%' mx='auto' direction='column' align='center'>
            {loading ? <LoadingSpinner /> :
                (
                    <Fragment>
                        <Helmet title={name} />
                        <SimpleGrid columns={12} w={['100%']}>
                            <GridItem colSpan={[12, null, 3]}>
                                <Box p={4}>
                                    <Image fallbackSrc={logo} objectFit='cover' alt={name} h={[300, 200]} w='100%' src={image} />
                                </Box>
                            </GridItem>
                            <GridItem colSpan={[12, null, 9]}>
                                <Box p={4}>
                                    <Text fontSize='3xl' fontWeight={600}>{name}</Text>
                                    <Text fontSize='xl'>{address}</Text>
                                    <Text fontSize='md'>{description}</Text>
                                </Box>
                                <Flex p={4}>
                                    {
                                        (isOwner || isAdmin) &&
                                        <Link to={`/stores/${id}/dashboard`}><Button colorScheme='messenger' mr={2} leftIcon={<Icon as={RiDashboardFill} />}>Dashboard</Button></Link>
                                    }
                                    {isAdmin &&
                                        <>
                                            <Button onClick={onEditOpen} mr={2} colorScheme='yellow' leftIcon={<Icon as={EditIcon} />}>Edit</Button>
                                            <Button onClick={onDeleteOpen} colorScheme='red' leftIcon={<Icon as={DeleteIcon} />}>Delete</Button>
                                            <EditStoreModal refresh={refresh} store={store} onClose={onEditClose} isOpen={isEditOpen} />
                                            <DeleteAlertDialog
                                                isOpen={isDeleteOpen}
                                                leastDestructiveRef={cancelDeleteRef}
                                                onClose={onDeleteClose}
                                                onDeleteClick={deleteStore}
                                                isLoading={deleting}
                                                header={`Delete ${name}?`}
                                            />
                                        </>
                                    }
                                </Flex>
                            </GridItem>
                        </SimpleGrid>
                        <SimpleGrid columns={12} w='100%'>
                            <GridItem colSpan={[12, null, null, 3]}>
                                <MenuList storeId={id} onAdded={refresh} menus={menus} />
                            </GridItem>
                            <GridItem colSpan={[12, null, 8, 6]}>
                                {menus.map(menu => <ProductMenu refresh={refresh} key={menu.id} menu={menu} storeId={id} />)}
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