import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { changeTypeListOrder, setOrderType } from '../../../Redux/actions'

const SetTypeOrder = (props) => {

   const clickHandel = (event) => {

      if ( 
          !event.path.map(el => el.id).includes('listOrderOfType') && 
          !event.path.map(el => el.id).includes('optionsOrderButtonOfType')
      ) {
         if (props.statusTypeListOrder) {
          props.changeTypeListOrder()
      }}
    }
   
    useEffect(() => {
      window.addEventListener('click', clickHandel)
      return () => {
        window.removeEventListener('click', clickHandel)
      }
    })


   return (
    <div className='formRow'>

      <div className='optionsTitle'>Тип заказа</div>
        <div>
          <div 
          className='optionsFilterButton w150'
          id='optionsOrderButtonOfType'
          onClick={() => props.changeTypeListOrder()}
          > 
            <span>{props.order_type.find(type => type.id === props.order_type_id).name}</span>  
            <span>&#6662;</span> 
          </div>
          {props.statusTypeListOrder ? <div className='listFilter' id='listOrderOfType'>

              {props.order_type.map(type => {
                return (

                  <div className='listTitle' key={type.id}>
                      <div 
                      className='rowList'
                      onClick={() => props.setOrderType(type.id)}
                      >
                        {type.name}
                      </div>
                  </div>
                )
              })}
              
        </div> : null}
      </div>
    </div>
   )
}

const mapStateToProps = state => ({
  statusTypeListOrder: state.view.statusTypeListOrder,
  order_type: state.data.order_type,
  order_type_id: state.order.order_type_id
})


const mapDispatchToProps = {
  changeTypeListOrder,
  setOrderType
}
  
export default connect(mapStateToProps, mapDispatchToProps)(SetTypeOrder)