import { Box, Button, Flex, GridItem, Icon, IconButton, Input, SimpleGrid, Table, Tbody, Td, Text, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react'
import { useState } from 'react'
import { BiTimeFive } from 'react-icons/bi'
import { IoTrash } from 'react-icons/io5'
import { MdCancel, MdCheckCircle } from 'react-icons/md'
import { useParams } from 'react-router'
import api from '../../api/api'
import useApiGet from '../../hook/useApiGet'
import useInput from '../../hook/useInput'
import useAuthStore from '../../store/useAuthStore'
import OrderList from '../order/OrderList'
import LoadingSpinner from '../shared/LoadingSpinner'
import { useErrorToast, useSuccessToast } from '../shared/toast'
import AddRequestModal from './AddRequestModal'
import Error404Page from '../shared/Error404Page'

function OwnerRow({ user, refresh, isAdmin, restaurantId }) {
    const { id, name, email } = user
    const [removing, setRemoving] = useState(false)
    const errorToast = useErrorToast()
    const successToast = useSuccessToast()
    const removeOwnerFromRestaurant = async () => {
        setRemoving(true)
        try {
            await api.delete(`/restaurants/${restaurantId}/owners/${id}`)
            successToast({ title: "Remove owner succesfully!" })
            refresh()
        } catch (e) {
            errorToast({ title: "Remove owner failed", description: e.response?.data?.message })
            console.log(e)
        } finally {
            setRemoving(false)
        }
    }
    return <Tr>
        <Td>{id}</Td>
        <Td>{name}</Td>
        <Td>{email}</Td>
        {
            isAdmin &&
            <Td textAlign='center'>
                <Flex justify='center' align='center'>
                    <IconButton
                        isLoading={removing}
                        isRound
                        colorScheme='red'
                        variant='ghost'
                        onClick={removeOwnerFromRestaurant}
                        icon={<Icon boxSize={25} color='red.400' as={IoTrash} />}>
                    </IconButton>
                </Flex>
            </Td>
        }

    </Tr>
}


function OwnerList({ owners, refresh, isAdmin, loading, restaurantId }) {
    const { value: email, onInput: onEmailInput } = useInput('')
    const [submitting, setSubmitting] = useState(false)
    const errorToast = useErrorToast()
    const successToast = useSuccessToast()
    async function handleOwnerSubmit(e) {
        e.preventDefault()
        setSubmitting(true)
        try {
            await api.post(`/restaurants/${restaurantId}/owners`, { email })
            successToast({ title: "Add owner successfully" })
            refresh()
        } catch (e) {
            console.log(e)
            errorToast({ title: "Add owner failed", description: e.response?.data?.message })
        } finally {
            setSubmitting(false)
        }
    }
    return (
        <Box>
            <Text fontWeight={700} fontSize='2xl' textTransform='uppercase' mb={2}>Owners</Text>
            {
                isAdmin &&
                <form onSubmit={handleOwnerSubmit}>
                    <Flex my={2}>
                        <Input onInput={onEmailInput} value={email} mr={2} placeholder='Enter user email' type='email' required />
                        <Button isLoading={submitting} type='submit' colorScheme='green'>Add owner</Button>
                    </Flex>
                </form>
            }

            {loading ? <LoadingSpinner /> :
                <Table  w='100%'>
                    <Thead>
                        <tr>
                            <Th>ID</Th>
                            <Th>Name</Th>
                            <Th>Email</Th>
                            {isAdmin && <Th textAlign='center'>Operation</Th>}
                        </tr>
                    </Thead>
                    <Tbody>
                        {
                            owners.map((user) => (<OwnerRow restaurantId={restaurantId} key={user.id} refresh={refresh} user={user} isAdmin={isAdmin} />))
                        }
                    </Tbody>
                </Table>
            }
        </Box>
    )
}

function RequestRow({ request, refresh, isAdmin }) {
    const { id, content, status } = request
    const [approving, setApproving] = useState(false)
    const [declining, setDeclining] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const errorToast = useErrorToast()
    const successToast = useSuccessToast()
    const approveRequest = async () => {
        setApproving(true)
        try {
            await api.patch(`/requests/${id}`, { status: 'approved' })
            successToast({ title: "Approve request successfully" })
            refresh()
        } catch (e) {
            console.log(e)
            errorToast({ title: "Approve request failed", description: e.response?.data?.message })
        } finally {
            setApproving(false)
        }
    }

    const declineRequest = async () => {
        setDeclining(true)
        try {
            await api.patch(`/requests/${id}`, { status: 'declined' })
            successToast({ title: "Decline request successfully" })
            refresh()
        } catch (e) {
            console.log(e)
            errorToast({ title: "Decline request failed", description: e.response?.data?.message })
        } finally {
            setDeclining(false)
        }
    }
    const deleteRequest = async () => {
        setDeleting(true)
        try {
            await api.delete(`/requests/${id}`)
            successToast({ title: "Delete request successfully" })
            refresh()
        } catch (e) {
            console.log(e)
            errorToast({ title: "Delete request failed", description: e.response?.data?.message })
        } finally {
            setDeleting(false)
        }
    }

    const approveIcon = <Icon boxSize={25} color='green.400' as={MdCheckCircle} />
    const declinedIcon = <Icon boxSize={25} color='red.400' as={MdCancel} />
    const pendingIcon = <Icon boxSize={25} color='yellow.500' as={BiTimeFive} />

    const statusStyles = {
        'approved': { icon: approveIcon, color: 'green.400' },
        'declined': { icon: declinedIcon, color: 'red.400' },
        'pending': { icon: pendingIcon, color: 'yellow.500' }
    }

    return <Tr>
        <Td>{id}</Td>
        <Td>{content}</Td>
        <Td>
            <Flex justify='flex-end'>
                {statusStyles[status]?.icon}
                <Text ml={2} textTransform='capitalize' fontWeight={600} color={statusStyles[status]?.color}>{status}</Text>
            </Flex>
        </Td>

        <Td textAlign='center'>
            <Flex justify='center' align='center'>
                {isAdmin &&
                    <>
                        <IconButton
                            isLoading={approving}
                            isRound
                            colorScheme='green'
                            variant='ghost'
                            onClick={approveRequest}
                            icon={approveIcon}>
                        </IconButton>
                        <IconButton
                            isLoading={declining}
                            isRound
                            colorScheme='red'
                            variant='ghost'
                            onClick={declineRequest}
                            icon={declinedIcon}>
                        </IconButton>
                    </>
                }
                <IconButton
                    isLoading={deleting}
                    isRound
                    colorScheme='red'
                    variant='ghost'
                    onClick={deleteRequest}
                    icon={<Icon boxSize={25} color='red.400' as={IoTrash} />}>
                </IconButton>
            </Flex>
        </Td>

    </Tr>
}

function RequestList({ requests, refresh, isAdmin, loading, restaurantId }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <Box>
            <Flex my={2} justify='flex-end'>
                <Button onClick={onOpen} type='submit' colorScheme='green'>Add request</Button>
                <AddRequestModal refresh={refresh} restaurantId={restaurantId} onClose={onClose} isOpen={isOpen} />
            </Flex>
            {loading ? <LoadingSpinner /> :
                <Table w='100%'>
                    <Thead>
                        <tr>
                            <Th>ID</Th>
                            <Th>Content</Th>
                            <Th textAlign='right'>Status</Th>
                            <Th textAlign='center'>Operation</Th>
                        </tr>
                    </Thead>
                    <Tbody>
                        {
                            requests.map((request) => (<RequestRow key={request.id} refresh={refresh} request={request} isAdmin={isAdmin} />))
                        }
                    </Tbody>
                </Table>
            }
        </Box>
    )
}

