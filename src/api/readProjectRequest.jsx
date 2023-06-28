import { API_URL } from "./config";

const readProjectRequest = async ({queryKey}) => {
    const [_, type, _id] = queryKey;
    return await fetch(`${API_URL}/project/${_id}?type=${type}`)
    .then(response => response.json())
}

export default readProjectRequest;