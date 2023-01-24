import React, {useEffect, useMemo, useState} from 'react'
import {connect} from 'react-redux'

import {createEquipmentModel, addEquipmentModel, changeBookState} from '../../../../Redux/actions/bookActions'
import {ICON} from '../../../../data/icons'
import Icon from '../../../general/Icon'
import {changeOrderState} from '../../../../Redux/actions/orderActions'
import {checkObject} from '../../../general/utils'
import Button from '../../../general/Button'

const SetOrderModel = (props) => {

    const [listVisible, setListVisible] = useState(false)
    const [buttonVisible, setButtonVisible] = useState(false)

    const id = 'SetOrderGroup'

    useEffect(() => {
        if (Object.values(props.book.equipment_subtype).length) props.addEquipmentModel()
    }, [props.book.equipment_subtype, props.book.filter_model])


    const disabled = !checkObject(props.book.equipment_subtype)
    const selected = checkObject(props.order.model)

    const clickHandel = (event) => {
        if (!event.composedPath().map((el) => el.id).includes(id)) {
            if (listVisible) {
                setListVisible(false)
                setButtonVisible(false)
            }
        }
    }

    useEffect(() => {
        window.addEventListener('click', clickHandel)
        return () => {
            window.removeEventListener('click', clickHandel)
        }
    })

    const setModel = model => {
        props.changeOrderState({model})
        props.changeBookState({equipment_model: model, filter_model: ''})
        setListVisible(false)
        setButtonVisible(false)
    }

    const reset = () => {
        props.changeOrderState({model: {}})
        // props.changeBookState({equipment_model: {}})
    }

    const createNewModel = (event) => {
        if (event.key === 'Enter') {
            props.createEquipmentModel(event.target.value)
            setListVisible(false)
            setButtonVisible(false)
        }
    }

    const mainClassName = useMemo(() => {
        let className = 'select'
        if (props.className) className += ` ${props.className}`
        if (listVisible) className += ' select_active'
        if (disabled) className += ' select_disabled'
        return className
    }, [props.className, listVisible, disabled])

    return (
        <div
            id={id}
            className={mainClassName}
        >
            <div className='label select__label'>Модель</div>
            <button
                className='input select__input'
                onClick={() => setListVisible(true)}
                disabled={disabled || selected}
            >
                <input
                    className='w100p'
                    onChange={event => props.changeBookState({filter_model: event.target.value})}
                    placeholder="Выбирете модель"
                    value={selected ? props.order.model.title : props.book.filter_model}
                    disabled={disabled || selected}
                />
                {selected && props.permissions.includes('edit_info_orders') ?
                    <div onClick={reset}>
                        <Icon icon={ICON.CANCEL} className='icon'/>
                    </div>
                    :
                    <Icon icon={ICON.DOWN} className={`icon icon_24 ${listVisible ? 'icon_rotate-90' : ''}`}/>
                }
            </button>

            {listVisible && !disabled ? (
                <div className='select__drop-list'>
                    <div className='select__drop-list-body'>
                        <div className='select__set-items'>
                            {props.book.equipment_models.map((model) => (
                                buttonVisible ? null :
                                <div
                                    key={model.id}
                                    className="select__item select__item_option"
                                    onClick={() => setModel(model)}
                                >
                                    {model.title}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="select__buttons">
                        {buttonVisible ?
                            <div className='select__add-input'>
                                <input
                                    className="select__add-input"
                                    autoFocus
                                    onChange={event => props.changeBookState({filter_model: event.target.value})}
                                    onKeyPress={createNewModel}
                                    onBlur={() => setButtonVisible(false)}
                                    value={props.book.filter_model}
                                />
                                <div className='select__add-input-text'>Введите название и нижмите Enter</div>
                            </div>
                            :
                            <Button
                                size='small'
                                type='tertiary'
                                title='Добавить модель'
                                onClick={() => setButtonVisible(true)}
                            />
                        }
                    </div>
                </div>
            ) : null}
        </div>
    )
}

const mapStateToProps = (state) => ({
    order: state.order,
    book: state.book,
    permissions: state.data.user.role.permissions
})

const mapDispatchToProps = {
    createEquipmentModel,
    changeOrderState,
    addEquipmentModel,
    changeBookState
}

export default connect(mapStateToProps, mapDispatchToProps)(SetOrderModel)
