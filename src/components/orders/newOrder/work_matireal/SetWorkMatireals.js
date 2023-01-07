import React, {useEffect, useState, useMemo} from 'react'
import {connect} from 'react-redux'
import {useHistory} from 'react-router-dom'


import {changeVisibleState} from '../../../../Redux/actions'
import {createOperation} from '../../../../Redux/actions/operationActions'
import {ICON} from '../../../../data/icons'

import OperationEditor from './OperationEditor'
import Icon from '../../../general/Icon'
import Button from '../../../general/Button'
import OrderPartEditor from './OrderPartEditor'
import WriteOfEditor from '../../../Wherehouse/WarehouseWriteOf/WriteOfEditor'
import {changeWriteOfState} from '../../../../Redux/actions/writeOfAction'
import {checkObject} from '../../../general/utils'


const SetWorkMatireals = (props) => {

    const [listVisible, setlistVisible] = useState(false)
    const [filterWorks, setFileterWorks] = useState('')

    const disabled = props.status_group > 3

    const clickHandel1 = (event) => {
        if (
            !event.path.map(el => el.id).includes('listSetWorks') &&
            !event.path.map(el => el.id).includes('setWorks')
        ) {
            if (listVisible) {
                setlistVisible(false)
            }
        }
    }

    useEffect(() => {
        window.addEventListener('click', clickHandel1)
        return () => {
            window.removeEventListener('click', clickHandel1)
        }
    })

    const servises = useMemo(() => props.dict_service.filter(service => !service.deleted && service.title.toLowerCase().includes(filterWorks.toLowerCase())), [filterWorks])

    const handelCreateOperation = (service) => {
        props.createOperation(service)
        setlistVisible(false)
    }

    const handleNewWriteOf = () => {
        if (!disabled) {
            props.changeWriteOfState({
                engineer: props.order.engineer.id !== 0 ? props.order.engineer : props.user,
                discount_margin: props.discount_margin.find(margin => margin.id === 2),
                write_of_type: {new_write_of: true, order_id: props.order.edit, type: 'ORDER'}
            })
            props.changeVisibleState({statusWriteOfEditor: true})
        }
    }

    return (
        <div className='row'>

            <div className='mt15 w400'>
                <div className='lableImput'>Выполненная работа</div>

                <div className='blockInput'>
                    <div
                        id='setWorks'
                        className='orderInputBox'
                        onClick={() => setlistVisible(true)}
                    >
                        <input
                            className='optionFilterInput'
                            onChange={event => setFileterWorks(event.target.value)}
                            velue={filterWorks}
                            disabled={disabled}
                        />
                    </div>

                    {listVisible && !disabled ?
                        <div className='listFilter' id='listSetWorks'>
                            {servises.map(service => (
                                <div
                                    className='rowGropList'
                                    key={service.id}
                                    onClick={() => handelCreateOperation(service)}
                                >
                                    <div className='fc-gr'>{service.title}</div>
                                    <div className='fc-gr'>{service.price} руб.</div>
                                </div>
                            ))}
                            <div className='btmsts'>
                                <Button
                                    title='Добавить как работу'
                                    className='whiteBlueBotton'
                                    onClick={() => props.changeVisibleState({statusOperationEditor: true})}
                                />
                                <Button
                                    title='Добавить как материал'
                                    className='whiteBlueBotton'
                                    onClick={() => props.changeVisibleState({statusOrderPartEditor: true})}
                                />
                            </div>
                        </div> : null}

                </div>
            </div>
            {props.view.statusOperationEditor ? <OperationEditor/> : null}
            {props.view.statusOrderPartEditor ? <OrderPartEditor/> : null}
            <div className='setOrderOr'> или </div>
            <div className='mt15'>

                <div className='lableImput'>Товары/Запчасти</div>
                    <div
                        id='newOrderPart'
                        className='addPartsBox'
                        onClick={handleNewWriteOf}
                    >
                        <Icon icon={ICON.BARCODE} className='icon-s1'/>
                        <div className='ml10'>Со склада</div>
                    </div>
                </div>
        </div>
    )
}

const mapStateToProps = state => ({
    dict_service: state.data.dict_service,
    view: state.view,
    status_group: state.order.status.group,
    order_id: state.order.edit,
    order: state.order,
    discount_margin: state.price.discount_margin,
    user: state.data.user
})

const mapDispatchToProps = {
    createOperation,
    changeVisibleState,
    changeWriteOfState
}

export default connect(mapStateToProps, mapDispatchToProps)(SetWorkMatireals)