import React from 'react'
import { useLocation } from 'react-router-dom'
import { readProjectRequest } from '../api';
import { useQuery } from 'react-query';

const project = () => {
    const location = useLocation();
    const {isLoading, data: projectsData} = useQuery(['projects', location.search.slice(1,)],
        readProjectRequest
    );
    return (
        <div>
            {isLoading ? <div>Loading...</div> : <div>{projectsData[0]._id}</div>}
        </div>
    )
}

export default project