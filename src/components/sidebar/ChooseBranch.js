import React, { useState } from 'react'
import { connect } from 'react-redux'

import { addData } from '../../Redux/actions'
import Icon from '../general/Icon'

const ChooseBranch = (props) => {

   const [menuVisibel, setMenuVisibel] = useState(false)

   return (
      <div>
      <div 
         className='menuBranch'
         onClick={() => setMenuVisibel(!menuVisibel)}
      >
         <Icon 
            className='smalIcon'
            icon={props.current_branch.icon} 
            color={props.current_branch.color}
         />
         <div className='sidebarBranch'>
           {props.current_branch.name}
         </div>
      </div>
      {menuVisibel ? <div className='listOptionsBranch'>
         {props.branches.filter(branch => branch.employees.includes(props.user_id) && !branch.deleted).map(branch => (
            <div 
               key={branch.id}
               className='listBranch'
               onClick={() => {
                  props.addData(branch, 'current_branch')
                  setMenuVisibel(false)
               }}
            >
               <Icon 
                  className='smalIcon'
                  icon={branch.icon} 
                  color={branch.color}
               />
               <div className='ml5'>{branch.name}</div>
            </div>
         ))}
      </div> : null}
      </div>
   )
}

const mapStateToProps = state => ({
   current_branch: state.data.current_branch,
   branches: state.data.branches,
   user_id: state.data.user.id
   })

const mapDispatchToProps = {
   addData
}
  
 export default connect(mapStateToProps, mapDispatchToProps)(ChooseBranch)