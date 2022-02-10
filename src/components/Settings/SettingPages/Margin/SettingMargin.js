import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import TablePrice from './TablePrice'
import { addDiscountMargin, setVisibleFlag, changePriceForm } from '../../../../Redux/actions'
import PriceEditor from './PriceEditor'
import Checkbox from '../../../general/Checkbox'
import Button from '../../../general/Button'

const SettingMargin = (props) => {

  useEffect(() => {
    props.addDiscountMargin()
  }, [])

  const [showDeletedGood, setShowDeletedGood] = useState(false)
  const [showDeletedServ, setShowDeletedServ] = useState(false)

  return (
    <div className='settingContent'>

      <div className='Header'>
        <span className='headerTitle'>Цены и скидки</span>
      </div>

      <div className='settingPageBody'>

      <h3>Цены на товары</h3>
      <p>Настройка цен на товары.</p>

      <div className='row'>
        <Button
          className='greenButton'
          title='+ Цена'
          onClick={() => {
            props.setVisibleFlag('statusPriceEditor', true)
            props.changePriceForm(2, 'margin_type')
          }}
          unvisible={!props.permissions.includes('setting_create_price')}
        />
        <Checkbox
          label='Показать удаленных'
          onChange={event => setShowDeletedGood(event.target.checked)}
          checked={showDeletedGood}
          unvisible={!props.permissions.includes('setting_price_show_deleted')}
        />
      </div>
      {props.statusPriceEditor ? <PriceEditor/> : null}

      <TablePrice type={2} showDeleted={showDeletedGood}/>

      <h3>Цены на работы</h3>
      <p>Настройка цен на работы.</p>

      <div className='row'>
      <Button
          className='greenButton'
          title='+ Цена'
          onClick={() => {
            props.setVisibleFlag('statusPriceEditor', true)
            props.changePriceForm(1, 'margin_type')
          }}
          unvisible={!props.permissions.includes('setting_create_price')}
        />
        <Checkbox
          label='Показать удаленных'
          onChange={event => setShowDeletedServ(event.target.checked)}
          checked={showDeletedServ}
          unvisible={!props.permissions.includes('setting_price_show_deleted')}
        />
        </div>
      <TablePrice type={1} showDeleted={showDeletedServ}/>

    </div>
      
    </div>
  )
}

const mapStateToProps = state => ({
  statusPriceEditor: state.view.statusPriceEditor,
  permissions: state.data.user.role.permissions
})

const mapDispatchToProps = {
  addDiscountMargin,
  setVisibleFlag,
  changePriceForm
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingMargin)