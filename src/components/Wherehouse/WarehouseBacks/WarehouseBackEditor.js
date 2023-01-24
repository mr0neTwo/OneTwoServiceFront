import React, {useEffect} from 'react'
import {connect} from 'react-redux'


import {changeBackState, createBack, resetBack, saveBack} from '../../../Redux/actions/warehouseBackActions'
import {changeVisibleState} from '../../../Redux/actions'
import SetClient from '../../general/SetClient'
import SelectFromList from '../../general/SelectFromList'
import BottomButtons from '../../general/BottomButtons'
import {checkObject} from '../../general/utils'
import {addRemain, changeRemainState} from '../../../Redux/actions/remainAction'
import LableArea from '../../general/LableArea'
import AddBack from './AddBack'

const WarehouseBackEditor = (props) => {

    const check_parts = !!props.back.parts.length

    useEffect(() => {
        props.addRemain()
    }, [props.remain.filter_warehouse, props.remain.filter_registration_id])


    const handleClose = () => {
        props.resetBack()
        props.changeVisibleState({
            statusBackEditor: false,
            inputWarehouseBack: true
        })
    }

    const clickHandel = event => {
        if (
            !event.composedPath().map((el) => el.id).includes('statusRegistrationEditor') &&
            !event.composedPath().map((el) => el.id).includes('extraButton') &&
            !event.composedPath().map((el) => el.id).includes('statusBackEditor')
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
            props.back.parts.length &&
            checkObject(props.remain.filter_warehouse)
        ) {
            props.createBack()
        } else {
            if (!checkObject(props.remain.filter_warehouse)) {
                props.changeVisibleState({inputWarehouseBack: false})
            }
        }
    }

    const handleSave = () => {
        if (
            props.back.parts.length &&
            checkObject(props.remain.filter_warehouse)
        ) {
            props.saveBack()
        } else {
            if (!checkObject(props.remain.filter_warehouse)) {
                props.changeVisibleState({inputWarehouseBack: false})
            }
        }
    }

    return (
        <div className='rightBlock z99999'>
            <div className='rightBlockWindow wmn700' id='statusBackEditor'>
                <div className='createNewTitle'>{props.back.edit ? `Возврат ${props.back.label}` : 'Новый возврат'}</div>

                <div className='contentEditor'>
                    <SetClient
                        id='idClientBack'
                        title='Поставщик'
                        setClient={client => console.log(client)}
                        client={props.back.client}
                        disabled={true}
                    />
                    <div className='row mt15'>
                        <span>Оприходование: </span>
                        <span>{props.back.registration.label}</span>
                    </div>
                    <SelectFromList
                        id='idWarehouseBack'
                        title='Вернуть со склада'
                        className='mt15'
                        list={props.warehouses}
                        setElement={warehouse => props.changeRemainState({filter_warehouse: warehouse})}
                        current_object={props.remain.filter_warehouse}
                        width={'250px'}
                        checkedFlag='inputWarehouseBack'
                        noChoosed='Выберете склад'
                        disabled={!!props.back.edit}
                    />
                    <AddBack/>
                    <LableArea
                        title='Комментарий'
                        className='mt15'
                        onChange={event => props.changeBackState({description: event.target.value})}
                        value={props.back.description}
                    />
                </div>

                <BottomButtons
                    edit={props.back.edit}
                    create={handleCreate}
                    save={handleSave}
                    close={handleClose}
                />
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    back: state.back,
    remain: state.remain,
    warehouses: state.warehouse.warehouses
})

const mapDispatchToProps = {
    resetBack,
    changeVisibleState,
    createBack,
    changeBackState,
    changeRemainState,
    saveBack,
    addRemain
}

export default connect(mapStateToProps, mapDispatchToProps)(WarehouseBackEditor)