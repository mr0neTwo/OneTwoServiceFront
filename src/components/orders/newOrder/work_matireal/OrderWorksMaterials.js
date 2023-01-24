import React, {useEffect} from 'react'
import {connect} from 'react-redux'

import {changeOperationState} from '../../../../Redux/actions/operationActions'

import SetWorkMatireals from './SetWorkMatireals'
import TableWorksMaterials from './TableWorksMaterials'
import LableArea from '../../../general/LableArea'
import SetCell from './SetCell'
import ReturnOrderPart from './ReturnOrderPart'
import SelectFromList from '../../../general/SelectFromList'
import {checkObject} from '../../../general/utils'
import OperationEditor from './OperationEditor'
import OrderPartEditor from './OrderPartEditor'
import {changeOrderState} from '../../../../Redux/actions/orderActions'

const OrderWorksMaterials = (props) => {

    const list_engineers = props.employees.filter(employee => employee.id !== 0 && !employee.deleted && employee.role.permissions.includes('in_list_engineers'))

    const isExist = list_engineers.some(employee => employee.id === props.order.engineer.id)

    useEffect(() => {
        const engineer = checkObject(props.order.engineer) && isExist ? props.order.engineer : props.current_user
        props.changeOperationState({engineer})
    }, [])

    return (
        <div className='form-order-editor'>
            <SelectFromList
                className='w220'
                title='Исполнитель'
                list={list_engineers}
                setElement={engineer => props.changeOperationState({engineer})}
                current_object={props.engineer}
                noChoosed='Выберете сотрудника'
            />

            <SetWorkMatireals/>
            <TableWorksMaterials/>
            <LableArea
                title='Заметки исполнителя'
                onChange={event => props.changeOrderState({engineer_notes: event.target.value})}
                value={props.order.engineer_notes}
            />
            <LableArea
                title='Вердикт / Комментарий'
                onChange={event => props.changeOrderState({resume: event.target.value})}
                value={props.order.resume}
            />
            <SetCell/>
            {props.view.statusOperationEditor ? <OperationEditor/> : null}
            {props.view.statusOrderPartEditor ? <OrderPartEditor/> : null}
            {props.statusReturnPart ? <ReturnOrderPart/> : null}
        </div>
    )
}

const mapStateToProps = state => ({
    employees: state.employee.employees,
    order: state.order,
    view: state.view,
    current_user: state.data.user,
    engineer: state.operation.engineer,
    statusReturnPart: state.view.statusReturnPart
})

const mapDispatchToProps = {
    changeOrderState,
    changeOperationState
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderWorksMaterials)