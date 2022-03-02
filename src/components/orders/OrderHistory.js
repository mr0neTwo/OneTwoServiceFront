import React, {useRef} from 'react'
import { connect } from 'react-redux'
import OrderPrint from './OrderPrint'


const OrderHistory = (props) => {


    return (
        <div className="orderHistory">
        <div className='row'>
            <OrderPrint/>

        </div>

            <div className = 'tempPage'>
                <div className = 'tempContainer'>

                    <h1 className = 'tempTitle'>История</h1>
                    <p className = 'tempDescription'>Страница на стадии разработки</p>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    order: state.order
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory)