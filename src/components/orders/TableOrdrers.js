import React, {useEffect, useMemo, useRef} from 'react'
import {connect} from 'react-redux'

import {
    addOrders,
    changeOrderState,
    changeStatus,
    editOrder,
    getOrder,
    resetOrder
} from '../../Redux/actions/orderActions'
import {changeVisibleState, initStatusMenuVisibleAction} from '../../Redux/actions'
import {changeBookState} from '../../Redux/actions/bookActions'

import Equipment from '../general/cell/Equipment'
import StikerToPrint from './newOrder/orderHisroy/StikerToPrint'
import TableHeader from '../general/TableHeader'
import Label from '../general/cell/Label'
import Loader from '../Loader/Loader'
import CreateAt from '../general/cell/CreateAt'
import EstimatedDoneAt from '../general/cell/EstimatedDoneAt'
import Status from '../general/cell/Status'
import Data from '../general/cell/Data'
import Client from '../general/cell/Client'
import {changePaymentState} from "../../Redux/actions/paymentAction";


const TableOrders = props => {

    useEffect(() => {
        let statusVis = {}
        props.order.ordersShow.forEach((order) => {
            statusVis[order.id] = false
        })
        props.initStatusMenuVisible(statusVis)
    }, [props.order.ordersShow])

    const tableOrderRef = useRef(null)

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

    //todo: написать эту функцию через midleware
    const handleSetStatus = (status, order) => {

        const paymentRequiredGroup = 6

        if (status.group === paymentRequiredGroup && order.price !== order.payed) {

            const isIncome = order.price > order.payed
            const cahsflowCategory = props.item_payments.find(item => item.id === (isIncome ? 2 : 8))

            props.changePaymentState({
                direction: isIncome ? 2 : 1,
                [isIncome ? 'income': 'outcome']: Math.abs(order.missed_payments),
                client: order.client,
                description: isIncome ? `Оплата по заказу № ${order.id_label}` : `Выплата по заказу № ${order.id_label}`,
                cashflow_category: cahsflowCategory,
                employee: props.current_user,
                order_id: order.id || order.id,
                context: {
                    type: 'closed_order',
                    order_id: order.id,
                    status_id: status.id
                }
            })
            props.changeVisibleState({'statusPaymentsEditor': true})
        } else {
            props.changeStatus(status.id, order.id)
        }

    }

    const listOfGroups = useMemo(() => props.status_group.filter(group => group.id < 8),
        [props.status_group]) // все группы статусов отностящиеся к заказам

    const chooseCell = (field, order) => {
        switch (field.id) {

            case 1:
                return (
                <Label
                    key={field.id}
                    label={order.id_label}
                    func={() => props.getOrder(order.id)}
                    urgent={order.status.group < 3 && order.urgent} // если статус "в работе" и срочно
                />
            )
            case 2:
                return (
                <CreateAt
                    key={field.id}
                    creator={order.created_by.name}
                    date={order.created_at}/>
            )
            case 3:
                return (
                <EstimatedDoneAt
                    key={field.id}
                    estimatedDoneAt={order.estimated_done_at}
                    statusGroupId={order.status.group}
                    listStatusGroup={[1, 2, 3]}
                />
            )
            case 4: return (
                <Status
                    key={field.id}
                    id={order.id * order.status.id}
                    status={order.status}
                    listOfGroups={listOfGroups}
                    changeStatus = {status => handleSetStatus(status, order)}
                    tableOrderRef={tableOrderRef}
                />
            )
            case 5: return <Equipment key={field.id} order={order}/>
            case 6: return <Data key={field.id} data={order.kindof_good.title}/>
            case 7: return <Data key={field.id} data={order.brand.title}/>
            case 8: return <Data key={field.id} data={order.subtype.title}/>
            case 10: return <Data key={field.id} data={order.engineer.name}/>
            case 11: return <Data key={field.id} data={order.manager.name}/>
            case 12: return <Client key={field.id} client={order.client}/>
            case 18: return <Data key={field.id} data={order.ad_campaign.name}/>
            default: return <Data key={field.id} data={order[field.field]}/>
        }
    }

    const headers = props.order.table_headers.filter(header => header.visible).sort( (a, b) => a.order - b.order)

    if (props.order.spinner) return <Loader/>

    if (props.employees) {
        return (
            <div className="table-orders-container" ref={tableOrderRef}>
                <table>
                    <thead className="tableThead">
                    <tr>
                        {headers.map(header => (
                            <TableHeader
                                key={header.id}
                                header={header}
                                headers={props.order.table_headers}
                                changeState={props.changeOrderState}
                                sort_field={props.order.sort_field}
                                sort={props.order.sort}
                            />
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {props.order.ordersShow.map(order => (
                        <tr
                            key={order.id}
                            className="tr"
                            onDoubleClick={() => handleEdit(order)}
                        >
                            {headers.map(header => chooseCell(header, order))}
                        </tr>
                    ))}
                    </tbody>
                </table>
                {props.view.statusOrderSticker ? <StikerToPrint onAfterPrint={afterPrint}/> : null}
                <div className='h100p w250'/>
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
    mainFilter: state.filter.mainFilter,
    status_group: state.data.status_group,
    current_user: state.data.user,
    item_payments: state.data.item_payments
})

const mapDispatchToProps = {
    addOrders,
    initStatusMenuVisible: initStatusMenuVisibleAction,
    changeVisibleState,
    changePaymentState,
    editOrder,
    changeBookState,
    resetOrder,
    getOrder,
    changeOrderState,
    changeStatus
}

export default connect(mapStateToProps, mapDispatchToProps)(TableOrders)
