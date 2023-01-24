import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'

import { addEquipmentType, changeBookState} from '../../../Redux/actions/bookActions'
import {icon_cancel, icon_down, icon_left} from '../../../data/icons'
import Icon from '../../general/Icon'
import {changeFilterState} from '../../../Redux/actions/filterAction'

const SetGroup = props => {

    const [visibleList, setVisibleList] = useState(false)

    useEffect(() => {
        props.addEquipmentType()
    }, [props.book.filter_type])

    const seted = !!Object.values(props.book.equipment_type).length

    const clickHandel = (event) => {
        if (
            !event.composedPath().map(el => el.id).includes('listFilterOfGroup') &&
            !event.composedPath().map(el => el.id).includes('optionsFilterTextOfGroup')
        ) {
            if (visibleList) {
                setVisibleList(false)
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
        props.changeFilterState({
            temp_kindof_good_id: null,
            temp_brand: null,
            temp_subtype: null
        })
        props.changeBookState({
            filter_type: '',
            filter_brand: '',
            filter_subtype: '',
            equipment_type: {},
            equipment_brand: {},
            equipment_subtype: {}
        })
    }


    const setType = (equipment) => {
        props.changeFilterState({temp_kindof_good_id: equipment.id})
        props.changeBookState({equipment_type: equipment})
        setVisibleList(false)
    }

    return (
        <div className='mt15 h52'>
            <div className='lableImput'>Тип устройства</div>
            <button
                id='optionsFilterTextOfGroup'
                className='optionsFilterText'
                onClick={() => setVisibleList(true)}
                disabled={seted}
            >
                <input
                    className='optionFilterInput'
                    onChange={event => props.changeBookState({filter_type: event.target.value})}
                    placeholder='Выбирете группу'
                    value={seted ? props.book.equipment_type.title : props.book.filter_type}
                    disabled={seted}
                />
                {seted ?
                    <div onClick={reset}>
                        <Icon icon={icon_cancel} className='icon-close'/>
                    </div>
                    :
                    <Icon icon={visibleList ? icon_down : icon_left} className='icon-s2'/>
                }
            </button>
            {visibleList ?
                <div className='listFilter' id='listFilterOfGroup'>
                    {props.book.equipment_types.map(equipment => (
                            <div
                                key={equipment.id}
                                className='rowGropList'
                                onClick={() => setType(equipment)}
                            >
                                {equipment.title}
                            </div>
                    ))}
                </div> : null}
        </div>
    )
}

const mapStateToProps = state => ({
    filter: state.filter,
    book: state.book
})

const mapDispatchToProps = {
    addEquipmentType,
    changeBookState,
    changeFilterState
}

export default connect(mapStateToProps, mapDispatchToProps)(SetGroup)