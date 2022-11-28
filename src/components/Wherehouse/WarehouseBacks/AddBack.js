import React, {useEffect} from 'react'
import {connect} from 'react-redux'

import {addBatches} from '../../../Redux/actions/remainAction'
import {changeBackState} from '../../../Redux/actions/warehouseBackActions'

const AddBack = (props) => {

    useEffect(() => {
        if (!props.back.edit) props.addBatches()
    }, [props.remain.filter_registration_id, props.remain.filter_warehouse])


    useEffect(() => {
        let price = 0
        props.parts.forEach(part => {
            price += part.buy_cost * part.target_count
        })
        props.changeBackState({price})
    }, [props.back.flag])


    const handleChange = (value, idx) => {
        value = parseInt(value.replace(/[^0-9]/g, ''))
        const parts = props.back.parts
        if (0 <= value && value <= parts[idx].count) {
            parts[idx].target_count = value
        } else if (value > parts[idx].count) {
            parts[idx].target_count = parts[idx].count
        } else {
            parts[idx].target_count = 1
        }
        props.changeBackState({parts, flag: !props.back.flag})

    }

    const handleChangePrice = (value, idx) => {
        value = parseInt(value.replace(/[^0-9]/g, ''))
        const parts = props.back.parts
        parts[idx].buy_cost = value
        props.changeBackState({parts, flag: !props.back.flag})
    }


    return (
        <div className='mt15'>
            <table>
                <thead>
                <tr>
                    <th>Наименование</th>
                    <th className='w70'>Количество</th>
                    <th className='w70'>Стоимость</th>
                    <th className='w70'>Итого</th>
                </tr>
                </thead>
                <tbody>
                {props.back.parts.map((part, idx) => (
                    <tr key={part.id}>
                        <td>{part.part.title} {part.part.marking ? `(${part.part.marking})` : null}</td>
                        { props.back.edit ?
                            <>
                                <td>{part.target_count}</td>
                                <td>{part.buy_cost}</td>
                            </>
                            :
                            <>
                                <td>
                                    <div className='row'>
                                        <input
                                            className='w30'
                                            onChange={event => handleChange(event.target.value, idx)}
                                            value={part.target_count}
                                            disabled={props.back.edit}
                                        />
                                        <div className='ml5'>{`/ ${part.count}`}</div>
                                    </div>
                                </td>
                                <td>
                                    <input
                                        className='w30'
                                        onChange={event => handleChangePrice(event.target.value, idx)}
                                        value={part.buy_cost}
                                        disabled={props.back.edit}
                                />
                                </td>
                            </>
                        }
                        <td>{part.target_count * part.buy_cost}</td>
                    </tr>
                ))}
                <tr className='ss'>
                    <td className='tae' colSpan='3'>Итого сумма:</td>
                    <td className='tae'>{`${props.back.price} руб.`}</td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}

const mapStateToProps = state => ({
    remain: state.remain,
    back: state.back,
    parts: state.back.parts
})

const mapDispatchToProps = {
    addBatches,
    changeBackState
}

export default connect(mapStateToProps, mapDispatchToProps)(AddBack)