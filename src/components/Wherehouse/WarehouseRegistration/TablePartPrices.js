import React from 'react'
import { connect } from 'react-redux'

import {ICON} from '../../../data/icons'

import LableInput from '../../general/LableInput'
import Icon from '../../general/Icon'
import {changeRegistrationState} from '../../../Redux/actions/registrationAction'
import {COLORS} from "../../../data/colors";

const TablePartPrices = (props) => {

    const setAllCosts = () => {
        props.discount_margin.forEach(margin => {
            handleChange(margin.id, margin.margin * props.registration.buy_cost / 100)
        })
    }

    const handleChange = (discount_margin_id, value) => {
        let prices = props.registration.prices
        if (prices.find(price => price.margin.id === discount_margin_id)) {
            prices = prices.map(price => {
                if (price.margin.id === discount_margin_id) {
                    price.cost = value
                    return price
                } else {
                    return price
                }
            })
        } else {
            prices = prices.concat([{
                cost: value,
                margin: {id: discount_margin_id},
            }])
        }

        props.changeRegistrationState({prices})
    }

    const prices = props.registration.prices

    return (
        <div className='mt15 bcbl8'>
            <table>
                <thead>
                    <tr>
                        <th className='w150'>Цены</th>
                        <th className='w30'>Расчет</th>
                        <th
                            className='w30 ibot'
                            onClick={setAllCosts}
                        >
                            <Icon
                                className='icon-s2'
                                icon={ICON.ARROW_BOTTOM}
                                color='#282e32'
                            />
                        </th>
                        <th className='w30'>Пользовательская цена</th>
                    </tr>
                </thead>
                <tbody>
                {props.discount_margin.map(margin => (
                    <tr key={margin.id}>
                        <td className=''>{margin.title}</td>
                        <td className='tac'>{margin.margin * props.registration.buy_cost / 100}</td>
                        <td
                            className='ibot'
                            onClick={() => handleChange(margin.id, margin.margin * props.registration.buy_cost / 100)}
                        >
                            <Icon
                                className='icon'
                                icon={ICON.ARROW_BOTTOM}
                                color={COLORS.NAME.ACTION_ACCENT}
                            />
                        </td>
                        <td className=''>
                            <LableInput
                                onChange={event => handleChange(margin.id, event.target.value.replace(/[^0-9.]/g, ''))}
                                value={prices.find(mr => mr.margin.id === margin.id) ? prices.find(mr => mr.margin.id === margin.id).cost : 0}
                            />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

const mapStateToProps = state => ({
    discount_margin: state.price.discount_margin,
    registration: state.registration
})

const mapDispatchToProps = {
    changeRegistrationState
}

export default connect(mapStateToProps, mapDispatchToProps)(TablePartPrices)