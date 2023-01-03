import React from 'react'
import {connect} from 'react-redux'
import {useHistory} from 'react-router-dom'

import {changeRemainState} from '../../../Redux/actions/remainAction'

import TableHeader from '../../general/TableHeader'
import PartName from './cell/PartName'
import PartPrice from './cell/PartPrice'
import PartImag from './cell/PartImag'
import PartDoc from './cell/PartDoc'
import PartCount from './cell/PartCount'
import {getPart} from '../../../Redux/actions/partAction'

const TableRemains = (props) => {

    const chooseCell = (header, remain) => {

        if (header.id > 14) return <PartPrice key={header.id}  header={header} remain={remain}/>

        switch (header.id) {
            case 1: return <PartName key={header.id} header={header} remain={remain}/>
            case 7: return <PartImag key={header.id} header={header} remain={remain}/>
            case 8: return <PartDoc key={header.id} header={header} remain={remain}/>
            case 9: return <PartCount key={header.id} header={header} remain={remain}/>
            default: return <td key={header.id}>{remain[header.field]}</td>
        }
    }

    return (
        <div className="tableOrdersBox mt15">
            <table id="tableWarehouse">
                <thead className="tableThead">
                    <tr>
                        {props.remain.table_headers.map(header => (
                            <TableHeader
                                key={header.id}
                                header={header}
                                changeState={props.changeRemainState}
                                headers={props.remain.table_headers}
                                sort_field={props.remain.sort_field}
                                sort={props.remain.sort}
                            />
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {props.remain.warehouse_remains.map((remain, idx) => (
                        <tr
                            key={idx}
                            onDoubleClick={() => props.getPart(remain.part_id)}
                        >
                            {props.remain.table_headers.map(header => chooseCell(header, remain))}
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}

const mapStateToProps = state => ({
    remain: state.remain,
    part_prices: state.price.part_prices
})

const mapDispatchToProps = {
    changeRemainState,
    getPart
}

export default connect(mapStateToProps, mapDispatchToProps)(TableRemains)