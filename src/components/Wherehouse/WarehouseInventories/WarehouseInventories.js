import React, {useEffect} from 'react'
import { connect } from 'react-redux'

import {addInventory, changeInventoryState, selectedInventory} from '../../../Redux/actions/actionInventory'
import {inventory_headers} from '../../../data/tableHeaders'

import Button from '../../general/Button'
import ChooseDate from '../../general/calandar/ChooseDate'
import TableFields from '../../general/TableFields'
import Paginate from '../../general/Paginate'
import InventoryTable from './InventoryTable'
import {changeVisibleState} from '../../../Redux/actions'



const WarehouseInventories = props => {

    useEffect(() => {
        props.addInventory()
    }, [props.inventory.filter_created_at, props.inventory.page])


    const handleNewInventory = () => {
        props.changeVisibleState({statusInventoryEditorPreview: true})
    }

    return (
        <div className = 'contentTab'>
            <div className='row jc-sb'>
                <div className='row'>
                    <Button
                        id='addInventory'
                        title='+ Инвентаризация'
                        className='greenButton h31'
                        onClick={handleNewInventory}
                        invisible={!props.permissions.includes('create_inventory')}
                    />
                    <ChooseDate
                        className='ml10 h27'
                        width='250px'
                        range={true}
                        func={date => props.changeInventoryState({filter_created_at: date.map(date => parseInt(date / 1000))})}
                        current_date={props.inventory.filter_created_at}
                    />
                </div>
                <TableFields
                    id='inventoryFields'
                    height='185px'
                    classNameMenu='listOption'
                    list={inventory_headers}
                    checked_list={props.inventory.table_headers}
                    func={props.selectedInventory}
                />
            </div>
            <InventoryTable/>
            <div className='row'>
                <Paginate
                    allItems={props.inventory.count}
                    onPage={50}
                    count={2}
                    count_start_end={2}
                    navigation={true}
                    func={page => props.changeInventoryState({page})}
                />
                <div className='ml10'>Всего - {props.inventory.count}</div>
            </div>
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