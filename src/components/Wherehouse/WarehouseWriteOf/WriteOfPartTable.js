import React from 'react'
import { connect } from 'react-redux'

import {changeWriteOfState} from '../../../Redux/actions/writeOfAction'
import {icon_trush} from '../../../data/icons'

import Icon from '../../general/Icon'
import Checkbox from '../../general/Checkbox'

const WriteOfPartTable = (props) => {


    const handleChange = (value, idx) => {
        value = parseInt(value.replace(/[^0-9]/g, ''))
        const parts = props.writeof.parts
        if (0 < value && value <= parts[idx].count) {
            parts[idx].target_count = value
        } else if (value > parts[idx].count) {
            parts[idx].target_count = parts[idx].count
        } else {
            parts[idx].target_count = 1
        }
        props.changeWriteOfState({parts})
    }

    const handleDelete = (idx) => {
        let parts = props.writeof.parts
        parts.splice(idx, 1)
        props.changeWriteOfState({parts})
    }
    const handleCheck = (idx, value) => {
        let parts = props.writeof.parts
        parts[idx].checked = value
        props.changeWriteOfState({parts})
    }

    if (!props.writeof.parts.length) {
        return <div className='tempPage h90'>Выбере запчасть</div>
    }

    return (
        <table className='mt15'>
           <thead>
            <tr>
                {props.writeof.inventory_id ? <th className='w15'/> : null}
                <th>Наименование</th>
                <th className='w70'>Адрес</th>
                <th className='w70'>Количество</th>
                {props.writeof.edit || props.writeof.inventory_id ? null : <th/>}
            </tr>
           </thead>
            <tbody>
            {props.writeof.parts.map((remain, idx) => (
                <tr
                    key={idx}
                    className='fillcol'
                >
                    {props.writeof.inventory_id ?
                        <td>
                            <Checkbox
                                onChange={event => handleCheck(idx, event.target.checked)}
                                checked={remain.checked}
                            />
                        </td>
                        : null}
                    <td>
                        <div>{(remain.marking !== remain.title) && !!remain.marking ? `${remain.title } (${remain.marking})`: remain.title}</div>
                        <div className='orderDate noWr'>{remain.description}</div>
                    </td>
                    <td>{remain.cell}</td>
                    {props.writeof.edit || props.writeof.inventory_id ?
                        <td>
                            <div className='tac ml5'>{remain.target_count}</div>
                        </td>
                        :
                        <td>
                        <div className='row'>
                            <input
                                className='w30'
                                onChange={event => handleChange(event.target.value, idx)}
                                value={props.writeof.parts[idx].target_count}
                                disabled={props.writeof.edit}
                            />
                            <div className='ml5'>{`/ ${remain.count}`}</div>
                        </div>
                    </td>}

                    {props.writeof.edit || props.writeof.inventory_id ? null :
                    <td>
                        <div className='row'>
                            <div onClick={() => handleDelete(idx)}>
                                <Icon className='icon-s2 curP ml5' icon={icon_trush}/>
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
    writeof: state.writeof
})

const mapDispatchToProps = {
    changeWriteOfState
}

export default connect(mapStateToProps, mapDispatchToProps)(WriteOfPartTable)