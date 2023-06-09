import { API_URL } from "./config";

const readTaskRequest = async () => {
    return fetch(`${API_URL}/task`)
    .then(response => response.json())
}

export default readTaskRequest;