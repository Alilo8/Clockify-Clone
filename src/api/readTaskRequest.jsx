import { API_URL } from "./config";

const readTaskRequest = async ({queryKey}) => {
    const [_, id, type] = queryKey;
    return await fetch(`${API_URL}/task/${id}?type=${type}`)
    .then(response => response.json())
}

export default readTaskRequest;