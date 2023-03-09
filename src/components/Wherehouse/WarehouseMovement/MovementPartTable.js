import React from 'react'
import {connect} from 'react-redux'

import {changeMovementState} from '../../../Redux/actions/warehouseMovementAction'
import {ICON} from '../../../data/icons'

import Icon from '../../general/Icon'

const MovementPartTable = (props) => {


    const handleChange = (value, idx) => {
        value = parseInt(value.replace(/[^0-9]/g, ''))
        const parts = props.movement.parts
        if (0 < value && value <= parts[idx].count) {
            parts[idx].target_count = value
        } else if (value > parts[idx].count) {
            parts[idx].target_count = parts[idx].count
        } else {
            parts[idx].target_count = 1
        }
        props.changeMovementState({parts})
    }

    const handleDelete = (idx) => {
        let parts = props.movement.parts
        parts.splice(idx, 1)
        props.changeMovementState({parts})
    }

    if (!props.movement.parts.length) {
        return <div className='empty_table'>Выбере запчасть</div>
    }

    return (
        <div className='table'>
            <table>
                <thead>
                <tr>
                    <th className='th'>Наименование</th>
                    <th className='th th_w70'>Адрес</th>
                    <th className='th th_w70'>Количество</th>
                    {props.movement.edit ? null : <th className='th th_w20'/>}
                </tr>
                </thead>
                <tbody>
                {props.movement.parts.map((remain, idx) => (
                    <tr
                        key={idx}
                        className='tr tr_tools'
                    >
                        <td className='td'>
                            <div>{(remain.marking !== remain.title) && !!remain.marking ? `${remain.title} (${remain.marking})` : remain.title}</div>
                            <div className='cs nowrap'>{remain.description}</div>
                        </td>
                        <td className='td'>{remain.cell}</td>
                        <td className='td'>
                            <div className='input td_input'>
                                <input
                                    className='w30'
                                    onChange={event => handleChange(event.target.value, idx)}
                                    value={props.movement.parts[idx].target_count}
                                    disabled={props.movement.edit}
                                />
                                <div>{`/ ${remain.count}`}</div>
                            </div>
                        </td>

                        {props.movement.edit ? null :
                            <td className='td'>
                                <div
                                    className='tr_set-button-delete'
                                    onClick={() => handleDelete(idx)}
                                >
                                    <Icon className='icon' icon={ICON.TRASH}/>
                                </div>
                            </td>}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

const mapStateToProps = state => ({
    movement: state.movement
})

const mapDispatchToProps = {
    changeMovementState
}

export default connect(mapStateToProps, mapDispatchToProps)(MovementPartTable)