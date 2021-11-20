
import React from 'react'
import { connect } from 'react-redux'

function EditEmployeePermission (props) {
   return (
      <div className = 'tempPage'>
         <div className = 'tempContainer'>
            <h1 className = 'tempTitle'>Настройки доступа</h1>
            <p className = 'tempDescription'>Страница на стадии разработки</p>
         </div>
      </div>
   )
}

export default connect () (EditEmployeePermission)