import React from 'react'
import SetStatus from '../SetStatus'


const Status = props => {
    return (
        <td>
            <SetStatus
                id={props.id}
                status={props.status}
                listOfGroups={props.listOfGroups}
                changeStatus={status => props.changeStatus(status)}
                tableOrderRef={props.tableOrderRef}
            />
        </td>
    )
}


export default Status