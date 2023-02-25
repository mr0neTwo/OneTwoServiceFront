import React, {useEffect} from 'react'
import { connect } from 'react-redux'

import {changeRegistrationState, deleteRegistrationPart, editRegistrationPart} from '../../../Redux/actions/registrationAction'
import {changeVisibleState} from '../../../Redux/actions'
import {ICON} from '../../../data/icons'

import Icon from '../../general/Icon'
import Checkbox from '../../general/Checkbox'
import {Modal} from "../../../data/data";
import Data from "../../general/cell/Data";
import Balance from "../../general/cell/Balance";

const TableRegistrationPart = (props) => {



    const handleEdit = (idx,  part ) => {
        if (!props.registration.inventory_id) {
            props.editRegistrationPart(idx + 1, part)
            props.changeVisibleState({
                isCentralModalOpen: true,
                modalCentralType: Modal.Type.REGISTRATION_PART
            })
        }
    }

    useEffect(() => {
        let price = 0
        props.registration.parts.forEach(part => {
            price += part.buy_cost * part.count
        })
        props.changeRegistrationState({price})
    }, [props.registration.parts])



    const handleCheck = (idx, value) => {
        let parts = props.registration.parts
        parts[idx].checked = value
        props.changeRegistrationState({parts})
    }

    const canSeeCost = props.permissions.includes('see_buy_cost')
    const isEdit = Boolean(props.registration.edit)
    const formInventory = Boolean(props.registration.inventory_id)
    const isAddedPart = Boolean(props.registration.parts.length)

    if (!isAddedPart) return <div className='empty_table'>Выбере запчасть</div>

    return (
        <table>
            <thead>
                <tr>
                    <th className='th th_w15'>{!isEdit && formInventory ? '' : '№'}</th>
                    <th className='th'>Наименование</th>
                    <th className='th th_w100'>Количество</th>
                    {canSeeCost ? <th className='th th_w100'>Стоимость</th> : null}
                    <th className='th th_w100'>Адрес</th>
                    {formInventory ? null : <th className='th th_w32'/>}
                </tr>
            </thead>
            <tbody>
                {props.registration.parts.map((part, idx) => (
                    <tr
                        key={idx}
                        className='tr tr_tools'
                        onDoubleClick={() => handleEdit(idx, part)}
                    >
                        {!props.registration.edit && props.registration.inventory_id ?
                            <td className='td'>
                                <Checkbox
                                    id={`InventoryPart${idx}`}
                                    type='squared-four'
                                    onChange={event => handleCheck(idx, event.target.checked)}
                                    checked={part.checked}
                                />
                            </td>
                            : <Data data={idx + 1}/>
                        }
                        <Data data={part.part.title}/>
                        <Data data={part.count}/>
                        <Balance balance={part.count * part.buy_cost} invisible={!canSeeCost}/>
                        <Data data={part.cell}/>
                            {formInventory ? null :
                                <td className='td'>
                                    <div className='tr_set'>
                                        <div
                                            className='tr_set-button-edit'
                                            onClick={() => handleEdit(idx, part)}
                                        >
                                            <Icon className='icon' icon={ICON.PENCIL}/>
                                        </div>
                                        {!isEdit ?
                                            <div
                                                className='tr_set-button-edit'
                                                onClick={() => props.deleteRegistrationPart(idx)}
                                            >
                                                <Icon className='icon' icon={ICON.TRASH}/>
                                            </div>
                                            : null
                                        }
                                    </div>
                                </td>
                            }
                    </tr>
                ))}
                {isAddedPart && canSeeCost ? <tr className='tr_no-underline'>
                    <td className='td' colSpan={isEdit ? '2' : '3'}>Итого сумма:</td>
                    <Balance balance={props.registration.price}/>
                    <td/>
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