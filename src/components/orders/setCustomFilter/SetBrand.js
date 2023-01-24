import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'

import { addEquipmentBrand, changeBookState} from '../../../Redux/actions/bookActions'
import {changeFilterState} from '../../../Redux/actions/filterAction'

import {icon_cancel, icon_down, icon_left} from '../../../data/icons'
import Icon from '../../general/Icon'

const SetBrand = props => {

    const [visibleList, setVisibleList] = useState(false)

    useEffect(() => {
        props.addEquipmentBrand()
    }, [props.book.filter_brand, props.book.equipment_type])

    const settled = !!Object.values(props.book.equipment_brand).length
    const settledType = !!Object.values(props.book.equipment_type).length

    const clickHandel = (event) => {
        if (
            !event.composedPath().map(el => el.id).includes('listFilterOfBrand') &&
            !event.composedPath().map(el => el.id).includes('optionsFilterTextOfBrand')
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
        setVisibleList(false)
    }

    return (
        <div className='mt15 h52'>
            <div className='lableImput'>Бренд</div>
            <button
                id='optionsFilterTextOfBrand'
                className='optionsFilterText'
                onClick={() => setVisibleList(true)}
                disabled={settled || !settledType}
            >
                <input
                    className='optionFilterInput'
                    onChange={event => props.changeBookState({filter_brand: event.target.value})}
                    placeholder='Выбирете бренд'
                    value={settled ? props.book.equipment_brand.title : props.book.filter_brand}
                    disabled={settled  || !settledType}
                />
                {settled ?
                    <div onClick={reset}>
                        <Icon icon={icon_cancel} className='icon-close'/>
                    </div>
                    :
                    <Icon icon={visibleList ? icon_down : icon_left} className='icon-s2'/>
                }
            </button>
            {visibleList ?
                <div className='listFilter' id='listFilterOfBrand'>
                    {props.book.equipment_brands.map(brand => (
                        <div
                            key={brand.id}
                            className='rowGropList'
                            onClick={() => setBrand(brand)}
                        >
                            {brand.title}
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
    addEquipmentBrand,
    changeBookState,
    changeFilterState
}

export default connect(mapStateToProps, mapDispatchToProps)(SetBrand)