import React from 'react'
import {connect} from 'react-redux'
import {changePartState} from '../../../../Redux/actions/partAction'
import LableInput from '../../../general/LableInput'

const EditPrices = (props) => {

    const handleChange = (value, margin_id) => {

        value = value.replace(/[^0-9.]/g, '')

        let prices = props.part.prices
        if (prices.find(price => price.margin.id === margin_id)) {
            prices = prices.map(price => {
                if (price.margin.id === margin_id) {
                    price.cost = value
                    return price
                } else {
                    return price
                }
            })
        } else {
            prices = prices.concat([{
                cost: value,
                margin: {id: margin_id},
                part_id: props.part.edit
            }])
        }
        props.changePartState({prices: prices})
    }

    return (
        <div>
            <h5>Цены</h5>
            <div className='w290'>
                <table>
                    <thead>
                    <tr className='tr_no-underline'>
                        <th className=''/>
                        <th className='w70'/>
                    </tr>
                    </thead>
                    <tbody>
                    {props.discount_margin.filter(margin => margin.margin_type === 2).map(margin => {
                        const price = props.part.prices.find(price => price.margin.id === margin.id)
                        return (
                            <tr
                                className='tr'
                                key={margin.id}
                            >
                                <td className='td'>{margin.title}</td>
                                <td className='td'>
                                    <LableInput
                                        className='w70'
                                        onChange={event => handleChange(event.target.value, margin.id)}
                                        value={price ? price.cost : 0}
                                    />
                                </td>
                            </tr>
                        )

                    })}
                    </tbody>
                </table>
            </div>
            <div className='sip_line mt5'/>
        </div>
    )
}

const mapStateToProps = state => ({
    discount_margin: state.price.discount_margin,
    part: state.part
})

const mapDispatchToProps = {
    changePartState
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPrices)