import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { readProjectRequest, readTaskRequest, readClientRequest, createClientRequest, createTaskRequest } from '../api';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { NavLink } from 'react-router-dom';

const Dropdown = ({setClient}) => {
    const [isOpen, setIsOpen] = useState(false);
    const {data: clients} = useQuery('clients',
        readClientRequest
    );
    const queryClient = useQueryClient();
    const { mutate: createClient } = useMutation(
        (newClient) => createClientRequest(newClient),{
            onSettled: () => {
                queryClient.invalidateQueries('clients');
            },
        }
    );
    const [searchInput, setSearchInput] = useState('')
    const [searchResult, setSearchResult] = useState(clients);
    useEffect(() => {
        if(searchInput && clients){
            setSearchResult(clients.filter((client) => {return client._id.match(searchInput)}));
            return;
        }
        setSearchResult(clients);
    }, [searchInput, clients])
    
    return (
        <div onBlur={() => setTimeout(() => setIsOpen(false),180)} className='bg-white divide-y divide-gray-100 flex-col w-full'>
            <input onFocus={() => setIsOpen(true)} onChange={e => { setSearchInput(e.target.value);}} value={searchInput} type='search' 
            className='border border-primaryBorder p-3 focus:border-gray-400 focus:outline-none' 
            placeholder='Search or create client'></input>
            
            {isOpen &&
                <div className='absolute bg-white shadow-xl overflow-hidden border border-primaryBorder'>
                    {
                        searchResult === undefined || searchResult.length == 0? <div className='m-2'>No clients</div> :
                        searchResult.map((client) => (
                            <button key={client._id} className='flex w-full hover:bg-bgColor p-1 px-3' onClick={() => {setIsOpen(false); setClient(client._id); setSearchInput(client._id)}}>
                                {client._id}
                            </button>
                            )
                        )
                    }
                    <button onClick={() => {
                        if(searchInput){
                            setClient(searchInput);
                            createClient({_id: searchInput});
                            setIsOpen(false);
                            setSearchInput(searchInput)}
                        }} className='hover:cursor-pointer hover:underline text-primary my-2 mx-3 flex'>Create new client</button>
                </div>
            }
        </div>
    )
}

const project = () => {
    const [currentTab, setCurrentTab] = useState('TASKS')
    const location = useLocation();
    const {isLoading, data: projectsData} = useQuery(['projects', location.search.slice(1,)],
        readProjectRequest
    );
    const tabData = [
        {name: 'TASKS', link: projectsData ? <Tasks ids={projectsData.tasks} projectName={projectsData._id}/> : null},
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

const Tasks = ({ids, projectName}) => {
    const [name, setName] = useState('');
    const [deadline, setDeadline] = useState(new Date());
    const [client, setClient] = useState('');
    const {isLoading, data: tasks} = useQuery(['tasks', ids],
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
    return (
        <div className='p-5'>
            <div className='flex flex-col xl:flex-row gap-2 justify-between'>
                <div className='flex gap-2'>
                    <input onChange={e => setName(e.target.value)} className='w-full hover:border-primaryBorder border focus:outline-primaryBorder p-2 placeholder:text-xs' placeholder='Add new task'></input>
                    <Dropdown setClient={setClient}/>
                    <input type="date" onChange={e => setDeadline(e.target.value)} className='w-full hover:border-primaryBorder border focus:outline-primaryBorder p-2 placeholder:text-xs' placeholder='Add deadline'></input>
                </div>
                    <button onClick={() => {
                        if(name){
                            createTask({text:name, deadline, assignedTo:client, project: projectName});
                            setName('');
                            setDeadline(new Date());
                            setClient('');
                        }
                    }} className="text-primary border border-primary hover:bg-primaryHover hover:text-white p-2">Add</button>
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
            <div className='flex flex-col gap-1'>
                {isLoading ? <div>Loading...</div> :
                    tasks.map((task) => (
                        <div className='flex list-none p-2 border-b border-b-primaryBorder hover:shadow-[0_0px_20px_rgba(0,0,0,0.15)]' key={task._id}>
                            <div className='p-2 w-full'>{task.text}</div>
                            <div className='p-2 w-full'>{console.log(task)}</div>
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