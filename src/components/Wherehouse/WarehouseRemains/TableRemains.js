import React from 'react'
import {connect} from 'react-redux'

import {changeRemainState} from '../../../Redux/actions/remainAction'

import TableHeader from '../../general/TableHeader'
import Imag from '../../general/cell/Imag'
import Doc from '../../general/cell/Doc'
import PartCount from '../../general/cell/PartCount'
import {getPart} from '../../../Redux/actions/partAction'
import {checkObject} from '../../general/utils'
import Data from '../../general/cell/Data'
import Label from '../../general/cell/Label'

const TableRemains = (props) => {

    const chooseCell = (header, remain) => {

        if (!header.visible) return null

        if (header.id > 14) return <Data key={header.id} data={remain[header.field] || 0}/>

        switch (header.id) {
            case 1: return <Label key={header.id} label={remain.title} func={() => props.getPart(remain.part_id)}/>
            case 7: return <Imag key={header.id} image_url={remain.image_url} title={remain.title} />
            case 8: return <Doc key={header.id} doc_url={props.doc_url}/>
            case 9: return <PartCount key={header.id} min_residue={remain.min_residue} count={remain.count}/>
            default: return <Data key={header.id} data={remain[header.field]} />
        }
    }

    if (!checkObject(props.remain.filter_warehouse)) return <div className='empty_table'>Выберите склад</div>

    if (!props.remain.warehouse_remains.length) return <div className='empty_table'>Запчастей не найдено</div>

    return (
        <div className="table-orders-container">
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