
import React from 'react'
import { connect } from 'react-redux'

import { addDictMalfunction, setVisibleFlag, resetBookEquipment, deleteBookElements } from '../../../../Redux/actions'
import { changeBookForm } from '../../../../Redux/actions/bookActions'

import DictTable from './DictTable'
import ElementEditor from './ElementEditor'

const MalfunctionBooks = (props) => {

   return (
      <div className="contentTab">
         
         <DictTable
            title='Неисправности'
            description='Справочник типовых неисправностей'
            list={ props.dictMalfunction }
            count={ props.count_malfunction }
            page={ props.book.page_malfunction }
            selected={props.book.selected_malfunction}
            selected_field='selected_malfunction'
            onPageChange={page => {
               props.changeBookForm(page.selected, 'page_malfunction')
               props.addDictMalfunction()
            }}
            addElement={() => {
               props.resetBookEquipment()
               props.setVisibleFlag('statusElementEditor', true)
               props.changeBookForm(0, 'type')
            }}
            delete={ () => {
               props.changeBookForm(0, 'type')
               props.deleteBookElements()
               props.resetBookEquipment()
            }}
         />

         {props.statusElementEditor ? <ElementEditor/> : null}
      </div>
   )
}

const mapStateToProps = state => ({
   dictMalfunction: state.data.dictMalfunction,
   count_malfunction: state.data.count_malfunction,
   dictPackagelist: state.data.dictPackagelist,
   count_packagelist: state.data.count_packagelist,
   book: state.book,
   statusElementEditor: state.view.statusElementEditor
   })

const mapDispatchToProps = {
   addDictMalfunction,
   changeBookForm,
   setVisibleFlag,
   resetBookEquipment,
   deleteBookElements
}
  
 export default connect(mapStateToProps, mapDispatchToProps)(MalfunctionBooks)