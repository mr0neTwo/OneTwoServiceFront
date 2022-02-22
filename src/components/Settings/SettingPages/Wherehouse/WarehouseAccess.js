import React from 'react'
import { connect } from 'react-redux'

import { changeWarehouseForm, changeWarehousePermission } from '../../../../Redux/actions/warehouseAction'
import { editEmoloyee, setVisibleFlag} from "../../../../Redux/actions";

import Checkbox from "../../../general/Checkbox";
import WarehouseEmployeeEditor from "./WarehouseEmployeeEditor";

const WarehouseAccess = (props) => {

    const handleEdit = employee => {
        props.changeWarehouseForm(employee.id, 'permissions_employee')
        props.editEmoloyee(employee)
        props.setVisibleFlag('statusWarehouseEmployeeEditor', true)
    }

    const handleCheck = (employee_id, value) => {
        props.changeWarehouseForm(employee_id, 'permissions_employee')
        props.changeWarehousePermission(value, 'available')
    }

    return (
        <div className='contentEditor'>
            <table className='mt15'>
                <thead>
                <tr>
                    <th className='w15'>
                    </th>
                    <th>Сотрудник</th>
                    <th>Права</th>
                </tr>
                </thead>
                <tbody>
                {props.employees.map(employee => (
                    <tr
                        key={employee.id}
                        onDoubleClick={() => handleEdit(employee)}
                    >
                        <td>
                            <Checkbox
                                onChange={event => handleCheck(employee.id, event.target.checked)}
                                checked={props.warehouse.employees[employee.id].available}
                                disabled={props.warehouse.deleted}
                            />
                        </td>
                        <td>{`${employee.first_name} ${employee.last_name}`}</td>
                        <td>
                            {props.warehouse.employees[employee.id].available ?
                                (props.warehouse.employees[employee.id].like_warehouse  ? 'Доступные для склада' : 'Персональные') :
                                'Нет доступа'}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {props.statusWarehouseEmployeeEditor ? <WarehouseEmployeeEditor/> : null}
        </div>
    )
}

const mapStateToProps = state => ({
    employees: state.data.employees.filter(employee => !employee.deleted),
    warehouse: state.warehouse,
    statusWarehouseEmployeeEditor: state.view.statusWarehouseEmployeeEditor
})

const mapDispatchToProps = {
    changeWarehouseForm,
    editEmoloyee,
    setVisibleFlag,
    changeWarehousePermission
}

export default connect(mapStateToProps, mapDispatchToProps)(WarehouseAccess)