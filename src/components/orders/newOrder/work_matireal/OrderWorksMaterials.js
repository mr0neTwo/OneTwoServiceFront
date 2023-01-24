import React, {useEffect} from 'react'
import {connect} from 'react-redux'

import {changeOrderFormS} from '../../../../Redux/actions'
import {changeOperationForm} from '../../../../Redux/actions/operationActions'

import ChooseOfList from '../../../general/ChooseOfList'
import SetWorkMatireals from './SetWorkMatireals'
import TableWorksMaterials from './TableWorksMaterials'
import LableArea from '../../../general/LableArea'
import SetCell from './SetCell'
import ReturnOrderPart from './ReturnOrderPart'

const OrderWorksMaterials = (props) => {

    const list_ingineers = props.employees.filter(employee => employee.id !== 0 && !employee.deleted && employee.role.permissions.includes('in_list_engineers'))

    const isExist = list_ingineers.some(employee => employee.id === props.current_engineer_id)

    useEffect(() => {
        const engineer_id = props.order.engineer_id && isExist ? props.order.engineer_id : props.current_user_id
        props.changeOperationForm(engineer_id, 'engineer_id')
    }, [])

    return (
        <div className='contentTab'>
            <div className='blockInput'>
                <ChooseOfList
                    id={18}
                    title='Исполнитель'
                    list={list_ingineers}
                    setElement={props.changeOperationForm}
                    current_id={isExist ? props.current_engineer_id : 0}
                    width={'200px'}
                    field='engineer_id'
                    employee={true}
                />
                <SetWorkMatireals/>
                <TableWorksMaterials/>
                <LableArea
                    className='mt15'
                    title='Заметки исполнителя'
                    onChange={event => props.changeOrderFormS(event.target.value, 'engineer_notes')}
                    value={props.order.engineer_notes}
                />
                <LableArea
                    className='mt15'
                    title='Вердикт / Комментарий'
                    onChange={event => props.changeOrderFormS(event.target.value, 'resume')}
                    value={props.order.resume}
                />
                <SetCell/>
                {props.statusReturnPart ? <ReturnOrderPart/> : null}
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    employees: state.employee.employees,
    order: state.order,
    current_user_id: state.data.user.id,
    current_engineer_id: state.operation.engineer_id,
    statusReturnPart: state.view.statusReturnPart
})

const mapDispatchToProps = {
    changeOrderFormS,
    changeOperationForm
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderWorksMaterials)