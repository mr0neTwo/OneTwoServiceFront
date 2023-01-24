import React from 'react'
import {connect} from 'react-redux'

import SelectFromList from '../../../general/SelectFromList'
import {changeOrderState} from '../../../../Redux/actions/orderActions'

const AssingEmployee = (props) => {

    // текущий список менеджеров
    let list_managers = props.employees.filter(employee => !employee.deleted && employee.role.permissions.includes('in_list_managers'))
    // проверим есть ли текущий сотрудник в списке менеджеров, если нет, то добавим, если да, оставим как есть
    list_managers = list_managers.some(employee => employee.id === props.manager_id) || !props.manager_id ? list_managers :
        list_managers.concat([props.employees.find(employee => employee.id === props.manager_id)])

    // текущий список инженеров
    let list_ingineers = props.employees.filter(employee => !employee.deleted && employee.role.permissions.includes('in_list_engineers'))
    // проверим есть ли текущий сотрудник в списке менеджеров, если нет, то добавим, если да, оставим как есть
    list_ingineers = list_ingineers.some(employee => employee.id === props.engineer_id) || !props.engineer_id ? list_ingineers :
        list_ingineers.concat([props.employees.find(employee => employee.id === props.engineer_id)])


    return (
        <div className='boxAssingEmployee'>

            <div className='formRow'>
                <div className='optionsTitle'>Менеджер</div>
                <div className='blockInput'>
                    <SelectFromList
                        id='managerOrderEditor'
                        className='pd-lf-5'
                        list={list_managers}
                        setElement={manager => props.changeOrderState({manager})}
                        current_object={props.order.manager}
                        width={'250px'}
                        employee={true}
                        noChoosed='Выберете сотрудника'
                        disabled={!props.user.role.permissions.includes('assing_emploees') || props.status_group > 3}
                    />
                </div>
            </div>

            <div className='formRow'>
                <div className='optionsTitle'>Исполнитель</div>
                <div className='blockInput'>
                    <SelectFromList
                        id='engineerOrderEditor'
                        className='pd-lf-5'
                        list={list_ingineers}
                        setElement={engineer => props.changeOrderState({engineer})}
                        current_object={props.order.engineer}
                        width={'250px'}
                        employee={true}
                        noChoosed='Выберете сотрудника'
                        disabled={!props.user.role.permissions.includes('assing_emploees') || props.status_group > 3}
                    />
                </div>
            </div>

        </div>
    )
}

const mapStateToProps = state => ({
    employees: state.employee.employees,
    order: state.order,
    user: state.data.user,
    status_group: state.order.status.group
})

const mapDispatchToProps = {
    changeOrderState
}

export default connect(mapStateToProps, mapDispatchToProps)(AssingEmployee)