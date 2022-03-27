import React, {useEffect, useState, useMemo} from 'react'
import {connect} from 'react-redux'

import {setOrderEquipment, resetEquipment, setVisibleListFlag, changeOrderFormS} from '../../../../Redux/actions'
import {createEquipmentType, addEquipmentType, changeBookState} from '../../../../Redux/actions/bookActions'
import {icon_cancel, icon_down} from '../../../../data/icons'
import Icon from '../../../general/Icon'

const SetOrderGroupe = (props) => {

    const [visibleList, setVisibleList] = useState(false)
    const [visibleBotton, setVisisbleBotton] = useState(false)

    useEffect(() => {
        props.addEquipmentType()
    }, [props.book.filter_type])

    const edit = props.order.edit
    // const types = edit ? props.order.kindof_good : props.order.equipments[props.idx].kindof_good
    const types = useMemo(() => edit ? props.order.kindof_good : props.order.equipments[props.idx].kindof_good, [props.order.kindof_good, props.order.equipments[props.idx].kindof_good])
    const seted = !!Object.values(types).length

    const clickHandel = (event) => {
        if (
            !event.path.map(el => el.id).includes('listOrderOfGroup') &&
            !event.path.map(el => el.id).includes('optionsOrderTextOfGroup')
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
            props.changeOrderFormS({}, 'kindof_good')
            props.changeOrderFormS({}, 'brand')
            props.changeOrderFormS({}, 'subtype')
            props.changeOrderFormS({}, 'model')
        } else {
            props.resetEquipment(props.idx, 'kindof_good')
            props.resetEquipment(props.idx, 'brand')
            props.resetEquipment(props.idx, 'subtype')
            props.resetEquipment(props.idx, 'model')
        }
        props.changeBookState({equipment_type: {}})
    }


    const setOrderType = (idx, equipment) => {
        edit ? props.changeOrderFormS(equipment, 'kindof_good') : props.setOrderEquipment(idx, 'kindof_good', equipment)
        props.changeBookState({filter_type: '', equipment_type: equipment})
        setVisibleList(false)
        setVisisbleBotton(false)
    }

    return (
        <>

            <button
                className='optionsFilterText'
                id='optionsOrderTextOfGroup'
                onClick={() => setVisibleList(true)}
                disabled={seted}
                style={!props.view.checkedOrderKindofGood[props.idx] ? {borderColor: 'red'} : null}
            >
                <input
                    className='optionFilterInput'
                    onChange={event => props.changeBookState({filter_type: event.target.value})}
                    placeholder='Выбирете группу'
                    value={seted ? types.title : props.book.filter_type}
                    disabled={seted}
                />
                {seted && props.permissions.includes('edit_info_orders') ?
                    <div onClick={reset}>
                        <Icon icon={icon_cancel} className='icon-close'/>
                    </div>
                    :
                    <Icon icon={icon_down} className='icon-s2'/>
                }
            </button>
            {!props.view.checkedOrderKindofGood[props.idx] ?
                <div className='errorMassageInput'>{'Необоходимо выбрать из списка'}</div> : null}
            {visibleList ? <div className='listFilter' id='listOrderOfGroup'>
                {props.book.equipment_types.map(equipment => (
                    visibleBotton ? null :
                    <div
                        key={equipment.id}
                        className='rowGropList'
                        onClick={() => setOrderType(props.idx, equipment)}
                    >
                        {equipment.title}
                    </div>
                ))}
                <div className='btmsts'>
                    {visibleBotton ?
                        <input
                            className='optionFilterInput'
                            autoFocus
                            onChange={event => props.changeBookState({filter_type: event.target.value})}
                            onKeyPress={(event) => {
                                if (event.key === 'Enter') {
                                    props.createEquipmentType(event.target.value)
                                    setVisisbleBotton(false)
                                }
                            }}
                            onBlur={() => setVisisbleBotton(false)}
                            value={props.book.filter_type}
                            placeholder='Введите и нажмиете Enter'
                        /> :
                        <div
                            className='btnstsTitle'
                            onClick={() => setVisisbleBotton(true)}
                        >
                            Добавить тип
                        </div>}
                </div>

            </div> : null}
        </>
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
    setOrderEquipment,
    resetEquipment,
    setVisibleListFlag,
    changeOrderFormS,
    addEquipmentType,
    changeBookState
}

export default connect(mapStateToProps, mapDispatchToProps)(SetOrderGroupe)