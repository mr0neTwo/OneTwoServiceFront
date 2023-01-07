import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'

import { addEquipmentSubtype, changeBookState} from '../../../Redux/actions/bookActions'
import {changeFilterState} from '../../../Redux/actions/filterAction'
import {ICON} from '../../../data/icons'
import Icon from '../../general/Icon'

const SetSubtype = props => {

    const [visibleList, setVisibleList] = useState(false)

    useEffect(() => {
        props.addEquipmentSubtype()
    }, [props.book.filter_subtype, props.book.equipment_brand])

    const settled = !!Object.values(props.book.equipment_subtype).length
    const settledBrand = !!Object.values(props.book.equipment_brand).length
    const settledType = !!Object.values(props.book.equipment_type).length

    const clickHandel = (event) => {
        if (
            !event.path.map(el => el.id).includes('listFilterOfSubtype') &&
            !event.path.map(el => el.id).includes('optionsFilterTextOfSubtype')
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
        props.changeFilterState({temp_subtype: null})
        props.changeBookState({
            filter_subtype: '',
            equipment_subtype: {}
        })
    }


    const setSubtype = (subtype) => {
        props.changeFilterState({temp_subtype: subtype.id})
        props.changeBookState({equipment_subtype: subtype})
        setVisibleList(false)
    }

    return (
        <div className='mt15 h52'>
            <div className='lableImput'>Модуль/Серия</div>
            <button
                id='optionsFilterTextOfSubtype'
                className='optionsFilterText'
                onClick={() => setVisibleList(true)}
                disabled={settled || !settledType || !settledBrand}
            >
                <input
                    className='optionFilterInput'
                    onChange={event => props.changeBookState({filter_subtype: event.target.value})}
                    placeholder='Выбирете Модуль/Серию'
                    value={settled ? props.book.equipment_subtype.title : props.book.filter_subtype}
                    disabled={settled  || !settledType || !settledBrand}
                />
                {settled ?
                    <div onClick={reset}>
                        <Icon icon={ICON.CANCEL} className='icon-close'/>
                    </div>
                    :
                    <Icon icon={visibleList ? ICON.DOWN : ICON.LEFT} className='icon-s2'/>
                }
            </button>
            {visibleList ?
                <div className='listFilter' id='listFilterOfSubtype'>
                    {props.book.equipment_subtypes.map(subtype => (
                        <div
                            key={subtype.id}
                            className='rowGropList'
                            onClick={() => setSubtype(subtype)}
                        >
                            {subtype.title}
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
    addEquipmentSubtype,
    changeBookState,
    changeFilterState
}

export default connect(mapStateToProps, mapDispatchToProps)(SetSubtype)