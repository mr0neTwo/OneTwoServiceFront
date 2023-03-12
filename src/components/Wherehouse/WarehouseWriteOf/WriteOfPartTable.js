import React from 'react'
import { connect } from 'react-redux'

import {changeWriteOfState} from '../../../Redux/actions/writeOfAction'
import {ICON} from '../../../data/icons'

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
        return <div className='empty_table'>Выбере запчасть</div>
    }

    return (
        <div className='table'>
            <table>
               <thead>
                <tr>
                    {props.writeof.inventory_id ? <th className='th th_w15'/> : null}
                    <th className='th'>Наименование</th>
                    <th className='th th_w70'>Адрес</th>
                    <th className='th th_w70'>Количество</th>
                    {props.writeof.edit || props.writeof.inventory_id ? null : <th className='th th_w20'/>}
                </tr>
               </thead>
                <tbody>
                {props.writeof.parts.map((remain, idx) => (
                    <tr
                        key={idx}
                        className='tr tr_tools'
                    >
                        {props.writeof.inventory_id ?
                            <td className='td'>
                                <Checkbox
                                    id='id'
                                    type='squared-five'
                                    onChange={event => handleCheck(idx, event.target.checked)}
                                    checked={remain.checked}
                                />
                            </td>
                            : null}
                        <td className='td'>
                            <div>{(remain.marking !== remain.title) && !!remain.marking ? `${remain.title } (${remain.marking})`: remain.title}</div>
                            <div className='cs cell_text'>{remain.description}</div>
                        </td>
                        <td className='td'>{remain.cell}</td>
                        {props.writeof.edit || props.writeof.inventory_id ?
                            <td className='td'>
                                <div className='cell_text'>{remain.target_count}</div>
                            </td>
                            :
                            <td>
                            <div className='input td_input'>
                                <input
                                    className='w30 bcsb'
                                    onChange={event => handleChange(event.target.value, idx)}
                                    value={props.writeof.parts[idx].target_count}
                                    disabled={props.writeof.edit}
                                />
                                <div>{`/ ${remain.count}`}</div>
                            </div>
                        </td>}

                        {props.writeof.edit || props.writeof.inventory_id ? null :
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
    writeof: state.writeof
})

const mapDispatchToProps = {
    changeWriteOfState
}

export default connect(mapStateToProps, mapDispatchToProps)(WriteOfPartTable)