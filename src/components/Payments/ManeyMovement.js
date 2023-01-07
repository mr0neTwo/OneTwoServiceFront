import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'

import {addPayments, changePaymentState} from '../../Redux/actions/paymentAction'
import {ICON} from '../../data/icons'
import Icon from '../general/Icon'
import TablePayments from './TablePayments';
import Checkbox from '../general/Checkbox';
import ChooseDate from '../general/calandar/ChooseDate'
import Button from '../general/Button'


const ManeyMovement = (props) => {

    useEffect(() => {
        if (props.current_cashbox) {
            props.addPayments()
        }
    }, [props.current_cashbox])

    const [showDeleted, setShowDeleted] = useState(false)

    return (
        <div className='ml30 w100'>

            <div className='row'>
                <Icon icon={ICON.STATS_DOCS}/>
                <h3 className='ml5'>{`Движение денег по кассе "${props.current_cashbox ? props.current_cashbox.title : ''}"`}</h3>
            </div>
            <div className='row'>
                <ChooseDate
                    className='h27'
                    width='250px'
                    range={true}
                    func={date => props.changePaymentState({filter_created_at: date.map(date => parseInt(date / 1000))})}
                    current_date={props.filter_created_at}
                    ivisible={!props.permissions.includes('see_moving_money_all_time')}
                />
                <Button
                    title='Применить'
                    className='blueButton'
                    onClick={() => props.addPayments()}
                    invisible={!props.permissions.includes('see_moving_money_all_time')}
                />
                <Checkbox
                    label='Показать удаленные'
                    onChange={event => setShowDeleted(event.target.checked)}
                    value={showDeleted}
                    invisible={!props.permissions.includes('see_delete_payments')}
                />
            </div>

            <TablePayments showDeleted={showDeleted}/>

        </div>
    )
}

const mapStateToProps = state => ({
    current_cashbox: state.cashbox.current_cashbox,
    filter_created_at: state.payment.filter_created_at,
    permissions: state.data.user.role.permissions
})

const mapDispatchToProps = {
    changePaymentState,
    addPayments
}

export default connect(mapStateToProps, mapDispatchToProps)(ManeyMovement)