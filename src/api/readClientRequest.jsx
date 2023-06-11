import { API_URL } from "./config";

const readClientRequest = async () => {
    return await fetch(`${API_URL}/client`)
    .then(response => response.json())
}

export default readClientRequest;