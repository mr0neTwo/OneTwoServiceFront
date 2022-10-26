import React from 'react'

const TempPage = (props) => {
    return (
        <div className = 'tempPage'>
            <div className = 'tempContainer'>
                <h1 className = 'tempTitle'>{props.title}</h1>
                <p className = 'tempDescription'>Страница на стадии разработки</p>
            </div>
        </div>
    )
}

export default TempPage