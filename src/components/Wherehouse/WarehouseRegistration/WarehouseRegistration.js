import React, {useEffect} from 'react'
import {connect} from 'react-redux'

import ChooseDate from '../../general/calandar/ChooseDate'
import Button from '../../general/Button'

import {changeVisibleState} from '../../../Redux/actions'
import {addRegistration, changeRegistrationState, selectedRegistration} from '../../../Redux/actions/registrationAction'

import TableRegistration from './TableRegistration'
import TableFields from '../../general/TableFields'
import Paginate from '../../general/Paginate'
import {Modal} from "../../../data/data";


const WarehouseRegistration = props => {

    const handleNewRegistration = () => {
        props.changeVisibleState({
            isRightModalOpen: true,
            modalType: Modal.Type.REGISTRATION
        })
    }

    useEffect(() => {
        props.addRegistration()
    }, [props.registration.showDeleted, props.registration.filter_created_at, props.registration.page])

    return (
        <div className='box'>
            <div className='page-buttons'>
                <div className='two-buttons'>
                    <Button
                        id='RegistrationEditor'
                        size='med'
                        type='create'
                        title='Оприходование'
                        onClick={handleNewRegistration}
                        invisible={!props.permissions.includes('create_registrations')}
                    />
                    <ChooseDate
                        title='Диапазон дат'
                        func={date => props.changeRegistrationState({filter_created_at: date.map(date => parseInt(date / 1000))})}
                        current_date={props.registration.filter_created_at}
                        invisible={!props.permissions.includes('see_registrations')}
                        range={true}
                    />
                </div>
                <TableFields
                    id='registration'
                    list={props.registration.table_headers}
                    func={table_headers => props.changeRegistrationState({table_headers})}
                    invisible={!props.permissions.includes('see_registrations')}
                />
            </div>
            <TableRegistration/>
            <Paginate
                allItems={props.registration.registrations_count}
                onPage={50}
                count={2}
                count_start_end={2}
                navigation={true}
                func={page => changeRegistrationState({page})}
            />
        </div>
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