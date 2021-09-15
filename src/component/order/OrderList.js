import { CheckIcon } from '@chakra-ui/icons'
import { Box, Flex, GridItem, Icon, SimpleGrid, Tab, TabList, Tabs, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { BiTimeFive } from 'react-icons/bi'
import LoadingSpinner from '../shared/LoadingSpinner'
import Order from './Order'

export default function OrderList({ orders, loading }) {
    const [tabIndex, setTabIndex] = useState(0)
    const isCompleted = tabIndex === 1
    const displayedOrders = isCompleted ?
        orders.filter(order => order.status === 'completed')
        : orders.filter(order => order.status !== 'completed')

    return (
        <>
            <Tabs my={4} onChange={(index) => setTabIndex(index)} colorScheme={isCompleted ? 'green' : 'yellow'} size="md">
                <TabList>
                    <Tab _focus={{ boxShadow: 'none' }}>
                        <Flex align='center'>
                            <Icon as={BiTimeFive} mr={2} />
                            <Text>In progress</Text>
                        </Flex>
                    </Tab>
                    <Tab _focus={{ boxShadow: 'none' }}>
                        <Flex align='center'>
                            <Icon as={CheckIcon} mr={2} />
                            <Text>Completed</Text>
                        </Flex>
                    </Tab>
                </TabList>
            </Tabs>
            <SimpleGrid columns={12} spacing={3}>
                {loading ? <LoadingSpinner /> :
                    displayedOrders.map(order =>
                        <GridItem key={order.id} colSpan={[12, 6, 4, 3]}>
                            <Order order={order} />
                        </GridItem>
                    )}
            </SimpleGrid>
        </>
    )
}