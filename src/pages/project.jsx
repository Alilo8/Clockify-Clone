import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { readProjectRequest, readTaskRequest } from '../api';
import { useQuery } from 'react-query';
import { NavLink } from 'react-router-dom';

const project = () => {
    const [currentTab, setCurrentTab] = useState('TASKS')
    const location = useLocation();
    const {isLoading, data: projectsData} = useQuery(['projects', location.search.slice(1,)],
        readProjectRequest
    );
    const tabData = [
        {name: 'TASKS', link: projectsData ? <Tasks ids={projectsData.tasks} /> : null},
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

const Tasks = ({ids}) => {
    const {isLoading, data: tasks} = useQuery(['tasks', ids],
            readTaskRequest
        );

    return (
        <div className='p-5'>
            <div className='flex flex-col xl:flex-row gap-2'>
                <div className='flex gap-2'>
                    <input className='w-full hover:border-primaryBorder border focus:outline-primaryBorder p-2 placeholder:text-xs' placeholder='Add new task'></input>
                    <input className='w-full hover:border-primaryBorder border focus:outline-primaryBorder p-2 placeholder:text-xs' placeholder='Assign task to'></input>
                </div>
                <div className='flex gap-2 justify-between'>
                    <input className='w-full hover:border-primaryBorder border focus:outline-primaryBorder p-2 placeholder:text-xs' placeholder='Add deadline'></input>
                    <button className="text-primary border border-primary hover:bg-primaryHover hover:text-white p-2">Add</button>
                </div>
            </div>
            <div className='flex gap-2 mt-5'>
                <div className='bg-primaryBorder p-2 w-full'>Pending</div>
                <div className='bg-primaryBorder p-2 w-full'>On going</div>
                <div className='bg-primaryBorder p-2 w-full'>Completed</div>
            </div>
            <div className='flex gap-2'>
                <div className='p-2 w-full border border-primaryBorder'>Name</div>
                <div className='p-2 w-full border border-primaryBorder'>Name</div>
                <div className='p-2 w-full border border-primaryBorder'>Name</div>
            </div>
            <div className='flex mt-5'>
                <div className='bg-primaryBorder p-2 w-full'>Task</div>
                <div className='bg-primaryBorder p-2 w-full'>Assigned To</div>
            </div>
            <div className='flex flex-col mt-5 gap-1'>
                {isLoading ? <div>Loading...</div> :
                    tasks.map((task) => (
                        <div key={task._id}>
                            {task.text}
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
        <div className='flex flex-col p-5'>
            <div className='hover:cursor-pointer' onClick={() => {setCurrent('Public')}}>
                <input onChange={() => {}} checked={current==='Public'} type='radio' /> Public
            </div>
            <div className='hover:cursor-pointer' onClick={() => {setCurrent('Private')}}>
                <input onChange={() => {}} checked={current==='Private'} type='radio' /> Private
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