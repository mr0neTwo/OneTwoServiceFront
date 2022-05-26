import React from 'react'
import {connect} from 'react-redux'

import { setVisibleFlag} from '../../Redux/actions'
import {changeFilterState} from '../../Redux/actions/filterAction'
import {changeOrderState} from '../../Redux/actions/orderActions'
import {icon_filter} from '../../data/icons'

import CustomFilter from './CustomFilter'
import SetFilter from './setCustomFilter/SetFilter'
import Button from '../general/Button'
import TableOrderFields from './TableOrderFields'

const CustomPanel = (props) => {

    const newOrder = () => {
        // Посчитаем ориентировочную дату готовности
        const days_to_add = 4   // Количество дней, которое прибавляем
        let estimated_done_at = new Date()
        for (let i = 0; i < days_to_add; ) {
            let week_day = estimated_done_at.getDay() || 7 // вычеслим текущий день недели
            estimated_done_at.setDate(estimated_done_at.getDate() + 1) // прибавим день
            if (props.schedule.find(day => day.week_day === week_day).work_day) i++ // Если день рабочий, довим шаг цикла
        }

        props.changeOrderState({manager_id: props.user.id, estimated_done_at: parseInt(estimated_done_at / 1000)})
        props.setVisibleFlag('statusOrderEditor', true)
    }

    const handleEditFilter = () => {
        props.setVisibleFlag('statusSetCustomFilter', 'change')
        props.changeFilterState({active_badge: 0,  active_filter: 0})
    }

    return (
        <div className='mainCustomPanel '>
            <div className='customPanel'>
                <div className='row al-itm-fe'>
                    <Button
                        id='addOrder'
                        className='greenButton'
                        title='+ Заказ'
                        onClick={newOrder}
                        invisible={!props.permissions.includes('create_orders')}
                    />
                    <div className='customFilters'>
                        <Button
                            className='customFilter'
                            title='Фильтр'
                            onClick={handleEditFilter}
                            invisible={false}
                            icon={icon_filter}
                            iconClassName='icon-s2'
                            iconColor='282e33'
                        />
                        {props.customFilters.map(filter => {
                            return (
                                <CustomFilter data={filter} key={filter.id}/>
                            )
                        })}
                    </div>
                </div>
                <TableOrderFields/>
            </div>

            {props.statusSetCustomFilter ? <SetFilter/> : null}

        </div>
    )
}

const mapStateToProps = state => ({
    customFilters: state.filter.customFilters,
    statusSetCustomFilter: state.view.statusSetCustomFilter,
    permissions: state.data.user.role.permissions,
    statusOrderEditor: state.view.statusOrderEditor,
    user: state.data.user,
    edit: state.order.edit,
    schedule: state.branch.current_branch.schedule
})

const mapDispatchToProps = {
    setVisibleFlag,
    changeOrderState,
    changeFilterState
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomPanel)