import React, {useState} from 'react'
import {connect} from 'react-redux'

import {changeVisibleState} from '../../Redux/actions'
import {changeFilterState} from '../../Redux/actions/filterAction'
import {changeOrderState, selectedOrder} from '../../Redux/actions/orderActions'
import {ICON} from '../../data/icons'

import CustomFilter from './CustomFilter'
import SetFilter from './setCustomFilter/SetFilter'
import Button from '../general/Button'
import TableFields from '../general/TableFields'

const CustomPanel = (props) => {

    const [invisible, setInvisible] = useState('custom-filter_invisible')

    const newOrder = () => {
        // Посчитаем ориентировочную дату готовности
        const days_to_add = 4   // Количество дней, которое прибавляем
        let estimated_done_at = new Date()
        for (let i = 0; i < days_to_add; ) {
            estimated_done_at.setDate(estimated_done_at.getDate() + 1) // прибавим день
            let week_day = estimated_done_at.getDay() || 7 // вычеслим текущий день недели
            if (props.schedule.find(day => day.week_day === week_day).work_day) i++ // Если день рабочий, довим шаг цикла
        }

        const defaultOrderTypeId = 1
        const defaultEmployeeId = 0

        props.changeOrderState({
            manager: props.user,
            engineer: props.employees.find(employee => employee.id === defaultEmployeeId),
            order_type: props.order_types.find(order_type => order_type.id === defaultOrderTypeId),
            estimated_done_at: parseInt(estimated_done_at / 1000)
        })
        props.changeVisibleState({statusOrderEditor: true})
    }

    const handleEditFilter = () => {
        // props.changeVisibleState({statusSetCustomFilter: !props.statusSetCustomFilter})
        setInvisible(invisible ? '' : 'custom-filter_invisible')
        props.changeFilterState({active_badge: 0,  active_filter: 0})
    }

    return (
        <div>
        <div className='row jc-sb'>
                <div className='custom-filters-container'>
                    <Button
                        id='newOrder'
                        className='fw-bold'
                        size='med'
                        type='create'
                        title='Создать'
                        onClick={newOrder}
                        invisible={!props.permissions.includes('create_orders')}
                    />
                    <Button
                        size='med'
                        type='tertiary'
                        title='Фильтр'
                        onClick={handleEditFilter}
                        icon={ICON.FILTER}
                    />

                    { props.customFilters.map(filter => <CustomFilter key={filter.id} data={filter} />) }

                </div>
                <TableFields
                    id='orders'
                    className='ml10'
                    list={props.order.table_headers}
                    func={table_headers =>  props.changeOrderState({table_headers})}
                />
        </div>
        <SetFilter invisible={invisible}/>
        </div>
)
}

const mapStateToProps = state => ({
    customFilters: state.filter.customFilters,
    statusSetCustomFilter: state.view.statusSetCustomFilter,
    permissions: state.data.user.role.permissions,
    statusOrderEditor: state.view.statusOrderEditor,
    user: state.data.user,
    order: state.order,
    order_types: state.data.order_type,
    employees: state.employee.employees,
    schedule: state.branch.current_branch.schedule
})

const mapDispatchToProps = {
    changeOrderState,
    changeFilterState,
    changeVisibleState,
    selectedOrder
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomPanel)