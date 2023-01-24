
import React, { useEffect, useRef} from 'react'
import { connect } from 'react-redux'

import { changeSettableMargin} from '../../../../Redux/actions'


function CooseAvailablePrices (props) {


   const priceChackbox = useRef()
  
   useEffect(() => {
      const values = props.discount_margin.filter(margin => props.settable_discount_margin.includes(margin.id))
      if (values.length === props.discount_margin.length) {
         priceChackbox.current.indeterminate = false
         priceChackbox.current.checked = true
      } else if (!values.length) {
         priceChackbox.current.indeterminate = false
         priceChackbox.current.checked = false
      } else {
         priceChackbox.current.indeterminate = true
      }
   }, [props.settable_discount_margin])



   return (
      <table>
         <thead>
            <tr>
               <th className='headerCheckbox'>
                  <div className='checkbox'>
                     <input 
                     type='checkbox'
                     ref={priceChackbox}
                     onChange={() => props.changeSettableMargin(props.discount_margin.map(margin => margin.id))}
                     />
                     <label></label>
                  </div>
               </th>
               <th>
                  Название
               </th>
            </tr>
         </thead>
         <tbody>
            {props.discount_margin.map(margin => {
               return (
                  <tr key={margin.id}>
                     <td>
                        <div className='checkbox'>
                           <input 
                           type='checkbox'
                           onChange={() => props.changeSettableMargin([margin.id])}
                           checked={props.settable_discount_margin.includes(margin.id)}
                           />
                           <label></label>
                        </div>
                     </td>
                     <td>
                        {margin.title}
                     </td>
                  </tr>
               )
            })}
         </tbody>
      </table>
   )
}

const mapStateToProps = state => ({
   discount_margin: state.price.discount_margin,
   settable_discount_margin: state.role.settable_discount_margin
   })

   const mapDispatchToProps = {
      changeSettableMargin
   }

export default connect (mapStateToProps, mapDispatchToProps) (CooseAvailablePrices)