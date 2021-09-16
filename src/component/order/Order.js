import { CheckIcon } from '@chakra-ui/icons'
import { Box, Flex, Icon, Modal, ModalBody, Button, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Table, Tbody, Td, Text, Tfoot, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import { BiTimeFive } from 'react-icons/bi'
import api from '../../api/api'
import formatCurrency from '../../util/formatCurrency'
import { useErrorToast, useSuccessToast } from '../shared/toast'
function Info({ label, value }) {
    return (
        <Flex py={0.5}>
            <Text fontWeight={600}>{label}</Text>
            <Box ml='auto'>
                <Text>{value}</Text>
            </Box>
        </Flex>)
}

export default function Order({ order, canBeUpdated = false, refresh }) {
    const { id, contactName, address, phoneNumber, note, orderDate, status, orderLines, total } = order
    const { isOpen, onOpen, onClose } = useDisclosure()
    const isCompleted = status === 'completed'
    const statusDisplay = status ?? 'pending'
    const successToast = useSuccessToast()
    const errorToast = useErrorToast()
    const [completingOrder, setCompletingOrder] = useState(false)

    async function completeOrder() {
        setCompletingOrder(true)
        try {
            await api.patch(`/orders/${id}`, { status: 'completed' })
            successToast({ title: `Complete order #${id} successfully!` })
            refresh?.()
        } catch (e) {
            errorToast({ title: `Complete order #${id} failed!`, description: e.response?.data?.message })
        } finally {
            setCompletingOrder(false)
        }
    }

    return (
        <Box border='1px' borderColor={isCompleted ? 'green.400' : 'yellow.400'} onClick={onOpen} cursor='pointer' boxShadow='sm' borderRadius='md' p={4}>
            <Text fontSize='lg' fontWeight={600}>Order #{id}</Text>
            <Text color='gray.600' fontSize='sm'>{new Date(orderDate).toISOString().substring(0, 10)}</Text>
            <Flex my={1} align='center'>
                {isCompleted ?
                    <Icon color='green.400' as={CheckIcon} mr={2} /> :
                    <Icon color='yellow.600' as={BiTimeFive} mr={2} />
                }
                <Text
                    color={isCompleted ? 'green.400' : 'yellow.600'}
                    textTransform='capitalize' fontSize='sm'
                >
                    {statusDisplay}
                </Text>
            </Flex>
            <Text fontWeight={600} align='right'>{formatCurrency(total)}</Text>
            <Modal size='3xl' preserveScrollBarGap closeOnOverlayClick isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent p={4}>
                    <ModalHeader>
                        <Text fontSize='xl' fontWeight={600}>Order #{id}</Text>
                        <Text color='gray.600' fontSize='md'>{new Date(orderDate).toISOString().substring(0, 10)}</Text>
                        <Flex my={1} align='center'>
                            {isCompleted ?
                                <Icon color='green.400' as={CheckIcon} mr={2} /> :
                                <Icon color='yellow.600' as={BiTimeFive} mr={2} />
                            }
                            <Text
                                color={isCompleted ? 'green.400' : 'yellow.600'}
                                textTransform='capitalize' fontSize='md'
                            >
                                {statusDisplay}
                            </Text>
                            {canBeUpdated && !isCompleted &&
                                <Button _focus={{ boxShadow: 'none' }}
                                    isLoading={completingOrder}
                                    onClick={completeOrder}
                                    ml='auto' colorScheme='green' borderRadius='3xl' size='sm'>
                                    Complete Order
                                </Button>
                            }
                        </Flex>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Info label='Name' value={contactName} />
                        <Info label='Address' value={address} />
                        <Info label='Phone number' value={phoneNumber} />
                        <Info label='Note' />
                        <Text>{note}</Text>
                        <Box height={10} />
                        <Table variant='simple'>
                            <Thead>
                                <Tr>
                                    <Th>Item</Th>
                                    <Th isNumeric>Quantity</Th>
                                    <Th isNumeric>Subtotal</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {orderLines.map(({ product, id, quantity, price }) => (
                                    <Tr key={id}>
                                        <Td>{product?.name}</Td>
                                        <Td isNumeric>{quantity}</Td>
                                        <Td isNumeric>{formatCurrency(quantity * price)}</Td>
                                    </Tr>
                                ))}
                            </Tbody>
                            <Tfoot>
                                <Tr>
                                    <Th fontSize='md' colSpan={2}>Total</Th>
                                    <Th fontSize='md' isNumeric>{formatCurrency(total)}</Th>
                                </Tr>
                            </Tfoot>
                        </Table>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    )
}