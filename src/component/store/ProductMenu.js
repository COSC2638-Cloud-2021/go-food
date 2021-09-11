import { Box, Button, Flex, SimpleGrid, Text, useDisclosure } from "@chakra-ui/react";
import useAuthStore from "../../store/useAuthStore";
import AddProductModal from "../admin/AddProductModal";
import Product from "./Product";


export default function ProductMenu({ menu, storeId, refresh }) {
    const { id, name = 'Menu', products = [], } = menu
    const { isOpen, onOpen, onClose } = useDisclosure()
    const isAdmin = useAuthStore(s => s.user)?.role === 'admin'
    return (
        <Box id={id} p={2}>
            <Flex align='center'>
                <Text fontSize='2xl' fontWeight={600}>{name}</Text>
                {isAdmin && <Button onClick={onOpen} ml='auto' size='sm' colorScheme='green' >Add product</Button>}
            </Flex>
            <SimpleGrid container='true' column={1}>
                {products.map(product => (
                    <Product refresh={refresh} key={product.id} storeId={storeId} product={product} />
                ))}
            </SimpleGrid >
            <AddProductModal refresh={refresh} menu={menu} onClose={onClose} isOpen={isOpen} />
        </Box>
    )
}