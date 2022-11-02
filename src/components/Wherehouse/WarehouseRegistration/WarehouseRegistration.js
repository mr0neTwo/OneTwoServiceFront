import React, {useEffect} from 'react'
import { connect } from 'react-redux'

import ChooseDate from '../../general/calandar/ChooseDate'
import Button from '../../general/Button'

import {changeVisibleState} from '../../../Redux/actions'
import {addRegistration, changeRegistrationState, selectedRegistration} from '../../../Redux/actions/registrationAction'
import {registrations_table_headers} from '../../../data/tableHeaders'

import TableRegistration from './TableRegistration'
import TableFields from '../../general/TableFields'


const WarehouseRegistration = props => {

    const handleNewRegistration = () => {
        props.changeVisibleState({statusRegistrationEditor: true})
    }

    useEffect(() => {
        props.addRegistration()
    }, [props.registration.showDeleted, props.registration.filter_created_at, props.registration.page])

    return (
        <div className = 'contentTab'>
            <div className='row jc-sb'>
                <div className='row'>
                    <Button
                        id='newRegistration'
                        title='+ Оприходование'
                        className='greenButton h31'
                        onClick={handleNewRegistration}
                    />
                    <ChooseDate
                        className='ml10 h27'
                        width='250px'
                        range={true}
                        func={date => props.changeRegistrationState({filter_created_at: date.map(date => parseInt(date / 1000))})}
                        current_date={props.registration.filter_created_at}
                    />
                    <Button
                        title='Применить'
                        className='blueButton'
                        onClick={() => props.addRegistration()}
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