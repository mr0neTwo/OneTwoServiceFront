import React, {useEffect} from 'react'
import { connect } from 'react-redux'

import {addNotEvent, changeNotEventForm} from '../../../../Redux/actions/notEventAction'

import Tabs from '../../../general/Tabs'
import OrderNotification from './OrderNotification'
import NotificationTemplate from './NotificationTemplate'
import {addNotTemplate} from '../../../../Redux/actions/notTemplateAction'

const SettingNotification = props => {

    useEffect(() => {
        props.addNotTemplate()
    }, [props.notTemplate.showDeleted])

    useEffect(() => {
        props.addNotEvent()
    }, [props.notEvent.showDeleted])

  return (
    <div className='settingContent'>

        <div className='header'>
            <span className='headerTitle'>Оповещения</span>
        </div>

        <Tabs
            className='mt15'
            list={['Заказы', 'Обращения', 'Задачи', 'Шаблоны']}
            tab={props.notEvent.tabs}
            func={idx => props.changeNotEventForm(idx, 'tabs')}
        />
        {props.notEvent.tabs === 0 ? <OrderNotification/> : null}
        {props.notEvent.tabs === 1 ? null : null}
        {props.notEvent.tabs === 2 ? null : null}
        {props.notEvent.tabs === 3 ? <NotificationTemplate/> : null}

    </div>
  )
}

const mapStateToProps = state => ({
    notEvent: state.notEvent,
    notTemplate: state.notTemplate
})

const mapDispatchToProps = {
    changeNotEventForm,
    addNotTemplate,
    addNotEvent
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingNotification)