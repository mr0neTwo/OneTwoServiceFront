import React from 'react'
import { connect } from 'react-redux'
import {showDate} from '../../../general/utils'
import {getRegistration} from '../../../../Redux/actions/registrationAction'
import {getClient} from '../../../../Redux/actions/clientAction'

const Remain = (props) => {

    const start_count = props.remain.registration.parts.find(part => part.part.id === props.part.edit).count

    return (
        <div className='remainBox mt15'>

            <div className='fs14'>
                <span className='clb'>Оприходование №</span>
                <span
                    className='link'
                    onClick={() => props.getRegistration(props.remain.registration.id)}
                >
                    {props.remain.registration.label}
                </span>
                <span> от </span>
                <span>{showDate(props.remain.registration.custom_created_at, false)}</span>
            </div>

            <div className='mt5'>
                <span>Поставщик: </span>
                <span
                    className='link'
                    onClick={() => props.getClient(props.remain.registration.client.id)}
                >
                    {props.remain.registration.client.name}
                </span>
            </div>
            {props.permissions.includes('see_buy_cost') ?
            <div>
                <span>Поступило: </span>
                <span>{start_count}</span>
                <span> по </span>
                <span>{props.remain.buy_cost} руб.</span>
                <span> на сумму </span>
                <span>{props.remain.buy_cost * start_count} руб.</span>
            </div> : null }

            {props.remain.seller ?
            <div>
                <span>Продавец: </span>
                <span>{props.remain.seller}</span>
            </div> : null}
            {props.remain.where_to_buy ?
            <div>
                <span>Ссылка: </span>
                <span>{props.remain.where_to_buy}</span>
            </div>: null}

            <div>
                <span>Остаток: </span>
                <span>{props.remain.count}</span>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    part: state.part,
    permissions: state.data.user.role.permissions
})

const mapDispatchToProps = {
    getRegistration,
    getClient
}

export default connect(mapStateToProps, mapDispatchToProps)(Remain)