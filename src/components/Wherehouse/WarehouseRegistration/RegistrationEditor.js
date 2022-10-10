import React, {useEffect} from 'react'
import {connect} from 'react-redux'

import ChooseDate from '../../general/calandar/ChooseDate'
import LableInput from '../../general/LableInput'
import ChooseOfList from '../../general/ChooseOfList'
import BottomButtons from '../../general/BottomButtons'

import {
    changeRegistrationState,
    createRegistration,
    deleteRegistration,
    resetRegistration,
    saveRegistration
} from '../../../Redux/actions/registrationAction'
import {changeVisibleState} from '../../../Redux/actions'
import LableArea from '../../general/LableArea'
import SetClient from '../../general/SetClient'
import AddParts from './AddParts'
import RegistrationPartEditor from './RegistrationPartEditor'


const RegistrationEditor = (props) => {

    const handleClose = () => {
        props.changeVisibleState({
            statusRegistrationEditor: false,
            inputRegistrationLabelChecked: true
        })
        props.resetRegistration()
    }

    const clickHandel = (event) => {
        if (!event.path.map((el) => el.id).includes('registrationEditorWindow')) {
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
        if (
            props.registration.label &&
            props.registration.warehouse_id
        ) {
            props.createRegistration()
        } else {
            if (!props.registration.label) {
                props.changeVisibleState({inputRegistrationLabelChecked: false})
            }
            if (!props.registration.warehouse_id) {
                props.changeVisibleState({inputRegistrationWarehouseChecked: false})
            }
        }
    }

    const handleSave = () => {
        if (
            props.registration.label &&
            props.registration.warehouse_id
        ) {
            props.saveRegistration()
        } else {
            if (!props.registration.label) {
                props.changeVisibleState({inputRegistrationLabelChecked: false})
            }
            if (!props.registration.warehouse_id) {
                props.changeVisibleState({inputRegistrationWarehouseChecked: false})
            }
        }
    }
    const handleRecover = () => {
        if (props.permissions.includes(''))
            props.deleteRegistration(false)
    }

    const handleDelete = () => {
        if (props.permissions.includes(''))
            props.deleteRegistration(true)
    }


    return (
        <div className='rightBlock'>
            <div className='rightBlockWindow' id='registrationEditorWindow'>
                <div className='createNewTitle'>
                    {props.registration.edit ? props.registration.label : ' Новое оприходование'}
                </div>
                <div className='contentEditor'>
                    <SetClient
                        id='regClient'
                        title='Имя поставщика'
                        setClient={client => props.changeRegistrationState({client})}
                        client={props.registration.client}
                    />
                    <div className='row al-itm-fe'>
                        <LableInput
                            className='w250 mt15'
                            title='Накладная №'
                            onChange={event => props.changeRegistrationState({label: event.target.value})}
                            value={props.registration.label}
                            checkedFlag='inputRegistrationLabelChecked'
                            checked={props.view.inputRegistrationLabelChecked}
                            redStar={true}
                            disabled={props.registration.deleted}
                        />
                        <div className='m5 jc-c'>от</div>
                        <ChooseDate
                            className='h29'
                            width='250px'
                            time={false}
                            func={date => props.changeRegistrationState({custom_created_at: parseInt(date / 1000)})}
                            current_date={props.registration.custom_created_at * 1000}
                        />
                    </div>


                    <ChooseOfList
                        id={'WarehousesWR'}
                        className='mt15 h52'
                        title='Склад'
                        list={props.warehouses}
                        setElement={warehouse_id => props.changeRegistrationState({warehouse_id: warehouse_id})}
                        current_id={props.registration.warehouse_id}
                        width={'250px'}
                        checkedFlag='inputRegistrationWarehouseChecked'
                        checked={props.view.inputRegistrationWarehouseChecked}
                        noChoosed='Выберете склад'
                        disabled={props.registration.deleted}
                    />
                    <AddParts/>
                    <LableArea
                        title='Комментарий'
                        className='mt15'
                        onChange={event => props.changeRegistrationState({description: event.target.value})}
                        value={props.registration.description}
                    />
                </div>

                {props.view.statusRegistrationPartEditor ? <RegistrationPartEditor/> : null}

                <BottomButtons
                    edit={props.registration.edit}
                    create={handleCreate}
                    save={handleSave}
                    recover={handleRecover}
                    delete={handleDelete}
                    close={handleClose}
                    deleted={props.registration.deleted}
                />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    registration: state.registration,
    view: state.view,
    warehouses: state.warehouse.warehouses,
    permissions: state.data.user.role.permissions,
})

const mapDispatchToProps = {
    changeVisibleState,
    changeRegistrationState,
    createRegistration,
    saveRegistration,
    deleteRegistration,
    resetRegistration
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationEditor)
