import React from 'react'
import {connect} from 'react-redux'

import {changeFilterState} from '../../Redux/actions/filterAction'
import {addClientToTempFilter} from '../../Redux/actions/clientAction'
import Button from '../general/Button'
import {ICON} from '../../data/icons'
import {changeOrderState} from '../../Redux/actions/orderActions'

const CustomFilter = props => {

    async function  handleChoose()  {
        if (props.filter.active_filter !== props.data.id) {
            if (props.data.filters.client_id) props.addClientToTempFilter(props.data.filters.client_id[0])
            props.changeFilterState({
                ...props.data.filters,
                active_filter: props.data.id,
                active_badge: 0,
                search: '',
                temp_statuses: props.data.filters.status_id ? props.data.filters.status_id.map(status_id => ({id: status_id})) : [],
                temp_order_types: props.data.filters.order_type_id ? props.data.filters.order_type_id.map(order_type_id => ({id: order_type_id})) : [],
                temp_managers: props.data.filters.manager_id ? props.data.filters.manager_id.map(manager_id => ({id: manager_id})) : [],
                temp_engineers: props.data.filters.engineer_id ? props.data.filters.engineer_id.map(engineer_id => ({id: engineer_id})) : [],
                temp_created_at: props.data.filters.created_at || [0, 0],
                temp_kindof_good_id: props.data.filters.kindof_good,
                temp_brand: props.data.filters.brand,
                temp_subtype: props.data.filters.subtype,
                temp_client: {}
            })
        } else {
            props.changeFilterState({
                active_filter: 0,
                engineer_id: null,
                overdue: null,
                status_id: null,
                status_overdue: null,
                urgent: null,
                order_type_id: null,
                manager_id: null,
                created_at: null,
                kindof_good: null,
                brand: null,
                subtype: null,
                client_id: null,
            })
            props.changeOrderState({page: 0})
        }
    }

    const isActive = props.data.id === props.filter.active_filter

    return (
        <Button
            size='med'
            type={isActive ? 'secondary-active' : 'secondary'}
            title= {props.data.title}
            onClick={handleChoose}
        />
    )
}

const mapStateToProps = state => ({
    filter: state.filter
})

const mapDispatchToProps = {
    changeFilterState,
    addClientToTempFilter,
    changeOrderState
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomFilter)