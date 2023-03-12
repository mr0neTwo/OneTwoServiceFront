import React from 'react'
import { connect } from 'react-redux'

import {changeInventoryState, getInventory} from '../../../Redux/actions/actionInventory'

import TableHeader from '../../general/TableHeader'
import Label from "../../general/cell/Label";
import IconTitle from "../../general/cell/IconTitle";
import CreatedAt from "../../general/cell/CreateAt";
import Data from "../../general/cell/Data";



const InventoryTable = props => {

    const chooseCell = (header, inventory) => {

        if (!header.visible) return null

        switch (header.id) {
            case 1: return (
                <Label
                    key={header.id}
                    label={inventory.label}
                    func={() => props.getInventory(inventory.id)}
                />
            )
            case 2: return (
                <CreatedAt
                    key={header.id}
                    creator={inventory.created_by.name}
                    date={inventory.created_at}
                />
            )
            case 3: return (
                <IconTitle
                    key={header.id}
                    title={inventory.warehouse.title}
                    icon={inventory.warehouse.branch.icon}
                    color={inventory.warehouse.branch.color}
                />
            )
            case 4: return (
                <Data
                    key={header.id}
                    data={inventory.warehouse_category.title}
                />
            )
            default: return <Data key={header.id} data={inventory[header.field]}/>
        }
    }

    const handleEdit = (inventory) => {
        props.getInventory(inventory.id)
    }


    return (
            <table>
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