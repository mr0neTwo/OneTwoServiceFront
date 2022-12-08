import React from 'react'
import { connect } from 'react-redux'

import {changeInventoryState, getInventory} from '../../../Redux/actions/actionInventory'

import TableHeader from '../../general/TableHeader'
import Label from './cell/Label'
import CreatedAt from './cell/CreatedAt'
import Warehouse from './cell/Warehouse'
import Category from './cell/Category'



const InventoryTable = props => {

    const chooseCell = (header, inventory) => {

        switch (header.id) {
            case 1: return <Label key={header.id} inventory={inventory} getInventory={props.getInventory}/>
            case 2: return <CreatedAt key={header.id} inventory={inventory}/>
            case 3: return <Warehouse key={header.id} inventory={inventory}/>
            case 4: return <Category key={header.id} inventory={inventory}/>
            default: return <td key={header.id}>{inventory[header.field]}</td>
        }
    }

    const handleEdit = (inventory) => {
        props.getInventory(inventory.id)
    }


    return (
        <div className='tableOrdersBox mt15'>
            <table className='tableWarehouse'>
                <thead>
                <tr>
                    {props.inventory.table_headers.map(header => (
                        <TableHeader
                            key={header.id}
                            header={header}
                            changeState={props.changeInventoryState}
                            headers={props.inventory.table_headers}
                            // sort_field={props.back.sort_field}
                            // sort={props.back.sort}
                        />
                    ))}
                </tr>
                </thead>
                <tbody>
                {props.inventory.warehouse_inventories.map(inventory => (
                    <tr
                        key={inventory.id}
                        onDoubleClick={() => handleEdit(inventory)}
                    >
                        {props.inventory.table_headers.map(header => chooseCell(header, inventory))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

const mapStateToProps = state => ({
    inventory: state.inventory
})

const mapDispatchToProps = {
    changeInventoryState,
    getInventory
}

export default connect(mapStateToProps, mapDispatchToProps)(InventoryTable)