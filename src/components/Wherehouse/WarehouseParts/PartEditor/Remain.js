import React from 'react'
import {connect} from 'react-redux'


import {checkObject, showDate} from '../../../general/utils'
import {getRegistration} from '../../../../Redux/actions/registrationAction'
import {getClient} from '../../../../Redux/actions/clientAction'
import {getMovement} from '../../../../Redux/actions/warehouseMovementAction'
import Icon from '../../../general/Icon'

const Remain = (props) => {

    return (
        <div className='remain'>

            <div>
                <div>
                    <span className=''>Оприходование №</span>
                    <span
                        className='cell_label'
                        onClick={() => props.getRegistration(props.remain.registration.id)}
                    >
                        {props.remain.registration.label}
                    </span>
                    <span className='cs'> от </span>
                    <span className='cs'>{showDate(props.remain.registration.custom_created_at, false)}</span>
                </div>

                <div>
                    <span>Поставщик: </span>
                    <span
                        className='cell_label'
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
                    </div> : null
                }
                {props.remain.where_to_buy ?
                    <div>
                        <span>Ссылка: </span>
                        <span>{props.remain.where_to_buy}</span>
                    </div> : null
                }

                <div className='mt15'>
                    <div>Остатоки:</div>
                    {props.remain.remains.map(remain => (
                        <div key={remain.id} className='row g6'>
                            <Icon
                                className='icon'
                                icon={remain.warehouse.branch.icon}
                                color={remain.warehouse.branch.color}
                            />
                            <div>{`${remain.warehouse.title}: ${remain.count} шт.`}</div>
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