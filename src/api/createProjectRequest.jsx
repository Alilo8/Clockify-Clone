import { API_URL } from "./config";

const createProjectRequest = async (project) => {
    const response = await fetch(`${API_URL}/project`, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            _id: project._id,
            client: project.client,
            access: project.access,
            managerID: project.managerID,
        })
    });
    return await response.json();
};

export default createProjectRequest;