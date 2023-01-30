import React, {useEffect, useRef, useState} from 'react'
import {connect} from 'react-redux'

import { addEquipmentType, changeBookState} from '../../../Redux/actions/bookActions'
import {ICON} from '../../../data/icons'
import Icon from '../../general/Icon'
import {changeFilterState} from '../../../Redux/actions/filterAction'

const SetGroup = props => {

    const [listVisible, setListVisible] = useState(false)

    const element = useRef()

    const clickHandel = (event) => {
        if (element.current && listVisible && !element.current.contains(event.target)) {
            setListVisible(false)
        }
    }

    useEffect(() => {
        props.addEquipmentType()
    }, [props.book.filter_type])

    const selected = !!Object.values(props.book.equipment_type).length

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
        setListVisible(false)
    }

    return (
        <div
            ref={element}
            className={`select ${props.className} ${listVisible ? 'select_active' : ''}`}
        >
            <div className='label select__label'>Тип устройства</div>
            <button
                className='input select__input'
                onClick={() => setListVisible(true)}
                disabled={selected}
            >
                <div className='select__input-container-in'>
                    <Icon
                        className='icon select__icon-search'
                        icon={ICON.SEARCH}
                    />
                    <input
                        className='w100p'
                        onChange={event => props.changeBookState({filter_type: event.target.value})}
                        placeholder='Выбирете группу'
                        value={selected ? props.book.equipment_type.title : props.book.filter_type}
                        disabled={selected}
                    />
                </div>
                {selected ?
                    <div onClick={reset}>
                        <Icon icon={ICON.CANCEL} className='icon'/>
                    </div>
                    :
                    <Icon icon={ICON.DOWN} className={`icon icon_24 ${listVisible ? 'icon_rotate-90' : ''}`}/>
                }
            </button>
            {listVisible ?
                <div className='select__drop-list'>
                    <div className='select__drop-list-body'>
                        {props.book.equipment_types.map(equipment => (
                            <div
                                key={equipment.id}
                                className='select__item select__item_option'
                                onClick={() => setType(equipment)}
                            >
                                {equipment.title}
                            </div>
                        ))}
                    </div>
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