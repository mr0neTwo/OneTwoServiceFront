import React from 'react'
import { connect } from 'react-redux'

import Button from '../../../general/Button'
import TableWherehouse from './TableWherehouse'

const SettingWherehouse = (props) => {
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
          onClick={() => props.setVisibleFlag('statusWherehouseEditor', true)}
        />
        {/* {props.statusCreateNewRole ? <RoleEditor/> : null} */}

        <TableWherehouse/>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(SettingWherehouse)