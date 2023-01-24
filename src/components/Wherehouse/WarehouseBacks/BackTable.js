import React from 'react'
import {connect} from 'react-redux'

import {changeBackState, getBack} from '../../../Redux/actions/warehouseBackActions'

import Label from './cell/Label'
import CreatedAt from './cell/CreatedAt'
import Warehouse from './cell/Warehouse'
import DocRegistration from './cell/DocRegistration'
import Client from './cell/Client'
import TableHeader from '../../general/TableHeader'

const BackTable = (props) => {

    const chooseCell = (header, back) => {

        switch (header.id) {
            case 1: return <Label key={header.id} back={back} getBack={props.getBack}/>
            case 2: return <CreatedAt key={header.id} back={back}/>
            case 3: return <Warehouse key={header.id} back={back}/>
            case 4: return <Client key={header.id} back={back}/>
            case 5: return <DocRegistration key={header.id} back={back}/>
            default: return <td key={header.id}>{back[header.field]}</td>
        }
    }

    const handleEdit = (back) => {
        props.getBack(back.id)
    }

    return (
        <div className='tableOrdersBox mt15'>
            <table id='tableWarehouse'>
                <thead>
                <tr>
                    {props.back.table_headers.map(header => (
                        <TableHeader
                            key={header.id}
                            header={header}
                            changeState={props.changeBackState}
                            headers={props.back.table_headers}
                            // sort_field={props.back.sort_field}
                            // sort={props.back.sort}
                        />
                    ))}
                </tr>
                </thead>
                <tbody>
                {props.back.warehouse_backs.map(back => (
                    <tr
                        key={back.id}
                        onDoubleClick={() => handleEdit(back)}
                    >
                        {props.back.table_headers.map(header => chooseCell(header, back))}
                    </tr>
                ))}
                </tbody>
            </table>

        </div>
    )
}

const mapStateToProps = state => ({
    back: state.back,
    view: state.view
})

const mapDispatchToProps = {
    changeBackState,
    getBack
}

export default connect(mapStateToProps, mapDispatchToProps)(BackTable)