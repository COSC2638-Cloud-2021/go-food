import { Box } from "@chakra-ui/react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import Checkout from "./component/checkout/Checkout"
import Home from "./component/home/Home"
import LoginPage from "./component/login/LoginPage"
import SignUpPage from "./component/login/SignUpPage"
import Error404Page from "./component/shared/Error404Page"
import MainAppBar from "./component/shared/MainAppBar"

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Box height='100%' display='flex' flexDirection='column'>
                <MainAppBar />
                <Box height='100%'>
                    <Switch>
                        <Route exact path='/'>
                            <Home />
                        </Route>
                        <Route exact path='/login'>
                            <LoginPage />
                        </Route>
                        <Route exact path='/signup'>
                            <SignUpPage />
                        </Route>
                        <Route exact path='/checkout'>
                            <Checkout />
                        </Route>
                        <Route>
                            <Error404Page />
                        </Route>
                    </Switch>
                </Box>
            </Box>
        </BrowserRouter>
    )
}