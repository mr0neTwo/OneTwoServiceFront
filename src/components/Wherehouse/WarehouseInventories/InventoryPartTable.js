import React from 'react'
import { connect } from 'react-redux'

import {changeInventoryState} from '../../../Redux/actions/actionInventory'
import {icon_checkmark, icon_cross, icon_minus, icon_trush} from '../../../data/icons'

import Icon from '../../general/Icon'

const InventoryPartTable = (props) => {


    const handleChange = (value, idx) => {
        value = parseInt(value.replace(/[^0-9]/g, ''))
        const parts = props.inventory.parts
        if (0 < value) {
            parts[idx].actual_count  = value
        } else {
            parts[idx].actual_count = 0
        }
        props.changeInventoryState({parts})
    }

    const handleDelete = (idx) => {
        let parts = props.inventory.parts
        parts.splice(idx, 1)
        props.changeInventoryState({parts})
    }

    if (!props.inventory.parts.length) {
        return <div className='tempPage h90'>Выбере запчасть</div>
    }

    const edit = props.inventory.edit

    const parts = props.inventory.parts.filter(part => {
        // Если не режим редактирования пропускаем все
        if (!props.inventory.edit) return true
        // Если всключен флаг скрыть те, которые сошлись и товрар сошелся, пропускаем
        if (props.inventory.hideGood && part.count === part.actual_count) return false
        // Если включена опция отобразить все, отображаем
        if (props.inventory.filterOption === 0) return true
        // Если включена опция отобразить недосдачу, отображаем
        if (props.inventory.filterOption === 1) return part.shortage
        // Если включена опция образить избыток, оборажаем
        if (props.inventory.filterOption === 2) return part.surplus
    })

    const getIcon = (value) => {
        let icon, color
        if (value === null) {
            color = '#aaa'
            icon = icon_minus
        }
        if (value === true) {
            color = '#5cb85c'
            icon = icon_checkmark
        }
        if (value === false) {
            color = '#f74e4d'
            icon = icon_cross
        }
            return (
                <Icon
                    classNane='icon-s2'
                    icon={icon}
                    color={color}
                />
            )

    }

    return (
        <table className='mt15'>
            <thead>
            <tr>
                <th>Наименование</th>
                <th className='w70'>Адрес</th>
                <th className='w70'>Числится</th>
                <th className='w70'>Фактически</th>
                {edit ? <th className='w70'>Недостдача</th> : null}
                {edit ? <th className='w70'>Излишек</th> : null}
                {edit ? <th className='w70'>Исправлено</th> : null}
                {edit ? null : <th/>}
            </tr>
            </thead>
            <tbody>
            {parts.map((remain, idx) => (
                <tr
                    key={idx}
                    className='fillcol'
                >
                    <td>
                        <div>{(remain.marking !== remain.title) && !!remain.marking ? `${remain.title } (${remain.marking})`: remain.title}</div>
                        <div className='orderDate noWr'>{remain.description}</div>
                    </td>
                    <td>{remain.cell}</td>
                    <td className='tac'>
                        <div className='ml5'>{remain.count}</div>
                    </td>
                    {edit ?
                        <td className='tac'>{remain.actual_count}</td>
                        :
                        <td>
                        <div className='jc-c'>
                            <input
                                className='w30'
                                onChange={event => handleChange(event.target.value, idx)}
                                value={remain.actual_count}
                                disabled={props.inventory.edit}
                            />
                        </div>
                    </td>}
                    {edit ? <td className='tac'>{Math.abs(remain.shortage) || null}</td> : null}
                    {edit ? <td className='tac'>{remain.surplus || null}</td> : null}
                    {edit ? <td className='tac'>{getIcon(remain.is_fixed) }</td> : null}
                    {edit ? null :
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
    inventory: state.inventory
})

const mapDispatchToProps = {
    changeInventoryState
}

export default connect(mapStateToProps, mapDispatchToProps)(InventoryPartTable)