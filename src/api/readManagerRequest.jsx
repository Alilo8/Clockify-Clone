import { API_URL } from "./config";

const readManagerRequest = async ({queryKey}) => {
    const [_, email, type] = queryKey;
    return await fetch(`${API_URL}/manager/${email}?type=${type}`)
    .then(response => response.json())
};

export default readManagerRequest;