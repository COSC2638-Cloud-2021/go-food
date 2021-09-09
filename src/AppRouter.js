import { Box } from "@chakra-ui/react"
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"
import Checkout from "./component/checkout/Checkout"
import Home from "./component/home/Home"
import LoginPage from "./component/login/LoginPage"
import SignUpPage from "./component/login/SignUpPage"
import ProfilePage from "./component/profile/ProfilePage"
import Error404Page from "./component/shared/Error404Page"
import MainAppBar from "./component/shared/MainAppBar"
import StorePage from "./component/store/StorePage"
import useApiGet from "./hook/useApiGet"
import useAuthStore from "./store/useAuthStore"
import UserDashboard from "./component/admin/UserDashboard"
import EditUser from "./component/admin/EditUser"
import Support from "./component/support/Support"

export default function AppRouter() {
    const user = useAuthStore(s => s.user)
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
                            {user ? <Redirect to='/' /> : <LoginPage />}
                        </Route>
                        <Route exact path='/register'>
                            {user ? <Redirect to='/' /> : <SignUpPage />}
                        </Route>
                        <Route exact path='/stores/:id'>
                            <StorePage />
                        </Route>
                        <Route exact path='/stores/:id/checkout'>
                            {user ? <Checkout /> : <Redirect to='/login' />}
                        </Route>
                        <Route exact path='/profile'>
                            {user ? <ProfilePage /> : <Redirect to='/' />}
                        </Route>
                        <Route exact path='/dashboard/users'>
                            <UserDashboard />
                        </Route>
                        <Route exact path='/dashboard/users/:id'>
                            <EditUser />
                        </Route>
                        <Route exact path='/support'>
                            <Support />
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