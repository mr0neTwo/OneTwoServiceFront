import React from 'react'
import {connect} from 'react-redux'

import {changeVisibleState, setVisibleFlag} from '../../Redux/actions'
import {changeFilterState} from '../../Redux/actions/filterAction'
import {changeOrderState, selectedOrder} from '../../Redux/actions/orderActions'
import {ICON} from '../../data/icons'

import CustomFilter from './CustomFilter'
import SetFilter from './setCustomFilter/SetFilter'
import Button from '../general/Button'
import TableFields from '../general/TableFields'
import {Table} from '../../data/tableHeaders'

const CustomPanel = (props) => {

    const newOrder = () => {
        // Посчитаем ориентировочную дату готовности
        const days_to_add = 4   // Количество дней, которое прибавляем
        let estimated_done_at = new Date()
        for (let i = 0; i < days_to_add; ) {
            estimated_done_at.setDate(estimated_done_at.getDate() + 1) // прибавим день
            let week_day = estimated_done_at.getDay() || 7 // вычеслим текущий день недели
            if (props.schedule.find(day => day.week_day === week_day).work_day) i++ // Если день рабочий, довим шаг цикла
        }
        props.changeOrderState({
            manager: props.user,
            engineer: {id: 0, first_name: 'назначен', last_name: 'Не'},
            estimated_done_at: parseInt(estimated_done_at / 1000)
        })
        props.changeVisibleState({statusOrderEditor: true})
    }

    const handleEditFilter = () => {
        props.setVisibleFlag('statusSetCustomFilter', 'change')
        props.changeFilterState({active_badge: 0,  active_filter: 0})
    }

    return (
        <div className='row jc-sb'>

                <div className='custom-filters-container'>
                    <Button
                        id='newOrder'
                        size='small'
                        type='create'
                        title='Создать'
                        onClick={newOrder}
                        invisible={!props.permissions.includes('create_orders')}
                    />
                    <Button
                        size='small'
                        type='secondary'
                        title='Фильтр'
                        onClick={handleEditFilter}
                        icon={ICON.FILTER}
                        iconClassName='icon-16'
                    />

                    { props.customFilters.map(filter => <CustomFilter key={filter.id} data={filter} />) }

                </div>
                <TableFields
                    id='orders'
                    className='ml10'
                    list={Table.Fields.Order}
                    checked_list={props.order.table_headers}
                    func={props.selectedOrder}
                />

            {/*{props.statusSetCustomFilter ? <SetFilter/> : null}*/}
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
    schedule: state.branch.current_branch.schedule
})

const mapDispatchToProps = {
    setVisibleFlag,
    changeOrderState,
    changeFilterState,
    changeVisibleState,
    selectedOrder
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomPanel)