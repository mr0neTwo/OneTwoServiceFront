import React from 'react'
import {connect} from 'react-redux'


import {checkObject, showDate} from '../../../general/utils'
import {getRegistration} from '../../../../Redux/actions/registrationAction'
import {getClient} from '../../../../Redux/actions/clientAction'
import {getMovement} from '../../../../Redux/actions/warehouseMovementAction'
import Icon from '../../../general/Icon'

const Remain = (props) => {

    return (
        <div className='remainBox mt15'>

                <div>
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
                            <span>{props.remain.start_count}</span>
                            <span> по </span>
                            <span>{props.remain.buy_cost} руб.</span>
                            <span> на сумму </span>
                            <span>{props.remain.buy_cost * props.remain.start_count} руб.</span>
                        </div> : null}

                    {props.remain.seller ?
                        <div>
                            <span>Продавец: </span>
                            <span>{props.remain.seller}</span>
                        </div> : null}
                    {props.remain.where_to_buy ?
                        <div>
                            <span>Ссылка: </span>
                            <span>{props.remain.where_to_buy}</span>
                        </div> : null}

                <div className='mt15'>
                    <div>Остатоки:</div>
                    {props.remain.remains.map(remain => (
                        <div key={remain.id} className='ml10 al-itm-ct'>
                            <Icon
                                className='icon-s2'
                                icon={remain.warehouse.branch.icon}
                                color={remain.warehouse.branch.color}
                            />
                            <span className='ml5'>{`${remain.warehouse.title}: ${remain.count} шт.`}</span>
                        </div>
                    ))}
                </div>
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
    getMovement,
    getClient
}

export default connect(mapStateToProps, mapDispatchToProps)(Remain)