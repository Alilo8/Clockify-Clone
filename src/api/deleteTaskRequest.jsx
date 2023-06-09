import { API_URL } from "./config";

const deleteTaskRequest = (task) => {
    return fetch(`${API_URL}/task/${task._id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": 'application/json'
        },
    });
};

export default deleteTaskRequest;