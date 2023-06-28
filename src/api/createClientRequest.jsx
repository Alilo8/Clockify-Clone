import { API_URL } from "./config";

const createClientRequest = async (client) => {
    const response = await fetch(`${API_URL}/client`, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            _id: client._id,
        })
    });
    return await response.json();
};

export default createClientRequest;