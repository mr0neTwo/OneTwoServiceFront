import React from 'react'
import {connect} from 'react-redux'

import CustomFilter from './CustomFilter'
import SetFilter from './setCustomFilter/SetFilter'
import { setVisibleFlag, changeOrderFormS} from '../../Redux/actions'
import {icon_down, icon_filter, icon_table} from '../../data/icons'
import Button from '../general/Button'
import Icon from '../general/Icon'
import {changeFilterState} from '../../Redux/actions/filterAction'
import TableOrderFields from './TableOrderFields'

const CustomPanel = (props) => {

    const newOrder = () => {
        props.changeOrderFormS(props.user.id, 'manager_id')
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
    edit: state.order.edit
})

const mapDispatchToProps = {
    setVisibleFlag,
    changeOrderFormS,
    changeFilterState
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomPanel)