import React, { useEffect, useState} from 'react'
import { connect } from 'react-redux'

import { changeNameClientFilter, changePhoneClientFilter, setVisibleFlag, changeOrderFormS } from '../../../../Redux/actions'
import { showPhone } from '../../../general/utils'
import ClientEditor from '../../../Clients/ClientEditor/ClientEditor'
import LableInput from '../../../general/LableInput'

const SetClient = (props) => {

   const [listClientsVisible, setListClientsVisible] = useState(false)
   const [listClientsPhoneVisible, setListClientsPhoneVisible] = useState(false)

   const clickHandel1 = (event) => {
      if (
         !event.path.map(el => el.id).includes('listFilterOfOrOrder') &&
         !event.path.map(el => el.id).includes('orderInputBoxOfOrder')
         ) {
         if (listClientsVisible) {
            setListClientsVisible(false)
      }}
    }

    const clickHandel2 = (event) => {
      if (
         !event.path.map(el => el.id).includes('orderInputBoxOfOrderPhone') &&
         !event.path.map(el => el.id).includes('listFilterOfOrOrderPhone')
         ) {
         if (listClientsPhoneVisible) {
            setListClientsPhoneVisible(false)
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
                  onClick={() => setListClientsVisible(true)}
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

               {listClientsVisible ? 
               <div className='listFilter' id='listFilterOfOrOrder'>
               {props.clientShow.map(client => (
                  <div 
                     className='rowGropList' 
                     key={client.id}
                     onClick={() => {
                        props.changeOrderFormS(client, 'client')
                        setListClientsVisible(false)
                     }}
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
                     onClick={() => setListClientsPhoneVisible(true)}
                  >
                    <LableInput
                        className='w100'
                        inputClassName='optionFilterInput'
                        onChange={value => props.changePhoneClientFilter(value)}
                        value={props.phone}
                        isPhone={true}
                    />
                     <div 
                        className='simbolButton'
                        onClick={() => props.setVisibleFlag('statusCreateNewClient', true)}
                     >
                        +
                     </div>
                     <div className='simbolButton'>&#6662;</div> 
                  </div>

                 

                  {listClientsPhoneVisible ? 
                  <div className='listFilter' id='listFilterOfOrOrderPhone'>
                  {props.clientShow.map(client => (
                     <div 
                        className='rowGropList' 
                        key={client.id}
                        onClick={() => {
                           props.changeOrderFormS(client, 'client')
                           setListClientsPhoneVisible(false)
                        }}
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
   changeNameClientFilter,
   changePhoneClientFilter,
   setVisibleFlag,
   changeOrderFormS
}
  
 export default connect(mapStateToProps, mapDispatchToProps)(SetClient)