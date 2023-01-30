import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux'

import {changeWarehouseForm} from '../../../Redux/actions/warehouseAction';

import {ICON} from '../../../data/icons';

import Icon from '../../general/Icon';

/**
 *
 * className='className'
 *
 * width='250px'
 *
 * setCategory={category => console.log(category)}
 *
 * current_category={props.current_category}
 *
 * disabled={false}
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */


const ChooseCategory = (props) => {

    const [listVisible, setListVisible] = useState(false)
    const [catVisible, setCatVisible] = useState(!!props.warehouse.edit)

    const id = 'ChooseCategory'

    const clickHandel = (event) => {
        if (!event.composedPath().map((el) => el.id).includes(id)) {
            setListVisible(false)
        }
    }

    useEffect(() => {
        window.addEventListener('click', clickHandel)
        return () => {
            window.removeEventListener('click', clickHandel)
        }
    })

    const mainCategory = props.warehouse.warehouse_categories

    const handleChoose = (category) => {
        setListVisible( false )
        props.setCategory(category)
    }

    return (
        <div
            id={id}
            className={`select ${props.className} ${listVisible ? 'select_active' : ''}`}
        >
            <div className='label select__label'>Родительская категория</div>
            <div
                className='input select__input'
                onClick={() => setListVisible(!listVisible && !props.warehouse.category_deleted)}
            >
                <div className='nowrap'>{props.current_category ? props.current_category.title : ''}</div>
                <Icon icon={ICON.DOWN} className={`icon icon_24 ${listVisible ? 'icon_rotate-90' : ''}`}/>
            </div>

            {listVisible && !props.disabled ?
                <div className='select__drop-list'>
                    <div className='select__drop-list-body'>
                        <div className='select__item_category'>

                            <div onClick={() => setCatVisible(!catVisible)}>
                                <Icon className={`icon ${catVisible ? 'icon_rotate-90' : ''}`} icon={ICON.RIGHT}/>
                            </div>
                            <div onClick={() => handleChoose(mainCategory) }>{mainCategory.title}</div>
                        </div>

                        {catVisible ?
                            <div className='ml10'>
                                {mainCategory.categories.map(category => (
                                    <SelectCategory
                                        key={category.id}
                                        edit={props.warehouse.edit}
                                        category={category}
                                        choose={cat => handleChoose(cat)}
                                    />
                                ))}
                            </div>
                            : null
                        }
                    </div>
                </div>
                : null
            }

        </div>

    )
}

const SelectCategory = props => {

    const [visibleList, setVisibleList] = useState(!!props.edit)

    return (props.edit === props.category.id) ? null : (
        <>
            <div className='row'>
                <div className='select__item_category'>
                    <div onClick={() => setVisibleList(!visibleList)}>
                        {props.category.categories.length ?
                            <Icon className={`icon ${visibleList ? 'icon_rotate-90' : ''}`} icon={ICON.RIGHT}/>
                            : <div className='ml16'/>
                        }
                    </div>
                    <div
                        className={props.category.deleted ? 'rowDeleted nowrap' : 'nowrap'}
                        onClick={() => props.choose(props.category) }
                    >
                        {props.category.title}
                    </div>
                </div>
            </div>
            { visibleList ?
                <div className='ml10'>
                    {props.category.categories.map(category => (
                        <SelectCategory
                            key={category.id}
                            edit={props.edit}
                            category={category}
                            choose={cat => props.choose(cat)}
                        />
                    ))}
                </div>
                : null
            }
        </>
    )
}

const mapStateToProps = state => ({
    warehouse: state.warehouse
})

const mapDispatchToProps = {
    changeWarehouseForm
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseCategory)