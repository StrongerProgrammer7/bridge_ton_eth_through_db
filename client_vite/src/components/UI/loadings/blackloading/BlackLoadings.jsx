import React from 'react'
import Spinner from 'react-bootstrap/esm/Spinner'

const BlackLoading = () => 
{
    return (
        <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    )
}

export default BlackLoading;
