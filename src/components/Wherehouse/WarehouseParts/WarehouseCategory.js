import React, {useState} from 'react'

import {icon_down, icon_right} from '../../../data/icons';

import Icon from '../../general/Icon';


const WarehouseCategory = props => {

    const [visibleList, setVisibleList] = useState(false)

    const handleChoose = () => {
        props.choose(props.category)
        props.choose_parent_category(props.parent_category)
        setVisibleList(!visibleList)
    }


    return (
        <>
            <tr
                className='row hovblue'
                style={props.category.id === props.current.id ? { backgroundColor: '#cae1f5'} : null}
                onClick={ handleChoose }
                onDoubleClick={() => props.edit(props.category)}
            >
                <td className='row w100 pd5'>
                    {props.category.categories.length ?
                        <Icon className='icon-s1 pd1' icon={visibleList ? icon_down : icon_right}/>
                        : <div className='ml15'/>
                    }
                    <div className={props.category.deleted ? 'rowDeleted noWr' : 'noWr'}>{props.category.title}</div>
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
                        parent_category={props.category}
                        choose_parent_category={cats => props.choose_parent_category(cats)}
                        edit={cat => props.edit(cat)}
                    />
                    ))}
                </div>
                : null
            }
        </>
    )
}



export default WarehouseCategory