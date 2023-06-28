import { API_URL } from "./config";

const updateManagerRequest = (manager) => {
    return fetch(`${API_URL}/manager/${manager._id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            task_id: manager.task_id,
            task_start: manager.task_start,
            task_time: manager.task_time,
        })
    });
};

export default updateManagerRequest;