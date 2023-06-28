import { API_URL } from "./config";

const createTaskRequest = async (task) => {
    console.log(task.assignedTo)
    const response = await fetch(`${API_URL}/task`, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            text: task.text,
            time: task.time,
            project: task.project,
            due: task.due,
            assignedTo: task.assignedTo,
            managerID: task.managerID,
        })
    });
    return await response.json();
};

export default createTaskRequest;