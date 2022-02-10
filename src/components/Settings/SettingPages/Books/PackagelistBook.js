

import React from 'react'
import { connect } from 'react-redux'

import { setVisibleFlag, resetBookEquipment, deleteBookElements, addDictPackagelist } from '../../../../Redux/actions'
import { changeBookForm } from '../../../../Redux/actions/bookActions'

import DictTable from './DictTable'
import ElementEditor from './ElementEditor'

const PackagelistBook = (props) => {

   return (
      <div className="contentTab">
         
         <DictTable
            title='Элементы комплектации'
            description='Справочник элементов комплектации'
            list={ props.dictPackagelist }
            count={ props.count_packagelist }
            page={ props.book.page_packagelist }
            selected={props.book.selected_packagelist}
            selected_field='selected_packagelist'
            onPageChange={page => {
               props.changeBookForm(page.selected, 'page_packagelist')
               props.addDictPackagelist()
            }}
            addElement={() => {
               props.resetBookEquipment()
               props.setVisibleFlag('statusElementEditor', true)
               props.changeBookForm(1, 'type')
            }}
            delete={ () => {
               props.changeBookForm(1, 'type')
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
   changeBookForm,
   setVisibleFlag,
   resetBookEquipment,
   deleteBookElements,
   addDictPackagelist
}
  
 export default connect(mapStateToProps, mapDispatchToProps)(PackagelistBook)