


import React from 'react'
import { connect } from 'react-redux'

import { setVisibleFlag, resetBookEquipment, deleteBookElements, addItemPayments } from '../../../../Redux/actions'
import { changeBookForm } from '../../../../Redux/actions/bookActions'

import DictTable from './DictTable'
import ElementEditor from './ElementEditor'

const ItemPayments = (props) => {

   return (
      <div className="contentTab">
         
         <DictTable
            title='Статьи движение денежных средств'
            title2='Направление'
            description='Справочник содержит перечень статей движения денежных средств, которые предназначены для разделения доходов и расходов организации по различным направлениям'
            list={ props.item_payments }
            count={ props.count_item_payments }
            page={ props.book.page_item_payments }
            selected={props.book.selected_item_payments}
            selected_field='selected_item_payments'
            onPageChange={page => {
               props.changeBookForm(page.selected, 'page_item_payments')
               props.addItemPayments()
            }}
            addElement={() => {
               props.changeBookForm(2, 'type')
               props.resetBookEquipment()
               props.setVisibleFlag('statusElementEditor', true)
            }}
            delete={ () => {
               props.changeBookForm(2, 'type')
               props.deleteBookElements()
               props.resetBookEquipment()
            }}
         />

         {props.statusElementEditor ? <ElementEditor/> : null}
      </div>
   )
}

const mapStateToProps = state => ({
   item_payments: state.data.item_payments,
   count_item_payments: state.data.count_item_payments,
   book: state.book,
   statusElementEditor: state.view.statusElementEditor
   })

const mapDispatchToProps = {
   changeBookForm,
   setVisibleFlag,
   resetBookEquipment,
   deleteBookElements,
   addItemPayments
}
  
 export default connect(mapStateToProps, mapDispatchToProps)(ItemPayments)