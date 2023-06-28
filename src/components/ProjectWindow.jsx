import React, { useEffect, useState } from 'react'
import { readProjectRequest } from '../api';
import { useQuery } from 'react-query';
import { useStateContext } from '../contexts/ContextProvider';

const ProjectWindow = ({ handleProjectClick }) => {
    const {setOpenProjectWindow} = useStateContext();
    const {data: projects} = useQuery('projects',
        readProjectRequest
    );
    
    const [searchInput, setSearchInput] = useState('')
    const [searchResult, setSearchResult] = useState(projects);
    useEffect(() => {
        if(searchInput){
            setSearchResult(projects.filter((project) => {return project._id.match(searchInput)}));
            return;
        }
        setSearchResult(projects);
    }, [searchInput, projects])
    return (
        <div className='bg-black w-screen h-screen bg-opacity-50 fixed top-0 right-0 flex items-center justify-center'>
            <div className='bg-white p-5 flex flex-col gap-2 text-sm'>
                <input onChange={e => {
                    setSearchInput(e.target.value); 
                }} value={searchInput} type='search' className='focus:border hover:border hover:border-gray-300 border border-transparent focus:border-gray-500 focus:outline-none p-2' placeholder='Search or create project'></input>
                <div>
                    {searchResult === undefined ? (<div>Loading...</div>) : (
                        searchResult.length == 0 ? (<div>Not found create new! </div>) : (
                            searchResult.map((project) => (
                                <div onClick={() => {setOpenProjectWindow(false); handleProjectClick(project._id)}} className='hover:bg-gray-200 p-2' key={project._id}>
                                    {project._id}
                                </div>
                            ))
                        )
                    )}
                </div>
                <div onClick={() => {setOpenProjectWindow(false); handleProjectClick('')}} className='hover:bg-gray-200 p-2'>
                    No Project
                </div>
                <div className='gap-2 justify-end flex'>
                    <button onClick={() => setOpenProjectWindow(false)} className="border border-gray-200 text-blue-500 hover:bg-gray-200 px-5 py-2">Cancel</button>
                    <button onClick={() => setOpenProjectWindow(false)} className="bg-blue-400 text-white hover:bg-blue-500 px-5 py-2">CREATE</button>
                </div>
            </div>
        </div>
    )
}

export default ProjectWindow;