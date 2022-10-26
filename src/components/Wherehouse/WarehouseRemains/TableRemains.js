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

const TableRemains = (props) => {

    const history = useHistory()

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

    const handleEdit = (remain) => {
        history.push({
            pathname: `/warehouse/part${remain.part_id}`,
            state: {remain, prevPath: history.location.pathname}
        })
    }

    return (
        <div className="tableOrdersBox">
            <table className='mt15'>
                <thead>
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
                            onDoubleClick={() => handleEdit(remain)}
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
    changeRemainState
}

export default connect(mapStateToProps, mapDispatchToProps)(TableRemains)