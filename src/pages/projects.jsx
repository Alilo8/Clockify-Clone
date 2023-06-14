import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { search_icon, dropdownIcon } from "../assets";
import { readClientRequest, readProjectRequest } from '../api';
import { useQuery } from 'react-query';
import { CreateProjectWindow, Timer } from "../components";

const Dropdown = ({items, setItem, defaultItem, title}) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div onBlur={() => setTimeout(() => setIsOpen(false),180)} className='bg-white divide-y divide-gray-100 flex-col w-full'>
            <button className='flex justify-between py-5 px-3 items-center' onClick={() => setIsOpen(!isOpen)}>
                    {title}:&nbsp; <span className="text-primary">{defaultItem}</span> <img src={dropdownIcon}/> 
            </button>
            {isOpen &&
                <div className='absolute bg-white shadow-xl overflow-hidden border border-primaryBorder w-44'>
                    <button className='flex w-full hover:bg-bgColor p-1 px-3' onClick={() => {setIsOpen(false); setItem('All');}}>
                        All
                    </button>
                    {
                        !items ? <div>Loading...</div> :
                        items.map((item) => (
                            <button key={item._id} className='flex w-full hover:bg-bgColor p-1 px-3' onClick={() => {setIsOpen(false); setItem(item._id);}}>
                                {item._id}
                            </button>
                            )
                        )
                    }
                </div>
            }
        </div>
    )
}

const projects = () => {
    const [openCPWindow, setOpenCPWindow] = useState(false);
    const [status, setStatus] = useState('Active');
    const [access, setAccess] = useState('Public');
    const [client, setClient] = useState('All');
    const [name, setName] = useState('');
    const inputRef = useRef();

    const {isLoading, data: projectsData} = useQuery('projects',
        readProjectRequest
    );
    const [filterProjects, setFilterProjects] = useState(projectsData);
    useEffect(() => {
        setFilterProjects(projectsData);
        if(projectsData)
            onApplyFilter();
    }, [projectsData])
    const {data: clients} = useQuery('clients',
        readClientRequest
    );
    const onApplyFilter = () => {
        let temp = projectsData;
        if(status!=='All'){
            temp = temp.filter((project) => {return project.status.match(status)})
        }
        if(access!=='All'){
            temp = temp.filter((project) => {return project.access.match(access)})
        }
        if(client!=='All'){
            temp = temp.filter((project) => {return project.client.match(client)})
        }
        if(name){
            temp = temp.filter((project) => {return project._id.match(name)})
        }
        setFilterProjects(temp);
    }
    return (
        <div className="flex w-full h-full bg-bgColor overflow-hidden">
            <div className="my-10 mx-5 w-full">
                <div className="flex justify-between">
                    <h1 className="text-2xl">Projects</h1>
                    <button onClick={() => setOpenCPWindow(true)} className="bg-primary text-white text-sm hover:bg-primaryHover px-5 py-2">
                        CREATE NEW PROJECT
                    </button>
                </div>
                <div className="flex lg:flex-row flex-col w-fit lg:w-full items-center bg-white my-5 justify-between shadow-lg border border-primaryBorder text-sm">
                    <ul className="list-none flex">
                        <li className="py-5 px-3 text-gray-400">FILTER</li>
                        <li className="hover:shadow-[0_0px_20px_rgba(0,0,0,0.15)]">
                            <Dropdown items={[{_id:'Active'}, {_id:'Archive'}]} setItem={setStatus} defaultItem={status} title={'Status'} />
                        </li>
                        <li className="hover:shadow-[0_0px_20px_rgba(0,0,0,0.15)]">
                            <Dropdown items={clients} setItem={setClient} defaultItem={client} title={'Client'}/>
                        </li>
                        <li className="hover:shadow-[0_0px_20px_rgba(0,0,0,0.15)]">
                            <Dropdown items={[{_id:'Public'}, {_id:'Private'}]} setItem={setAccess} defaultItem={access} title={'Access'} />
                        </li>
                    </ul>
                    <ul className="flex list-none">
                        <li onClick={() => inputRef.current.focus()} className="p-5 hover:shadow-[0_0px_20px_rgba(0,0,0,0.15)] hover:cursor-pointer"><img src={search_icon}/></li>
                        <li className="p-2">
                            <input onChange={e => setName(e.target.value)} ref={inputRef} className="border border-transparent p-3 hover:border-primaryBorder focus:outline-primaryBorder" type="text" placeholder="Find by name"></input>
                        </li>
                        <li className="p-2">
                            <button onClick={onApplyFilter} className="text-primary border border-primary hover:bg-primaryHover hover:text-white p-3">APPLY FILTER</button>
                        </li>
                    </ul>
                </div>
                <div className="my-10 border border-primaryBorder bg-white w-full">
                    <li className="flex list-none bg-primaryBorder p-5">
                        <ul className="w-full">Name</ul>
                        <ul className="w-full">Tracked</ul>
                        <ul className="w-full">Access</ul>
                        <ul className="w-full">Status</ul>
                    </li>
                    {filterProjects === undefined ?
                        <div>Loading...</div> 
                        :
                        filterProjects.map((project) => (
                            <NavLink to={{pathname:'/project', search: project._id}} key={project._id}>
                                <li key={project._id} className="flex list-none p-5 border-b border-b-primaryBorder hover:shadow-[0_0px_20px_rgba(0,0,0,0.15)]">
                                    <ul className="w-full">{project._id}</ul>
                                    <ul className="w-full"><Timer isRunning={false} time={Date.parse(project.time)} /></ul>
                                    <ul className="w-full">{project.access}</ul>
                                    <ul className="w-full">{project.status}</ul>
                                </li>
                            </NavLink>
                        ))
                        }

                </div>
            </div>
            {openCPWindow && <CreateProjectWindow setOpen={setOpenCPWindow}/>}
        </div>
    )
}

export default projects;