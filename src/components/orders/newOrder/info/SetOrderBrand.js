import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'

import {changeVisibleState} from '../../../../Redux/actions'
import {createEquipmentBrand, addEquipmentBrand, changeBookState} from '../../../../Redux/actions/bookActions'
import {icon_cancel, icon_close, icon_down} from '../../../../data/icons'
import Icon from '../../../general/Icon'
import {changeOrderState} from '../../../../Redux/actions/orderActions'

const SetOrderBrand = (props) => {

    const [visibleList, setVisibleList] = useState(false)
    const [visibleBotton, setVisisbleBotton] = useState(false)

    useEffect(() => {
        if (Object.values(props.book.equipment_type).length) props.addEquipmentBrand()
    }, [props.book.equipment_type, props.book.filter_brand])


    const edit = props.order.edit
    const disabled = !Object.values(props.book.equipment_type).length
    const seted = !!Object.values(props.order.brand).length

    const clickHandel = (event) => {
        if (
            !event.path.map((el) => el.id).includes('listOrderOfBrand') &&
            !event.path.map((el) => el.id).includes('optionsOrderTextOfBrand')
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
            brand: {},
            subtype: {},
            model: {}
        })
        props.changeBookState({equipment_brand: {}})
    }

    const setBrand = brand => {
        props.changeOrderState({brand})
        props.changeBookState({equipment_brand: brand, filter_brand: ''})
        setVisibleList(false)
        setVisisbleBotton(false)
        props.changeVisibleState({checkedOrderBrand: true})
    }

    return (
        <div>
            <button
                id="optionsOrderTextOfBrand"
                style={!props.view.checkedOrderBrand ? {borderColor: 'red'} : null}
                className={disabled ? 'optionsUnavaliable' : 'optionsFilterText'}
                onClick={() => setVisibleList(true)}
                disabled={disabled || seted}
            >
                <input
                    className={disabled ? 'optionsUnavaliable' : 'optionFilterInput'}
                    onChange={event => props.changeBookState({filter_brand: event.target.value})}
                    placeholder="Выбирете бренд"
                    value={seted ? props.order.brand.title : props.book.filter_brand}
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
            {!props.view.checkedOrderBrand ? (
                <div className="errorMassageInput">
                    {'Необоходимо выбрать из списка'}
                </div>
            ) : null}
            {visibleList && !disabled ? (
                <div className="listFilter" id="listOrderOfBrand">
                    {props.book.equipment_brands.map(brand => (
                        visibleBotton ? null :
                            <div
                                key={brand.id}
                                className="rowGropList"
                                onClick={() => setBrand(brand)}
                            >
                                {brand.title}
                            </div>
                    ))}
                    <div className="btmsts">
                        {visibleBotton ? (
                            <input
                                className="optionFilterInput"
                                autoFocus
                                onChange={event => props.changeBookState({filter_brand: event.target.value})}
                                onKeyPress={event => {
                                    if (event.key === 'Enter') {
                                        props.createEquipmentBrand(event.target.value)
                                        setVisisbleBotton(false)
                                    }
                                }}
                                onBlur={() => setVisisbleBotton(false)}
                                value={props.book.filter_brand}
                                placeholder="Введите и нажмиете Enter"
                            />
                        ) : (
                            <div
                                className="btnstsTitle"
                                onClick={() => setVisisbleBotton(true)}
                            >
                                Добавить бренд
                            </div>
                        )}
                    </div>
                </div>
            ) : null}
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
