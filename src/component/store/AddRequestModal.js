import { Button, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import api from "../../api/api";
import useInput from "../../hook/useInput";
import { useErrorToast, useSuccessToast } from "../shared/toast";

export default function AddRequestModal({ restaurantId, isOpen, onClose, refresh }) {
    const { value: content, onInput: onContentInput } = useInput('')
    const [submitting, setSubmitting] = useState(false)
    const errorToast = useErrorToast()
    const successToast = useSuccessToast()
    async function onFormSubmit(e) {
        e.preventDefault()
        try {
            setSubmitting(true)
            await api.post(`/restaurants/${restaurantId}/requests`, { content })
            successToast({ title: 'Add request sucessfully!', description: '', })
            refresh()
            onClose()
        } catch (e) {
            console.log(e)
            errorToast({
                title: 'Add request failed!',
                description: e.response?.data?.message
            })
        } finally {
            setSubmitting(false)
        }
    }
    return (
        <Modal preserveScrollBarGap closeOnOverlayClick isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent maxW='56rem' p={4}>
                <ModalHeader>Add request</ModalHeader>
                <ModalBody>
                    <form onSubmit={onFormSubmit}>
                        <FormControl id="content" isRequired mb={2}>
                            <FormLabel>Content</FormLabel>
                            <Textarea value={content} onInput={onContentInput} />
                        </FormControl>
                        <Flex align='center'>
                            <Button
                                isLoading={submitting}
                                mx='auto'
                                mt={4}
                                colorScheme="teal"
                                type="submit">Submit
                            </Button>
                        </Flex>
                    </form>
                </ModalBody>
            </ModalContent>
        </Modal >
    )
}