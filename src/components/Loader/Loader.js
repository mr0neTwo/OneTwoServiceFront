import React from 'react'



const Loader = props => {

    if (props.invisible) return null

    if (props.type === 1) return (
        <div className='loader-container'>
            <div className='spinner-3'>
                <div className='container-spinner-3'>
                    <div className='block'>
                        <div className='item'/>
                        <div className='item'/>
                        <div className='item'/>
                        <div className='item'/>
                    </div>
                </div>
                <div className='container-spinner-3'>
                    <div className='block'>
                        <div className='item'/>
                        <div className='item'/>
                        <div className='item'/>
                        <div className='item'/>
                    </div>
                </div>
            </div>
        </div>
    )
    if (props.type === 2) return (
        <div className='loader-container'>
            <div className="spinner-2">
                <div className="face">
                    <div className="circle"/>
                </div>
                <div className="face">
                    <div className="circle"/>
                </div>
            </div>
        </div>
    )

    return (
        <div className='loader-container'>
            <div className = "lds-spinner">
                <div/>
                <div/>
                <div/>
                <div/>
                <div/>
                <div/>
                <div/>
                <div/>
                <div/>
                <div/>
                <div/>
                <div/>
            </div>
        </div>
    )
}

export default Loader