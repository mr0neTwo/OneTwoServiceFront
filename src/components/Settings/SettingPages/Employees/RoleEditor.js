import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { changeStatusCteateNewRole, changeTitleCreateRole, createRole, seveEditRole, deleteRole } from '../../../../Redux/actions'

import PermissionsGroup from './PermissionsGroup'
import ChooseAvailableStatuses from './ChooseAvailableStatuses'
import { permission } from '../../../../data/permissions'
import ChooseButton from './ChooseButton'
import CooseAvailablePrices from './CooseAvailablePrices'


const RoleEditor = (props) => {

   const clickHandel = (event) => {
      if (!event.path.map(el => el.id).includes('createNewRoleWiondow') ) {
          props.changeStatusCteateNewRole()
    }}
   
    useEffect(() => {
      window.addEventListener('click', clickHandel)
      return () => {
        window.removeEventListener('click', clickHandel)
      }
    })

   return (
     <div className='rightBlock'>
        <div 
        className='rightBlockWiondow'
        id='createNewRoleWiondow'
        >
         <div className='createNewTitle'>
           {props.edit ? props.title_create : ' Новая роль'}
         </div>

         

         <div className='lableImput'>Название<span className='redStar'>*</span></div>
         <input 
         className='textInput'
         onChange={(event) => props.changeTitleCreateRole(event.target.value)}
         value={props.title_create}
         />

         {permission.map((permission, idx) => <PermissionsGroup data={permission} key={idx}/>)}
         
         <ChooseButton/>

         <div className='lableImput mr-top-15'>Доступные статусы заказов</div>
         <ChooseAvailableStatuses status={props.status.filter(status => status.group < 8)}/>

         <div className='lableImput mr-top-15'>Доступные статусы обращений</div>
         <ChooseAvailableStatuses status={props.status.filter(status => status.group > 7)}/>

         <div className='lableImput mr-top-15'>Доступ к ценам</div>
         <CooseAvailablePrices/>

         

         <div className='buttons_ mr-top-15'>
            <div className='buttons'>
               { props.edit ?
               <div 
               className='blueButton mr-lf-0 '
               onClick={() => {
                  props.seveEditRole(props.edit)
                  props.changeStatusCteateNewRole()
               }}
               >
                  Сохранить
               </div>
               : <div 
               className='blueButton mr-lf-0 '
               onClick={() => {
                  props.createRole()
                  props.changeStatusCteateNewRole()
               }}
               >
                  Создать
               </div>
               }
               <div 
               className='whiteBlueBotton'
               onClick={() => props.changeStatusCteateNewRole()}
               >
                  Закрыть
               </div>
            </div>
            { props.edit ?
            <div 
            className='whiteButton simbolBotton'
            onClick={() => {
               props.deleteRole(props.edit)
               props.changeStatusCteateNewRole()
            }}
            >
               <svg className="icon-table-red-basket" viewBox="0 0 32 32">
               <path d="M4 10v20c0 1.1 0.9 2 2 2h18c1.1 0 2-0.9 2-2v-20h-22zM10 28h-2v-14h2v14zM14 28h-2v-14h2v14zM18 28h-2v-14h2v14zM22 28h-2v-14h2v14z"></path>
               <path d="M26.5 4h-6.5v-2.5c0-0.825-0.675-1.5-1.5-1.5h-7c-0.825 0-1.5 0.675-1.5 1.5v2.5h-6.5c-0.825 0-1.5 0.675-1.5 1.5v2.5h26v-2.5c0-0.825-0.675-1.5-1.5-1.5zM18 4h-6v-1.975h6v1.975z"></path>
               </svg> 
            </div> : null}
         </div>
        </div>
     </div>
   )
}

const mapStateToProps = state => ({
   title_create: state.role.title_create,
   edit: state.role.edit,
   status: state.data.status
   })

   const mapDispatchToProps = {
      changeStatusCteateNewRole,
      changeTitleCreateRole,
      createRole,
      seveEditRole,
      deleteRole
   }
  
 export default connect(mapStateToProps, mapDispatchToProps)(RoleEditor)