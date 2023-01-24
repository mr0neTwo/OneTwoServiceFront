import React, {useEffect} from 'react'
import {connect} from 'react-redux'

import {setVisibleFlag, changeOrderFormS, changeVisibleState} from '../../../../Redux/actions'
import {editOperation, deleteOperation, resetOperation} from '../../../../Redux/actions/operationActions'
import {ICON} from '../../../../data/icons'
import Icon from '../../../general/Icon'
import {deleteOrderPart, editOrderPart, resetOrderPart} from '../../../../Redux/actions/orderPartAction'
import Button from '../../../general/Button'

const TableWorksMaterials = (props) => {

    const disabled = props.order.status.group > 3 || !props.permissions.includes('edit_operations_materials')


    const editOperation = (operation) => {
        props.editOperation(operation)
        props.setVisibleFlag('statusOperationEditor', true)
    }

    const deleteOperation = (operation) => {
        props.editOperation(operation)
        props.deleteOperation(true)
        props.resetOperation()
    }

    const deletePart = (part) => {
        if (part.warehouse_parts_id) {
            props.editOrderPart(part)
            props.changeVisibleState({statusReturnPart: true})
        } else {
            props.editOrderPart(part)
            props.deleteOrderPart(true)
            props.resetOrderPart()
        }
    }

    const editPart = (part) => {
        props.editOrderPart(part)
        props.setVisibleFlag('statusOrderPartEditor', true)
    }

    if (!props.order.operations.filter(operation => !operation.deleted).length &&
        !props.order.parts.filter(part => !part.deleted).length) {
        return (
            <div className='empty_table'>Работы и материалы еще не добавлены</div>
        )
    }

    return (

        <table className='table'>
            <thead>
            <tr>
                <th className='th th_w20'/>
                <th className='th'>Наименование</th>
                <th className='th th_w50'>Кол-во</th>
                <th className='th th_w50'>Цена</th>
                <th className='th th_w50'>Скидка</th>
                <th className='th th_w50'>Сумма</th>
                <th className='th th_w40'/>
            </tr>
            </thead>

            {props.employees.map(employee => (
                props.order.operations.filter(operation => !operation.deleted && operation.engineer.id === employee.id).length ||
                props.order.parts.filter(part => !part.deleted && part.engineer.id === employee.id).length ?
                    <tbody key={employee.id}>
                    <tr className='tr_no-underline'>
                        <td/>
                        <td className='td td_title' colSpan='5'>{employee.name}</td>
                    </tr>
                    {props.order.operations.filter(operation => !operation.deleted && operation.engineer.id === employee.id).map(operation => (
                        <tr
                            key={operation.id}
                            className='tr tr_tools'
                            onDoubleClick={disabled ? null : () => editOperation(operation)}
                        >
                            <td className='td'>
                                <Icon className='icon tr_work' icon={ICON.BRIEFCASE}/>
                            </td>
                            <td className='td'>{operation.title}{operation.comment ? ` (${operation.comment})` : null}</td>
                            <td className='td td_number'>{operation.amount}</td>
                            <td className='td td_number'>{operation.price * operation.amount}</td>
                            <td className='td td_number'>{operation.discount_value / operation.amount}</td>
                            <td className='td td_number'>{operation.total}</td>
                            <td>
                                {!disabled ?
                                    <div className='tr_set'>
                                        <div
                                            className='tr_set-button-edit'
                                            onClick={() => editOperation(operation)}
                                        >
                                            <Icon className='icon' icon={ICON.PENCIL}/>
                                        </div>
                                        <div
                                            className='tr_set-button-delete'
                                            onClick={() => deleteOperation(operation)}
                                        >
                                            <Icon className='icon' icon={ICON.TRASH}/>
                                        </div>
                                    </div> : null}
                            </td>
                        </tr>
                    ))}
                    {props.order.parts.filter(part => !part.deleted && part.engineer.id === employee.id).map(part => (
                        <tr
                            key={part.id}
                            className='tr tr_tools'
                            onDoubleClick={disabled ? null : () => editPart(part)}
                        >
                            <td>
                                <Icon className='icon tr_work' icon={ICON.BUG}/>
                            </td>
                            <td className='td'>{part.title}{part.comment ? ` (${part.comment})` : null}</td>
                            <td className='td td_number'>{part.amount}</td>
                            <td className='td td_number'>{part.price * part.amount}</td>
                            <td className='td td_number'>{part.discount_value / part.amount}</td>
                            <td className='td td_number'>{part.total}</td>
                            <td>
                                {!disabled ?
                                    <div className='tr_set'>
                                        <div
                                            className='tr_set-button-edit'
                                            onClick={() => editPart(part)}
                                        >
                                            <Icon className='icon' icon={ICON.PENCIL}/>
                                        </div>
                                        <div
                                            id='deleteOrderPart'
                                            className='tr_set-button-delete'
                                            onClick={() => deletePart(part) }
                                        >
                                            <Icon className='icon' icon={ICON.TRASH}/>
                                        </div>
                                    </div> : null}
                            </td>
                        </tr>
                    ))}
                    </tbody> : null
            ))}
            <tbody>
            <tr className='tr_no-underline'>
                <td className='td td_total' colSpan='4'>Итого скидка:</td>
                <td className='td td_number'>{props.order.discount_sum}</td>
                <td className='td'>руб.</td>
            </tr>
            <tr className='tr_no-underline'>
                <td className='td td_total' colSpan='4'>Итого сумма:</td>
                <td className='td td_number'>{props.order.price}</td>
                <td className='td'>руб.</td>
            </tr>
            </tbody>
        </table>
    )
}

const mapStateToProps = state => ({
    order: state.order,
    employees: state.employee.employees,
    permissions: state.data.user.role.permissions
})

const mapDispatchToProps = {
    editOperation,
    setVisibleFlag,
    deleteOperation,
    resetOperation,
    changeOrderFormS,
    deleteOrderPart,
    editOrderPart,
    resetOrderPart,
    changeVisibleState
}

export default connect(mapStateToProps, mapDispatchToProps)(TableWorksMaterials)