import React, {useEffect, useState, useMemo} from 'react'
import {connect} from 'react-redux'

import {setVisibleFlag} from '../../../../Redux/actions'
import {createOperation} from '../../../../Redux/actions/operationActions'
import OperationEditor from './OperationEditor'
import Icon from '../../../general/Icon'
import {icon_barcode} from '../../../../data/icons'
import Button from '../../../general/Button'
import OrderPartEditor from './OrderPartEditor'


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

    return (
        <div className='row'>

            <div className='mt15 w400'>
                <div className='lableImput'>Выполненная работа</div>

                <div className='blockImput'>
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
                                    onClick={() => props.setVisibleFlag('statusOperationEditor', true)}
                                />
                                <Button
                                    title='Добавить как материал'
                                    className='whiteBlueBotton'
                                    onClick={() => props.setVisibleFlag('statusOrderPartEditor', true)}
                                />
                            </div>
                        </div> : null}

                </div>
            </div>
            {props.statusOperationEditor ? <OperationEditor/> : null}
            {props.statusOrderPartEditor ? <OrderPartEditor/> : null}
            <div className='setOrderOr'> или </div>
            <div className='mt15'>

                <div className='lableImput'>Товары/Запчасти</div>
                    <div
                        className='addPartsBox'
                    >
                        <Icon icon={icon_barcode} className='icon-s1'/>
                        <div className='ml10'>Со склада</div>
                    </div>
                </div>



        </div>
    )
}

const mapStateToProps = state => ({
    dict_service: state.data.dict_service,
    statusOperationEditor: state.view.statusOperationEditor,
    statusOrderPartEditor: state.view.statusOrderPartEditor,
    status_group: state.order.status.group
})

const mapDispatchToProps = {
    createOperation,
    setVisibleFlag
}

export default connect(mapStateToProps, mapDispatchToProps)(SetWorkMatireals)