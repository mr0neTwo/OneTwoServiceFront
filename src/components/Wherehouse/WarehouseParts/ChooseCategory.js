import React, {useState} from 'react'
import { connect } from 'react-redux'

import {changeWarehouseForm} from '../../../Redux/actions/warehouseAction';

import {icon_down, icon_left, icon_right} from '../../../data/icons';

import Icon from '../../general/Icon';
import SelectCategory from './SelectCategory';

const ChooseCategory = (props) => {

    const [listVisible, setListVisible] = useState(false)
    const [catVisible, setCatVisible] = useState(!!props.warehouse.edit)

    const mainCategory = props.warehouse.warehouses_categories[0]

    const handleChoose = (category) => {
        setListVisible( false )
        props.changeWarehouseForm(category, 'current_parent_category')
    }

    return (
        <div className = 'w250 mt15'>
            <div className='lableImput'>Родтельская категория</div>
            <div
                className='optionsButton'
                onClick={() => setListVisible(!listVisible && !props.warehouse.category_deleted)}
                // style={props.warehouse.current_parent_category.id === mainCategory.id ? { borderColor: '#cae1f5' } : null}
            >
                <div className='noWr'>{props.warehouse.current_parent_category.title}</div>
                <Icon className='icon-s2' icon={listVisible ? icon_down : icon_left}/>
            </div>
            {listVisible && !props.disabled ?
                <div className='listOptionsChoose pos-a'>
                    <div
                        className='row hovblue'
                    >
                        <div onClick={() => setCatVisible(!catVisible)}>
                            <Icon className='icon-s1' icon={catVisible ? icon_down : icon_right}/>
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