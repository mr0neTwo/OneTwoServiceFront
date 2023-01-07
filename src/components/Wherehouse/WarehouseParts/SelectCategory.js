import React, {useState} from 'react'

import {ICON} from '../../../data/icons';

import Icon from '../../general/Icon';


const SelectCategory = props => {

    const [visibleList, setVisibleList] = useState(!!props.edit)

    return (props.edit === props.category.id) ? null : (
        <>
            <div
                className='row hovblue'
            >
                <div className='row w100 '>
                    <div onClick={() => setVisibleList(!visibleList)}>
                        {props.category.categories.length ?
                            <Icon className='icon-s1 pd1' icon={visibleList ? ICON.DOWN : ICON.RIGHT}/>
                            : <div className='ml15'/>
                        }
                    </div>
                    <div
                        className={props.category.deleted ? 'rowDeleted noWr' : 'noWr'}
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



export default SelectCategory