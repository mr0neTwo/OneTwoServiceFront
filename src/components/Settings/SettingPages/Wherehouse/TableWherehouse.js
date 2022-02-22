import React from 'react'
import { connect } from 'react-redux'

import Icon from "../../../general/Icon";
import {editWarehouse} from "../../../../Redux/actions/warehouseAction"
import { setVisibleFlag } from "../../../../Redux/actions";

const TableWherehouse = (props) => {

    const handleEdit = (warehouse) => {
        if (props.permissions.includes('setting_edit_warehouse')) {
            props.editWarehouse(warehouse)
            props.setVisibleFlag('statusWarehouseEditor', true)
        }
    }

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
          {props.warehouses.filter(warehouse => props.showDeleted || !warehouse.deleted).map(warehouse => (
              <tr
                  key={warehouse.id}
                  className={warehouse.deleted ? 'rowDeleted' : null}
                  onDoubleClick={() => handleEdit(warehouse)}
              >
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
    warehouses: state.warehouse.warehouses,
    permissions: state.data.user.role.permissions
})

const mapDispatchToProps = {
    editWarehouse,
    setVisibleFlag
}
  
 export default connect(mapStateToProps, mapDispatchToProps)(TableWherehouse)