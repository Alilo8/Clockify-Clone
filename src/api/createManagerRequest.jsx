import { API_URL } from "./config";

const createManagerRequest = async (manager) => {
    const response = await fetch (`${API_URL}/manager`, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            _id: manager._id,
            name: manager.name,
            email: manager.email,
            password: manager.password,
        })
    });
    return await response.json();
};

export default createManagerRequest;