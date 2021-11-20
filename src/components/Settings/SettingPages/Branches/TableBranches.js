
import React from 'react'
import { connect } from 'react-redux'

import { showPhone } from '../../../general/utils'
import { editBranch } from '../../../../Redux/actions'
import Icon from '../../../general/Icon'

const TableBranches = (props) => {
   return (
      <table>
         <thead>
            <tr>
               <th></th>
               <th>Название локации</th>
               <th>Адрес</th>
               <th>Телефон</th>
            </tr>
         </thead>
         <tbody>
         {props.branches.filter(branch => props.showDeleted || !branch.deleted).map(branch =>{
            return (
               <tr 
                  key={branch.id}
                  className={branch.deleted ? 'rowDeleted' : null}
                  onDoubleClick={() => props.editBranch(branch)} 
               >
                  <td className='w30'><Icon icon={branch.icon} color={branch.color}/></td>
                  <td>{branch.name}</td>
                  <td>{branch.address}</td>
                  <td>{showPhone(branch.phone)}</td>
               </tr>
            )
         })}
      </tbody>
    </table>
   )
}

const mapStateToProps = state => ({
   branches: state.data.branches,
   showDeleted: state.branch.showDeleted
   })

const mapDispatchToProps = {
   editBranch
}
  
 export default connect(mapStateToProps, mapDispatchToProps)(TableBranches)