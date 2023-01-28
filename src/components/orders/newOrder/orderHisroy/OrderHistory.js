import React from 'react'
import {connect} from 'react-redux'

import {changeOrderState, selectedOrder} from '../../../../Redux/actions/orderActions'

import OrderPrint from './OrderPrint'
import OrderEvents from './OrderEvetns/OrderEvents'
import TableFields from '../../../general/TableFields'
import AddComment from './OrderEvetns/AddComment'

const OrderHistory = props => {


    return (
        <div className="history-order-editor">
            <div className='history-order-editor__buttons'>
                <OrderPrint/>
                <TableFields
                    id='orderEvents'
                    list={props.order.event_filter}
                    func={event_filter =>  props.changeOrderState({event_filter})}
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
    selectedOrder,
    changeOrderState
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory)