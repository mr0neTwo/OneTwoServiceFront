import React, {useEffect, useMemo} from 'react'
import {connect} from 'react-redux'

import {addWarehouse, changeWarehouseState} from '../../Redux/actions/warehouseAction'

import Tabs from '../general/Tabs'
import WarehouseParts from './WarehouseParts/WarehouseParts';
import WarehouseRegistration from './WarehouseRegistration/WarehouseRegistration';
import WarehouseWriteOf from './WarehouseWriteOf/WarehouseWriteOf';
import WarehouseMoves from './WarehouseMovement/WarehouseMovement';
import WarehouseInventories from './WarehouseInventories/WarehouseInventories';
import WarehouseRemains from './WarehouseRemains/WarehouseRemains';
import WarehouseBacks from './WarehouseBacks/WarehouseBacks';
import RequestSpareParts from './RequestSpareParts/RequestSpareParts'
import Header from '../Header/Header'
import Search from './Search'
import {changeRemainState} from '../../Redux/actions/remainAction'


const Warehouse = (props) => {

    useEffect(() => {
        props.addWarehouse()
    }, [props.showDeleted])

    const tabs = useMemo(() => {
        let current_tabs = []
        if (props.permissions.includes('see_remaining_warehouse')) {
            current_tabs.push((<WarehouseRemains/>))
        }
        if (props.permissions.includes('see_request_spare_parts')) {
            current_tabs.push((<RequestSpareParts/>))
        }
        if (props.permissions.includes('see_registrations') || props.permissions.includes('create_registrations')) {
            current_tabs.push((<WarehouseRegistration/>))
        }
        if (props.permissions.includes('write_of_warehouse')) {
            current_tabs.push((<WarehouseWriteOf/>))
        }
        if (props.permissions.includes('see_move_warehouse')) {
            current_tabs.push((<WarehouseMoves/>))
        }
        if (props.permissions.includes('see_inventory')) {
            current_tabs.push((<WarehouseInventories/>))
        }
        if (props.permissions.includes('see_refund_to_supplier')) {
            current_tabs.push((<WarehouseBacks/>))
        }
        current_tabs.push((<WarehouseParts/>))
        return current_tabs
    }, [props.permissions])

    const list = useMemo(() => {
        let current_list = []
        if (props.permissions.includes('see_remaining_warehouse')) {
            current_list.push('??????????????')
        }
        if (props.permissions.includes('see_request_spare_parts')) {
            current_list.push('?????????????? ??????????????????')
        }
        if (props.permissions.includes('see_registrations') || props.permissions.includes('create_registrations')) {
            current_list.push('??????????????????????????')
        }
        if (props.permissions.includes('write_of_warehouse')) {
            current_list.push('????????????????')
        }
        if (props.permissions.includes('see_move_warehouse')) {
            current_list.push('????????????????????')
        }
        if (props.permissions.includes('see_inventory')) {
            current_list.push('????????????????????????????')
        }
        if (props.permissions.includes('see_refund_to_supplier')) {
            current_list.push('???????????????? ????????????????????')
        }
        current_list.push('???????????? ?? ??????????????????')
        return current_list
    }, [props.permissions])

    const getSearch = (tab) => {
        switch (tab) {
            case 0:
                return <Search func={search => props.changeRemainState({filter_title: search})}/>
            default: return null
        }
    }



    return (
        <div className='main-content'>
            <Header
                title='????????????'
                search={getSearch(props.tabs)}
            />
            <div className='content-container'>
                <Tabs
                    list={list}
                    func={idx => props.changeWarehouseState({tabs: idx})}
                    tab={props.tabs}
                />
                {tabs[props.tabs]}
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    tabs: state.warehouse.tabs,
    showDeleted: state.warehouse.showDeleted,
    permissions: state.data.user.role.permissions
})

const mapDispatchToProps = {
    changeWarehouseState,
    addWarehouse,
    changeRemainState
}

export default connect(mapStateToProps, mapDispatchToProps)(Warehouse)
