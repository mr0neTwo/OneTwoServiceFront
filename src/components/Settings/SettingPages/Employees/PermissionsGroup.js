import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux'

import PermissionsCheckbox from './PermissionsCheckbox'
import { changePermissions } from '../../../../Redux/actions'


const PermissionsGroup = (props) => {


   const mainCheckbox = useRef()
  
   useEffect(() => {
      const values = props.data.permission.filter(per => props.list_permissions.includes(per.value))
      if (values.length === props.data.permission.length) {
         mainCheckbox.current.indeterminate = false
         mainCheckbox.current.checked = true
      } else if (!values.length) {
         mainCheckbox.current.indeterminate = false
         mainCheckbox.current.checked = false
      } else {
         mainCheckbox.current.indeterminate = true
      }
   }, [props.list_permissions])

  return (
    <div className="chackboxes">
      <div className='checkbox'>
         <input 
         ref={mainCheckbox}
         type='checkbox' 
         onChange={() => props.changePermissions(props.data.permission.map(per => per.value))}
         />
         <label>{props.data.description}</label>
      </div>
      {props.data.permission.map((permission, idx) => {
         return <PermissionsCheckbox value={permission.value} description={permission.description} key={idx}/>
      })}
     

    </div>
  )
}

const mapStateToProps = state => ({
   list_permissions: state.role.list_permissions
})

const mapDispatchToProps = {
   changePermissions
}

export default connect(mapStateToProps, mapDispatchToProps)(PermissionsGroup)