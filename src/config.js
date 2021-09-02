// const API_PATH = "http://localhost:" //for local test
const API_PATH = "http://13.228.29.97:" //for deploy aws

const PORTS = {
    'accounts': '8080'
}

const API_ACCOUNT = API_PATH + PORTS.accounts + "/accounts"


export {API_PATH, PORTS, API_ACCOUNT}
