import React, {useEffect, useMemo} from 'react'
import { connect } from 'react-redux'

import {addWarehouse, changeWarehouseForm} from '../../Redux/actions/warehouseAction'

import Tabs from '../general/Tabs'
import WarehouseParts from './WarehouseParts/WarehouseParts';
import WarehouseRegistration from './WarehouseRegistration/WarehouseRegistration';
import WarehouseWriteOf from './WarehouseWriteOf/WarehouseWriteOf';
import WarehouseMoves from './WarehouseMoves/WarehouseMoves';
import WarehouseInventories from './WarehouseInventories/WarehouseInventories';
import WarehouseRemains from './WarehouseRemains/WarehouseRemains';
import WarehouseBacks from './WarehouseBacks/WarehouseBacks';


const Warehouse = (props) => {

    useEffect(() => {
        props.addWarehouse()
    }, [props.showDeleted])

    const tabs = useMemo(() => {
        let current_tabs = []
        if (props.permissions.includes('see_remaining_warehouse')) {
            current_tabs.push((<WarehouseRemains/>))
        }
        if (props.permissions.includes('see_registrations') || props.permissions.includes('create_registrations')) {
            current_tabs.push((<WarehouseRegistration/>))
        }
        if (props.permissions.includes('write_of_warehouse')) {
            current_tabs.push((<WarehouseWriteOf/>))
        }
        current_tabs = current_tabs.concat([(<WarehouseMoves/>), (<WarehouseInventories/>), (<WarehouseBacks/>), (<WarehouseParts/>)])
        return current_tabs
    }, [props.permissions])

    const list = useMemo(() => {
        let current_list = []
        if (props.permissions.includes('see_remaining_warehouse')) {
            current_list.push('Остатки')
        }
        if (props.permissions.includes('see_registrations') || props.permissions.includes('create_registrations')) {
            current_list.push('Оприходования')
        }
        if (props.permissions.includes('write_of_warehouse')) {
            current_list.push('Списания')
        }
        current_list = current_list.concat(['Пермещения', 'Инвентаризации', 'Возвраты поставщику', 'Товары и категории'])
        return current_list
    }, [props.permissions])


    
  return (
      <div className='pageContent'>

          <div className='Header'>
              <span className='headerTitle'>Склады</span>
          </div>

          <Tabs
              className='mt15'
              list={list}
              func={idx => props.changeWarehouseForm(idx, 'tabs')}
              tab={props.tabs}
          />
          {tabs[props.tabs]}


      </div>
  )
}

const mapStateToProps = state => ({
    tabs: state.warehouse.tabs,
    showDeleted: state.warehouse.showDeleted,
    permissions: state.data.user.role.permissions
})

const mapDispatchToProps = {
    changeWarehouseForm,
    addWarehouse
}

export default connect(mapStateToProps, mapDispatchToProps)(Warehouse)
