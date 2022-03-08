import React from 'react'
import './Loader.css'



const Loader = props => {
    return (
        <div className={props.className}>
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