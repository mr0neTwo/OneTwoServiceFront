import React from 'react'
import StatusListGroup from './StatusListGroup'



function StatusList(props) {
    
    return (
            <div className = 'statusList'>
                <StatusListGroup
                statusGroup = {props.status.filter(status => status.group === 1)}
                groupName = 'Новые'
                orderId = {props.orderId}
                changeOderStatus = {props.changeOderStatus}
                openStatusMenu = {props.openStatusMenu}
                />
                <StatusListGroup
                statusGroup = {props.status.filter(status => status.group === 2)}
                groupName = 'На исполнении'
                orderId = {props.orderId}
                changeOderStatus = {props.changeOderStatus}
                openStatusMenu = {props.openStatusMenu}
                />
                <StatusListGroup
                statusGroup = {props.status.filter(status => status.group === 3)}
                groupName = 'Отложенные'
                orderId = {props.orderId}
                changeOderStatus = {props.changeOderStatus}
                openStatusMenu = {props.openStatusMenu}
                />
                <StatusListGroup
                statusGroup = {props.status.filter(status => status.group === 4)}
                groupName = 'Готовые'
                orderId = {props.orderId}
                changeOderStatus = {props.changeOderStatus}
                openStatusMenu = {props.openStatusMenu}
                />
                <StatusListGroup
                statusGroup = {props.status.filter(status => status.group === 6)}
                groupName = 'Закрытые успешно'
                orderId = {props.orderId}
                changeOderStatus = {props.changeOderStatus}
                openStatusMenu = {props.openStatusMenu}
                />
                <StatusListGroup
                statusGroup = {props.status.filter(status => status.group === 7)}
                groupName = 'Закрытые не успешно'
                orderId = {props.orderId}
                changeOderStatus = {props.changeOderStatus}
                openStatusMenu = {props.openStatusMenu}
                />

            </div>
        ) 
}

export default StatusList