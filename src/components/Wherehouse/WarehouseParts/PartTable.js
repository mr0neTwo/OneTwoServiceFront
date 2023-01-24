import React from 'react'
import {connect} from 'react-redux'

import PartName from '../WarehouseRemains/cell/PartName'
import PartImag from '../WarehouseRemains/cell/PartImag'
import PartDoc from '../WarehouseRemains/cell/PartDoc'
import {changePartState, getPart} from '../../../Redux/actions/partAction'
import TableHeader from '../../general/TableHeader'


function PartTable(props) {


    const chooseCell = (header, part) => {

        switch (header.id) {
            case 1: return <PartName key={header.id} header={header} part={part}/>
            case 7: return <PartImag key={header.id} header={header} part={part}/>
            case 8: return <td key={header.id}>{part.warehouse_category.title}</td>
            case 9: return <PartDoc key={header.id} header={header} part={part}/>
            default: return <td key={header.id}>{part[header.field]}</td>
        }
    }

    return (
        <div className="tableWarehouseBox mt15">
            <table id='tableWarehouse'>
                <thead>
                    <tr>
                        {props.part.choosed_headers.map(header => (
                            <TableHeader
                                key={header.id}
                                header={header}
                                changeState={props.changePartState}
                                headers={props.part.choosed_headers}
                                // sort_field={props.part.sort_field}
                                // sort={props.part.sort}
                            />
                        ))}
                    </tr>
                </thead>
                <tbody>
                {props.part.parts.map(part => (
                        <tr
                            key={part.id}
                            className={part.deleted ? 'rowDeleted' : null}
                            onDoubleClick={() => props.getPart(part.id)}

                        >
                            {props.part.choosed_headers.map(header => chooseCell(header, part))}
                        </tr>
                    )
                )}
                </tbody>
            </table>
        </div>
    )
}

const mapStateToProps = state => ({
    part: state.part
})

const mapDispatchToProps = {
    getPart,
    changePartState
}


export default connect(mapStateToProps, mapDispatchToProps)(PartTable)