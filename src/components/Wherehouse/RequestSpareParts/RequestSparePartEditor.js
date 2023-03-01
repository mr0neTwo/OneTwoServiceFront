import React, {useEffect, useMemo, useState} from 'react'
import {connect} from 'react-redux'

import {addParts} from '../../../Redux/actions/partAction'
import {changeReqSparePartState, changeStatus, createReqSparePart} from '../../../Redux/actions/requestSparePartsAction'
import {deleteReqSparePart, resetReqSparePart, saveReqSparePart} from '../../../Redux/actions/requestSparePartsAction'
import {checkObject} from '../../general/utils'
import {changeVisibleState} from '../../../Redux/actions'

import BottomButtons from '../../general/BottomButtons'
import LableArea from '../../general/LableArea'
import SelectFromList from '../../general/SelectFromList'
import SetPart from './SetPart'
import ChooseButton from '../../general/ChooseButton'
import ChooseDate from '../../general/calandar/ChooseDate'
import ChooseWithSearch from '../../general/ChooseWithSearch'
import {addClients, changeClientState} from '../../../Redux/actions/clientAction'
import {addOrders} from '../../../Redux/actions/orderActions'
import {changeFilterState, resetFilter} from '../../../Redux/actions/filterAction'
import LableInput from '../../general/LableInput'
import RequestHistory from './RequestHistory'
import SetStatus from "../../general/SetStatus";


