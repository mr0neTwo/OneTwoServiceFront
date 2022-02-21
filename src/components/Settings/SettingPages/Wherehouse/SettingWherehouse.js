import React, {useEffect} from 'react'
import { connect } from 'react-redux'

import Button from '../../../general/Button'
import TableWherehouse from './TableWherehouse'
import {addWarehouse} from "../../../../Redux/actions/warehouseAction"
import {setVisibleFlag} from "../../../../Redux/actions"
import WarehouseEditor from "./WarehouseEditor"

const SettingWherehouse = (props) => {

    useEffect(() => {
        props.addWarehouse()
    }, [])

  return (
    <div className='settingContent'>

      <div className='Header'>
        <span className='headerTitle'>Склады</span>
      </div>

      <div className='settingPageBody'>
        <h3>Склады товаров или запчастей</h3>
        <p>Перечень складов компании для хранения товаров. Склады могут принадлежать конкретной локации или всей компании.</p>
        <Button
          className='greenButton'
          title='+ Склад'
          onClick={() => props.setVisibleFlag('statusWarehouseEditor', true)}
        />
         {props.statusWarehouseEditor ? <WarehouseEditor/> : null}

        <TableWherehouse/>
      </div>
    </div>
  )
}
// yj
const mapStateToProps = state => ({
    statusWarehouseEditor: state.view.statusWarehouseEditor
})

const mapDispatchToProps = {
    addWarehouse,
    setVisibleFlag
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingWherehouse)