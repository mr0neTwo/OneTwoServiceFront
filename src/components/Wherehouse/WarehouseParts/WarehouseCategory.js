
import React, {useState} from 'react'
import { connect } from 'react-redux'

import {icon_down, icon_right} from '../../../data/icons';
import {changeWarehouseForm} from '../../../Redux/actions/warehouseAction';

import Icon from '../../general/Icon';


const WarehouseCategory = props => {

    const [visibleList, setVisibleList] = useState(false)

    const handleChoose = () => {
        props.choose(props.category.id)
        props.choose_parent_catigories(props.parent_categories)
        setVisibleList(!visibleList)
    }

    return (
        <>
            <tr
                className='row hovblue'
                style={props.category.id === props.current ? { backgroundColor: '#cae1f5'} : null}
                onClick={ handleChoose }
            >
                <td className='row w100 pd5'>
                    <Icon className='icon-s1 pd1' icon={visibleList ? icon_down : icon_right}/>
                    <div className='noWr'>{props.category.title}</div>
                </td>
                <td className='w70 pd5 tac'>{props.category.categories.length}</td>
            </tr>
            { visibleList ?
                <div className='ml10'>
                {props.category.categories.map(category => (
                    <WarehouseCategory
                        key={category.id}
                        category={category}
                        choose={cat => props.choose(cat)}
                        current={props.current}
                        parent_categories={props.category.categories}
                        choose_parent_catigories={cats => props.choose_parent_catigories(cats)}
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

export default connect(mapStateToProps, mapDispatchToProps)(WarehouseCategory)