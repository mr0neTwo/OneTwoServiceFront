import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { setVisibleFlag } from '../../../../Redux/actions'
import { changeNotEventForm, createNotEvent, deleteNotEvent} from '../../../../Redux/actions/notEventAction'
import { resetNotEvent, saveNotEvent, selectedNotEvent} from '../../../../Redux/actions/notEventAction'

import BottomButtons from '../../../general/BottomButtons'
import ChooseOfList from '../../../general/ChooseOfList'
import ChooseButton from '../../../general/ChooseButton'
import {eventsClients} from '../../../../data/events'
import SelectStatuses from '../../../general/SelectStatuses'


const NotEventEditor = props => {

    const handleClose = () => {
        props.setVisibleFlag('statusNotEventEditor', false)
        props.setVisibleFlag('inputNotEventEventChecked', true)
        props.setVisibleFlag('inputNotEventTemplateChecked', true)
        props.resetNotEvent()
    }

    const clickHandel = (event) => {
        if (
            !event.composedPath().map((el) => el.id).includes('NotTempEditorWindow') &&
            !event.composedPath().map((el) => el.id).includes('gb1') &&
            !event.composedPath().map((el) => el.id).includes('gb2') &&
            !event.composedPath().map((el) => el.id).includes('gb3')
        ) {
            handleClose()
        }
    }

    useEffect(() => {
        window.addEventListener('click', clickHandel)
        return () => {
            window.removeEventListener('click', clickHandel)
        }
    })

    const handleCreate = () => {
        if (props.notEvent.event && props.notEvent.notification_template_id ) {
            props.createNotEvent()
        } else {
            if(!props.notEvent.event ) props.setVisibleFlag('inputNotEventEventChecked', false)
            if(!props.notEvent.notification_template_id) props.setVisibleFlag('inputNotEventTemplateChecked', false)
        }
    }

    const handleSave = () => {
        if (props.notEvent.event && props.notEvent.notification_template_id) {
            props.saveNotEvent()
        } else {
            if(!props.notEvent.event ) props.setVisibleFlag('inputNotEventEventChecked', false)
            if(!props.notEvent.notification_template_id) props.setVisibleFlag('inputNotEventTemplateChecked', false)
        }
    }

    const can_deleted = props.permissions.includes('setting_delete_not_event')
    const can_recover = props.permissions.includes('setting_recover_not_event')


    return (
        <div className="rightBlock">
            <div className="rightBlockWindow" id="NotTempEditorWindow">
                <div className="createNewTitle w515">{props.notEvent.edit ? props.notEvent.title : 'Новое оповещение'}</div>

                <div className="contentEditor">
                    <div className='row al-itm-bl'>
                        <ChooseOfList
                            id='chooseNotEventType'
                            title='При событии'
                            className='mt15'
                            list={eventsClients}
                            field='event'
                            setElement={props.changeNotEventForm}
                            current_id={props.notEvent.event}
                            width={'250px'}
                            checkedFlag='inputNotEventEventChecked'
                            checked={props.inputNotEventEventChecked}
                            noChoosed='Не задано'
                            disabled={props.notEvent.deleted}
                        />
                        <SelectStatuses
                            id='notification-editor'
                            className='ml15'
                            func={value => props.selectedNotEvent(value, 'statuses')}
                            func_clear={() => props.changeNotEventForm([], 'statuses')}
                            current_list={props.notEvent.statuses}
                            range={[0, 7]}
                        />
                    </div>
                    <ChooseButton
                        className='mt15'
                        title='Отправить'
                        name={['SMS', 'Email']}
                        func1 = {() => props.changeNotEventForm(1, 'notification_type')}
                        func2 = {() => props.changeNotEventForm(2, 'notification_type')}
                        checked = { true }
                        disabled={false}
                        invisible={false}
                    />
                    <ChooseOfList
                        id='idChooseNotTemplate'
                        title='Шаблон'
                        className='mt15'
                        list={props.templates}
                        field='notification_template_id'
                        setElement={props.changeNotEventForm}
                        current_id={props.notEvent.notification_template_id}
                        width={'250px'}
                        checkedFlag='inputNotEventTemplateChecked'
                        checked={props.inputNotEventTemplateChecked}
                        noChoosed='Не выбран'
                        disabled={props.notEvent.deleted}
                    />

                </div>


                <BottomButtons
                    edit={props.notEvent.edit}
                    deleted={props.notEvent.deleted}
                    create={handleCreate}
                    save={handleSave}
                    delete={can_deleted ? () => props.deleteNotEvent(true) : null}
                    recover={can_recover ? () => props.deleteNotEvent(false) : null}
                    close={handleClose}
                />
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    notEvent: state.notEvent,
    inputNotEventEventChecked: state.view.inputNotEventEventChecked,
    inputNotEventTemplateChecked: state.view.inputNotEventTemplateChecked,
    permissions: state.data.user.role.permissions,
    templates: state.notTemplate.templates
})

const mapDispatchToProps = {
    setVisibleFlag,
    resetNotEvent,
    createNotEvent,
    saveNotEvent,
    deleteNotEvent,
    changeNotEventForm,
    selectedNotEvent
}

export default connect(mapStateToProps, mapDispatchToProps)(NotEventEditor)
