import React, {useEffect} from 'react'
import {connect} from 'react-redux'

import {addStatusGroupAction, addAdCampaign, addEquipment} from '../../Redux/actions'
import {addBadges, changeFilterForm, changeFilterState, addCustomFilters} from '../../Redux/actions/filterAction'
import {addOrders, changeOrderState} from '../../Redux/actions/orderActions'


import Header from '../Header/Header'
import Badges from './Badges'
import TableOrders from './TableOrdrers'
import CustomPanel from './CustomPanel'
import Paginate from '../general/Paginate'
import OrderSearch from './OrderSearch'


function Orders(props) {

    useEffect(() => {
        if (Object.values(props.current_branch).length) props.addOrders()
    }, [
        props.order.sort,
        props.order.field_sort,
        props.order.page,
        props.filter.engineer_id,
        props.filter.overdue,
        props.filter.status_id,
        props.filter.status_overdue,
        props.filter.urgent,
        props.filter.order_type_id,
        props.filter.manager_id,
        props.filter.created_at,
        props.filter.kindof_good,
        props.filter.brand,
        props.filter.subtype,
        props.filter.client_id,
        props.filter.search,
        props.current_branch
    ])

// Загружаем заказы
    useEffect(() => {
        // props.addStatusGroup()
        props.addCustomFilters()
        // props.addAdCampaign()
    }, [props.user])


    useEffect(() => {
        props.addBadges()
    }, [])

    return (
        <div className='main-content'>
            <Header
                title='Заказы'
                search={<OrderSearch/>}
            />
            <Badges/>
            <div className='content-container'>
                <CustomPanel/>
                <TableOrders/>
                <Paginate
                    allItems={props.count}
                    onPage={50}
                    count={2}
                    count_start_end={2}
                    navigation={true}
                    func={page => props.changeOrderState({page})}
                />
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    filter: state.filter,
    count: state.order.count,
    ordersShow: state.order.ordersShow,
    statusSetCustomFilter: state.view.statusSetCustomFilter,
    current_branch: state.branch.current_branch,
    user: state.data.user,
    order: state.order
})

const mapDispatchToProps = {
    addOrders,
    addStatusGroup: addStatusGroupAction,
    addCustomFilters,
    addAdCampaign,
    addEquipment,
    addBadges,
    changeFilterState,
    changeFilterForm,
    changeOrderState
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders)
