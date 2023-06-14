import { API_URL } from "./config";

const readTaskRequest = async ({queryKey}) => {
    const [_, ids] = queryKey;
    if(ids)
        return await fetch(`${API_URL}/task/${ids}`)
        .then(response => response.json())
    else
        return fetch(`${API_URL}/task`)
        .then(response => response.json())
}

export default readTaskRequest;