import React, {useEffect, useMemo, useRef} from 'react'
import {connect} from 'react-redux'


import {addOrders, editOrder, resetOrder} from '../../Redux/actions/orderActions'
import {changeVisibleState, initStatusMenuVisibleAction} from '../../Redux/actions'
import {changeBookState} from '../../Redux/actions/bookActions'

import Loader from '../Loader/Loader'
import Create from './cell/Create'
import Lable from './cell/Lable'
import EstimatedDone from './cell/EstimatedDone'
import TableHeader from './TableHeader'
import Status from './cell/Status'
import KindOfGood from './cell/KindOfGood'
import Brand from './cell/Brand'
import Malfunction from './cell/Malfunction'
import Engineer from './cell/Engineer'
import Client from './cell/Client'
import Price from './cell/Price'
import EngineerNotes from './cell/EngineerNotes'
import Equipment from './cell/Equipment'
import OrderEditor from './newOrder/OrderEditor'
import PaymentsEditor from '../Payments/PaymentsEditor'
import StikerToPrint from './newOrder/orderHisroy/StikerToPrint'
import {useHistory} from 'react-router-dom'
import Subtype from './cell/Subtype'
import Manager from './cell/Manager'
import MissedPayments from './cell/MissedPayments'
import ManagerNotes from './cell/ManagerNotes'
import Cell from './cell/Cell'
import AdCampaign from './cell/AdCampaign'


const TableOrders = props => {

    const history = useHistory()

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
        history.push(`/orders/${order.id}`, {order_id: order.id })
    }

    const afterPrint = () => {
        props.changeVisibleState({statusOrderSticker: false})
        if(props.view.needToResetOrder) {
            props.resetOrder()
            props.changeVisibleState({needToResetOrder: false})
        }
    }

    const tFields = useMemo(() => props.order.tableFields.filter(header => header.visible), [props.order, props.order.tableFields])

    const table_order = useRef(null)
    // console.log(table_order.current)

    const chooseCell = (field, order) => {
        switch (field.id) {

            case 1: return <Lable key={field.id} order={order}/>
            case 2: return <Create key={field.id} order={order}/>
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
            <div className="tableOrdersBox">
                <table id="tableOrders" ref={table_order}>
                    <thead className="tableThead">
                    <tr>
                        {tFields.map(header => (
                            <TableHeader
                                key={header.id}
                                data={header}
                                tableHeight={table_order.current ? table_order.current.offsetHeight : 40}
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
                            {tFields.map(header => chooseCell(header, order))}
                            {/*{props.order.tableFields.find(header => header.id === 1).visible ? <Lable order={order}/> : null}*/}
                            {/*{props.order.tableFields.find(header => header.id === 2).visible ? <Create order={order}/> : null}*/}
                            {/*{props.order.tableFields.find(header => header.id === 3).visible ? <EstimatedDone order={order}/> : null}*/}
                            {/*{props.order.tableFields.find(header => header.id === 4).visible ? <Status order={order}/> : null}*/}
                            {/*{props.order.tableFields.find(header => header.id === 5).visible ? <Equipment order={order}/> : null}*/}
                            {/*{props.order.tableFields.find(header => header.id === 6).visible ? <KindOfGood order={order}/> : null}*/}
                            {/*{props.order.tableFields.find(header => header.id === 7).visible ? <Brand order={order}/> : null}*/}
                            {/*{props.order.tableFields.find(header => header.id === 8).visible ? <Subtype order={order}/> : null}*/}
                            {/*{props.order.tableFields.find(header => header.id === 9).visible ? <Malfunction order={order}/> : null}*/}
                            {/*{props.order.tableFields.find(header => header.id === 10).visible ? <Engineer order={order}/> : null}*/}
                            {/*{props.order.tableFields.find(header => header.id === 11).visible ? <Manager order={order}/> : null}*/}
                            {/*{props.order.tableFields.find(header => header.id === 12).visible ? <Client order={order}/> : null}*/}
                            {/*{props.order.tableFields.find(header => header.id === 13).visible ? <Price order={order}/> : null}*/}
                            {/*{props.order.tableFields.find(header => header.id === 14).visible ? <MissedPayments order={order}/> : null}*/}
                            {/*{props.order.tableFields.find(header => header.id === 15).visible ? <EngineerNotes order={order}/> : null}*/}
                            {/*{props.order.tableFields.find(header => header.id === 16).visible ? <ManagerNotes order={order}/> : null}*/}
                            {/*{props.order.tableFields.find(header => header.id === 17).visible ? <Cell order={order}/> : null}*/}
                            {/*{props.order.tableFields.find(header => header.id === 18).visible ? <AdCampaign order={order}/> : null}*/}
                        </tr>
                    ))}
                    </tbody>
                </table>
                {props.view.statusOrderEditor ? <OrderEditor/> : null}
                {props.view.statusPaymentsEditor ? <PaymentsEditor/> : null}
                {props.view.statusOrderSticker ?
                    <StikerToPrint onAfterPrint={afterPrint}/> : null}

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
    resetOrder
}

export default connect(mapStateToProps, mapDispatchToProps)(TableOrders)
