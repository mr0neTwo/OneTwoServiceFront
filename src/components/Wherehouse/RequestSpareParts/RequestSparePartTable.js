import React, {useMemo} from 'react'
import {connect} from 'react-redux'

import {changeReqSparePartState, changeStatus, getReqSparePart} from '../../../Redux/actions/requestSparePartsAction'

import TableHeader from '../../general/TableHeader'
import SparePart from '../../general/cell/SparePart'
import Client from '../../general/cell/Client'
import Label from "../../general/cell/Label"
import CreatedAt from "../../general/cell/CreateAt"
import EstimatedDoneAt from "../../general/cell/EstimatedDoneAt"
import SetStatus from "../../general/SetStatus"
import Balance from "../../general/cell/Balance"
import Data from "../../general/cell/Data"

const RequestSparePartTable = (props) => {

    const listOfGroup = useMemo(() => props.status_group.filter(group => [13, 14, 15, 16, 17, 18].indexOf(group.type_group) !== -1),
        [props.status_group]) // группы статусов запросов запчастей

    const chooseCell = (header, reqsp) => {

        if (!header.visible) return null

        switch (header.id) {

            case 1:
                return (
                    <Label
                        key={header.id}
                        label={reqsp.label}
                        func={() => props.getReqSparePart(reqsp.id)}
                    />
                )

            case 2:
                return (
                    <CreatedAt
                        key={header.id}
                        creator={reqsp.created_by.name}
                        date={reqsp.created_at}
                    />
                )

            case 3:
                return (
                    <EstimatedDoneAt
                        key={header.id}
                        estimatedDoneAt={reqsp.estimated_come_at}
                        statusGroupId={reqsp.status.group}
                        listStatusGroup={[13, 14, 15]}
                    />
                )

            case 4:
                return (
                    <SparePart
                        key={header.id}
                        title={reqsp.part.title}
                        description={reqsp.part.description}
                    />
                )
            case 5:
                return (
                <td key={header.id}>
                    <SetStatus
                        id={reqsp.id * reqsp.status.id}
                        status={reqsp.status}
                        listOfGroups={listOfGroup}
                        changeStatus = {status => props.changeStatus(status.id, reqsp.id)}
                    />
                </td>
            )
            case 7:return <Balance key={header.id} balance={reqsp.amount * reqsp.cost + reqsp.delivery_cost}/>
            case 9: return <Data key={header.id} data={reqsp.executor.name}/>
            case 10: return <Client key={header.id} client={reqsp.client}/>
            case 11: return <Client key={header.id} client={reqsp.supplier}/>
            case 12: return <Data key={header.id} data={reqsp.order.id_label}/>
            default: return <Data key={header.id} data={reqsp[header.field]}/>
        }
    }

    const handleEdit = (reqsp) => {
        props.getReqSparePart(reqsp.id)
    }
    const table_headers = props.reqsp.table_headers.filter(header => props.permissions.includes('see_buy_cost') || header.id !== 6)

    return (
        <div className='table-orders-container'>
            <table>
                <thead>
                <tr>
                    {table_headers.map(header => (
                        <TableHeader
                            key={header.id}
                            header={header}
                            changeState={props.changeReqSparePartState}
                            headers={props.reqsp.table_headers}
                            // sort_field={props.back.sort_field}
                            // sort={props.back.sort}
                        />
                    ))}
                </tr>
                </thead>
                <tbody>
                {props.reqsp.request_spare_parts.map(reqsp => (
                    <tr
                        key={reqsp.id}
                        onDoubleClick={() => handleEdit(reqsp)}
                    >
                        {table_headers.map(header => chooseCell(header, reqsp))}
                    </tr>
                ))}
                </tbody>
            </table>

        </div>
    )
}

const mapStateToProps = state => ({
    reqsp: state.reqsp,
    permissions: state.data.user.role.permissions,
    status_group: state.data.status_group

})

const mapDispatchToProps = {
    changeReqSparePartState,
    getReqSparePart,
    changeStatus
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestSparePartTable)