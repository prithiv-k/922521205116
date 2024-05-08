import React from 'react';
import axios from 'axios';

const Delete = ({ id }) => {
    const handleClick = () => {
        axios.delete('http://localhost:3500/post/' + id)
            .then(response => {
                console.log('Deleted:', response.data);
              
            })
            .catch(error => {
                console.error('Delete failed:', error);
                
            });
    }

    return (
        <div>
            <button onClick={handleClick}>delete</button>
        </div>
    );
}

export default Delete;
