import React, { useEffect, useState, useMemo} from 'react'
import { connect } from 'react-redux'

import { setVisibleFlag } from '../../../Redux/actions'
import {  createOperation } from '../../../Redux/actions/operationActions'
import OperationEditor from './OperationEditor'


const SetWorkMatireals = (props) => {

   const [listVisible, setlistVisible] = useState(false)
   const [filterWorks, setFileterWorks] = useState('')

   const disabled = props.status_group > 3

   const clickHandel1 = (event) => {
      if (
         !event.path.map(el => el.id).includes('listSetWorks') &&
         !event.path.map(el => el.id).includes('setWorks')
         ) {
         if (listVisible) {
            setlistVisible(false)
      }}
    }
   
    useEffect(() => {
      window.addEventListener('click', clickHandel1)
      return () => {
        window.removeEventListener('click', clickHandel1)
      }
    })

   const servises = useMemo(() => props.dict_service.filter(service => !service.deleted && service.title.toLowerCase().includes(filterWorks.toLowerCase())), [filterWorks])

   const handelCreateOperation = (service) => {
      props.createOperation(service)
      setlistVisible(false)
   }

   return (
      <div className='row'>

         <div className = 'mt15 w400'>
            <div className='lableImput'>Выполненная работа</div>

            <div className='blockImput'>
               <div 
                  id='setWorks'
                  className='orderInputBox'
                  onClick={() => setlistVisible(true)}
               >
                  <input
                     className='optionFilterInput'
                     onChange={event => setFileterWorks(event.target.value)}
                     velue={filterWorks}
                     disabled={disabled}
                  />
               </div>

               {listVisible && !disabled ? 
               <div className='listFilter' id='listSetWorks'>
               {servises.map(service => (
                  <div 
                     className='rowGropList' 
                     key={service.id}
                     onClick={() => handelCreateOperation(service)}
                  >
                     <div className='fc-gr'>{service.title}</div>
                     <div className='fc-gr'>{service.price} руб.</div>
                  </div>
               ))}
               <div className='btmsts'>
                  <div 
                     className='btnstsTitle'
                     onClick={() => props.setVisibleFlag('statusOperationEditor', true)}
                  >
                     Добавить работу
                  </div>
               </div>
               </div> : null}

            </div>
            </div>
            {props.statusOperationEditor ? <OperationEditor/> : null}
            {/* <div className = 'formRow'>

               <div className='optionsTitle'>Телефон<span className='redStar'>*</span></div>
               <div className='blockImput'>

                  <div 
                     id='orderInputBoxOfOrderPhone'
                     className='orderInputBox'
                     onClick={() => props.changeClienListOrderPhone()}
                  >
                     
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
               
            </div> */}
      
      </div>
   )
}

const mapStateToProps = state => ({
   dict_service: state.data.dict_service,
   statusOperationEditor: state.view.statusOperationEditor,
   status_group: state.order.status.group
   })

const mapDispatchToProps = {
   createOperation,
   setVisibleFlag
}
  
 export default connect(mapStateToProps, mapDispatchToProps)(SetWorkMatireals)