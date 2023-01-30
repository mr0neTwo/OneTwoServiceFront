import React, {useEffect, useState, useMemo} from 'react'
import {connect} from 'react-redux'


import {changeVisibleState} from '../../../../Redux/actions'
import {createOperation} from '../../../../Redux/actions/operationActions'
import {ICON} from '../../../../data/icons'

import Icon from '../../../general/Icon'
import Button from '../../../general/Button'
import {changeWriteOfState} from '../../../../Redux/actions/writeOfAction'
import {checkObject} from '../../../general/utils'
import {changeOrderPartState} from '../../../../Redux/actions/orderPartAction'


const SetWorkMaterials = (props) => {

    const [listVisible, setListVisible] = useState(false)
    const [filterWorks, setFilterWorks] = useState('')

    const id = 'SetWorkMaterials'

    const disabled = props.status_group > 3

    const clickHandel1 = (event) => {
        if (!event.composedPath().map(el => el.id).includes(id)) {
            if (listVisible) {
                setListVisible(false)
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

    const handleCreateOperation = (service) => {
        props.createOperation(service)
        setListVisible(false)
    }

    const handleNewWriteOf = () => {
        if (!disabled) {
            props.changeWriteOfState({
                engineer: props.order.engineer.id !== 0 && checkObject(props.order.engineer) ? props.order.engineer : props.user,
                discount_margin: props.discount_margin.find(margin => margin.id === 2),
                write_of_type: {new_write_of: true, order_id: props.order.edit, type: 'ORDER'}
            })
            props.changeVisibleState({statusWriteOfEditor: true})
        }
    }

    const handleNewWord = () => {
        props.changeVisibleState({statusOperationEditor: true})
    }

    const handleNewMaterial = () => {
        props.changeVisibleState({statusOrderPartEditor: true})
        props.changeOrderPartState({engineer: props.order.engineer.id !== 0 && checkObject(props.order.engineer) ? props.order.engineer : props.user})
    }

    return (
        <div className='set-work-materials'>
            <div
                id={id}
                className={`select ${listVisible ? 'select_active' : ''}`}
            >
                <div className='label select__label'>Выполненная работа</div>

                <div
                    className='input select__input'
                    onClick={() => setListVisible(true)}
                >
                    <div className='select__input-container-in'>
                        <Icon
                            className='icon select__icon-search'
                            icon={ICON.SEARCH}
                        />
                        <input
                            onChange={event => setFilterWorks(event.target.value)}
                            value={filterWorks}
                            disabled={disabled}
                        />
                    </div>
                    <Icon icon={ICON.DOWN} className={`icon icon_24 ${listVisible ? 'icon_rotate-90' : ''}`}/>
                </div>

                    {listVisible && !disabled ?
                        <div className='select__drop-list'>
                            <div className='select__drop-list-body'>
                                {servises.map(service => (
                                    <div
                                        className='select__item select__item_option select__item_client'
                                        key={service.id}
                                        onClick={() => handleCreateOperation(service)}
                                    >
                                        <div className=''>{service.title}</div>
                                        <div className='select__item_price'>{service.price} руб.</div>
                                    </div>
                                ))}
                                <div className='select__buttons'>
                                    <Button
                                        size='small'
                                        type='tertiary'
                                        title='Добавить как работу'
                                        onClick={handleNewWord}
                                    />
                                    <Button
                                        size='small'
                                        type='tertiary'
                                        title='Добавить как материал'
                                        onClick={handleNewMaterial}
                                    />
                                </div>
                            </div>
                        </div>
                        : null
                    }
                </div>
                <div className='set-work-materials__text'> или </div>
                <Button
                    id='WriteOfEditor'
                    size='med'
                    type='tertiary'
                    title='Со склада'
                    onClick={handleNewWriteOf}
                    icon={ICON.BARCODE}
                />

        </div>
    )
}

const mapStateToProps = state => ({
    dict_service: state.data.dict_service,
    status_group: state.order.status.group,
    order_id: state.order.edit,
    order: state.order,
    discount_margin: state.price.discount_margin,
    user: state.data.user
})

const mapDispatchToProps = {
    createOperation,
    changeVisibleState,
    changeWriteOfState,
    changeOrderPartState
}

export default connect(mapStateToProps, mapDispatchToProps)(SetWorkMaterials)