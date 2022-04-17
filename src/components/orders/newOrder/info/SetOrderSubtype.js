import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'

import {changeVisibleState} from '../../../../Redux/actions'
import {cteateEquipmentSubtype, addEquipmentSubtype, changeBookState} from '../../../../Redux/actions/bookActions'
import {changeOrderState} from '../../../../Redux/actions/orderActions'

import {icon_cancel, icon_close, icon_down} from '../../../../data/icons'
import Subtype from './Subtype'
import Icon from '../../../general/Icon'

const SetOrderSubtype = (props) => {
    const [visibleList, setVisibleList] = useState(false)
    const [visibleBotton, setVisisbleBotton] = useState(false)

    useEffect(() => {
        if (Object.values(props.book.equipment_brand).length) props.addEquipmentSubtype()
    }, [props.book.equipment_brand, props.book.filter_subtype])

    const disabled = !Object.values(props.book.equipment_brand).length
    const seted = !!Object.values(props.order.subtype).length

    const clickHandel = (event) => {
        if (
            !event.path.map((el) => el.id).includes('listOrderOfSubtype') &&
            !event.path.map((el) => el.id).includes('optionsOrderTextOfSubtype')
        ) {
            if (visibleList) {
                setVisibleList(false)
                setVisisbleBotton(false)
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
        setVisibleList(false)
        setVisisbleBotton(false)
        props.changeVisibleState({checkedOrderSubtype: true})
    }

    return (
        <div>
            <button
                className={disabled ? 'optionsUnavaliable' : 'optionsFilterText'}
                id="optionsOrderTextOfSubtype"
                onClick={() => setVisibleList(true)}
                disabled={disabled || seted}
                style={!props.view.checkedOrderSubtype ? {borderColor: 'red'} : null}
            >
                <input
                    className={disabled ? 'optionsUnavaliable' : 'optionFilterInput'}
                    onChange={event => props.changeBookState({filter_subtype: event.target.value})}
                    placeholder="Выбирете модуль / серию"
                    value={seted ? props.order.subtype.title : props.book.filter_subtype}
                    disabled={disabled || seted}
                />
                {seted && props.permissions.includes('edit_info_orders') ?
                    <div onClick={reset}>
                        <Icon icon={icon_cancel} className='icon-close'/>
                    </div>
                    :
                    <Icon icon={icon_down} className='icon-s2'/>
                }
            </button>
            {!props.view.checkedOrderSubtype ?
                <div className="errorMassageInput">{'Необоходимо выбрать из списка'}</div> : null}
            {visibleList && !disabled ? (
                <div className="listFilter" id="listOrderOfSubtype">
                    {props.book.equipment_subtypes.map((subtype) => (
                        visibleBotton ? null :
                            <Subtype
                                key={subtype.id}
                                subtype={subtype}
                                onClick={() => setSubtype(subtype)}
                            />
                        )
                    )}
                    <div className="btmsts">
                        {visibleBotton ? (
                            <input
                                className="optionFilterInput"
                                autoFocus
                                onChange={event => props.changeBookState({filter_subtype: event.target.value})}
                                onKeyPress={(event) => {
                                    if (event.key === 'Enter') {
                                        props.cteateEquipmentSubtype(event.target.value)
                                        setVisisbleBotton(false)
                                    }
                                }}
                                onBlur={() => setVisisbleBotton(false)}
                                value={props.book.filter_subtype}
                                placeholder="Введите и нажмиете Enter"
                            />
                        ) : (
                            <div
                                className="btnstsTitle"
                                onClick={() => setVisisbleBotton(true)}
                            >
                                Добавить модуль / серию
                            </div>
                        )}
                    </div>
                </div>
            ) : null}
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
