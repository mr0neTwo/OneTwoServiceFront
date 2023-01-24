

import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { setVisibleFlag } from '../../../../Redux/actions'
import { changeOrderFormS } from '../../../../Redux/actions'
import { cells } from '../../../../data/cells'



const CellEditor = (props) => {



   const handleClose = () => {
      props.setVisibleFlag('statusCellEditor', false)
      // props.resetPayrule()
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
      <div className='centerBlock'>
         <div className='blockWindow' id='cellEditor'>
            <div className='createNewTitle'>Выберете ячейку</div>
            <div className='cellContainer'>
               {cells.map( cell => (
                  <div
                     key={cell.id}
                     style={{
                        width: cell.width,
                        height: cell.height,
                        backgroundColor: cell.color
                     }}
                     className='cell'
                     onClick={() => {
                        props.changeOrderFormS(cell.title, 'cell')
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
   setVisibleFlag,
   changeOrderFormS
}
  
 export default connect(mapStateToProps, mapDispatchToProps)(CellEditor)