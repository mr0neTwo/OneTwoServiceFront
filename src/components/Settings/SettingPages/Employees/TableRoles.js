import React from 'react'
import { connect } from 'react-redux'

import { editRole } from '../../../../Redux/actions'

function TableRoles(props) {
   return (
      <>
      <table>
         <thead>
         <tr>
            <th>Название</th>
         </tr>
         </thead>
         <tbody>
            {props.roles.map(role => {
               return (
               <tr 
               key={role.id}
               onDoubleClick={() => props.editRole(role)}
               >
                  <td>{role.title}</td>
               </tr>
               )
            })}
         </tbody>
      </table>
      <div>Всего - {props.roles.length}</div>
      </>
   )}

const mapStateToProps = state => ({
   roles: state.data.roles
})

const mapDispatchToProps = {
   editRole
}

export default connect (mapStateToProps, mapDispatchToProps) (TableRoles)