import React, {useEffect} from 'react'
import {connect} from 'react-redux'

import {addInventory, changeInventoryState, selectedInventory} from '../../../Redux/actions/actionInventory'

import Button from '../../general/Button'
import ChooseDate from '../../general/calandar/ChooseDate'
import TableFields from '../../general/TableFields'
import Paginate from '../../general/Paginate'
import InventoryTable from './InventoryTable'
import {changeVisibleState} from '../../../Redux/actions'
import {Modal} from "../../../data/data";


const WarehouseInventories = props => {

    useEffect(() => {
        props.addInventory()
    }, [props.inventory.filter_created_at, props.inventory.page])


    const handleNewInventory = () => {
        props.changeVisibleState({isCentralModalOpen: true, modalCentralType: Modal.Type.INVENTORY_PREVIEW})
    }

    return (
        <div className='box'>
            <div className='page-buttons'>
                <div className='two-buttons'>
                    <Button
                        id='InventoryEditorPreview'
                        size='med'
                        type='create'
                        title='Инвентаризация'
                        onClick={handleNewInventory}
                        invisible={!props.permissions.includes('create_inventory')}
                    />
                    <ChooseDate
                        title='Диапазон дат'
                        func={date => props.changeInventoryState({filter_created_at: date.map(date => parseInt(date / 1000))})}
                        current_date={props.inventory.filter_created_at}
                        range={true}
                    />
                </div>
                <TableFields
                    id='inventory'
                    list={props.inventory.table_headers}
                    func={table_headers => props.changeInventoryState({table_headers})}
                />
            </div>
            <InventoryTable/>
            <Paginate
                allItems={props.inventory.count}
                onPage={50}
                count={2}
                count_start_end={2}
                navigation={true}
                func={page => props.changeInventoryState({page})}
            />
        </div>
    )
}

const mapStateToProps = state => ({
    inventory: state.inventory,
    permissions: state.data.user.role.permissions
})

const mapDispatchToProps = {
    addInventory,
    changeInventoryState,
    selectedInventory,
    changeVisibleState
}

export default connect(mapStateToProps, mapDispatchToProps)(WarehouseInventories)