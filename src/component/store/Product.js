import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, Flex, IconButton, Image, Text, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import api from "../../api/api";
import images from "../../asset/image/images";
import useAuthStore from "../../store/useAuthStore";
import useCartsStore from "../../store/useCartsStore";
import formatCurrency from "../../util/formatCurrency";
import EditProductModal from "../admin/EditProductModal";
import { useErrorToast } from "../shared/toast";

export default function Product({ product, storeId, refresh }) {
    const { id, name, price, description, image } = product || {}
    const addProductToCart = useCartsStore(state => state.addProductToCart)
    const isAdmin = useAuthStore(s => s.user)?.role === 'admin'
    const [deleting, setDeleting] = useState(false)
    const errorToast = useErrorToast()
    const { isOpen, onClose, onOpen } = useDisclosure()
    async function deleteProduct() {
        setDeleting(true)
        try {
            await api.delete(`/products/${id}`)
            refresh()
        } catch (e) {
            errorToast({ title: 'Delete product failed!' })
        } finally {
            setDeleting(false)
        }
    }
    return (
        <Flex direction='row' p={2} height='100%'>
            <Box flex={1} display='flex' alignItems='center'>
                <Image borderRadius={10} objectFit='cover' boxSize={75} src={image} fallbackSrc={images.logo}></Image>
            </Box>
            <Box flex={5} ml={2}>
                <Text fontSize='lg' fontWeight={600}>{name}</Text>
                <Text fontSize='md'>{formatCurrency(price)}</Text>
                <Text fontSize='sm'>{description}</Text>
            </Box>
            <Flex ml='auto' align='center'>
                {
                    isAdmin &&
                    <>
                        <IconButton
                            isLoading={deleting}
                            isRound
                            variant='ghost'
                            _focus={{ boxShadow: 'none' }}
                            icon={<DeleteIcon color='red.500' />}
                            onClick={deleteProduct}>
                        </IconButton>
                        <IconButton
                            isLoading={false}
                            isRound
                            variant='ghost'
                            _focus={{ boxShadow: 'none' }}
                            icon={<EditIcon color='yellow.500' />}
                            onClick={onOpen}>
                        </IconButton>
                    </>
                }
                <IconButton
                    isRound
                    variant='ghost'
                    _focus={{ boxShadow: 'none' }}
                    icon={<AddIcon color='green.500' />}
                    onClick={() => addProductToCart({ product, storeId })}>
                </IconButton>
                <EditProductModal product={product} refresh={refresh} onClose={onClose} isOpen={isOpen} />
            </Flex>
        </Flex >
    )
}