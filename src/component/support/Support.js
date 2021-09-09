import { Heading, FormControl, FormLabel, Input, Button, Select, FormHelperText, Textarea } from "@chakra-ui/react"
import { Container } from "react-bootstrap"
export default function Support () {
    return (
        <Container>
            <Heading>Please fill in the form bellow and then we will contact you soon</Heading>
            <FormControl id="name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input placeholder="Name" />
            </FormControl>
            <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input placeholder="Email" />
                <FormHelperText>We'll never share your email.</FormHelperText>
            </FormControl>
            <FormControl id="phoneNumber" isRequired>
                <FormLabel>Phone Number</FormLabel>
                <Input placeholder="Phone Number" />
                <FormHelperText>We'll never share your phone number.</FormHelperText>
            </FormControl>
            <FormControl id="role" isRequired>
                <FormLabel>My role</FormLabel>
                
                <Select placeholder="Please select one">
                    <option>Customer</option>
                    <option>Store owner</option>
                </Select>
            </FormControl>
            <FormControl id="message" isRequired>
                <FormLabel>Message</FormLabel>
                <Textarea placeholder="Please type your message here" />
            </FormControl>
                
            <Button
                mt={4}
                colorScheme="teal"
                // isLoading={props.isSubmitting}
                type="submit">Submit</Button>
        </Container>
    )
}