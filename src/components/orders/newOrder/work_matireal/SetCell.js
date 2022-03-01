
import React from 'react'
import { connect } from 'react-redux'


import { setVisibleFlag } from '../../../../Redux/actions'
import CellEditor from './CellEditor'

const SetCell = (props) => {


   return (
      <div 
         className = 'mt15'
         style={{width: '150px'}} 
      >
         <div className='lableImput'>Ячейка</div>
         <div 
            className='optionsButton' 
            onClick={() => props.setVisibleFlag('statusCellEditor', true)}
         >
            <div className='noWr w100 tac'>
               {props.order.cell || 'Выберете ячейку'}
            </div>
            <span>&#6662;</span>
         </div>
         {props.statusCellEditor ? <CellEditor/> : null}
      </div>
   )
}

const mapStateToProps = state => ({
   order: state.order,
   statusCellEditor: state.view.statusCellEditor
})

const mapDispatchToProps = {
   setVisibleFlag
}
  
 export default connect(mapStateToProps, mapDispatchToProps)(SetCell)