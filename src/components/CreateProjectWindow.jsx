import React, { useState } from 'react'
import { useQueryClient, useMutation } from 'react-query';
import { createProjectRequest } from '../api';
import { DropdownMember } from './index';
import { useStateContext } from '../contexts/ContextProvider';

const CreateProjectWindow = ({setOpen, setProject}) => {
    const jsonObj = localStorage.getItem('access')
    const managerID = JSON.parse(jsonObj)['username'];

    const [text, setText] = useState('');
    const [client, setClient] = useState('');
    const [access, setAccess] = useState('Public');
    const queryClient = useQueryClient();
    const { mutate: createProject } = useMutation(
        (newProject) => createProjectRequest(newProject),{
            onSettled: () => {
                queryClient.invalidateQueries('projects');
            },
        }
    );
    return (
    <div className='bg-black w-screen h-screen bg-opacity-50 fixed top-0 right-0 flex items-center justify-center'>
        <div className='bg-white p-5 flex flex-col text-sm gap-5'>
            <h1 className='text-2xl'>Create new project</h1>
            <input onChange={e => setText(e.target.value)} className='outline-primaryBorder border p-3' type='dropdown' placeholder='Enter project name '></input>
            <div className='flex items-center gap-2'>
                <DropdownMember setClient={setClient}/>
                <input onChange={e => {if(e.target.checked) setAccess('Public'); else setAccess('Private')}} type='checkbox' defaultChecked></input>
                <label>Public</label>
            </div>
            <div className='gap-2 justify-end flex'>
                    <button onClick={() => setOpen(false)} className="border border-gray-200 text-blue-500 hover:bg-gray-200 px-5 py-2">Cancel</button>
                    <button onClick={() => {
                        setOpen(false); 
                        createProject({_id: text, client, access, managerID: managerID}); 
                        if(typeof(setProject) === 'function') setProject(text)
                    }} 
                    className="bg-blue-400 text-white hover:bg-blue-500 px-5 py-2">CREATE</button>
            </div>
        </div>
    </div>
    )
}

export default CreateProjectWindow;