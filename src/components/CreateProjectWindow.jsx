import React, { useState, useEffect } from 'react'
import { dropdownIcon } from '../assets';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { readClientRequest, createClientRequest, createProjectRequest } from '../api';

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

const CreateProjectWindow = ({setOpen}) => {
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
                <Dropdown setClient={setClient}/>
                <input onChange={e => {if(e.target.checked) setAccess('Public'); else setAccess('Private')}} type='checkbox' defaultChecked></input>
                <label>Public</label>
            </div>
            <div className='gap-2 justify-end flex'>
                    <button onClick={() => setOpen(false)} className="border border-gray-200 text-blue-500 hover:bg-gray-200 px-5 py-2">Cancel</button>
                    <button onClick={() => {setOpen(false); createProject({_id: text, client, access})}} className="bg-blue-400 text-white hover:bg-blue-500 px-5 py-2">CREATE</button>
            </div>
        </div>
    </div>
    )
}

export default CreateProjectWindow;