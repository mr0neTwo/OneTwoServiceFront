import React, {useEffect, useMemo, useRef} from 'react'
import {connect} from 'react-redux'


import {addOrders, changeOrderState, editOrder, getOrder, resetOrder} from '../../Redux/actions/orderActions'
import {changeVisibleState, initStatusMenuVisibleAction} from '../../Redux/actions'
import {changeBookState} from '../../Redux/actions/bookActions'

import Create from './cell/Create'
import EstimatedDone from './cell/EstimatedDone'
import Status from './cell/Status'
import KindOfGood from './cell/KindOfGood'
import Brand from './cell/Brand'
import Malfunction from './cell/Malfunction'
import Engineer from './cell/Engineer'
import Client from './cell/Client'
import Price from './cell/Price'
import EngineerNotes from './cell/EngineerNotes'
import Equipment from './cell/Equipment'
import StikerToPrint from './newOrder/orderHisroy/StikerToPrint'
import Subtype from './cell/Subtype'
import Manager from './cell/Manager'
import MissedPayments from './cell/MissedPayments'
import ManagerNotes from './cell/ManagerNotes'
import Cell from './cell/Cell'
import AdCampaign from './cell/AdCampaign'
import TableHeader from '../general/TableHeader'
import Label from '../general/cell/Label'
import Loader from '../Loader/Loader'
import CreateAt from '../general/cell/CreateAt'


const TableOrders = props => {

    useEffect(() => {
        let statusVis = {}
        props.order.ordersShow.forEach((order) => {
            statusVis[order.id] = false
        })
        props.initStatusMenuVisible(statusVis)
    }, [props.order.ordersShow])

    const handleEdit = (order) => {
        props.changeBookState({
            equipment_type: order.kindof_good,
            equipment_brand: order.brand,
            equipment_subtype: order.subtype,
            equipment_model: order.model
        })
        props.getOrder(order.id)
    }

    const afterPrint = () => {
        props.changeVisibleState({statusOrderSticker: false})
        if(props.view.needToResetOrder) {
            props.resetOrder()
            props.changeVisibleState({needToResetOrder: false})
        }
    }

    const chooseCell = (field, order) => {
        switch (field.id) {

            case 1: return (
                <Label
                    key={field.id}
                    label={order.id_label}
                    func={() => props.getOrder(order.id)}
                    urgent={order.urgent}
                />
            )
            case 2: return <CreateAt key={field.id} creator={order.created_by.name} date={order.created_at}/>
            case 3: return <EstimatedDone key={field.id} order={order}/>
            case 4: return <Status key={field.id} order={order}/>
            case 5: return <Equipment key={field.id} order={order}/>
            case 6: return <KindOfGood key={field.id} order={order}/>
            case 7: return <Brand key={field.id} order={order}/>
            case 8: return <Subtype key={field.id} order={order}/>
            case 9: return <Malfunction key={field.id} order={order}/>
            case 10: return <Engineer key={field.id} order={order}/>
            case 11: return <Manager key={field.id} order={order}/>
            case 12: return <Client key={field.id} order={order}/>
            case 13: return <Price key={field.id} order={order}/>
            case 14: return <MissedPayments key={field.id} order={order}/>
            case 15: return <EngineerNotes key={field.id} order={order}/>
            case 16: return <ManagerNotes key={field.id} order={order}/>
            case 17: return <Cell key={field.id} order={order}/>
            case 18: return <AdCampaign key={field.id} order={order}/>
            default: return null
        }
    }

    if (props.employees) {
        return (
            <div className="table-orders-container mt5">
                <table>
                    <thead className="tableThead">
                    <tr>
                        {props.order.table_headers.map(header => (
                            <TableHeader
                                key={header.id}
                                header={header}
                                headers={props.order.table_headers}
                                changeState={props.changeOrderState}
                                // title_field_sort='sort_field'
                                // title_sort='sort'
                                // title_sort_field={props.sort_field}
                                // sort={props.sort}
                            />
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {props.order.ordersShow.map(order => (
                        <tr
                            key={order.id}
                            className="orderTableRows"
                            onDoubleClick={() => handleEdit(order)}
                        >
                            {props.order.table_headers.map(header => chooseCell(header, order))}
                        </tr>
                    ))}
                    </tbody>
                </table>
                {props.view.statusOrderSticker ? <StikerToPrint onAfterPrint={afterPrint}/> : null}
            </div>
        )
    } else {
        return <Loader/>
    }
}

const mapStateToProps = state => ({
    order: state.order,
    employees: state.employee.employees,
    user: state.data.user,
    view: state.view,
    mainFilter: state.filter.mainFilter
})

const mapDispatchToProps = {
    addOrders,
    initStatusMenuVisible: initStatusMenuVisibleAction,
    changeVisibleState,
    editOrder,
    changeBookState,
    resetOrder,
    getOrder,
    changeOrderState
}

export default connect(mapStateToProps, mapDispatchToProps)(TableOrders)
