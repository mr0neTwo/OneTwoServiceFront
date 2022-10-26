import React from 'react'
import { connect } from 'react-redux'
import {showDate, showName} from '../../general/utils'

import {changeRegistrationState, editRegistration} from '../../../Redux/actions/registrationAction'
import {changeVisibleState} from '../../../Redux/actions'

import TableHeader from '../../general/TableHeader'

const TableRegistration = (props) => {

    const handleEdit = (registration) => {
        props.editRegistration(registration)
        props.changeVisibleState({statusRegistrationEditor: true})
    }

    const chooseCell = (header, registration) => {
        switch (header.id) {

            case 3: return (
                <td key={header.id}>
                   <div>{showName(registration.employee)}</div>
                    <div className="orderDate">{showDate(registration.custom_created_at)}</div>
                </td>
            )
            case 5: return <td key={header.id}>{registration.client.name}</td>
            case 6: return <td key={header.id}>{registration.warehouse.title}</td>

            default: return <td key={header.id}>{registration[header.field]}</td>
        }
    }

    return (
        <table id="tableOrders">
            <thead className="tableThead">
                <tr>
                    {props.registration.table_headers.map(header => (
                        <TableHeader
                            key={header.id}
                            header={header}
                            changeState={props.changeRegistrationState}
                            headers={props.registration.table_headers}
                        />
                    ))}
                </tr>
            </thead>
            <tbody>
                {props.registration.registrations.map(registration => (
                    <tr
                        key={registration.id}
                        onDoubleClick={() => handleEdit(registration)}
                    >
                        {props.registration.table_headers.map(header => chooseCell(header, registration))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

const mapStateToProps = state => ({
    registration: state.registration
})

const mapDispatchToProps = {
    editRegistration,
    changeVisibleState,
    changeRegistrationState
}

export default connect(mapStateToProps, mapDispatchToProps)(TableRegistration)