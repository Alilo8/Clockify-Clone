import { API_URL } from "./config";

const updateTaskRequest = (task) => {
    return fetch(`${API_URL}/task/${task._id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            text: task.text,
            project: task.project,
        })
    });
};

export default updateTaskRequest;