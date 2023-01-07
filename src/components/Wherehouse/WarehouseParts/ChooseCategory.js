import React, {useState} from 'react'
import { connect } from 'react-redux'

import {changeWarehouseForm} from '../../../Redux/actions/warehouseAction';

import {ICON} from '../../../data/icons';

import Icon from '../../general/Icon';
import SelectCategory from './SelectCategory';

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

    const mainCategory = props.warehouse.warehouse_categories

    const handleChoose = (category) => {
        setListVisible( false )
        props.setCategory(category)
    }

    return (
        <div
            className={props.className}
            style={{width: props.width || '250px'}}
        >
            <div className='lableImput'>Родительская категория</div>
            <div
                className='optionsButton'
                onClick={() => setListVisible(!listVisible && !props.warehouse.category_deleted)}
            >
                <div className='noWr'>{props.current_category ? props.current_category.title : ''}</div>
                <Icon className='icon-s4' icon={listVisible ?  ICON.LEFT : ICON.DOWN}/>
            </div>
            {listVisible && !props.disabled ?
                <div
                    className='listOptionsChoose pos-a'
                    style={{width: props.width || '250px'}}
                >
                    <div
                        className='row hovblue'
                    >
                        <div onClick={() => setCatVisible(!catVisible)}>
                            <Icon className='icon-s1' icon={catVisible ? ICON.DOWN : ICON.RIGHT}/>
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
                : null
            }
        </div>

    )
}

const mapStateToProps = state => ({
    warehouse: state.warehouse
})

const mapDispatchToProps = {
    changeWarehouseForm
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseCategory)