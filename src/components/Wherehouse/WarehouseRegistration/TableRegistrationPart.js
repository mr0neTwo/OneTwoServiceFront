import React, {useEffect} from 'react'
import { connect } from 'react-redux'

import {changeRegistrationState, deleteRegistrationPart, editRegistrationPart} from '../../../Redux/actions/registrationAction'
import {changeVisibleState} from '../../../Redux/actions'
import {icon_pencil, icon_trush} from '../../../data/icons'

import Icon from '../../general/Icon'
import Checkbox from '../../general/Checkbox'

const TableRegistrationPart = (props) => {

    const disabled = props.registration.edit

    const handleEdit = (idx,  part ) => {
        if (!props.registration.inventory_id) {
            props.editRegistrationPart(idx + 1, part)
            props.changeVisibleState({statusRegistrationPartEditor: true})
        }
    }

    useEffect(() => {
        let price = 0
        props.registration.parts.forEach(part => {
            price += part.buy_cost * part.count
        })
        props.changeRegistrationState({price})
    }, [props.registration.parts])

    const see_buy_cost = props.permissions.includes('see_buy_cost')

    const handleCheck = (idx, value) => {
        let parts = props.registration.parts
        parts[idx].checked = value
        props.changeRegistrationState({parts})
    }

    if (!props.registration.parts.length) {
        return <div className='tempPage h90'>Выбере запчасть</div>
    }

    return (
        <table id='registrationTableParts' className='mt15'>
            <thead>
                <tr>
                    {!props.registration.edit && props.registration.inventory_id ? <th className='w15'/> : <th className='w15'>№</th>}
                    <th className='w300'>Наименование</th>
                    <th className='w50'>Количество</th>
                    {see_buy_cost ? <th className='w50'>Стоимость</th> : null}
                    <th className='w120'>Место храненеия</th>
                    {props.registration.inventory_id ? null : <th className='w15'/>}
                </tr>
            </thead>
            <tbody>
                {props.registration.parts.map((part, idx) => (
                    <tr
                        key={idx}
                        className='fillcol'
                        onDoubleClick={() => handleEdit(idx, part)}
                    >
                        {!props.registration.edit && props.registration.inventory_id ?
                            <td>
                                <Checkbox
                                    onChange={event => handleCheck(idx, event.target.checked)}
                                    checked={part.checked}
                                />
                            </td>
                            : <td>{idx + 1}</td>}
                        <td>{part.part.title}</td>
                        <td className='tac'>{part.count}</td>
                        {see_buy_cost ? <td className='tac'>{(part.count * part.buy_cost).toFixed(2) || 0}</td> : null}
                        <td>{part.cell}</td>
                            {props.registration.inventory_id ? null :
                                <td>
                                    <div className='row'>
                                        <div onClick={() => handleEdit(idx, part)}>
                                            <Icon className='icon-s2 curP ml5' icon={icon_pencil}/>
                                        </div>
                                        {!disabled ?
                                            <div onClick={() => props.deleteRegistrationPart(idx)}>
                                                <Icon className='icon-s2 curP ml5' icon={icon_trush}/>
                                            </div> : null}
                                    </div>
                                </td>
                            }
                    </tr>
                ))}
                {props.registration.parts.length && see_buy_cost ? <tr className='ss'>
                    <td className='tae' colSpan={disabled ? '2' : '3'}>Итого сумма:</td>
                    <td className='tae'>{props.registration.price.toFixed(2) || 0}</td>
                    <td>руб.</td>
                </tr> : null}
            </tbody>
        </table>
    )
}

const mapStateToProps = state => ({
    registration: state.registration,
    permissions: state.data.user.role.permissions
})

const mapDispatchToProps = {
    editRegistrationPart,
    deleteRegistrationPart,
    changeVisibleState,
    changeRegistrationState
}

export default connect(mapStateToProps, mapDispatchToProps)(TableRegistrationPart)