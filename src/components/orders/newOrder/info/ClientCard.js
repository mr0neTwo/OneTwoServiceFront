import React from 'react'
import { connect } from 'react-redux'

import { showPhone } from '../../../general/utils'
import {changeOrderFormS, changeVisibleState} from '../../../../Redux/actions'
import ClientEditor from '../../../Clients/ClientEditor/ClientEditor'
import {editClient} from '../../../../Redux/actions/clientAction'

const ClientCard = (props) => {


    const handleEdit = (client_id) => {
        props.editClient(client_id)
        props.changeVisibleState({statusClientEditor: true})
    }

   return (
      <div className = 'formRow'>
         <div className='optionsTitle'> </div>
         <div className = 'clientCard'>
         <div>
            <div>
               <svg className="icon-client" viewBox="0 0 32 32">
                  <path fillRule="evenodd" clipRule="evenodd" d='M18 22.082v-1.649c2.203-1.241 4-4.337 4-7.432 0-4.971 0-9-6-9s-6 4.029-6 9c0 3.096 1.797 6.191 4 7.432v1.649c-6.784 0.555-12 3.888-12 7.918h28c0-4.030-5.216-7.364-12-7.918z'></path>
               </svg>
               <span 
                  className='clientCardName'
                  onClick={() => handleEdit(props.client.id)}
                  >
                  {props.client.name}
               </span>
            </div>
            <div>
               <span className='clientCardTitle'>Телефон:</span>
               <span className='clientCardText'> {props.client.phone[0] ? showPhone(props.client.phone[0].number) : null}</span>
            </div>
            <div>
               <span className='clientCardTitle'>Баланс: </span>
               <span className='clientCardText'>000 (клиет должет нам)</span>
            </div>
         </div>
         <div 
            className='crossButtom'
            onClick={() => props.changeOrderFormS({}, 'client')}
         >
            &#9587;
         </div>
         </div>
      </div>
   )
}

const mapStateToProps = state => ({
   client: state.order.client,
   statusClientEditor: state.view.statusClientEditor
   })

const mapDispatchToProps = {
   editClient,
   changeOrderFormS,
    changeVisibleState
}
  
 export default connect(mapStateToProps, mapDispatchToProps)(ClientCard)