import React, {useEffect} from 'react'
import { connect } from 'react-redux'

import {changeRegistrationState, deleteRegistrationPart, editRegistrationPart} from '../../../Redux/actions/registrationAction'
import {changeVisibleState} from '../../../Redux/actions'
import {icon_pencil, icon_trush} from '../../../data/icons'

import Icon from '../../general/Icon'

const TableRegistrationPart = (props) => {

    const disabled = props.registration.edit

    const handleEdit = (idx,  part ) => {
        props.editRegistrationPart(idx + 1, part)
        props.changeVisibleState({statusRegistrationPartEditor: true})
    }

    useEffect(() => {
        let price = 0
        props.registration.parts.forEach(part => {
            price += part.buy_cost * part.count
        })
        props.changeRegistrationState({price})
    }, [props.registration.parts])

    return (
        <table id='registrationTableParts'>
            <thead>
                <tr>
                    <th className='w15'>№</th>
                    <th className='w300'>Наименование</th>
                    <th className='w50'>Количество</th>
                    <th className='w50'>Стоимость</th>
                    <th className='w120'>Место храненеия</th>
                    {disabled ? null : <th className='w15'/>}
                </tr>
            </thead>
            <tbody>
                {props.registration.parts.map((part, idx) => (
                    <tr
                        key={idx}
                        className='fillcol'
                        onDoubleClick={disabled ? null : () => handleEdit(idx, part)}
                    >
                        <td>{idx + 1}</td>
                        <td>{part.part.title}</td>
                        <td className='tac'>{part.count}</td>
                        <td className='tac'>{part.count * part.buy_cost}</td>
                        <td>{part.cell}</td>

                            {!disabled ?
                                <td>
                                    <div className='row'>
                                        <div onClick={() => handleEdit(idx, part)}>
                                            <Icon className='icon-s2 curP ml5' icon={icon_pencil}/>
                                        </div>
                                        <div onClick={() => props.deleteRegistrationPart(idx)}>
                                            <Icon className='icon-s2 curP ml5' icon={icon_trush}/>
                                        </div>
                                    </div>
                                </td>: null}

                    </tr>
                ))}
                {props.registration.parts.length ? <tr className='ss'>
                    <td className='tae' colSpan={disabled ? '2' : '3'}>Итого сумма:</td>
                    <td className='tae'>{props.registration.price}</td>
                    <td>руб.</td>
                </tr> : null}
            </tbody>
        </table>
    )
}

const mapStateToProps = state => ({
    registration: state.registration
})

const mapDispatchToProps = {
    editRegistrationPart,
    deleteRegistrationPart,
    changeVisibleState,
    changeRegistrationState
}

export default connect(mapStateToProps, mapDispatchToProps)(TableRegistrationPart)