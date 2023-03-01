import React, {useEffect, useMemo, useState} from 'react'
import {connect} from 'react-redux'

import {changeReqSparePartState} from '../../../Redux/actions/requestSparePartsAction'
import {addParts, changePartState} from '../../../Redux/actions/partAction'
import {ICON} from '../../../data/icons'
import {changeVisibleState} from '../../../Redux/actions'

import Icon from '../../general/Icon'
import Button from '../../general/Button'
import {checkObject} from '../../general/utils'
import {Modal} from "../../../data/data";


const SetPart = (props) => {

    const componentId = 'SetPart'

    useEffect(() => {
        props.addParts()
    }, [props.part.filter_name])

    const [listVisible, setListVisible] = useState(false)

    const clickHandel = (event) => {
        if (!event.composedPath().map(el => el.id).includes(componentId)) {
            setListVisible(false)
        }
    }

    useEffect(() => {
        window.addEventListener('click', clickHandel)
        return () => {
            window.removeEventListener('click', clickHandel)
        }
    })

    const handleNewPart = () => {
        props.changeVisibleState({isRightModalOpen: true, modalType: Modal.Type.PART})
        props.changePartState({
            warehouse_category: props.warehouse.warehouse_categories,
            createForRequestSparePart: true
        })
    }

    const mainClassName = useMemo(() => {
        let className = 'select'
        if (props.className) className += ` ${props.className}`
        if (listVisible) className += ' select_active'
        if (props.disabled) className += ' select_disabled'
        if (props.checkedFlag && !props.view[props.checkedFlag]) className += ' select_error'
        return className
    }, [props.className, listVisible, props.disabled, props.view])

    if (checkObject(props.reqsp.part)) {
        return (
            <div className={`client-card ${props.className || ''}`}>
                <div className='client-card__card'>
                    <div className='client-card__name-row'>
                        <div
                            id=''
                            className='client-card__name'
                            onClick={() => console.log(props.reqsp.part)}
                        >
                            <Icon
                                className='icon'
                                icon={ICON.BUG}
                            />
                            <div>{props.reqsp.part.title}</div>
                        </div>
                        <div
                            className='client-card__icon-cancel'
                            onClick={props.disabled ? null : () => props.changeReqSparePartState({part: {}})}
                        >
                            <Icon
                                className='icon'
                                icon={ICON.CANCEL}
                            />
                        </div>
                    </div>

                    <div className=''>{props.reqsp.part.description}</div>
                    <div className=''>
                        <span>Артукул: </span>
                        <span>{props.reqsp.part.article}</span>
                    </div>
                    <div className=''>
                        <span>Код: </span>
                        <span>{props.reqsp.part.code}</span>
                    </div>
                </div>
            </div>
        )
    }


    if (props.invisible) return <div/>

    return (
        <div
            id={componentId}
            className={mainClassName}
        >

            <div className='label select__label'>Наименование товара</div>

            <div
                className='input select__input'
                onClick={() => setListVisible(true)}
            >
                <input
                    className='optionFilterInput'
                    onChange={event => props.changePartState({filter_name: event.target.value})}
                />
                <Icon icon={ICON.DOWN} className={`icon icon_24 ${listVisible ? 'icon_rotate-90' : ''}`}/>
            </div>

            {listVisible ?
                <div className='select__drop-list'>
                    <div className='select__drop-list-body'>
                        {props.part.parts.map(part => (
                            <div
                                className='select__item select__item_option select__item_client'
                                key={part.id}
                                onClick={() => props.changeReqSparePartState({part})}
                            >
                                <div className='nowrap'>{(part.marking !== part.title) && !!part.marking ? `${part.title} (${part.marking})` : part.title}</div>
                                <div className='select__item_phone'>
                                    {part.description}
                                </div>
                            </div>
                        ))}
                        <div className='select__buttons'>
                            <Button
                                id='PartEditor'
                                size='med'
                                type='tertiary'
                                title='+ Запчасть'
                                className='whiteButton'
                                onClick={handleNewPart}
                            />
                        </div>
                    </div>
                </div>
                : null
            }

        </div>
    )
}

const mapStateToProps = state => ({
    part: state.part,
    view: state.view,
    reqsp: state.reqsp,
    warehouse: state.warehouse
})

const mapDispatchToProps = {
    changePartState,
    addParts,
    changeReqSparePartState,
    changeVisibleState
}

export default connect(mapStateToProps, mapDispatchToProps)(SetPart)