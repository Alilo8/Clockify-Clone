import React, { useEffect, useState } from "react";
import { playButton, deleteIcon, pauseButton } from "../assets";
import { readTaskRequest, createTaskRequest, deleteTaskRequest, updateTaskRequest, updateManagerRequest, readManagerRequest } from "../api";
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { CreateProjectWindow, DropdownProject, Timer, Dropdown } from "../components";

const tracker = () => {
    const jsonObj = localStorage.getItem('access')
    const managerID = JSON.parse(jsonObj)['username'];
    
    const [selectedProject, setSelectedProject] = useState('');
    const [openCPWindow, setOpenCPWindow] = useState(false);
    const [text, setText] = useState('');
    const [due, setDue] = useState('');
    const [time, setTime] = useState(0);
    const [id, setId] = useState(2);
    const [status, setStatus] = useState('All')
    
    const {data: manager} = useQuery(['manager', managerID, 'id'], readManagerRequest);
    const {isLoading, data: tasks} = useQuery(['tasks', managerID, 'manager'],
        readTaskRequest
    );
    const queryClient = useQueryClient();
    const { mutate: createTask } = useMutation(
        (newTask) => createTaskRequest(newTask),{
            onSettled: () => {
                queryClient.invalidateQueries('tasks');
            },
        }
    );
    const { mutate: deleteTask } = useMutation(
        (newTask) => deleteTaskRequest(newTask),{
            onSettled: () => {
                queryClient.invalidateQueries('tasks');
            },
        }
    );
    const { mutate: updateTask } = useMutation(
        (updatedTask) => updateTaskRequest(updatedTask), {
            onSettled: () => {
                queryClient.invalidateQueries('tasks');
            },
        }
    );
    const { mutate: updateManager } = useMutation(
        (updatedManager) => updateManagerRequest(updatedManager), {
            onSettled: () => {
                queryClient.invalidateQueries('tasks');
            },
        }
    );
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
    if (!isInitialized) {
        if (manager !== undefined && !isLoading) {
            setIsInitialized(true);
            // console.log(running);
            // console.log(typeof(manager.task_start), typeof(Date.now()));
            // console.log(Date.now() - manager.task_start);
            setId(manager.task_id);
            if (manager.task_id !== 0) 
                for (const task of tasks) 
                    if (manager.task_id === task._id) {
                        console.log('before ',task.time)
                        task.time = task.time + Date.now() - manager.task_start;
                        console.log('after ', task.time)
                        updateTask(task);
                    }
        }
    }
    }, [isInitialized, manager, tasks, time]);

    const [filterTasks, setFilterTasks] = useState(tasks);
    useEffect(() => {
        if(tasks){
            setFilterTasks(tasks);
            onApplyFilter();
        }
    }, [tasks])
    const onApplyFilter = () => {
        let temp = tasks;
        if(status!=='All'){
            if(status==='Completed')
                temp = temp.filter((task) => {return getProgress(task) == 100 ? task: null})
            else if(status==='Pending')
                temp = temp.filter((task) => {return getProgress(task) == 0 ? task: null})
            else
                temp = temp.filter((task) => {return getProgress(task) > 0 && getProgress(task) < 100 ? task: null})
        }
        setFilterTasks(temp)
    }
    const onCreateProject = () => {
        setOpenCPWindow(true);
    }
    const handlePlay = (task) => {
        if(manager.task_id != 0)
            handlePause();
        if(getProgress(task) >= 100)
            return
        task.run = true;
        updateTask(task);
        setId(task._id);
        manager.task_id = task._id;
        manager.task_start = Date.now();
        updateManager(manager);
    }
    const handlePause = (task) => {
        manager.task_id = 0;
        updateManager(manager);
        console.log(manager)
        if(!task)
            for(const t of tasks)
                if(id === t._id){
                    task = t
                    break
                }
        task.time = time;
        task.run = false;
        updateTask(task);
    }

    const getProgress = (task) => {
        let progress;
        if(task.run){
            progress = Math.round(time / (task.due * 3600000) * 100)
            if(progress > 100){
                progress = 100
                setTime(task.due * 3600000)
                handlePause(task)
            }
        }
        else{
            progress = Math.round(task.time / (task.due * 3600000) * 100);
            if(progress > 100){
                progress = 100
                task.time = task.due * 3600000;
                updateTask(task)
            }
        }
        return progress
    }
    // useEffect(() => {
    //     readProjectRequest().then(allProjects => 
    //         console.log(allProjects))
    // })
    return (
        // Create
        <div className="bg-bgColor h-full p-5">
            <h1 className="text-2xl p-4">Time Tracker</h1>
            <div className='flex shadow-lg border border-primaryBorder gap-2 bg-white justify-between'>
                <div className='flex gap-2 p-3 items-center'>
                    <input onChange={e => setText(e.target.value)} value={text} className='w-full hover:border-primaryBorder border focus:outline-primaryBorder p-2 placeholder:text-xs' placeholder='Add new task'></input>
                    <input type="number" onChange={e => {if(e.target.value < 1) e.target.value = 1; setDue(e.target.value) }} value={due} className='w-full hover:border-primaryBorder border focus:outline-primaryBorder p-2 placeholder:text-xs' placeholder='Add due(in hours)'></input>
                    <DropdownProject setProject={setSelectedProject} selectedProject={selectedProject} onCreateProject={onCreateProject}/>
                </div>
                <button onClick={() => {
                    if(text){
                        createTask({text, time:0, project: selectedProject, due, assignedTo: 'Ali', managerID: managerID});
                        setText('');
                        setDue('');
                        setSelectedProject('');
                    }
                }} className=" bg-primary hover:bg-primaryHover text-white py-2 px-3 m-3 text-sm">ADD</button>
            </div>
            <div className='flex items-center shadow-lg border border-primaryBorder bg-white justify-between my-10'>
                <div className="flex gap-5">
                    <div className="text-primaryBorder py-5 px-3">Filter</div>
                    <div className=" py-5 px-3">Range</div>
                    <div className="hover:shadow-[0_0px_20px_rgba(0,0,0,0.15)]">
                        <Dropdown items={[{_id:'Pending'}, {_id:'On going'}, {_id:'Completed'}]} setItem={setStatus} defaultItem={status} title={'Status'} />
                    </div>
                </div>
                <button onClick={onApplyFilter} className="my-4 mx-3 text-primary border border-primary hover:bg-primaryHover hover:text-white py-2 px-5 text-sm">APPLY FILTER</button>
            </div>
            <div className='flex shadow-lg py-3 px-5 bg-primaryBorder justify-between gap-2 mt-10'>
                <div className="w-32 truncate">Task ID</div>
                <div className="w-32 truncate">Task Name</div>
                <div className="w-32 truncate">Project</div>
                <div className="w-32 truncate">Due</div>
                <div className="w-32 truncate">Progress</div>
                <div className="w-32 truncate">Time Tracked</div>
            </div>
            <div className="flex flex-col bg-white shadow-lg">
                {
                    filterTasks == undefined ? <div>Loadding...</div> :
                    filterTasks == null ? <div>No tasks</div> :
                    filterTasks.map((task) => (
                    <div key={task._id} className='flex p-5 justify-between gap-2 border-b border-b-primaryBorder items-center hover:shadow-[0_0px_20px_rgba(0,0,0,0.15)]'>
                        <div className="w-32 truncate">{task._id}</div>
                        <div className="w-32 truncate">{task.text}</div>
                        <div className="w-32 truncate">{task.project}</div>
                        <div className="w-32">{task.due}h</div>
                        <div className="w-32 truncate">{getProgress(task)}%</div>
                        <div className="w-32 justify-between flex items-center">
                                <Timer isRunning={task.run} time={task.time} setTime={setTime}/>
                                {task.run ?
                                    <button onClick={() => handlePause(task)}>
                                        <img src={pauseButton} alt="pause"/>
                                    </button> :
                                    <button onClick={() => handlePlay(task)}><img src={playButton} alt="play"/></button>
                                }
                                <button onClick={() => deleteTask(task)}><img src={deleteIcon} alt="delete"/></button>
                        </div>
                    </div>
                ))}
            </div>
            {openCPWindow && <CreateProjectWindow setOpen={setOpenCPWindow} setProject={setSelectedProject}/>}
        </div>
    )
}

export default tracker;