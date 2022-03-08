import React from 'react'
import { connect } from 'react-redux'

import { setVisibleFlag } from '../../../../Redux/actions'
import {editNotEvent} from '../../../../Redux/actions/notEventAction'
import {eventsClients} from '../../../../data/events'


const EventTable = props => {

    const handleEdit = (event) => {

        if(props.permissions.includes('setting_edit_not_event')) {
            props.editNotEvent(event)
            props.setVisibleFlag('statusNotEventEditor', true)
        }
    }

    return (
        <table>
            <thead>
            <tr>
                <th>При событии</th>
                <th>Отправить</th>
                <th>Шаблон</th>
            </tr>
            </thead>
            <tbody>
            {props.notEvent.events.filter(event => event.target_audience === props.target_audience).map(event =>{
                return (
                    <tr
                        key={event.id}
                        className={event.deleted ? 'rowDeleted' : null}
                        onDoubleClick={() =>handleEdit(event)}
                    >
                        <td className='noWr'>
                            <div>{eventsClients.find(ev => ev.id === event.event).title}</div>
                            {event.event === 'ORDER_STATUS_CHANGED_TO' ?
                                <div className='row'>
                                    {props.statuses.filter(status => event.statuses.includes(status.id)).map(status => (
                                        <div
                                            key={status.id}
                                            className='stat'
                                            style={{backgroundColor: status.color}}
                                        >
                                            {status.name}
                                        </div>
                                    ))}
                                </div>
                                : null
                            }

                        </td>
                        <td className='noWr'>{event.notification_type === 1 ? 'SMS': (event.notification_type === 2 ? 'Email' : 'Не выбрано') }</td>
                        <td className='noWr'>{event.template_title}</td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
}

const mapStateToProps = state => ({
    notEvent: state.notEvent,
    permissions: state.data.user.role.permissions,
    statuses: state.data.status
})

const mapDispatchToProps = {
    setVisibleFlag,
    editNotEvent
}


export default connect (mapStateToProps, mapDispatchToProps) (EventTable)