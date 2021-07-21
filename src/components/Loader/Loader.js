import React from 'react'
import './Loader.css'



const Loader = () => {
    return (
        <div className = 'tempPage'>
            <div className = "lds-spinner">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )    
}

export default Loader