// const API_PATH = "http://localhost:" //for local test
const API_PATH = "http://18.140.115.195:" //for deploy aws

const PORTS = {
    'accounts': '8080'
}

const API_ACCOUNT = API_PATH + PORTS.accounts + "/accounts"


export {API_PATH, PORTS, API_ACCOUNT}
