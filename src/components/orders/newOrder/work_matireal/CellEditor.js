import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { changeVisibleState } from '../../../../Redux/actions'
import { cells } from '../../../../data/cells'
import {changeOrderState} from '../../../../Redux/actions/orderActions'



const CellEditor = (props) => {

   const handleClose = () => {
      props.changeVisibleState({statusCellEditor: false})
   }

   const clickHandel = (event) => {
      if (!event.composedPath().map((el) => el.id).includes('cellEditor')) {
         handleClose()
      }
    }
  
   useEffect(() => {
      window.addEventListener('click', clickHandel)
      return () => {
        window.removeEventListener('click', clickHandel)
      }
   })

   return (
      <div className='modal'>
         <div className='modal__box modal__body-cell' id='cellEditor'>
            <h4>Выберете ячейку</h4>
            <div className='cell-container'>
               {cells.map( cell => (
                  <div
                     key={cell.id}
                     style={{
                        width: cell.width,
                        height: cell.height
                     }}
                     className='cell-container__cell'
                     onClick={() => {
                        props.changeOrderState({cell: cell.title})
                        handleClose()
                     }}
                  >
                     {cell.title}
                  </div>
               ))}

            </div>

            

           
         </div>
      </div>
   )
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = {
    changeVisibleState,
    changeOrderState
}
  
 export default connect(mapStateToProps, mapDispatchToProps)(CellEditor)