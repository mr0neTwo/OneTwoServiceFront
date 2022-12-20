import React from 'react'
import {connect} from 'react-redux'

import {changeReqSparePartState, getReqSparePart} from '../../../Redux/actions/requestSparePartsAction'

import TableHeader from '../../general/TableHeader'
import Label from './cell/Label'
import CreatedAt from './cell/CreatedAt'
import EstimatedComeAt from './cell/EstimatedComeAt'
import Status from './cell/Status'
import Executor from './cell/Executor'
import Client from './cell/Client'
import Order from './cell/Order'
import Price from './cell/Price'
import SparePart from './cell/SparePart'

const RequestSparePartTable = (props) => {

    const chooseCell = (header, reqsp) => {

        switch (header.id) {
            case 1: return <Label key={header.id} reqsp={reqsp} getReqSparePart={props.getReqSparePart}/>
            case 2: return <CreatedAt key={header.id} reqsp={reqsp}/>
            case 3: return <EstimatedComeAt key={header.id} reqsp={reqsp} request_spare_part_id={reqsp.id}/>
            case 4: return <SparePart key={header.id} reqsp={reqsp}/>
            case 5: return <td key={header.id}><Status status={reqsp.status} request_spare_part_id={reqsp.id}/></td>
            case 7: return <Price key={header.id} reqsp={reqsp}/>
            case 9: return <Executor key={header.id} reqsp={reqsp}/>
            case 10: return <Client key={header.id} client={reqsp.client}/>
            case 11: return <Client key={header.id} client={reqsp.supplier}/>
            case 12: return <Order key={header.id} reqsp={reqsp}/>
            default: return <td key={header.id}>{reqsp[header.field]}</td>
        }
    }

    const handleEdit = (reqsp) => {
        props.getReqSparePart(reqsp.id)
    }
    const table_headers = props.reqsp.table_headers.filter(header => props.permissions.includes('see_buy_cost') || header.id !== 6)

    return (
        <div className='tableOrdersBox mt15'>
            <table id='tableWarehouse'>
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
    permissions: state.data.user.role.permissions
})

const mapDispatchToProps = {
    changeReqSparePartState,
    getReqSparePart
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestSparePartTable)