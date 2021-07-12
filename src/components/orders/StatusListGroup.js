import React from 'react'


function StatusListGroup(props) {
    return (
        <div>
                <span>{props.groupName}</span>
                {props.statusGroup.map(status => {
                    return <li 
                            key = {status.id} 
                            className = 'statusListRow'
                            style = {{backgroundColor: status.color}}
                            onClick = {() => {
                                props.changeOderStatus(props.orderId, status.id); 
                                props.openStatusMenu(props.orderId)}}
                            >
                                {status.name}
                            </li>
                })}
        </div>
    )
    
}

export default StatusListGroup;