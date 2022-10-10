import React from 'react'
import { connect } from 'react-redux'

import ChooseDate from '../../general/calandar/ChooseDate'
import Button from '../../general/Button'
import Checkbox from '../../general/Checkbox'
import RegistrationEditor from './RegistrationEditor'

import {changeVisibleState} from '../../../Redux/actions'
import {addRegistration, changeRegistrationState} from '../../../Redux/actions/registrationAction'


const WarehouseRegistration = props => {
    return (
        <div className = 'contentTab'>
            <div className='row'>
                <Button
                    title='+ Оприходование'
                    className='greenButton h31'
                    onClick={() => props.changeVisibleState({statusRegistrationEditor: true})}
                    // invisible={!props.permissions.includes('')}
                />
                <ChooseDate
                    className='ml10 h27'
                    width='250px'
                    range={true}
                    func={date => props.changeRegistrationState({filter_created_at: date.map(date => parseInt(date / 1000))})}
                    current_date={props.filter_created_at}
                    // ivisible={!props.permissions.includes('see_moving_money_all_time')}
                />
                <Button
                    title='Применить'
                    className='blueButton'
                    onClick={() => props.addRegistration()}
                    // invisible={!props.permissions.includes('see_moving_money_all_time')}
                />
                <Checkbox
                    label='Показать удаленные'
                    onChange={event => props.changeRegistrationState({showDeleted: event.target.checked})}
                    value={props.showDeleted}
                    // invisible={!props.permissions.includes('see_delete_payments')}
                />
            </div>
            {props.statusRegistrationEditor ? <RegistrationEditor/> : null}
        </div>
    )
}

const mapStateToProps = state => ({
    filter_created_at: state.registration.filter_created_at,
    showDeleted: state.registration.showDeleted,
    statusRegistrationEditor: state.view.statusRegistrationEditor
})

const mapDispatchToProps = {
    changeVisibleState,
    changeRegistrationState,
    addRegistration
}

export default connect(mapStateToProps, mapDispatchToProps)(WarehouseRegistration)