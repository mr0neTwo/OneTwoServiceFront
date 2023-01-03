import React from 'react'
import { connect } from 'react-redux'

import {showDate, showName} from '../../general/utils'
import {changeRegistrationState, getRegistration} from '../../../Redux/actions/registrationAction'
import {changeVisibleState} from '../../../Redux/actions'

import TableHeader from '../../general/TableHeader'

const TableRegistration = (props) => {


    const chooseCell = (header, registration) => {
        switch (header.id) {

            case 1: return <td key={header.id}>
                <span
                    className='link'
                    onClick={() => props.getRegistration(registration.id)}
                >
                    {registration.label}
                </span>
            </td>
            case 3: return (
                <td key={header.id}>
                   <div>{showName(registration.employee)}</div>
                    <div className="orderDate">{showDate(registration.custom_created_at)}</div>
                </td>
            )
            case 5: return <td key={header.id}>{registration.client.name}</td>
            case 6: return <td key={header.id}>{registration.warehouse.title}</td>
            case 7: return <td key={header.id}>{registration.price.toFixed(2) || 0}</td>

            default: return <td key={header.id}>{registration[header.field]}</td>
        }
    }

    if (!props.permissions.includes('see_registrations')) return <div/>

    const table_headers = props.registration.table_headers.filter(header => props.permissions.includes('see_buy_cost') || header.id !== 7)

    return (
        <div className='tableOrdersBox mt15'>
            <table id="tableWarehouse">
                <thead className="tableThead">
                    <tr>
                        {table_headers.map(header => (
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
                            onDoubleClick={() => props.getRegistration(registration.id)}
                        >
                            {table_headers.map(header => chooseCell(header, registration))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

const mapStateToProps = state => ({
    registration: state.registration,
    permissions: state.data.user.role.permissions
})

const mapDispatchToProps = {
    getRegistration,
    changeVisibleState,
    changeRegistrationState
}

export default connect(mapStateToProps, mapDispatchToProps)(TableRegistration)