import {
    Box, Button, Flex, FormControl,
    FormLabel, Input, Text
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import api from "../../api/api"
import useApiGet from "../../hook/useApiGet"
import useInput from "../../hook/useInput"
import LoadingSpinner from "../shared/LoadingSpinner"
import { useErrorToast, useSuccessToast } from "../shared/toast"

export default function EditUser() {
    const { id } = useParams()
    const { data, error, loading, setLoading, refresh } = useApiGet({ endpoint: `/accounts/${id}` })
    const { name, email, phoneNumber, address } = data || {}
    const { value: nameInput, onInput: onNameInput, setValue: setNameInput } = useInput(name)
    const { value: emailInput, onInput: onEmailInput, setValue: setEmailInput } = useInput(email)
    const { value: phoneNumberInput, onInput: onPhoneNumberInput, setValue: setPhoneNumberInput } = useInput(phoneNumber)
    const { value: addressInput, onInput: onAddressInput, setValue: setAddressInput } = useInput(address)

    const [submitting, setSubmitting] = useState(false)
    const successToast = useSuccessToast()
    const errorToast = useErrorToast()
    useEffect(() => {
        setNameInput(name)
        setEmailInput(email)
        setPhoneNumberInput(phoneNumber)
        setAddressInput(address)

    }
        , [data]
    )

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        setSubmitting(true)
        try {
            await api.patch(`/accounts/${id}`, { name: nameInput, email: emailInput, phoneNumber: phoneNumberInput, address: addressInput })
            refresh()
            successToast({ title: 'Update account successfully!' })
        } catch (e) {
            errorToast({ title: 'Update account failed', message: e.response.data.message })
        } finally {
            setSubmitting(false)
        }
    }
    return (
        <div>
            {loading ? <LoadingSpinner /> :
                <Box w={400} mx='auto' mt={2} p={2}>
                    <Text align='center' fontSize='2xl' fontWeight={600}>Edit user #{id}</Text>
                    <form onSubmit={handleFormSubmit}>
                        <FormControl id="name" isRequired>
                            <FormLabel>Name</FormLabel>
                            <Input value={nameInput} onInput={onNameInput} />
                        </FormControl>
                        <FormControl id="email" isRequired>
                            <FormLabel>Email</FormLabel>
                            <Input value={emailInput} onInput={onEmailInput} />
                        </FormControl>
                        <FormControl id="phone-number" isRequired>
                            <FormLabel>Phone number</FormLabel>
                            <Input value={phoneNumberInput} onInput={onPhoneNumberInput} />
                        </FormControl>
                        <FormControl id="address" isRequired>
                            <FormLabel>Address</FormLabel>
                            <Input value={addressInput} onInput={onAddressInput} />
                        </FormControl>
                        <Flex align='center'>
                            <Button
                                isLoading={submitting}
                                mx='auto'
                                mt={4}
                                colorScheme="teal"
                                // isLoading={props.isSubmitting}
                                type="submit">Submit
                            </Button>
                        </Flex>
                    </form>
                </Box>
            }
        </div>
    )
}