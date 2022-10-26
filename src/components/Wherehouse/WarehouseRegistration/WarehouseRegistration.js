import React, {useEffect} from 'react'
import { connect } from 'react-redux'

import ChooseDate from '../../general/calandar/ChooseDate'
import Button from '../../general/Button'
import Checkbox from '../../general/Checkbox'
import RegistrationEditor from './RegistrationEditor'

import {changeVisibleState} from '../../../Redux/actions'
import {addRegistration, changeRegistrationState, selectedRegistration} from '../../../Redux/actions/registrationAction'
import TableRegistration from './TableRegistration'
import TableFields from '../../general/TableFields'
import {registrations_table_headers} from '../../../data/tableHeaders'


const WarehouseRegistration = props => {

    useEffect(() => {
        props.addRegistration()
    }, [props.registration.showDeleted, props.registration.filter_created_at, props.registration.page])

    return (
        <div className = 'contentTab'>
            <div className='row jc-sb'>
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
                        current_date={props.registration.filter_created_at}
                        // ivisible={!props.permissions.includes('see_moving_money_all_time')}
                    />
                    <Button
                        title='Применить'
                        className='blueButton'
                        onClick={() => props.addRegistration()}
                        // invisible={!props.permissions.includes('see_moving_money_all_time')}
                    />
                </div>
                <TableFields
                    id='registrationFields'
                    height='185px'
                    classNameMenu='listOption'
                    list={registrations_table_headers}
                    checked_list={props.registration.table_headers}
                    func={props.selectedRegistration}
                />
            </div>
            <TableRegistration/>
            {props.statusRegistrationEditor ? <RegistrationEditor/> : null}
        </div>
    )
}

const mapStateToProps = state => ({
    registration: state.registration,
    statusRegistrationEditor: state.view.statusRegistrationEditor
})

const mapDispatchToProps = {
    changeVisibleState,
    changeRegistrationState,
    addRegistration,
    selectedRegistration
}

export default connect(mapStateToProps, mapDispatchToProps)(WarehouseRegistration)