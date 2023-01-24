import React, {useEffect, useRef, useState} from 'react'
import {connect} from 'react-redux'

import { addEquipmentBrand, changeBookState} from '../../../Redux/actions/bookActions'
import {changeFilterState} from '../../../Redux/actions/filterAction'

import {ICON} from '../../../data/icons'
import Icon from '../../general/Icon'

const SetBrand = props => {

    const [listVisible, setListVisible] = useState(false)

    const element = useRef()

    const clickHandel = (event) => {
        if (element.current && listVisible && !element.current.contains(event.target)) {
            setListVisible(false)
        }
    }
    useEffect(() => {
        props.addEquipmentBrand()
    }, [props.book.filter_brand, props.book.equipment_type])

    const selected = !!Object.values(props.book.equipment_brand).length
    const settledType = !!Object.values(props.book.equipment_type).length

    useEffect(() => {
        window.addEventListener('click', clickHandel)
        return () => {
            window.removeEventListener('click', clickHandel)
        }
    })

    const reset = () => {
        props.changeFilterState({
            temp_brand: null,
            temp_subtype: null
        })
        props.changeBookState({
            filter_brand: '',
            filter_subtype: '',
            equipment_brand: {},
            equipment_subtype: {}
        })
    }


    const setBrand = (brand) => {
        props.changeFilterState({temp_brand: brand.id})
        props.changeBookState({equipment_brand: brand})
        setListVisible(false)
    }

    return (
        <div 
            ref={element}
            className={`select ${props.className} ${listVisible ? 'select_active' : ''}`}
        >
            <div className='label select__label'>Бренд</div>
            <button
                className='input select__input'
                onClick={() => setListVisible(true)}
                disabled={selected || !settledType}
            >
                <div className='select__input-container-in'>
                    <Icon
                        className='icon select__icon-search'
                        icon={ICON.SEARCH}
                    />
                    <input
                        className='w100p'
                        onChange={event => props.changeBookState({filter_brand: event.target.value})}
                        placeholder='Выбирете бренд'
                        value={selected ? props.book.equipment_brand.title : props.book.filter_brand}
                        disabled={selected  || !settledType}
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
                        {props.book.equipment_brands.map(brand => (
                            <div
                                key={brand.id}
                                className='select__item select__item_option'
                                onClick={() => setBrand(brand)}
                            >
                                {brand.title}
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
    addEquipmentBrand,
    changeBookState,
    changeFilterState
}

export default connect(mapStateToProps, mapDispatchToProps)(SetBrand)