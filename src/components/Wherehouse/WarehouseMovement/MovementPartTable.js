import React from 'react'
import { connect } from 'react-redux'

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
        return <div className='temp-page h90'>Выбере запчасть</div>
    }

    return (
        <table className='mt15'>
            <thead>
            <tr>
                <th>Наименование</th>
                <th className='w70'>Адрес</th>
                <th className='w70'>Количество</th>
                {props.movement.edit ? null : <th/>}
            </tr>
            </thead>
            <tbody>
            {props.movement.parts.map((remain, idx) => (
                <tr
                    key={idx}
                    className='fillcol'
                >
                    <td>
                        <div>{(remain.marking !== remain.title) && !!remain.marking ? `${remain.title } (${remain.marking})`: remain.title}</div>
                        <div className='orderDate noWr'>{remain.description}</div>
                    </td>
                    <td>{remain.cell}</td>
                    <td>
                        <div className='row'>
                            <div>
                                <input
                                    className='w30'
                                    onChange={event => handleChange(event.target.value, idx)}
                                    value={props.movement.parts[idx].target_count}
                                    disabled={props.movement.edit}
                                />
                            </div>
                            <div className='ml5'>{`/ ${remain.count}`}</div>
                        </div>
                    </td>

                    {props.movement.edit ? null :
                        <td>
                            <div className='row'>
                                <div onClick={() => handleDelete(idx)}>
                                    <Icon className='icon-s2 curP ml5' icon={ICON.TRASH}/>
                                </div>
                            </div>
                        </td>}
                </tr>
            ))}
            </tbody>
        </table>
    )
}

const mapStateToProps = state => ({
    movement: state.movement
})

const mapDispatchToProps = {
    changeMovementState
}

export default connect(mapStateToProps, mapDispatchToProps)(MovementPartTable)