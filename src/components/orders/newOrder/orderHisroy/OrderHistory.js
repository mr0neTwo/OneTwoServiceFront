import React, {useRef} from 'react'
import {connect} from 'react-redux'

import {selectedOrder} from '../../../../Redux/actions/orderActions'
import {order_event_types} from '../../../../data/data'
import {ICON} from '../../../../data/icons'

import OrderPrint from './OrderPrint'
import OrderEvents from './OrderEvetns/OrderEvents'
import TableFields from '../../../general/TableFields'
import AddComment from './OrderEvetns/AddComment'

const OrderHistory = props => {


    return (
        <div className="orderHistory">
            <div className='row al-itm-fs'>
                <OrderPrint/>
                <TableFields
                    id='orderEvents'
                    className='ml5'
                    height='200px'
                    classNameMenu='aventFilterMenu'
                    list={order_event_types}
                    checked_list={props.order.event_filter}
                    func={props.selectedOrder}
                    field='event_filter'
                    icon={ICON.FILTER}
                />
            </div>
            {props.order.events.length ? <OrderEvents/> : null}
            <AddComment/>
        </div>
    )
}

const mapStateToProps = state => ({
    order: state.order
})

const mapDispatchToProps = {
    selectedOrder
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory)