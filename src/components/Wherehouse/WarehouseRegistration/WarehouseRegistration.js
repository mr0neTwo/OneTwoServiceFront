import React, {useEffect} from 'react'
import { connect } from 'react-redux'

import ChooseDate from '../../general/calandar/ChooseDate'
import Button from '../../general/Button'

import {changeVisibleState} from '../../../Redux/actions'
import {addRegistration, changeRegistrationState, selectedRegistration} from '../../../Redux/actions/registrationAction'
import {registrations_table_headers} from '../../../data/tableHeaders'

import TableRegistration from './TableRegistration'
import TableFields from '../../general/TableFields'
import Paginate from '../../general/Paginate'


const WarehouseRegistration = props => {

    const handleNewRegistration = () => {
        props.changeVisibleState({statusRegistrationEditor: true})
    }

    useEffect(() => {
        props.addRegistration()
    }, [props.registration.showDeleted, props.registration.filter_created_at, props.registration.page])

    return (
        <>
            <div className='row jc-sb mt15'>
                <div className='row'>
                    <Button
                        id='newRegistration'
                        title='+ Оприходование'
                        className='greenButton h31'
                        onClick={handleNewRegistration}
                        invisible={!props.permissions.includes('create_registrations')}
                    />
                    <ChooseDate
                        className='ml10 h27'
                        width='250px'
                        range={true}
                        func={date => props.changeRegistrationState({filter_created_at: date.map(date => parseInt(date / 1000))})}
                        current_date={props.registration.filter_created_at}
                        invisible={!props.permissions.includes('see_registrations')}
                    />
                </div>
                <TableFields
                    id='registrationFields'
                    height='185px'
                    classNameMenu='listOption'
                    list={registrations_table_headers}
                    checked_list={props.registration.table_headers}
                    func={props.selectedRegistration}
                    invisible={!props.permissions.includes('see_registrations')}
                />
            </div>
            <TableRegistration/>
            <div className='row'>
                <Paginate
                    allItems={props.registration.registrations_count}
                    onPage={50}
                    count={2}
                    count_start_end={2}
                    navigation={true}
                    func={page => changeRegistrationState({page})}
                />
                <div className='ml10'>Всего - {props.registration.registrations_count}</div>
            </div>
        </>
    )
}

const mapStateToProps = state => ({
    registration: state.registration,
    statusRegistrationEditor: state.view.statusRegistrationEditor,
    permissions: state.data.user.role.permissions
})

const mapDispatchToProps = {
    changeVisibleState,
    changeRegistrationState,
    addRegistration,
    selectedRegistration
}

export default connect(mapStateToProps, mapDispatchToProps)(WarehouseRegistration)