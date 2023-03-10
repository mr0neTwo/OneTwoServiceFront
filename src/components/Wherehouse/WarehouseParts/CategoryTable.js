import React, {useState} from 'react'
import { connect } from 'react-redux'

import {changeWarehouseForm, editWarehouseCategory} from '../../../Redux/actions/warehouseAction'
import {setVisibleFlag} from '../../../Redux/actions'
import {changePartState} from '../../../Redux/actions/partAction'

import { ICON} from '../../../data/icons'

import Icon from '../../general/Icon'
import WarehouseCategory from './WarehouseCategory'

const CategoryTable = props => {

    const [visibleList, setVisibleList] = useState(false)

    const mainCategory = props.warehouse.warehouse_categories || {id: 1, title: 'Все категории', categories: []}

    const handleChooseMain = (cat) => {
        props.changeWarehouseForm(cat, 'current_category')
        props.changePartState({filter_warehouse_category: cat})
        setVisibleList(!visibleList)
    }

    const handleChoose = (cat) => {
        props.changeWarehouseForm(cat, 'current_category')
        props.changePartState({filter_warehouse_category: cat})
    }

    const handleEdit = (cat) => {
        if(props.permissions.includes('edit_warehouse_categories')) {
            props.editWarehouseCategory(cat)
            props.changeWarehouseForm(props.warehouse.current_parent_category, 'current_parent_category')
            props.setVisibleFlag('statusWarehouseCategoryEditor', true)
        }
    }

    return (
        <table className='mt15'>
            <thead className='had'>
                <tr className='row'>
                    <th className='w100 pd5'>Категория</th>
                    <th className='w70 pd5 tac'>Кол-во</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    className='row hovblue'
                    style={mainCategory.id === props.warehouse.current_category.id ? { backgroundColor: '#cae1f5'} : null}
                    onClick= {() => handleChooseMain(mainCategory) }
                >
                    <td className='row w100 pd5'>
                        <Icon className='icon-s1' icon={visibleList ? ICON.DOWN : ICON.RIGHT}/>
                        <div className='noWr'>{mainCategory.title}</div>
                    </td>
                    <td className='w70 pd5 tac'>{mainCategory.count}</td>
                </tr>
                {visibleList ?
                    <div className='ml10'>
                    {mainCategory.categories.map(category => (
                        <WarehouseCategory
                            key={category.id}
                            category={category}
                            choose={cat => handleChoose(cat)}
                            current={props.warehouse.current_category}
                            parent_category={mainCategory}
                            choose_parent_category={cats => props.changeWarehouseForm(cats, 'current_parent_category')}
                            edit={cat => handleEdit(cat)}
                        />
                    ))}
                    </div>
                    : null
                }
            </tbody>
        </table>
    )
}

const mapStateToProps = state => ({
    warehouse: state.warehouse,
    permissions: state.data.user.role.permissions
})

const mapDispatchToProps = {
    changeWarehouseForm,
    editWarehouseCategory,
    setVisibleFlag,
    changePartState
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryTable)