import React, {useEffect} from 'react'
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
    
  return (
      <div className='pageContent'>

          <div className='Header'>
              <span className='headerTitle'>Склады</span>
          </div>
          <div className='settingPageBody'>
          </div>

          <Tabs
              list={ ['Остатки', 'Оприходования', 'Списания', 'Пермещения', 'Инвентаризации', 'Возвраты поставщику', 'Товары и категории'] }
              func={idx => props.changeWarehouseForm(idx, 'tabs')}
              tab={props.tabs}
          />
          {props.tabs === 0 ? <WarehouseRemains/> : null}
          {props.tabs === 1 ? <WarehouseRegistration/> : null}
          {props.tabs === 2 ? <WarehouseWriteOf/> : null}
          {props.tabs === 3 ? <WarehouseMoves/> : null}
          {props.tabs === 4 ? <WarehouseInventories/> : null}
          {props.tabs === 5 ? <WarehouseBacks/> : null}
          {props.tabs === 6 ? <WarehouseParts/> : null}

      </div>
  )
}

const mapStateToProps = state => ({
    tabs: state.warehouse.tabs,
    showDeleted: state.warehouse.showDeleted
})

const mapDispatchToProps = {
    changeWarehouseForm,
    addWarehouse
}

export default connect(mapStateToProps, mapDispatchToProps)(Warehouse)
