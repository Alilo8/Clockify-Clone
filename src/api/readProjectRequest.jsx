import { API_URL } from "./config";

const readProjectRequest = async ({queryKey}) => {
    const [_, _id] = queryKey;
    if(_id)
        return await fetch(`${API_URL}/project/${_id}`)
        .then(response => response.json())
    else
        return await fetch(`${API_URL}/project`)
        .then(response => response.json())
}

export default readProjectRequest;