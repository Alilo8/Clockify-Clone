import { API_URL } from "./config";

const readProjectRequest = async () => {
    return await fetch(`${API_URL}/project`)
    .then(response => response.json())
}

export default readProjectRequest;