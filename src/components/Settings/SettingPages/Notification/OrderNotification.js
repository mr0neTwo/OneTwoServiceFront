import React from 'react'
import { connect } from 'react-redux'

import {setVisibleFlag} from '../../../../Redux/actions'
import Button from '../../../general/Button'
import NotEventEditor from './NotEventEditor'
import {changeNotEventForm} from '../../../../Redux/actions/notEventAction'
import EventTable from './EventTable'
import Checkbox from '../../../general/Checkbox'


const OrderNotification = (props) => {

    const handleCreateClients = () => {
        props.setVisibleFlag('statusNotEventEditor', true)
        props.changeNotEventForm(1, 'target_audience')
    }

    const handleCreateManagers = () => {
        props.setVisibleFlag('statusNotEventEditor', true)
        props.changeNotEventForm(2, 'target_audience')
    }

    const handleCreateEngineers = () => {
        props.setVisibleFlag('statusNotEventEditor', true)
        props.changeNotEventForm(3, 'target_audience')
    }

    return (
        <div className = 'contentTab'>
            <h3>Для клиентов</h3>
            <p>Настройте уведомления для клиентов о ходе выполнения работ или других событий.</p>
            <div className='row'>
                <Button
                    id='gb1'
                    className='greenButton'
                    title='+ Оповещение'
                    onClick={handleCreateClients}
                    invisible={!props.permissions.includes('setting_create_not_event')}
                />
                <Checkbox
                    className='ml10'
                    label='Показать удаленные'
                    onChange={event => props.changeNotEventForm(event.target.checked, 'showDeleted')}
                    checked={props.showDeleted}
                    invisible={!props.permissions.includes('setting_see_deleted_not_event')}
                />
            </div>
            {props.statusNotEventEditor ? <NotEventEditor/> : null}

            <EventTable target_audience={1}/>

            <h3>Для менеджеров</h3>
            <p>Настройте уведомления для менеджеров, чтобы они не пропустили ничего важного.</p>
            <Button
                id='gb2'
                className='greenButton'
                title='+ Оповещение'
                onClick={handleCreateManagers}
            />

            <h3>Для исполнителей</h3>
            <p>Настройте уведомления для исполнителей, чтобы они не пропустили ничего важного.</p>
            <Button
                id='gb3'
                className='greenButton'
                title='+ Оповещение'
                onClick={handleCreateEngineers}
            />
        </div>
    )
}

const mapStateToProps = state => ({
    statusNotEventEditor: state.view.statusNotEventEditor,
    showDeleted: state.notEvent.showDeleted,
    permissions: state.data.user.role.permissions
})

const mapDispatchToProps = {
    setVisibleFlag,
    changeNotEventForm
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderNotification)