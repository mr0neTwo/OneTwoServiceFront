import React from 'react'
import { connect } from 'react-redux'
import {showDate} from '../../../general/utils'
import {Link, useLocation} from 'react-router-dom'

const Remain = (props) => {

    const location = useLocation()
    const start_count = props.remain.registration.parts.find(part => part.part.id === props.part.edit).count

    return (
        <div className='remainBox mt15'>

            <div className='fs14'>
                <span className='clb'>Оприходование №</span>
                <Link
                    className='orderLink'
                    to={{
                        pathname: `/warehouse/registration${props.remain.registration.id}`,
                        state: { prevPath: location.pathname }
                    }}
                >
                    {props.remain.registration.label}
                </Link>
                <span> от </span>
                <span>{showDate(props.remain.registration.custom_created_at, false)}</span>
            </div>

            <div className='mt5'>
                <span>Поставщик: </span>
                <Link
                    className='orderLink'
                    to={{
                        pathname: `/warehouse/client${props.remain.registration.client.id}`,
                        state: { prevPath: location.pathname }
                    }}
                >
                    {props.remain.registration.client.name}
                </Link>
            </div>

            <div>
                <span>Поступило: </span>
                <span>{start_count}</span>
                <span> по </span>
                <span>{props.remain.buy_cost} руб.</span>
                <span> на сумму </span>
                <span>{props.remain.buy_cost * start_count} руб.</span>
            </div>

            <div>
                <span>Остаток: </span>
                <span>{props.remain.count}</span>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    part: state.part
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Remain)