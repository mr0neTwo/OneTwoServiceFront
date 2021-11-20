import React, { useEffect} from 'react'
import { connect } from 'react-redux'
import InputMask from 'react-input-mask'

import { changeClienListOrder, setClientId, changeNameClientFilter, changeClienListOrderPhone, changePhoneClientFilter, setVisibleFlag } from '../../../Redux/actions'
import { showPhone } from '../../general/utils'
import ClientEditor from '../../Clients/ClientEditor/ClientEditor'

const SetClient = (props) => {

   const clickHandel1 = (event) => {
      if (
         !event.path.map(el => el.id).includes('listFilterOfOrOrder') &&
         !event.path.map(el => el.id).includes('orderInputBoxOfOrder')
         ) {
         if (props.view.statusClientListOrder) {
          props.changeClienListOrder()
      }}
    }

    const clickHandel2 = (event) => {
      if (
         !event.path.map(el => el.id).includes('orderInputBoxOfOrderPhone') &&
         !event.path.map(el => el.id).includes('listFilterOfOrOrderPhone')
         ) {
         if (props.view.statusClientListOrderPhone) {
          props.changeClienListOrderPhone()
      }}
    }
   
    useEffect(() => {
      window.addEventListener('click', clickHandel1)
      window.addEventListener('click', clickHandel2)
      return () => {
        window.removeEventListener('click', clickHandel1)
        window.removeEventListener('click', clickHandel2)
      }
    })



   return (
      <div className='cleintForm'>

         <div className = 'formRow'>
            <div className='optionsTitle'>Имя клиента<span className='redStar'>*</span></div>

            <div className='blockImput'>
               <div 
                  id='orderInputBoxOfOrder'
                  className='orderInputBox'
                  onClick={() => props.changeClienListOrder()}
                  style={props.view.checkedOrderClient ? {borderColor: 'red'} : null}
               >
                  <input
                     className='optionFilterInput'
                     onChange={event => props.changeNameClientFilter(event.target.value)}
                     // onBlur={() => props.setVisibleFlag('checkedOrderClient', !Object.values(props.client).length)}
                  />
                  <div 
                  className='simbolButton'
                  onClick={() => props.setVisibleFlag('statusCreateNewClient', true)}
                  >
                     +
                  </div>
                  <div className='simbolButton'>&#6662;</div> 
               </div>
               {props.view.checkedOrderClient ? <div className='errorMassageInput'>{'Необоходимо выбрать клиента'}</div> : null}

               {props.view.statusClientListOrder ? 
               <div className='listFilter' id='listFilterOfOrOrder'>
               {props.clientShow.map(client => (
                  <div 
                     className='rowGropList' 
                     key={client.id}
                     onClick={() => props.setClientId(client)}
                  >
                     <div>{client.name}</div>
                     <div className='orderDate'>
                        {client.phone[0] ? showPhone(client.phone[0].number) : null}
                     </div>
                  </div>
               ))}
               </div> : null}

            </div>
            </div>

            <div className = 'formRow'>

               <div className='optionsTitle'>Телефон<span className='redStar'>*</span></div>
               <div className='blockImput'>

                  <div 
                     id='orderInputBoxOfOrderPhone'
                     className='orderInputBox'
                     onClick={() => props.changeClienListOrderPhone()}
                  >
                     <InputMask 
                        mask="+7(999) 999-99-99"
                        className='optionFilterInput'
                        onChange={event => props.changePhoneClientFilter(event.target.value)}
                        value={props.phone}
                     />
                     <div 
                     className='simbolButton'
                     onClick={() => props.setVisibleFlag('statusCreateNewClient', true)}
                     >
                        +
                     </div>
                     <div className='simbolButton'>&#6662;</div> 
                  </div>

                 

                  {props.view.statusClientListOrderPhone ? 
                  <div className='listFilter' id='listFilterOfOrOrderPhone'>
                  {props.clientShow.map(client => (
                     <div 
                        className='rowGropList' 
                        key={client.id}
                        onClick={() => props.setClientId(client)}
                     >
                        <div>{client.name}</div>
                        <div className='orderDate'>
                           {client.phone[0] ? showPhone(client.phone[0].number) : null}
                        </div>
                     </div>
                  ))}
                  </div> : null}

               </div>
               
            </div>
      
      {props.view.statusCreateNewClient ? <ClientEditor/> : null }           
      </div>
   )
}

const mapStateToProps = state => ({
   clientShow: state.data.clientShow,
   phone: state.filter.clientFilter.phone,
   view: state.view,
   client: state.order.client
   })

const mapDispatchToProps = {
   changeClienListOrder,
   setClientId,
   changeNameClientFilter,
   changeClienListOrderPhone,
   changePhoneClientFilter,
   setVisibleFlag
}
  
 export default connect(mapStateToProps, mapDispatchToProps)(SetClient)