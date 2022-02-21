import React from 'react'
import { connect } from 'react-redux'

import Icon from "../../../general/Icon";

const TableWherehouse = (props) => {

   return (
      <table>
         <thead>
            <tr>
               <th className='w15'> </th>
               <th className='w150'>Название</th>
               <th className=''>Описание</th>
            </tr>
         </thead>
          <tbody>
          {props.warehouses.filter(warehouse => !warehouse.deleted).map(warehouse => (
              <tr key={warehouse.id}>
                  <td className=''>
                      <Icon className='icon-s1' icon={warehouse.branch.icon} color={warehouse.branch.color}/>
                  </td>
                  <td className=''>{warehouse.title}</td>
                  <td className=''>{warehouse.description}</td>
              </tr>
          ))}
          </tbody>
      </table>
   )
}

const mapStateToProps = state => ({
    warehouses: state.warehouse.warehouses
})

const mapDispatchToProps = {

}
  
 export default connect(mapStateToProps, mapDispatchToProps)(TableWherehouse)