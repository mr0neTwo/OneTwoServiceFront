import React from 'react'
import {connect} from 'react-redux'

import {changeInventoryState} from '../../../Redux/actions/actionInventory'
import {ICON} from '../../../data/icons'

import Icon from '../../general/Icon'
import {COLORS} from "../../../data/colors";
import Data from "../../general/cell/Data";

const InventoryPartTable = (props) => {


    const handleChange = (value, idx) => {
        value = parseInt(value.replace(/[^0-9]/g, ''))
        const parts = props.inventory.parts
        if (0 < value) {
            parts[idx].actual_count = value
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
        return <div className='temp-page h90'>Выбере запчасть</div>
    }

    const edit = Boolean(props.inventory.edit)

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
            color = COLORS.NAME.SECONDARY
            icon = ICON.MINUS
        }
        if (value === true) {
            color = COLORS.NAME.SUCCESS
            icon = ICON.CHECKMARK
        }
        if (value === false) {
            color = COLORS.NAME.ERROR
            icon = ICON.CROSS
        }
        return (
            <Icon
                className='icon'
                icon={icon}
                color={color}
            />
        )

    }

    if (!parts.length) {
        return <div className='empty_table'>Выбере запчасть</div>
    }

    return (
        <table className='table'>
            <thead>
            <tr>
                <th className='th'>Наименование</th>
                <th className='th th_w80'>Адрес</th>
                <th className='th th_w80'>Числится</th>
                <th className='th th_w80'>Фактически</th>
                {edit ? <th className='th th_w80'>Недостдача</th> : null}
                {edit ? <th className='th th_w80'>Излишек</th> : null}
                {edit ? <th className='th th_w80'>Исправлено</th> : null}
                {edit ? null : <th className='th th_w20'/>}
            </tr>
            </thead>
            <tbody>
            {parts.map((remain, idx) => (
                <tr
                    key={idx}
                    className={`tr ${edit ? '' : 'tr_tools'}`}
                >
                    <td className='td'>
                        <div>{(remain.marking !== remain.title) && !!remain.marking ? `${remain.title} (${remain.marking})` : remain.title}</div>
                        <div className='cs cell_text'>{remain.description}</div>
                    </td>
                    <Data data={remain.cell}/>
                    <Data data={remain.count}/>
                    {edit ?
                        <Data data={remain.actual_count}/>
                        :
                        <td>
                            <div className='input td_input'>
                                <input
                                    className='w30 bcsb'
                                    onChange={event => handleChange(event.target.value, idx)}
                                    value={remain.actual_count}
                                    disabled={props.inventory.edit}
                                />
                            </div>
                        </td>}
                    <Data data={Math.abs(remain.shortage) || null} invisibel={!edit}/>
                    <Data data={remain.surplus || null} invisibel={!edit}/>
                    <Data data={getIcon(remain.is_fixed)} invisibel={!edit}/>
                    {edit ? null :
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
    )
}

const mapStateToProps = state => ({
    inventory: state.inventory
})

const mapDispatchToProps = {
    changeInventoryState
}

export default connect(mapStateToProps, mapDispatchToProps)(InventoryPartTable)