import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { readProjectRequest, readTaskRequest, readClientRequest, createClientRequest, createTaskRequest } from '../api';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { NavLink } from 'react-router-dom';
import { DropdownMember } from '../components';

const project = () => {
    const [currentTab, setCurrentTab] = useState('TASKS')
    const location = useLocation();
    const {isLoading, data: projectsData} = useQuery(['projects', 'single', location.search.slice(1,)],
        readProjectRequest
    );
    const tabData = [
        {name: 'TASKS', link: projectsData ? <Tasks projectName={projectsData._id}/> : null},
        {name: 'ACCESS', link: projectsData ? <Access access={projectsData.access} /> : null},
        {name: 'STATUS', link: projectsData ? <Status status={projectsData.status} /> : null},
        {name: 'Client', link: <Client />},
    ]
    return (
        <div className='py-10 px-5'>
            <p><NavLink className='text-sm text-primary hover:underline' to='/projects'>Projects</NavLink></p>
            {isLoading ? <div>Loading...</div> : <h1 className='text-2xl'>{projectsData._id}</h1>}
            <div className='flex flex-wrap mt-5'>
                {tabData.map((tab) => (
                    <div key={tab.name} onClick={() => setCurrentTab(tab.name)} 
                    className={` mr-2 px-5 py-3 hover:cursor-pointer shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.15)] ${
                        currentTab === tab.name ? 'bg-white' : 'bg-primaryBorder hover:bg-white'}`}>
                            {tab.name} </div>
                ))}
            </div>
            <div className='w-full bg-white shadow-lg'>
                {tabData.map((tab) => (
                    <div key={tab.name}>{currentTab === tab.name && tab.link}</div>
                ))}
            </div>
        </div>
    )
}

const Tasks = ({projectName}) => {
    const jsonObj = localStorage.getItem('access')
    const managerID = JSON.parse(jsonObj)['username'];

    const [pending, setPending] = useState(0);
    const [ongoing, setOngoing] = useState(0);
    const [completed, setCompleted] = useState(0);
    const [isinit, setIsinit] = useState(true);
    const [text, setText] = useState('');
    const [due, setDue] = useState('');
    const [assignedTo, setAssignedTo] = useState('');
    const {isLoading, data: tasks} = useQuery(['tasks', projectName, 'project'],
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
    const getProgress = (task) => {
        return Math.round(task.time / (task.due * 3600000) * 100)
    }
    let completed_temp, pending_temp, ongoing_temp;
    const setStatus = (task) => {
        const progress = getProgress(task)
        if(progress == 100)
            completed_temp++
        else if(progress == 0)
            pending_temp++
        else
            ongoing_temp++
    }

    useEffect(() => {
        if(isinit && !isLoading){
            setIsinit(false)
            // setCompleted(0)
            // setPending(0)
            // setOngoing(0)
            completed_temp = 0;
            pending_temp = 0;
            ongoing_temp = 0;
            tasks.forEach(task => {
                setStatus(task)
            });
            setCompleted(completed_temp)
            setPending(pending_temp)
            setOngoing(ongoing_temp)
        }
    }, [isinit, isLoading])
    return (
        <div className='p-5'>
            <div className='flex flex-col xl:flex-row gap-2'>
                <div className='flex gap-2 w-full'>
                    <input onChange={e => setText(e.target.value)} className='w-full hover:border-primaryBorder border focus:outline-primaryBorder p-2 placeholder:text-xs' placeholder='Add new task'></input>
                    <input type="number" onChange={e => {if(e.target.value < 1) e.target.value = 1; setDue(e.target.value) }} className='w-full hover:border-primaryBorder border focus:outline-primaryBorder p-2 placeholder:text-xs' placeholder='Add due(in hours)'></input>
                </div>
                <div className='flex justify-between w-full gap-2'>
                    <DropdownMember setClient={setAssignedTo}/>
                    <button onClick={() => {
                        if(text){
                            createTask({text, time:0, project: projectName, due, assignedTo, managerID: managerID});
                            setText('');
                            setDue('');
                            setAssignedTo('');
                        }
                    }} className="text-primary border border-primary hover:bg-primaryHover hover:text-white p-2">Add</button>
                </div>
            </div>
            <div className='flex gap-2 mt-5'>
                <div className='bg-primaryBorder p-2 w-full'>Pending</div>
                <div className='bg-primaryBorder p-2 w-full'>On going</div>
                <div className='bg-primaryBorder p-2 w-full'>Completed</div>
            </div>
            <div className='flex gap-2'>
                <div className='p-2 w-full border border-primaryBorder'>{pending}</div>
                <div className='p-2 w-full border border-primaryBorder'>{ongoing}</div>
                <div className='p-2 w-full border border-primaryBorder'>{completed}</div>
            </div>
            <div className='flex mt-5'>
                <div className='bg-primaryBorder p-2 w-full'>Task</div>
                <div className='bg-primaryBorder p-2 w-full'>Assigned To</div>
            </div>
            <div className='flex flex-col'>
                {isLoading ? <div>Loading...</div> :
                    tasks.map((task) => (
                        <div className='flex list-none p-2 border-b border-b-primaryBorder hover:shadow-[0_0px_20px_rgba(0,0,0,0.15)]' key={task._id}>
                            <div className='p-2 w-full'>{task.text}</div>
                            <div className='p-2 w-full'>{task.assignedTo}</div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
const Access = ({access}) => {
    const [current, setCurrent] = useState(access);
    return ( 
        <div className='flex flex-col p-5 gap-5'>
            <div>
                <h1 className='text-xl font-semibold'>Visibiliy</h1>
                <p className='font text-gray-400'>Only people you add to the project can track the time on it</p>
            </div>
            <div>
                <div className='hover:cursor-pointer' onClick={() => {setCurrent('Public')}}>
                    <input onChange={() => {}} checked={current==='Public'} type='radio' /> Public
                </div>
                <div className='hover:cursor-pointer' onClick={() => {setCurrent('Private')}}>
                    <input onChange={() => {}} checked={current==='Private'} type='radio' /> Private
                </div>
            </div>
        </div>
    )
}
const Status = ({status}) => {
    const [current, setCurrent] = useState(status);
    return (
        <div className='flex flex-col p-5'>
            <div className='hover:cursor-pointer' onClick={() => {setCurrent('Active')}}>
                <input onChange={() => {}} checked={current==='Active'} type='radio' /> Active
            </div>
            <div className='hover:cursor-pointer' onClick={() => {setCurrent('Archived')}}>
                <input onChange={() => {}} checked={current==='Archived'} type='radio' /> Archived
            </div>
        </div>
    )
}
const Client = () => {
    return (
        <div>Client</div>
    )
}

export default project