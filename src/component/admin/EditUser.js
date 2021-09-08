import { useEffect } from "react"
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Button
  } from "@chakra-ui/react"
import { Container, Row } from "react-bootstrap"
import { useParams } from "react-router"
import useApiGet from "../../hook/useApiGet"
import LoadingSpinner from "../shared/LoadingSpinner"

export default function EditUser () {
    const {id} = useParams ()
    const {data, error, loading, setLoading} = useApiGet({ endpoint: `/accounts/${id}`, defaultValue: [] })
    const { name, email, phoneNumber = [] } = data || {}
    useEffect(() => {
        setLoading(true)
    }, [id, setLoading])
    return (
        <div>
            {loading ? <LoadingSpinner /> : 
                <Container>
                    <FormControl id="name" isRequired>
                    <FormLabel>Name</FormLabel>
                    <Input placeholder={name} />
                    </FormControl>
                    <FormControl id="email" isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input placeholder={email} />
                    </FormControl>
                    <FormControl id="phoneNumber" isRequired>
                    <FormLabel>Phone Number</FormLabel>
                    <Input placeholder={phoneNumber} />
                    </FormControl>
                    <Button
                        mt={4}
                        colorScheme="teal"
                        // isLoading={props.isSubmitting}
                        type="submit">Submit</Button>
                </Container>
            }
        </div>
    )
}