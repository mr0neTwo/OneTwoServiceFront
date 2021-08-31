import React, { useEffect, useRef} from 'react'
import { connect } from 'react-redux'

import { changeSettableStatuses, changeVisibleStatuses } from '../../../../Redux/actions'


function ChooseAvailableStatuses (props) {

   const visibleChackbox = useRef()
  
   useEffect(() => {
      const values = props.status.filter(status => props.visible_statuses.includes(status.id))
      if (values.length === props.status.length) {
         visibleChackbox.current.indeterminate = false
         visibleChackbox.current.checked = true
      } else if (!values.length) {
         visibleChackbox.current.indeterminate = false
         visibleChackbox.current.checked = false
      } else {
         visibleChackbox.current.indeterminate = true
      }
   }, [props.visible_statuses])

   const settableChackbox = useRef()
  
   useEffect(() => {
      const values = props.status.filter(status => props.settable_statuses.includes(status.id))
      if (values.length === props.status.length) {
         settableChackbox.current.indeterminate = false
         settableChackbox.current.checked = true
      } else if (!values.length) {
         settableChackbox.current.indeterminate = false
         settableChackbox.current.checked = false
      } else {
         settableChackbox.current.indeterminate = true
      }
   }, [props.settable_statuses])



   return (
      <table>
         <thead>
            <tr>
               <th>Статус заказа</th>
               <th>
                  <div className='checkbox'>
                     <input 
                     type='checkbox'
                     ref={visibleChackbox}
                     onChange={() => props.changeVisibleStatuses(props.status.map(status => status.id))}
                     />
                     <label>Видеть заказы в статусе</label>
                  </div>
               </th>
               <th>
                  <div className='checkbox'>
                     <input 
                     type='checkbox'
                     ref={settableChackbox}
                     onChange={() => props.changeSettableStatuses(props.status.map(status => status.id))}
                     />
                     <label>Устанавливать статус</label>
                  </div>
               </th>
            </tr>
         </thead>
         <tbody>
            {props.status.map(status => {
               return (
                  <tr key={status.id}>
                     <td>
                        <div 
                        style={{backgroundColor: status.color}}
                        className='statusListRow'
                        >
                           {status.name}
                        </div>
                     </td>
                     <td>
                        

                        <div className='checkbox'>
                           <input 
                           type='checkbox'
                           onChange={() => props.changeVisibleStatuses([status.id])}
                           checked={props.visible_statuses.includes(status.id)}
                           />
                           <label></label>
                        </div>

                     </td>
                     <td>
                        <div className='checkbox'>
                           <input 
                           type='checkbox'
                           onChange={() => props.changeSettableStatuses([status.id])}
                           checked={props.settable_statuses.includes(status.id)}
                           />
                           <label></label>
                        </div>
                     </td>
                  </tr>
               )
            })}
         </tbody>
      </table>
   )
}

const mapStateToProps = state => ({
   visible_statuses: state.role.visible_statuses,
   settable_statuses: state.role.settable_statuses
   })

   const mapDispatchToProps = {
      changeVisibleStatuses,
      changeSettableStatuses
   }

export default connect (mapStateToProps, mapDispatchToProps) (ChooseAvailableStatuses)