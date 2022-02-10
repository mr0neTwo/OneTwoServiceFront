import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import { changeOrderFormS } from '../../../Redux/actions'

const SetTypeOrder = (props) => {

  const [listVisible, setlistVisible] = useState(false)

   const clickHandel = (event) => {

      if ( 
          !event.path.map(el => el.id).includes('listOrderOfType') && 
          !event.path.map(el => el.id).includes('optionsOrderButtonOfType')
      ) {
         if (listVisible) {
          setlistVisible(false)
      }}
    }
   
    useEffect(() => {
      window.addEventListener('click', clickHandel)
      return () => {
        window.removeEventListener('click', clickHandel)
      }
    })


   return (
    <div className='formRow mt15'>

      <div className='optionsTitle'>Тип заказа</div>
      <div className='blockImput'>
        <div 
          className='optionsFilterButton w150'
          id='optionsOrderButtonOfType'
          onClick={() => setlistVisible(true)}
        > 
          <span>{props.order_type.find(type => type.id === props.order_type_id).name}</span>  
          <span>&#6662;</span> 
        </div>
        {listVisible ? <div className='listFilter' id='listOrderOfType'>

            {props.order_type.map(type => {
              return (

                <div className='listTitle' key={type.id}>
                    <div 
                    className='rowList'
                    onClick={() => {
                      props.changeOrderFormS(type.id, 'order_type_id')
                      setlistVisible(false)
                    }}
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
  order_type: state.data.order_type,
  order_type_id: state.order.order_type_id
})


const mapDispatchToProps = {
  changeOrderFormS
}
  
export default connect(mapStateToProps, mapDispatchToProps)(SetTypeOrder)