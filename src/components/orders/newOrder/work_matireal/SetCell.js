import React from 'react'
import { connect } from 'react-redux'

import { changeVisibleState } from '../../../../Redux/actions'
import CellEditor from './CellEditor'
import Icon from '../../../general/Icon'
import {ICON} from '../../../../data/icons'

const SetCell = (props) => {


   return (
      <div 
         className='select select__cell'
      >
         <div className='label select__label'>Ячейка</div>
         <div 
            className='input select__input'
            onClick={() => props.changeVisibleState({statusCellEditor: true})}
         >
            <div className='nowrap'>
               {props.order.cell || 'Выберете'}
            </div>
            <Icon icon={ICON.DOWN} className='icon'/>
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
   changeVisibleState
}
  
 export default connect(mapStateToProps, mapDispatchToProps)(SetCell)