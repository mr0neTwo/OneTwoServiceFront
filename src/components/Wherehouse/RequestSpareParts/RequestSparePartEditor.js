import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'

import {addParts} from '../../../Redux/actions/partAction'
import {changeReqSparePartState, createReqSparePart} from '../../../Redux/actions/requestSparePartsAction'
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
import Status from './cell/Status'
import RequestHistory from './RequestHistory'


const RequestSparePartEditor = (props) => {

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
            statusReqSparePartEditor: false,
            inputRequestSparePart: true
        })
    }

    const clickHandel = event => {
        if (
            !event.path.map((el) => el.id).includes('statusReqSparePartEditor') &&
            !event.path.map((el) => el.id).includes('newReqSparePart') &&
            !event.path.map((el) => el.id).includes('wpartEditorWindow')
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

    return (
        <div className='rightBlock z999'>
            <div className='rightBlockWindow wmn700' id='statusReqSparePartEditor'>
                <div className='row h100 al-itm-fs'>
                    <div className='mr5'>
                    <div className='createNewTitle al-itm-ct'>
                        <span>{props.reqsp.edit ? `Запрос ${props.reqsp.label}` : 'Новый запрос'}</span>
                        <span className='ml5'>
                            {props.reqsp.edit ?
                                <Status
                                    status={props.reqsp.status}
                                    request_spare_part_id={props.reqsp.edit}/>
                                : null}
                        </span>
                    </div>

                    <div className='contentEditor'>
                        <SetPart/>
                        <div className='row al-itm-fe'>
                            <ChooseButton
                                className='mt15 mr-rg-20'
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
                                className='h31'
                                width='250px'
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
                            className='mt15'
                            width='70px'
                            title='Количество'
                            onChange={event => props.changeReqSparePartState({amount: parseInt(event.target.value.replace(/[^0-9]/g, ''))})}
                            value={props.reqsp.amount}
                            unit='шт.'
                            disabled={false}
                        />
                        <LableInput
                            className='mt15'
                            width='70px'
                            title='Текущая стоимость'
                            onChange={event => props.changeReqSparePartState({cost: parseInt(event.target.value.replace(/[^0-9.]/g, ''))})}
                            value={props.reqsp.cost}
                            unit='руб.'
                            invisible={!props.permissions.includes('edit_buy_cost')}
                            disabled={false}
                        />
                        <LableInput
                            className='mt15'
                            width='70px'
                            title='Стоимость доставки'
                            onChange={event => props.changeReqSparePartState({delivery_cost: parseInt(event.target.value.replace(/[^0-9.]/g, ''))})}
                            value={props.reqsp.delivery_cost}
                            unit='руб.'
                            invisible={!props.permissions.includes('edit_buy_cost')}
                            disabled={false}
                        />
                        <ChooseWithSearch
                            id='spareSupplier'
                            className='mt15 h52'
                            width='250px'
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
                            className='mt15 h52'
                            width='250px'
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
                            title='Исполнитель'
                            className='mt15'
                            list={props.employees}
                            setElement={executor => props.changeReqSparePartState({executor})}
                            current_object={props.reqsp.executor}
                            width={'250px'}
                            noChoosed='Выберете сотрудника'
                        />
                        <LableArea
                            title='Комментарий'
                            className='mt15'
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
                    </div>
                    {props.reqsp.edit ? <RequestHistory/> : null}
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
        </div>
    )
}

const mapStateToProps = state => ({
    orders: state.order.ordersShow,
    search: state.filter.search,
    reqsp: state.reqsp,
    client: state.client,
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
    deleteReqSparePart
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestSparePartEditor)