import React, {useEffect, useMemo, useState} from 'react'
import {connect} from 'react-redux'

import {changeVisibleState} from '../../../../Redux/actions'
import {cteateEquipmentSubtype, addEquipmentSubtype, changeBookState} from '../../../../Redux/actions/bookActions'
import {changeOrderState} from '../../../../Redux/actions/orderActions'

import {ICON} from '../../../../data/icons'
import Icon from '../../../general/Icon'
import {checkObject} from '../../../general/utils'
import Button from '../../../general/Button'

const SetOrderSubtype = (props) => {

    const [listVisible, setListVisible] = useState(false)
    const [buttonVisible, setButtonVisible] = useState(false)

    const id = 'SetOrderSubtype'

    useEffect(() => {
        if (Object.values(props.book.equipment_brand).length) props.addEquipmentSubtype()
    }, [props.book.equipment_brand, props.book.filter_subtype])

    const disabled = !checkObject(props.book.equipment_brand)
    const selected = checkObject(props.order.subtype)

    const clickHandel = (event) => {
        if (!event.composedPath().map((el) => el.id).includes(id) ) {
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
            subtype: {},
            model: {}
        })
        props.changeBookState({equipment_subtype: {}})

    }

    const setSubtype = subtype => {
        props.changeOrderState({subtype})
        props.changeBookState({equipment_subtype: subtype, filter_subtype: ''})
        setListVisible(false)
        setButtonVisible(false)
        props.changeVisibleState({checkedOrderSubtype: true})
    }

    const createNewSubtype = (event) => {
        if (event.key === 'Enter') {
            props.cteateEquipmentSubtype(event.target.value)
            setListVisible(false)
            setButtonVisible(false)
        }
    }

    const mainClassName = useMemo(() => {
        let className = 'select'
        if (props.className) className += ` ${props.className}`
        if (listVisible) className += ' select_active'
        if (disabled) className += ' select_disabled'
        if (!props.view.checkedOrderSubtype) className += ' select_error'
        return className
    }, [props.className, listVisible, disabled, props.view.checkedOrderSubtype])

    return (
        <div
            id={id}
            className={mainClassName}
        >
            <div className='label select__label'>Модуль / Серия</div>
            <button
                className='input select__input'
                onClick={() => setListVisible(true)}
                disabled={disabled || selected}
            >
                <input
                    className='w100p'
                    onChange={event => props.changeBookState({filter_subtype: event.target.value})}
                    placeholder="Выбирете модуль / серию"
                    value={selected ? props.order.subtype.title : props.book.filter_subtype}
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
                            {props.book.equipment_subtypes.map((subtype) => (
                                buttonVisible ? null :
                                    <Subtype
                                        key={subtype.id}
                                        subtype={subtype}
                                        onClick={() => setSubtype(subtype)}
                                    />
                                )
                            )}
                        </div>
                    </div>
                    <div className="select__buttons">
                        {buttonVisible ?
                            <div className='select__add-input'>
                                <input
                                    className="select__add-input"
                                    autoFocus
                                    onChange={event => props.changeBookState({filter_subtype: event.target.value})}
                                    onKeyPress={createNewSubtype}
                                    onBlur={() => setButtonVisible(false)}
                                    value={props.book.filter_subtype}
                                />
                                <div className='select__add-input-text'>Введите название и нижмите Enter</div>
                            </div>
                            :
                            <Button
                                size='small'
                                type='tertiary'
                                title='Добавить модуль/серию'
                                onClick={() => setButtonVisible(true)}
                            />
                        }
                    </div>
                </div>
            ) : null}
        </div>
    )
}

const Subtype = (props) => {

    const [showPictute, setShowPicture] = useState(false)

    return (
        <div
            className='select__item select__item_option'
            onClick={props.onClick}
            onMouseOver={() => setShowPicture(true)}
            onMouseOut={() => setShowPicture(false)}
        >
            <div>{props.subtype.title}</div>
            {showPictute && props.subtype.url ?
                <div className='select__item_img-box'>
                    <img className='select__item_img' src={`${process.env.PUBLIC_URL}/${props.subtype.url}`}/>
                </div>
                : null
            }
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
    cteateEquipmentSubtype,
    changeVisibleState,
    addEquipmentSubtype,
    changeBookState,
    changeOrderState
}

export default connect(mapStateToProps, mapDispatchToProps)(SetOrderSubtype)
