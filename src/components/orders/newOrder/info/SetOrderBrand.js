import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'

import {setOrderEquipment, resetEquipment, setVisibleListFlag, changeOrderFormS} from '../../../../Redux/actions'
import {createEquipmentBrand, addEquipmentBrand, changeBookState} from '../../../../Redux/actions/bookActions'
import {icon_cancel, icon_close, icon_down} from '../../../../data/icons'
import Icon from '../../../general/Icon'

const SetOrderBrand = (props) => {
    const [visibleList, setVisibleList] = useState(false)
    const [visibleBotton, setVisisbleBotton] = useState(false)

    useEffect(() => {
        if (Object.values(props.book.equipment_type).length) props.addEquipmentBrand()
    }, [props.book.equipment_type, props.book.filter_brand])


    const edit = props.order.edit
    const disabled = !Object.values(props.book.equipment_type).length
    const brand = props.order.edit ? props.order.brand : props.order.equipments[props.idx].brand
    const seted = !!Object.values(brand).length

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
        if (edit) {
            props.changeOrderFormS({}, 'brand')
            props.changeOrderFormS({}, 'subtype')
            props.changeOrderFormS({}, 'model')
        } else {
            props.resetEquipment(props.idx, 'brand')
            props.resetEquipment(props.idx, 'subtype')
            props.resetEquipment(props.idx, 'model')
        }
        props.changeBookState({equipment_brand: {}})
    }

    const setBrand = (idx, brand) => {
        edit ? props.changeOrderFormS(brand, 'brand') : props.setOrderEquipment(idx, 'brand', brand)
        props.changeBookState({equipment_brand: brand, filter_brand: ''})
        setVisibleList(false)
        setVisisbleBotton(false)
        props.setVisibleListFlag('checkedOrderBrand', props.idx, true)
    }

    return (
        <div>
            <button
                id="optionsOrderTextOfBrand"
                style={!props.view.checkedOrderBrand[props.idx] ? {borderColor: 'red'} : null}
                className={disabled ? 'optionsUnavaliable' : 'optionsFilterText'}
                onClick={() => setVisibleList(true)}
                disabled={disabled || seted}
            >
                <input
                    className={disabled ? 'optionsUnavaliable' : 'optionFilterInput'}
                    onChange={event => props.changeBookState({filter_brand: event.target.value})}
                    placeholder="Выбирете бренд"
                    value={seted ? brand.title : props.book.filter_brand}
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
            {!props.view.checkedOrderBrand[props.idx] ? (
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
                                onClick={() => setBrand(props.idx, brand)}
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
                                        props.createEquipmentBrand(props.idx, event.target.value)
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
    setOrderEquipment,
    resetEquipment,
    setVisibleListFlag,
    changeOrderFormS,
    addEquipmentBrand,
    changeBookState
}

export default connect(mapStateToProps, mapDispatchToProps)(SetOrderBrand)
