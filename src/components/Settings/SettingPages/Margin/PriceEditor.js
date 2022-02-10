import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import {
  setVisibleFlag,
  changePriceForm,
  createPrice,
  resetPrice,
  savePrice,
  deletePrice
} from '../../../../Redux/actions'

import BottomButtons from '../../../general/BottomButtons'
import ChooseOfList from '../../../general/ChooseOfList'
import LableInpute from '../../../general/LableInput'

const PriceEditor = (props) => {

  const clickHandel = (event) => {
    if (!event.path.map((el) => el.id).includes('priceEditor')) {
      props.setVisibleFlag('statusPriceEditor', false)
    }
  }

  useEffect(() => {
    window.addEventListener('click', clickHandel)
    return () => {
      window.removeEventListener('click', clickHandel)
    }
  })

  const handleCreate = () => {
    if(props.price.title) {
      props.createPrice()
    } else {
      props.setVisibleFlag('inputPriceTitleChecked', false)
    }
  }

  const handleSave = () => {
    if(props.price.title) {
      props.savePrice()
    } else {
      props.setVisibleFlag('inputPriceTitleChecked', false)
    }
  }

  return (
    <div className="rightBlock">
      <div className="rightBlockWindow" id="priceEditor">

        <div className="createNewTitle">
          {props.price.edit ? props.price.title : ' Новая цена'}
        </div>

        <div className="contentEditor">
           <LableInpute
              className='mt15'
              title='Наименование'
              onChange={event => props.changePriceForm(event.target.value, 'title')}
              value={props.price.title}
              checkedFlag='inputPriceTitleChecked'
              checked={props.inputPriceTitleChecked}
              disabled={props.price.deleted}
              redStar={ true }
           />
           <LableInpute
              className='mt15'
              width='70px'
              title='Наценка'
              onChange={event => props.changePriceForm(event.target.value.replace(/[^0-9]/g, ''), 'margin')}
              value={props.price.margin}
              unit='%'
              disabled={props.price.deleted}
           />
           <ChooseOfList
              id={22}
              title='Тип наценки'
              className='mt15'
              list={props.price.list_type_margin}
              field='margin_type'
              setElement={props.changePriceForm}
              current_id={props.price.margin_type}
              width={'250px'}
              disabled={props.price.deleted}
           />

         </div>

         <BottomButtons
            edit={props.price.edit}
            deleted={props.price.deleted}
            create={handleCreate}
            save={handleSave}
            delete={props.permissions.includes('setting_price_delete') ? () => props.deletePrice(true) : null}
            recover={props.permissions.includes('setting_price_recover_deleted') ? () => props.deletePrice(false) : null}
            close={() => {
              props.setVisibleFlag('statusPriceEditor', false)
              props.resetPrice()
            }}
         />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  price: state.price,
  inputPriceTitleChecked: state.view.inputPriceTitleChecked,
  permissions: state.data.user.role.permissions
})

const mapDispatchToProps = {
  setVisibleFlag,
  changePriceForm,
  createPrice,
  resetPrice,
  savePrice,
  deletePrice
}

export default connect(mapStateToProps, mapDispatchToProps)(PriceEditor)
