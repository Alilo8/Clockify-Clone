import React, { useState, useEffect } from "react";
import { createClientRequest, readClientRequest } from "../api";
import { useQuery, useQueryClient, useMutation } from "react-query";

const DropdownMember = ({setClient}) => {
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
            className='w-full hover:border-primaryBorder border focus:outline-primaryBorder p-2 placeholder:text-xs' 
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

export default DropdownMember;