import React, {useEffect, useRef, useState} from 'react'
import {connect} from 'react-redux'

import { addEquipmentSubtype, changeBookState} from '../../../Redux/actions/bookActions'
import {changeFilterState} from '../../../Redux/actions/filterAction'
import {ICON} from '../../../data/icons'
import Icon from '../../general/Icon'

const SetSubtype = props => {

    const [listVisible, setListVisible] = useState(false)

    const element = useRef()

    const clickHandel = (event) => {
        if (element.current && listVisible && !element.current.contains(event.target)) {
            setListVisible(false)
        }
    }

    useEffect(() => {
        props.addEquipmentSubtype()
    }, [props.book.filter_subtype, props.book.equipment_brand])

    const selected = !!Object.values(props.book.equipment_subtype).length
    const settledBrand = !!Object.values(props.book.equipment_brand).length
    const settledType = !!Object.values(props.book.equipment_type).length

    useEffect(() => {
        window.addEventListener('click', clickHandel)
        return () => {
            window.removeEventListener('click', clickHandel)
        }
    })

    const reset = () => {
        props.changeFilterState({temp_subtype: null})
        props.changeBookState({
            filter_subtype: '',
            equipment_subtype: {}
        })
    }


    const setSubtype = (subtype) => {
        props.changeFilterState({temp_subtype: subtype.id})
        props.changeBookState({equipment_subtype: subtype})
        setListVisible(false)
    }

    return (
        <div
            ref={element}
            className={`select ${props.className} ${listVisible ? 'select_active' : ''}`}
        >
            <div className='label select__label'>Модуль/Серия</div>
            <button
                className='input select__input'
                onClick={() => setListVisible(true)}
                disabled={selected || !settledType || !settledBrand}
            >
                <div className='select__input-container-in'>
                    <Icon
                        className='icon select__icon-search'
                        icon={ICON.SEARCH}
                    />
                    <input
                        className='w100p'
                        onChange={event => props.changeBookState({filter_subtype: event.target.value})}
                        placeholder='Выбирете Модуль/Серию'
                        value={selected ? props.book.equipment_subtype.title : props.book.filter_subtype}
                        disabled={selected  || !settledType || !settledBrand}
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
                        {props.book.equipment_subtypes.map(subtype => (
                            <div
                                key={subtype.id}
                                className='select__item select__item_option'
                                onClick={() => setSubtype(subtype)}
                            >
                                {subtype.title}
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
    addEquipmentSubtype,
    changeBookState,
    changeFilterState
}

export default connect(mapStateToProps, mapDispatchToProps)(SetSubtype)