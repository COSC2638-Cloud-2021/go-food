import { EmailIcon, PhoneIcon } from '@chakra-ui/icons'
import { Avatar, Box, Button, Flex, FormControl, FormLabel, GridItem, Icon, Input, SimpleGrid, Text, useBoolean } from '@chakra-ui/react'
import React, { Fragment, useState } from 'react'
import { FaUserAlt } from 'react-icons/fa'
import { IoLocationOutline } from 'react-icons/io5'
import { RiMoneyDollarCircleFill } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import api from '../../api/api'
import useApiGet from '../../hook/useApiGet'
import useInput from '../../hook/useInput'
import useAuthStore from '../../store/useAuthStore'
import formatCurrency from '../../util/formatCurrency'
import StoreCard from '../home/StoreCard'
import OrderList from '../order/OrderList'
import { useErrorToast, useSuccessToast } from '../shared/toast'

function UserEditForm({ onCancel }) {
    const user = useAuthStore(state => state.user)
    const { id: userId } = user
    const { value: name, onInput: onNameInput } = useInput(user.name)
    const { value: email, onInput: onEmailInput } = useInput(user.email)
    const { value: phoneNumber, onInput: onPhoneNumberInput } = useInput(user.phoneNumber)
    const { value: address, onInput: onAddressInput } = useInput(user.address)
    const [submitting, setSubmitting] = useState(false)
    const errorToast = useErrorToast()
    const successToast = useSuccessToast()
    const fetchCurrentUser = useAuthStore(state => state.fetchCurrentUser)
    const onFormSubmit = async (e) => {
        e.preventDefault()
        setSubmitting(true)
        try {
            await api.patch(`/accounts/${userId}`, { name, email, phoneNumber, address })
            await fetchCurrentUser()
            successToast({
                title: 'Update info successfully!',
            })
            onCancel()
        }
        catch (e) {
            const message = e.response.data.message
            errorToast({
                title: 'Update info failed!',
                description: message,
            })
        }
        finally {
            setSubmitting(false)
        }
    }
    return (
        <Box w='100%'>
            <form onSubmit={onFormSubmit}>
                <FormControl id="name" mb={5}>
                    <FormLabel>Name</FormLabel>
                    <Input size='sm' value={name} onInput={onNameInput} required />
                </FormControl>
                <FormControl id="phoneNumber">
                    <Flex my={1} align='center'>
                        <Icon as={PhoneIcon} mr={2} />
                        <Input size='sm' placeholder='Phone number' type='tel' value={phoneNumber} onInput={onPhoneNumberInput} required />
                    </Flex>
                </FormControl>
                <FormControl id="email">
                    <Flex my={1} align='center'>
                        <Icon as={EmailIcon} mr={2} />
                        <Input size='sm' placeholder='Email' type='email' value={email} onInput={onEmailInput} required />
                    </Flex>
                </FormControl>
                <FormControl id="address">
                    <Flex my={1} align='center'>
                        <Icon as={IoLocationOutline} mr={2} />
                        <Input size='sm' placeholder='Address' value={address} onInput={onAddressInput} required />
                    </Flex>
                </FormControl>
                <Box height={5}></Box>
                <Flex align='center'>
                    <Button size='sm' type="submit" colorScheme='yellow' mr={1} isLoading={submitting}>Save</Button>
                    <Button size='sm' type='button' onClick={onCancel} disabled={submitting}>Cancel</Button>
                </Flex>
            </form>
        </Box>
    )
}

function UserInfo() {
    const user = useAuthStore(state => state.user)
    const { id, name, phoneNumber, address, email, avatar, balance } = user
    const { url: avatarUrl } = avatar || {}
    const [editMode, setEditMode] = useBoolean()

    return (
        <Flex direction="column" alignItems='flex-start' p={2}>
            <Avatar alignSelf='center' src={avatarUrl} size='3xl' mb={6}>
            </Avatar>
            {editMode ? <UserEditForm onCancel={setEditMode.off} />
                : (<Fragment>
                    <Text fontSize='2xl' fontWeight={600}>{name}</Text>
                    <Flex my={1} align='center'>
                        <Icon as={PhoneIcon} mr={2} />
                        <Text>{phoneNumber}</Text>
                    </Flex>
                    <Flex my={1} align='center'>
                        <Icon as={EmailIcon} mr={2} />
                        <Text>{email}</Text>
                    </Flex>
                    <Flex my={1} align='center'>
                        <Icon as={IoLocationOutline} mr={2} />
                        <Text>{address}</Text>
                    </Flex>
                    <Flex my={1} align='center'>
                        <Icon as={RiMoneyDollarCircleFill} mr={2} />
                        <Text>{formatCurrency(balance ?? 0)}</Text>
                    </Flex>
                    <Button onClick={setEditMode.on} mt={2} variant='outline' alignSelf='center' w='100%' colorScheme='yellow' size='sm'>Edit profile</Button>
                </Fragment>
                )
            }

        </Flex>
    )
}

function MyStores({ stores = [] }) {
    if (stores === undefined || stores.length == 0) return <> </>
    return (
        <Box p={4}>
            <Text mb={4} fontWeight={700} fontSize='2xl' textTransform='uppercase'>My Stores</Text>
            <SimpleGrid columns={[1, null, 2, 3]} spacing={3}>
                {stores.map(store => <StoreCard store={store} key={store.id} />)}
            </SimpleGrid>
        </Box>
    )
}

function Manage() {
    return (
        <Box p={4}>
            <Text mb={4} fontWeight={700} fontSize='2xl' textTransform='uppercase'>Manage</Text>
            <SimpleGrid columns={[1, 2, 3, 4]} spacing={3}>
                <ManageItem icon={FaUserAlt} name='Users' link='/dashboard/users' />
            </SimpleGrid>
        </Box>
    )
}

function ManageItem({ icon, name, link }) {
    return (
        <Link to={link} style={{ color: 'inherit', textDecoration: 'inherit' }}>
            <Flex align='center' direction='column' px={4} py={4} border='2px' borderColor='teal.400'>
                <Icon mb={1} as={icon} />
                <Text align='center' fontSize='xl' fontWeight={600}>{name}</Text>
            </Flex>
        </Link>
    )
}

export default function ProfilePage() {
    const user = useAuthStore(s => s.user)
    const { restaurants: stores = [] } = user
    const isAdmin = useAuthStore(s => s.isAdmin)()
    const { data: orders, loading } = useApiGet({ endpoint: '/accounts/me/orders', defaultValue: [] })
    return (
        <Flex h='100%' direction='column' p={4}>
            <SimpleGrid columns={12} spacing={3}>
                <GridItem colSpan={[12, null, 1, 2]}>
                </GridItem>
                <GridItem colSpan={[12, null, 3, 2]}>
                    <UserInfo />
                </GridItem>
                <GridItem colSpan={[12, null, 7, 6]}>
                    {isAdmin && <Manage />}
                    <MyStores stores={stores} />
                    <Box p={4}>
                        <Text fontWeight={700} fontSize='2xl' textTransform='uppercase'>Order history</Text>
                        <OrderList loading={loading} orders={orders} />
                    </Box>
                </GridItem>
                <GridItem colSpan={[12, null, 1, 2]}>
                </GridItem>
            </SimpleGrid>
        </Flex>
    )
}
