
import React from 'react'
import { connect } from 'react-redux'

import { changePermissions } from '../../../../Redux/actions'

const PermissionsCheckbox = (props) => {
  return (

      <div className='subCheckbox'>
         <input 
         type='checkbox'
         onChange={() => props.changePermissions([props.value])}
         checked={props.list_permissions.includes(props.value)}
         />
         <label>{props.description}</label>
      </div>
  )
}

const mapStateToProps = state => ({
   list_permissions: state.role.list_permissions
})
const mapDispatchToProps = {
   changePermissions
}

export default connect(mapStateToProps, mapDispatchToProps)(PermissionsCheckbox)