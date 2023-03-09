import React, {useEffect, useState, useMemo} from 'react'
import {connect} from 'react-redux'

import {changeVisibleState} from '../../../../Redux/actions'
import {createEquipmentType, addEquipmentType, changeBookState} from '../../../../Redux/actions/bookActions'
import {changeOrderState} from '../../../../Redux/actions/orderActions'
import {ICON} from '../../../../data/icons'
import Icon from '../../../general/Icon'
import Button from '../../../general/Button'
import {checkObject} from '../../../general/utils'

const SetOrderGroup = (props) => {

    const [listVisible, setListVisible] = useState(false)
    const [visibleButton, setVisibleButton] = useState(false)

    const id = 'SetOrderGroup'

    useEffect(() => {
        props.addEquipmentType()
    }, [props.book.filter_type])

    const selected = checkObject(props.order.kindof_good)

    const clickHandel = (event) => {
        if (!event.composedPath().map(el => el.id).includes(id)) {
            if (listVisible) {
                setListVisible(false)
                setVisibleButton(false)
            }
        }
    }

    useEffect(() => {
        window.addEventListener('click', clickHandel)
        return () => {
            window.removeEventListener('click', clickHandel)
        }
    })

    const reset = () => {
        console.log('reset')
        props.changeOrderState({
            kindof_good: {},
            brand: {},
            subtype: {},
            model: {}
        })
        props.changeBookState({
            equipment_type: {},
            equipment_brand: {},
            equipment_subtype: {}
        })
        props.changeVisibleState({checkedOrderKindofGood: true})
    }


    const setOrderType = equipment => {
        props.changeOrderState({kindof_good: equipment}) 
        props.changeBookState({filter_type: '', equipment_type: equipment})
        props.changeVisibleState({checkedOrderKindofGood: true})
        setListVisible(false)
        setVisibleButton(false)
    }

    const createNewType = (event) => {
        if (event.key === 'Enter') {
            props.createEquipmentType(event.target.value)
            setListVisible(false)
            setVisibleButton(false)
        }
    }

    const mainClassName = useMemo(() => {
        let className = 'select'
        if (props.className) className += ` ${props.className}`
        if (listVisible) className += ' select_active'
        if (!props.view.checkedOrderKindofGood) className += ' select_error'
        return className
    }, [props.className, listVisible, props.view.checkedOrderKindofGood])

    return (
        <div
            id={id}
            className={mainClassName}
        >
            <div className='label select__label'>Тип устройства</div>
            <button
                className='input select__input'
                onClick={() => setListVisible(!selected)}
                // disabled={selected}
            >
                <input
                    className='w100p'
                    onChange={event => props.changeBookState({filter_type: event.target.value})}
                    placeholder='Выбирете группу'
                    value={selected ? props.order.kindof_good.title : props.book.filter_type}
                    disabled={selected}
                />
                {selected && props.permissions.includes('edit_info_orders') ?
                    <div onClick={reset}>
                        <Icon icon={ICON.CANCEL} className='icon'/>
                    </div>
                    :
                    <Icon icon={ICON.DOWN} className={`icon icon_24 ${listVisible ? 'icon_rotate-90' : ''}`}/>
                }
            </button>

            {listVisible ?
                <div className='select__drop-list'>
                    <div className='select__drop-list-body'>
                        <div className='select__set-items'>
                            {props.book.equipment_types.map(equipment => (
                                visibleButton ? null :
                                <div
                                    key={equipment.id}
                                    className='select__item select__item_option'
                                    onClick={() => setOrderType(equipment)}
                                >
                                    {equipment.title}
                                </div>
                            ))}
                        </div>
                    </div>
                <div className='select__buttons'>
                    {visibleButton ?
                        <div className='select__add-input'>
                            <input
                                className='select__add-input'
                                autoFocus
                                onChange={event => props.changeBookState({filter_type: event.target.value})}
                                onKeyDown={createNewType}
                                onBlur={() => setVisibleButton(false)}
                                value={props.book.filter_type}
                            />
                            <div className='select__add-input-text'>Введите название и нижмите Enter</div>
                        </div>
                        :
                        <Button
                            size='small'
                            type='tertiary'
                            title='Добавить тип'
                            onClick={() => setVisibleButton(true)}
                        />
                    }
                    </div>
            </div> : null}
        </div>
    )
}

const mapStateToProps = state => ({
    order: state.order,
    view: state.view,
    book: state.book,
    permissions: state.data.user.role.permissions
})

const mapDispatchToProps = {
    createEquipmentType,
    addEquipmentType,
    changeBookState,
    changeOrderState,
    changeVisibleState
}

export default connect(mapStateToProps, mapDispatchToProps)(SetOrderGroup)