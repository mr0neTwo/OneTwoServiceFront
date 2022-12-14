import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'

import {changeRegistrationState, createRegistration, deleteRegistration, getRegistration} from '../../../Redux/actions/registrationAction'
import {resetRegistration, saveRegistration} from '../../../Redux/actions/registrationAction'
import {changeVisibleState} from '../../../Redux/actions'
import {addDiscountMargin, changePriceState} from '../../../Redux/actions/priceAction'
import {changeBackState} from '../../../Redux/actions/warehouseBackActions'
import {checkObject} from '../../general/utils'

import ChooseDate from '../../general/calandar/ChooseDate'
import LableInput from '../../general/LableInput'
import BottomButtons from '../../general/BottomButtons'
import LableArea from '../../general/LableArea'
import SetClient from '../../general/SetClient'
import AddParts from './AddParts'
import RegistrationPartEditor from './RegistrationPartEditor'
import TableRegistrationPart from './TableRegistrationPart'
import SelectFromList from '../../general/SelectFromList'
import WarningChangeWarehouse from './WarningChangeWarehouse'
import {changeRemainState} from '../../../Redux/actions/remainAction'


const RegistrationEditor = (props) => {

    const [messageWarning, setMessageWarning] = useState(false)
    const [warehouse, setWarehouse] = useState({})

    const handleClose = () => {
        props.changeVisibleState({
            statusRegistrationEditor: false,
            inputRegistrationLabelChecked: true,
            inputRegistrationClientChecked: true,
            inputRegistrationWarehouseChecked: true,
            inputRegistrationPartChecked: true
        })
        props.resetRegistration()
        props.changeVisibleState({statusRegistrationEditor: false})
    }

    useEffect(() => {
        props.changePriceState({showDeleted: false, filter_type: 2})
        props.addDiscountMargin()
    }, [])

    const clickHandel = (event) => {
        if (
            !event.path.map((el) => el.id).includes('registrationEditor') &&
            !event.path.map((el) => el.id).includes('wpartEditorWindow') &&
            !event.path.map((el) => el.id).includes('newRegistration') &&
            !event.path.map((el) => el.id).includes('statusBackEditor') &&
            !event.path.map((el) => el.id).includes('changeWarehouseMessage')
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
        if (
            props.registration.number &&
            checkObject(props.registration.warehouse) &&
            (checkObject(props.registration.client) || props.registration.inventory_id) &&
            props.registration.parts.length
        ) {
            props.createRegistration()
        } else {
            if (!props.registration.number) {
                props.changeVisibleState({inputRegistrationLabelChecked: false})
            }
            if (!checkObject(props.registration.warehouse)) {
                props.changeVisibleState({inputRegistrationWarehouseChecked: false})
            }
            if (!checkObject(props.registration.client)) {
                props.changeVisibleState({inputRegistrationClientChecked: false})
            }
            if (!props.registration.parts.length) {
                props.changeVisibleState({inputRegistrationPartChecked: false})
            }
        }
    }

    const handleSave = () => {
        if (
            props.registration.number &&
            checkObject(props.registration.warehouse) &&
            checkObject(props.registration.client) &&
            props.registration.parts.length
        ) {
            props.saveRegistration()
        } else {
            if (!props.registration.number) {
                props.changeVisibleState({inputRegistrationLabelChecked: false})
            }
            if (!checkObject(props.registration.warehouse)) {
                props.changeVisibleState({inputRegistrationWarehouseChecked: false})
            }
            if (!checkObject(props.registration.client)) {
                props.changeVisibleState({inputRegistrationClientChecked: false})
            }
            if (!props.registration.parts.length) {
                props.changeVisibleState({inputRegistrationPartChecked: false})
            }
        }
    }

    const handleChange = (warehouse) => {
        if (props.registration.parts.length) {
            setWarehouse(warehouse)
            setMessageWarning(true)
        } else {
            props.changeRegistrationState({warehouse})
        }
    }

    const handleBack = () => {
        props.changeVisibleState({statusBackEditor: true})
        props.changeBackState({
            client: props.registration.client,
            registration: {
                id: props.registration.edit,
                label: props.registration.label
            }
        })
        props.changeRemainState({filter_registration_id: props.registration.edit})
    }

    const canDoBack = props.registration.inventory_id || !props.registration.edit || !props.permissions.includes('create_refund_to_supplier')

    return (
        <div className={`rightBlock ${props.registration.edit ? 'z9999' : 'z99'}`}>
            <div className='rightBlockWindow' id='registrationEditor'>
                <div className='createNewTitle'>
                    {props.registration.edit ? `Оприходование ${props.registration.label}` : ' Новое оприходование'}
                </div>
                <div className='contentEditor'>
                    <SetClient
                        id='regClient'
                        title='Имя поставщика'
                        setClient={client => props.changeRegistrationState({client})}
                        client={props.registration.client}
                        checkedFlag='inputRegistrationClientChecked'
                        checked={props.view.inputRegistrationClientChecked}
                        redStar={true}
                        disabled={!!props.registration.edit}
                        invisible={props.registration.inventory_id}
                    />
                    <div className='row al-itm-fe'>
                        <LableInput
                            className='w250 mt15'
                            title='Накладная №'
                            onChange={event => props.changeRegistrationState({number: event.target.value})}
                            value={props.registration.number}
                            checkedFlag='inputRegistrationLabelChecked'
                            checked={props.view.inputRegistrationLabelChecked}
                            redStar={true}
                        />
                        <div className='m5 jc-c'>от</div>
                        <ChooseDate
                            className='h29'
                            width='250px'
                            time={false}
                            func={date => props.changeRegistrationState({custom_created_at: parseInt(date / 1000)})}
                            current_date={props.registration.custom_created_at * 1000}
                            disabled={!!props.registration.edit}
                        />
                    </div>
                    <SelectFromList
                        id='WarehousesWR'
                        className='mt15 h52'
                        title='Склад'
                        list={props.warehouses}
                        setElement={warehouse => handleChange( warehouse)}
                        current_object={props.registration.warehouse}
                        width={'250px'}
                        checkedFlag='inputRegistrationWarehouseChecked'
                        checked={props.view.inputRegistrationWarehouseChecked}
                        noChoosed='Выберете склад'
                        disabled={!!props.registration.edit || !!props.registration.inventory_id}
                    />
                    <AddParts invisible={!!props.registration.edit || !!props.registration.inventory_id}/>
                    {props.view.inputRegistrationPartChecked ? null : <div className='errorMassageInput'>Добавьте хотябы одну запчасть</div>}
                    <TableRegistrationPart/>
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
                    close={handleClose}
                    extraButton={canDoBack ? null : handleBack}
                    extraTitle='Сделать возврат'
                />
            </div>
            {messageWarning ?
                <WarningChangeWarehouse
                    setMessageWarning={setMessageWarning}
                    warehouse={warehouse}
                /> : null}
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
    resetRegistration,
    addDiscountMargin,
    changePriceState,
    getRegistration,
    changeBackState,
    changeRemainState
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationEditor)
