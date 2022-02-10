
import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { setVisibleFlag, changeOrderFormS } from '../../../Redux/actions'
import { editOperation, deleteOperation, resetOperation } from '../../../Redux/actions/operationActions'
import { icon_briefcase, icon_bug, icon_pencil, icon_trush } from '../../../data/icons'
import Icon from '../../general/Icon'

const TableWorksMaterials = (props) => {

   let price = 0
   let discount = 0
   props.order.operations.filter(operation => !operation.deleted).forEach(operation => {
      price += operation.total
      discount += operation.discount_value
   })
   props.order.parts.filter(part => !part.deleted).forEach(part => {
      price += part.price
      discount += part.discount_value
   })

   const disabled = props.order.status.group > 3 || !props.permissions.includes('edit_operations_materials')

   useEffect(() => {
      props.changeOrderFormS(price, 'price')
   }, [])
   

   const editOperation = (operation) => {
      props.editOperation(operation)
      props.setVisibleFlag('statusOperationEditor', true)
   }

   const deleteOperation = (operation) => {
      props.editOperation(operation)
      props.deleteOperation(true)
      props.resetOperation()
   }

   return (

      <table className='mt15'>
         <thead>
            <tr>
               <th className='w10'></th>
               <th>Наименование</th>
               <th className='w50 tae'>Кол-во</th>
               <th className='w70 tae'>Цена</th>
               <th className='w70 tae'>Сумма</th>
               <th></th>
            </tr>
         </thead>
         
            {props.employees.map(employee => (
               props.order.operations.filter(operation => !operation.deleted && operation.engineer_id === employee.id).length ||
               props.order.parts.filter(part => !part.deleted && part.engineer_id === employee.id).length ?
               <tbody key={employee.id}>
                  <tr className='ss'>
                     <td></td>
                     <td className='txtb' colSpan='5'>{`${employee.first_name} ${employee.last_name}`}</td>
                  </tr>
                  {props.order.operations.filter(operation => !operation.deleted && operation.engineer_id === employee.id).map(operation => (
                     <tr 
                        key={operation.id} 
                        className='fillcol'
                        onDoubleClick={disabled ? null : () => editOperation(operation) }
                     >
                        <td>
                           <Icon className='icon-s1' icon={icon_briefcase} color='#aaa'/>
                        </td>
                        <td>{operation.title}{operation.comment ? ` (${operation.comment })`: null}</td>
                        <td className='tae'>{operation.amount}</td>
                        <td className='tae'>{operation.total / operation.amount}</td>
                        <td className='tae'>{operation.total}</td>
                        <td>
                           {!disabled ?
                           <div className='row'>
                              <div onClick={() => editOperation(operation)}>
                                 <Icon className='icon-s2 curP ml5' icon={icon_pencil}/>
                              </div>
                              <div onClick={() => deleteOperation(operation)}>
                                 <Icon className='icon-s2 curP ml5' icon={icon_trush}/>
                              </div>
                           </div> : null}
                        </td>
                     </tr>
                  ))}
                  {props.order.parts.filter(part => !part.deleted && part.engineer_id === employee.id).map(part => (
                     <tr 
                        key={part.id}
                        className='fillcol'
                        onDoubleClick={disabled ? null : () => console.log('edit part') }
                     >
                        <td>
                           <Icon className='icon-s1' icon={icon_bug} color='#aaa'/>
                        </td>
                        <td>{part.title}{part.comment ? ` (${part.comment })`: null}</td>
                        <td className='tae'>{part.amount}</td>
                        <td className='tae'>{part.total / part.amount}</td>
                        <td className='tae'>{part.total}</td>
                        <td>
                        {!disabled ?
                           <div className='row'>
                              <div onClick={() => console.log('edit parts')}>
                                 <Icon className='icon-s2 curP ml5' icon={icon_pencil}/>
                              </div>
                              <div onClick={() => console.log('delete parts')}>
                                 <Icon className='icon-s2 curP ml5' icon={icon_trush}/>
                              </div>
                           </div> : null}
                        </td>
                     </tr>
                  ))}
               </tbody> : null
            ))}
            <tbody>
               <tr className='ss'>
                  <td className='tae' colSpan='4'>Итого скидка:</td>
                  <td className='tae'>{discount}</td>
                  <td>руб.</td>
               </tr>
               <tr className='ss'>
                  <td className='tae' colSpan='4'>Итого сумма:</td>
                  <td className='tae'>{price}</td>
                  <td>руб.</td>
               </tr>
            </tbody>
      </table>
   )
}

const mapStateToProps = state => ({
   order: state.order,
   employees: state.data.employees,
   permissions: state.data.user.role.permissions
})

const mapDispatchToProps = {
   editOperation,
   setVisibleFlag,
   deleteOperation,
   resetOperation,
   changeOrderFormS
}
  
 export default connect(mapStateToProps, mapDispatchToProps)(TableWorksMaterials)