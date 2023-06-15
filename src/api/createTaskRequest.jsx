import { API_URL } from "./config";

const createTaskRequest = async (task) => {
    const response = await fetch(`${API_URL}/task`, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            text: task.text,
            time: task.time,
            deadline: task.deadline,
            assigedTo: task.assigedTo,
            project: task.project
        })
    });
    return await response.json();
};

export default createTaskRequest;