const RequestSparePartEditor = (props) => {

    const componentId = 'RequestSparePartEditor'

    const [chooseData, setChooseData] = useState(!!props.reqsp.estimated_come_at)

    useEffect(() => {
        props.addClients()
    }, [props.client.filter_name])

    useEffect(() => {
        props.resetFilter()
    }, [])

    useEffect(() => {
        props.addOrders()
    }, [props.search])

    const handleClose = () => {
        props.resetReqSparePart()
        props.changeVisibleState({
            isRightModalOpen: false,
            modalType: '',
            inputRequestSparePart: true
        })
    }

    const clickHandel = event => {
        if (!event.composedPath().map((el) => el.id).includes(componentId)) {
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
        console.log('create')
        if (checkObject(props.reqsp.part)) {
            props.createReqSparePart()
        } else {
            if (!checkObject(props.reqsp.part)) {
                props.changeVisibleState({inputRequestSparePart: false})
            }
        }
    }

    const handleSave = () => {
        if (checkObject(props.reqsp.part)) {
            props.saveReqSparePart()
        } else {
            if (!checkObject(props.reqsp.part)) {
                props.changeVisibleState({inputRequestSparePart: false})
            }
        }
    }

    const listOfGroup = useMemo(() => props.status_group.filter(group => [13, 14, 15, 16, 17, 18].indexOf(group.type_group) !== -1),
        [props.status_group]) // группы статусов запросов запчастей

    return (
        <div
            id={componentId}
            className={`modal__box-right ${props.reqsp.edit ? 'modal__box-right_history' : ''}`}
        >
            <div className='modal__body-right modal__body-right_history'>

                <div className='two-buttons'>
                    <h4 className='nowrap'>{props.reqsp.edit ? `Запрос ${props.reqsp.label}` : 'Новый запрос'}</h4>
                    {props.reqsp.edit ?
                        <SetStatus
                            id={props.reqsp.edit}
                            status={props.reqsp.status}
                            listOfGroups={listOfGroup}
                            changeStatus={status => props.changeStatus(status.id, props.reqsp.edit)}
                        />
                        : null
                    }
                </div>
                <div className='modal__body-right'>
                    <SetPart/>
                    <div className='two-buttons'>
                        <ChooseButton
                            title='Дата поставки'
                            name={['Убрать', 'Установить']}
                            func1={() => {
                                setChooseData(false)
                                props.changeReqSparePartState({estimated_come_at: null})
                            }}
                            func2={() => {
                                setChooseData(true)
                                props.changeReqSparePartState({estimated_come_at: Math.round(new Date() / 1000)})
                            }}
                            checked={!chooseData}
                        />
                        <ChooseDate
                            title='Дата'
                            func={date => props.changeReqSparePartState({estimated_come_at: Math.round(date / 1000)})}
                            current_date={props.reqsp.estimated_come_at * 1000}
                            time={false}
                            invisible={!chooseData}
                        />
                    </div>
                    {/*<ChooseWithSearch*/}
                    {/*    id='spareClient'*/}
                    {/*    className='mt15 h52'*/}
                    {/*    width='250px'*/}
                    {/*    title='Клиент'*/}
                    {/*    list={props.client.clients}*/}
                    {/*    current_element={props.reqsp.client}*/}
                    {/*    setElement={client => props.changeReqSparePartState({client})}*/}
                    {/*    filter={props.client.filter_name}*/}
                    {/*    changeFilter={filter => props.changeClientState({filter_name: filter})}*/}
                    {/*    placeholder='Введите имя'*/}
                    {/*/>*/}
                    <LableInput
                        className='w100'
                        title='Количество'
                        onChange={event => props.changeReqSparePartState({amount: parseInt(event.target.value.replace(/[^0-9]/g, ''))})}
                        value={props.reqsp.amount}
                        unit='шт.'
                        disabled={false}
                    />
                    <LableInput
                        className='w100'
                        title='Текущая стоимость'
                        onChange={event => props.changeReqSparePartState({cost: parseInt(event.target.value.replace(/[^0-9.]/g, ''))})}
                        value={props.reqsp.cost}
                        unit='руб.'
                        invisible={!props.permissions.includes('edit_buy_cost')}
                        disabled={false}
                    />
                    <LableInput
                        className='w100'
                        title='Стоимость доставки'
                        onChange={event => props.changeReqSparePartState({delivery_cost: parseInt(event.target.value.replace(/[^0-9.]/g, ''))})}
                        value={props.reqsp.delivery_cost}
                        unit='руб.'
                        invisible={!props.permissions.includes('edit_buy_cost')}
                        disabled={false}
                    />
                    <ChooseWithSearch
                        id='spareSupplier'
                        className='w220'
                        title='Поставщик'
                        list={props.client.clients}
                        current_element={props.reqsp.supplier}
                        setElement={supplier => props.changeReqSparePartState({supplier})}
                        filter={props.client.filter_name}
                        changeFilter={filter => props.changeClientState({filter_name: filter})}
                        placeholder='Введите имя'
                    />
                    <ChooseWithSearch
                        id='spareOrder'
                        className='w220'
                        title='Заказ'
                        list={props.orders}
                        current_element={props.reqsp.order}
                        setElement={order => props.changeReqSparePartState({order})}
                        filter={props.search}
                        changeFilter={search => props.changeFilterState({search})}
                        placeholder='Введите имя'
                    />
                    <SelectFromList
                        id='reqExecutor'
                        className='w220'
                        title='Исполнитель'
                        list={props.employees}
                        setElement={executor => props.changeReqSparePartState({executor})}
                        current_object={props.reqsp.executor}
                        noChoosed='Выберете сотрудника'
                    />
                    <LableArea
                        title='Комментарий'
                        onChange={event => props.changeReqSparePartState({description: event.target.value})}
                        value={props.reqsp.description}
                    />
                    {props.permissions.includes('see_buy_cost') ?
                        <div>
                            <div className='mt15'>
                                <span>{`${props.reqsp.amount} запчастей на ${(props.reqsp.amount * props.reqsp.cost).toFixed(2)} руб.`}</span>
                            </div>
                            <div className='mt5'>
                                <span>{`Доставка ${props.reqsp.delivery_cost.toFixed(2)} руб.`}</span>
                            </div>
                            <div className='mt5'>
                                <span>{`Итого ${(props.reqsp.amount * props.reqsp.cost + props.reqsp.delivery_cost).toFixed(2)} руб.`}</span>
                            </div>
                        </div> : null}
                </div>
                <BottomButtons
                    edit={props.reqsp.edit}
                    deleted={props.reqsp.deleted}
                    create={handleCreate}
                    save={handleSave}
                    delete={() => props.deleteReqSparePart(true)}
                    recover={() => props.deleteReqSparePart(false)}
                    close={handleClose}
                />
            </div>
            {props.reqsp.edit ? <RequestHistory/> : null}
        </div>
    )
}

const mapStateToProps = state => ({
    orders: state.order.ordersShow,
    search: state.filter.search,
    reqsp: state.reqsp,
    client: state.client,
    status_group: state.data.status_group,
    permissions: state.data.user.role.permissions,
    employees: state.employee.employees.filter(employee => !employee.deleted)
})

const mapDispatchToProps = {
    addParts,
    changeReqSparePartState,
    resetReqSparePart,
    changeVisibleState,
    addClients,
    changeClientState,
    addOrders,
    resetFilter,
    changeFilterState,
    createReqSparePart,
    saveReqSparePart,
    deleteReqSparePart,
    changeStatus
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestSparePartEditor)