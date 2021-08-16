import { Flex, Text } from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";

export default function Home() {
    return (
        <Flex align='center' justify='center'>
            <Helmet>
                <title>GoFood</title>
            </Helmet>
            <Text>Hello World</Text>
        </Flex>
    )
}