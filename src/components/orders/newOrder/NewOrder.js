
import React, {useEffect} from 'react'
import { connect } from 'react-redux'

import { changeStatusNewOrder } from '../../../Redux/actions'
import SetTypeOrder from './SetTypeOrder'

const NewOrder = (props) => {

   const clickHandel = (event) => {
      if (!event.path.map(el => el.id).includes('createNewOrder') ) {
          props.changeStatusNewOrder()
    }}
   
    useEffect(() => {
      window.addEventListener('click', clickHandel)
      return () => {
        window.removeEventListener('click', clickHandel)
      }
    })

   return (
      <div className='rightBlock'>
         <div className='rightBlockWiondow' id='createNewOrder'>

            <div className='cteateNewOrderContent'>

               <div className='createOrderForm'>

                  <div className='createNewTitle'>
                     Новый заказ
                  </div>

                  <SetTypeOrder/>

                  

               </div>

               <div className='orderHistory'>
                  История заказа
               </div>

            </div>

         </div>
     </div>
   )
}

const mapStateToProps = state => ({
   //   dataSidebarRows: 'dataSidebarRows',
     // addTodo: todo => ref('todos').push(todo)
   })
  
const mapDispatchToProps = {
   changeStatusNewOrder
}

 export default connect(mapStateToProps, mapDispatchToProps)(NewOrder)