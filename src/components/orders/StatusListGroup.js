import React from 'react'
import {connect} from 'react-firebase'
import Loader from '../Loader/Loader'


function StatusListGroup({groupName, orderId, groupIdx, openStatusMenu, status, changeStatus}) {
    
    if (status) {
        return (
            <>
                <span>{groupName}</span>
                {Object.values(status).filter(status => status.group === (groupIdx + 1)).map(status => {
                    return <li 
                            key = {status.id} 
                            className = 'statusListRow'
                            style = {{backgroundColor: status.color}}
                            onClick = {() => {
                                changeStatus(status, orderId); 
                                openStatusMenu(orderId)}}
                            >
                                {status.name}
                            </li>
                })}
            </>
        )}
    return (<Loader/>)    
    
}

const mapFireBaseToProps = (props, ref) => ({
    status : 'status',
    changeStatus: (status, orderId) => ref(`orders/${orderId}/status`).set(status)
})

export default connect(mapFireBaseToProps) (StatusListGroup)