import React, {useEffect, useState, useMemo} from 'react'
import {connect} from 'react-redux'

import {changeVisibleState} from '../../../../Redux/actions'
import {createEquipmentType, addEquipmentType, changeBookState} from '../../../../Redux/actions/bookActions'
import {changeOrderState} from '../../../../Redux/actions/orderActions'
import {ICON} from '../../../../data/icons'
import Icon from '../../../general/Icon'

const SetOrderGroupe = (props) => {

    const [visibleList, setVisibleList] = useState(false)
    const [visibleBotton, setVisisbleBotton] = useState(false)

    useEffect(() => {
        props.addEquipmentType()
    }, [props.book.filter_type])

    const settled = !!Object.values(props.order.kindof_good).length

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
        props.changeOrderState({
            kindof_good: {},
            brand: {},
            subtype: {},
            model: {}
        })
        props.changeBookState({equipment_type: {}})
        props.changeVisibleState({checkedOrderKindofGood: true})
    }


    const setOrderType = equipment => {
        props.changeOrderState({kindof_good: equipment}) 
        props.changeBookState({filter_type: '', equipment_type: equipment})
        setVisibleList(false)
        setVisisbleBotton(false)
    }

    return (
        <div>
            <button
                className='optionsFilterText'
                id='optionsOrderTextOfGroup'
                onClick={() => setVisibleList(true)}
                disabled={settled}
                style={!props.view.checkedOrderKindofGood? {borderColor: 'red'} : null}
            >
                <input
                    className='optionFilterInput'
                    onChange={event => props.changeBookState({filter_type: event.target.value})}
                    placeholder='Выбирете группу'
                    value={settled ? props.order.kindof_good.title : props.book.filter_type}
                    disabled={settled}
                />
                {settled && props.permissions.includes('edit_info_orders') ?
                    <div onClick={reset}>
                        <Icon icon={ICON.CANCEL} className='icon-close'/>
                    </div>
                    :
                    <Icon icon={ICON.DOWN} className='icon-s2'/>
                }
            </button>
            {!props.view.checkedOrderKindofGood ?
                <div className='errorMassageInput'>{'Необоходимо выбрать из списка'}</div> : null}
            {visibleList ? <div className='listFilter' id='listOrderOfGroup'>
                {props.book.equipment_types.map(equipment => (
                    visibleBotton ? null :
                    <div
                        key={equipment.id}
                        className='rowGropList'
                        onClick={() => setOrderType(equipment)}
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

export default connect(mapStateToProps, mapDispatchToProps)(SetOrderGroupe)