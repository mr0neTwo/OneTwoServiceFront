import React, {useEffect, useState} from 'react'
import ReactPaginate from 'react-paginate'
import {connect} from 'react-redux'

import {addStatusGroupAction, addAdCampaign, addEquipment} from '../../Redux/actions'
import {addBadges, changeFilterForm, changeFilterState, addCustomFilters} from '../../Redux/actions/filterAction'
import {addOrders} from '../../Redux/actions/orderActions'


import Header from './Header'
import Badges from './Badges'
import TableOrders from './TableOrdrers'
import Loader from '../Loader/Loader'
import CustomPanel from './CustomPanel'


function Orders(props) {

    useEffect(() => {
        if (Object.values(props.current_branch).length) props.addOrders()
    }, [
        props.filter.sort,
        props.filter.field_sort,
        props.filter.page,
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
        props.addStatusGroup()
        props.addCustomFilters()
        props.addAdCampaign()
    }, [])

    const pageChangeHandler = page => {
        const curent_page = page.selected ? page.selected : 0
        props.changeFilterState({page: curent_page})
    }

    useEffect(() => {
        props.addBadges()
    }, [])

    return (
        <>
            <Header oderSearch={''}/>
            <Badges/>
            <div className='content-container mt20'>
                <CustomPanel/>
                {props.ordersShow ? <TableOrders/> : <Loader/>}
                {/*<div className="tableAllPage">*/}
                {/*    <ReactPaginate*/}
                {/*        pageCount={props.count % 50 > 0 ? (props.count / 50) : props.count / 50 - 1}*/}
                {/*        marginPagesDisplayed={2}*/}
                {/*        pageRangeDisplayed={5}*/}
                {/*        onPageChange={pageChangeHandler}*/}
                {/*        forcePage={props.page}*/}
                {/*        previousLabel={'<'}*/}
                {/*        nextLabel={'>'}*/}
                {/*        breakLabel={'...'}*/}
                {/*        breakClassName={'pages-pagination'}*/}
                {/*        containerClassName={'pagination'}*/}
                {/*        pageClassName={'pages-pagination'}*/}
                {/*        activeClassName={'active'}*/}
                {/*        nextClassName={'pages-pagination'}*/}
                {/*        previousClassName={'pages-pagination'}*/}
                {/*    />*/}
                {/*    <div className="tablePageCount">*/}
                {/*        Всего - {props.count}*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/*{props.statusOrderLoader ? <Loader className='orderLoader'/> : null}*/}
            </div>
        </>
    )
}

const mapStateToProps = state => ({
    filter: state.filter,
    count: state.order.count,
    ordersShow: state.order.ordersShow,
    statusOrderLoader: state.view.statusOrderLoader,
    current_branch: state.branch.current_branch
})

const mapDispatchToProps = {
    addOrders,
    addStatusGroup: addStatusGroupAction,
    addCustomFilters,
    addAdCampaign,
    addEquipment,
    addBadges,
    changeFilterState,
    changeFilterForm
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders)
