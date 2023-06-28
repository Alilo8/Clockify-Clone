import React, { useState, useEffect } from "react";
import { readProjectRequest } from "../api";
import { useQuery } from "react-query";

const DropdownProject = ({setProject, selectedProject, onCreateProject}) => {
    let jsonObj = localStorage.getItem('access')
    const managerID = JSON.parse(jsonObj)['username'];

    const [isOpen, setIsOpen] = useState(false);
    const {data: projects} = useQuery(['projects', 'bulk', managerID],
        readProjectRequest
    );
    const [searchResult, setSearchResult] = useState(projects);
    useEffect(() => {
        if(selectedProject && projects){
            setSearchResult(projects.filter((project) => {return project._id.match(selectedProject)}));
            return;
        }
        setSearchResult(projects);
    }, [selectedProject, projects])
    
    return (
        <div onBlur={() => setTimeout(() => setIsOpen(false),180)} className='bg-white divide-y divide-gray-100 flex-col w-full'>
            <input onFocus={() => setIsOpen(true)} onChange={e => { setProject(e.target.value);}} value={selectedProject} type='search' 
            className='w-full hover:border-primaryBorder border focus:border-transparent focus:outline-primaryBorder p-2 placeholder:text-xs' 
            placeholder='Search or create project'></input>
            
            {isOpen &&
                <div className='absolute bg-white shadow-xl overflow-hidden border border-primaryBorder'>
                    {
                        searchResult === undefined || searchResult.length == 0 ? <div className='m-2'>No projects</div> :
                        searchResult.map((project) => (
                            <button key={project._id} className='flex w-full hover:bg-bgColor p-1 px-3' onClick={() => {setIsOpen(false); setProject(project._id); setProject(project._id)}}>
                                {project._id}
                            </button>
                            )
                        )
                    }
                    <button onClick={() => {setIsOpen(false); onCreateProject()}} className='hover:cursor-pointer hover:underline text-primary my-2 mx-3 flex'>Create new project</button>
                </div>
            }
        </div>
    )
}

export default DropdownProject;