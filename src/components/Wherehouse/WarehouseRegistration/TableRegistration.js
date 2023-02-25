import React from 'react'
import {connect} from 'react-redux'

import {changeRegistrationState, getRegistration} from '../../../Redux/actions/registrationAction'
import {changeVisibleState} from '../../../Redux/actions'

import TableHeader from '../../general/TableHeader'
import Label from "../../general/cell/Label";
import CreateAt from "../../general/cell/CreateAt";
import Client from "../../general/cell/Client";
import IconTitle from "../../general/cell/IconTitle";
import Balance from "../../general/cell/Balance";
import Data from "../../general/cell/Data";

const TableRegistration = (props) => {


    const chooseCell = (header, registration) => {
        switch (header.id) {

            case 1:
                return (
                    <Label
                        key={header.id}
                        func={() => props.getRegistration(registration.id)}
                        label={registration.label}
                    />
                )
            case 3:
                return (
                    <CreateAt
                        key={header.id}
                        creator={registration.employee.name}
                        date={registration.custom_created_at}
                    />
                )
            case 5:
                return (
                    <Client
                        key={header.id}
                        client={registration.client}
                    />
                )
            case 6:
                return (
                    <IconTitle
                        key={header.id}
                        title={registration.warehouse.title}
                        icon={registration.warehouse.branch.icon}
                        color={registration.warehouse.branch.color}
                    />
                )
            case 7:
                return <Balance key={header.id} balance={registration.price}/>

            default:
                return <Data key={header.id} data={registration[header.field]}/>
        }
    }

    if (!props.permissions.includes('see_registrations')) return <div/>

    const table_headers = props.registration.table_headers.filter(header => props.permissions.includes('see_buy_cost') || header.id !== 7)

    return (
            <table>
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