export default function StoreDashboard() {
    const { id } = useParams()
    const isAdmin = useAuthStore(s => s.isAdmin)()
    const isOwner = useAuthStore(s => s.isOwner)(id)
    const { data: restaurant, loading, refresh } = useApiGet({ endpoint: `/restaurants/${id}/dashboard`, defaultValue: null })
    const { owners = [], requests = [], orders = [] } = restaurant || {}
    if (!(isAdmin || isOwner)) return <Error404Page />
    return (
        <Flex h='100%' direction='column' p={4}>
            <SimpleGrid columns={12} spacing={3}>

                <GridItem colSpan={[12, null, null, 6]}>
                    <Box p={4}>
                        <OwnerList restaurantId={id} loading={loading} isAdmin={isAdmin} owners={owners} refresh={refresh} />
                        <Text my={4} fontWeight={700} fontSize='2xl' textTransform='uppercase'>Requests</Text>
                        <RequestList restaurantId={id} loading={loading} isAdmin={isAdmin} requests={requests} refresh={refresh} />
                    </Box>
                </GridItem>
                <GridItem colSpan={[12, null, null, 6]}>
                    <Box p={4}>
                        <Text fontWeight={700} fontSize='2xl' textTransform='uppercase'>Orders</Text>
                        <OrderList loading={loading} orders={orders} refresh={refresh} canBeUpdated />
                    </Box>
                </GridItem>

            </SimpleGrid>
        </Flex>
    )
}