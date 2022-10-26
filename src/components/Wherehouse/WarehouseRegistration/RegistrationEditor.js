import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'

import {changeRegistrationState, createRegistration, deleteRegistration} from '../../../Redux/actions/registrationAction'
import {resetRegistration, saveRegistration} from '../../../Redux/actions/registrationAction'
import {changeVisibleState} from '../../../Redux/actions'
import {addDiscountMargin, changePriceState} from '../../../Redux/actions/priceAction'

import ChooseDate from '../../general/calandar/ChooseDate'
import LableInput from '../../general/LableInput'
import BottomButtons from '../../general/BottomButtons'
import LableArea from '../../general/LableArea'
import SetClient from '../../general/SetClient'
import AddParts from './AddParts'
import RegistrationPartEditor from './RegistrationPartEditor'
import TableRegistrationPart from './TableRegistrationPart'
import SelectFromList from '../../general/SelectFromList'
import {checkObject} from '../../general/utils'
import WarningChangeWarehouse from './WarningChangeWarehouse'


const RegistrationEditor = (props) => {

    const [messageWarning, setMessageWarning] = useState(false)
    const [warehouse, setWarehouse] = useState({})

    useEffect(() => {
        props.changePriceState({showDeleted: false, filter_type: 2})
        props.addDiscountMargin()
    }, [])

    const handleClose = () => {
        props.changeVisibleState({
            statusRegistrationEditor: false,
            inputRegistrationLabelChecked: true,
            inputRegistrationClientChecked: true,
            inputRegistrationWarehouseChecked: true,
            inputRegistrationPartChecked: true
        })
        props.resetRegistration()
    }

    const clickHandel = (event) => {
        if (
            !event.path.map((el) => el.id).includes('registrationEditorWindow') &&
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
            checkObject(props.registration.client) &&
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
                        checkedFlag='inputRegistrationClientChecked'
                        checked={props.view.inputRegistrationClientChecked}
                        redStar={true}
                        disabled={!!props.registration.edit}
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
                        disabled={!!props.registration.edit}
                    />
                    <AddParts/>
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
                    // recover={handleRecover}
                    // delete={handleDelete}
                    close={handleClose}
                    // deleted={props.registration.deleted}
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
    changePriceState
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationEditor)