import React, {useEffect, useMemo, useState} from 'react'
import {connect} from 'react-redux'

import Icon from '../../general/Icon'

import {addParts, changePartState} from '../../../Redux/actions/partAction'
import {ICON} from '../../../data/icons'
import {changeRegistrationState} from '../../../Redux/actions/registrationAction'
import {changeVisibleState} from '../../../Redux/actions'
import Button from '../../general/Button'
import {Modal} from "../../../data/data";
import {checkObject} from "../../general/utils";


const componentId = 'AddParts'

const AddParts = (props) => {

    useEffect(() => {
        props.addParts()
    }, [props.part.filter_name])

    const [listVisible, setListVisible] = useState(false)

    const clickHandel = (event) => {
        if (
            !event.composedPath().map(el => el.id).includes(componentId)
        ) {
            setListVisible(false)
        }
    }

    useEffect(() => {
        window.addEventListener('click', clickHandel)
        return () => {
            window.removeEventListener('click', clickHandel)
        }
    })

    const handleSet = (part) => {
        if (checkObject(props.registration.warehouse)) {
            setListVisible(false)
            const rule = part.residue_rules.find(rule => rule.warehouse.id === props.registration.warehouse.id)
             const cell = rule ? rule.cell : ''

            props.changeRegistrationState({part, cell, prices: part.prices})
            props.changeVisibleState({
                isCentralModalOpen: true,
                modalCentralType: Modal.Type.REGISTRATION_PART,
                inputRegistrationPartChecked: true
            })
        } else {
            props.changeVisibleState({inputRegistrationWarehouseChecked: false})
        }
    }

    const handleNewPart = () => {
        if (checkObject(props.registration.warehouse)) {
            props.changeVisibleState({isRightModalOpen: true, modalType: Modal.Type.PART})
            props.changePartState({
                warehouse_category: props.warehouse.warehouse_categories,
                createForRegistration: true
            })
        } else {
            props.changeVisibleState({inputRegistrationWarehouseChecked: false})
        }
    }

    const parts = props.part.parts.filter(part => !props.registration.parts.map(part => part.part.id).includes(part.id))

    const mainClassName = useMemo(() => {
        let className = 'select'
        if (props.className) className += ` ${props.className}`
        if (listVisible) className += ' select_active'
        if (props.checkedFlag && !props.view[props.checkedFlag]) className += ' select_error'
        return className
    }, [props.className, listVisible, props.checkedFlag, props.view[props.checkedFlag]])

    if (props.invisible) return <div/>

    return (
        <div
            id={componentId}
            className={mainClassName}
        >

            <div className='label select__label'>Наименование товара</div>


            <div
                className='input select__input'
                onClick={props.registration.edit ? null : () => setListVisible(true)}
            >
                <div className='select__input-container-in'>
                    <Icon
                        className='icon select__icon-search'
                        icon={ICON.SEARCH}
                    />
                    <input
                        onChange={event => props.changePartState({filter_name: event.target.value})}
                        value={props.part.filter_name}
                    />
                </div>
                <Icon icon={ICON.DOWN} className={`icon icon_24 ${listVisible ? 'icon_rotate-90' : ''}`}/>
            </div>
            {listVisible ?
                <div className='select__drop-list'>
                    <div className='select__drop-list-body'>
                        {parts.map(part => (
                            <div
                                className='select__item select__item_option select__item_client'
                                key={part.id}
                                onClick={() => handleSet(part)}
                            >
                                <div
                                    className='nowrap'>{(part.marking !== part.title) && !!part.marking ? `${part.title} (${part.marking})` : part.title}</div>
                                <div className='cs nowrap'>
                                    {part.description}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='select__buttons'>
                        <Button
                            id='PartEditor'
                            size='med'
                            type='tertiary'
                            title='Запчасть'
                            onClick={handleNewPart}
                        />
                    </div>
                </div> : null}
        </div>
    )
}

const mapStateToProps = state => ({
    part: state.part,
    view: state.view,
    registration: state.registration,
    warehouse: state.warehouse
})

const mapDispatchToProps = {
    changePartState,
    addParts,
    changeRegistrationState,
    changeVisibleState
}

export default connect(mapStateToProps, mapDispatchToProps)(AddParts)