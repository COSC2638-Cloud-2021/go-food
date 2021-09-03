// const API_PATH = "http://localhost:" //for local test
const API_PATH = "http://13.212.232.182:" //for deploy aws backend_ec2_ip

const PORTS = {
    'accounts': '8080'
}

const API_ACCOUNT = API_PATH + PORTS.accounts + "/accounts"


export {API_PATH, PORTS, API_ACCOUNT}
