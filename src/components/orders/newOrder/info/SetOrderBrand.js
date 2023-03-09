import React, {useEffect, useMemo, useState} from 'react'
import {connect} from 'react-redux'

import {changeVisibleState} from '../../../../Redux/actions'
import {createEquipmentBrand, addEquipmentBrand, changeBookState} from '../../../../Redux/actions/bookActions'
import {ICON} from '../../../../data/icons'
import Icon from '../../../general/Icon'
import {changeOrderState} from '../../../../Redux/actions/orderActions'
import {checkObject} from '../../../general/utils'
import Button from '../../../general/Button'

const SetOrderBrand = (props) => {

    const [listVisible, setListVisible] = useState(false)
    const [buttonVisible, setButtonVisible] = useState(false)
    const id = 'SetOrderBrand'

    useEffect(() => {
        if (Object.values(props.book.equipment_type).length) props.addEquipmentBrand()
    }, [props.book.equipment_type, props.book.filter_brand])

    const disabled = !checkObject(props.book.equipment_type)
    const selected = checkObject(props.order.brand)

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

    const reset = () => {
        props.changeOrderState({
            brand: {},
            subtype: {},
            model: {}
        })
        props.changeBookState({
            equipment_brand: {},
            equipment_subtype: {}
        })
    }

    const setBrand = brand => {
        props.changeOrderState({brand})
        props.changeBookState({equipment_brand: brand, filter_brand: ''})
        setListVisible(false)
        setButtonVisible(false)
        props.changeVisibleState({checkedOrderBrand: true})
    }

    const createNewBrand = (event) => {
        if (event.key === 'Enter') {
            props.createEquipmentBrand(event.target.value)
            setButtonVisible(false)
            setListVisible(false)
        }
    }

    const mainClassName = useMemo(() => {
        let className = 'select'
        if (props.className) className += ` ${props.className}`
        if (listVisible) className += ' select_active'
        if (disabled) className += ' select_disabled'
        if (!props.view.checkedOrderBrand) className += ' select_error'
        return className
    }, [props.className, listVisible, disabled, props.view.checkedOrderBrand])

    return (
        <div
            id={id}
            className={mainClassName}
        >
            <div className='label select__label'>Бренд</div>
            <button
                className='input select__input'
                onClick={() => setListVisible(!selected)}
                disabled={disabled}
            >
                <input
                    className='w100p'
                    onChange={event => props.changeBookState({filter_brand: event.target.value})}
                    placeholder="Выбирете бренд"
                    value={selected ? props.order.brand.title : props.book.filter_brand}
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

            {listVisible && !disabled ?
                <div className='select__drop-list'>
                    <div className='select__drop-list-body'>
                        <div className='select__set-items'>
                            {props.book.equipment_brands.map(brand => (
                                buttonVisible ? null :
                                    <div
                                        key={brand.id}
                                        className="select__item select__item_option"
                                        onClick={() => setBrand(brand)}
                                    >
                                        {brand.title}
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
                                onChange={event => props.changeBookState({filter_brand: event.target.value})}
                                onKeyDown={createNewBrand}
                                onBlur={() => setButtonVisible(false)}
                                value={props.book.filter_brand}
                            />
                                <div className='select__add-input-text'>Введите название и нижмите Enter</div>
                            </div>
                            :
                            <Button
                                size='small'
                                type='tertiary'
                                title='Добавить бренд'
                                onClick={() => setButtonVisible(true)}
                            />
                        }
                    </div>
                </div>
                : null
            }
        </div>
    )
}

const mapStateToProps = (state) => ({
    order: state.order,
    view: state.view,
    book: state.book,
    permissions: state.data.user.role.permissions
})

const mapDispatchToProps = {
    createEquipmentBrand,
    changeVisibleState,
    addEquipmentBrand,
    changeBookState,
    changeOrderState
}

export default connect(mapStateToProps, mapDispatchToProps)(SetOrderBrand)
