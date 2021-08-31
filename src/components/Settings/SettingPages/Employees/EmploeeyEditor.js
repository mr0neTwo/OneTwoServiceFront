import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { changeEmployeeTabs, changeStatusEmployeeEditor, createEmployee, seveEditEmployee, deleteEmployee } from '../../../../Redux/actions'
import EditEmployeeGenerally from './EditEmployeeGenerally'
import EditEmployeePermission from './EditEmployeePermission'



const EmploeeyEditor = (props) => {

   const clickHandel = (event) => {
      if (!event.path.map(el => el.id).includes('createNewRoleWiondow') ) {
          props.changeStatusEmployeeEditor()
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
            {props.edit ? `${props.last_name} ${props.first_name}` : 'Новый сотрудник'}
         </div>
        
         <div className='tabs'>
            <div 
            className={props.tabs === 1 ? 'tabOn' : 'tab'}
            onClick={() => props.changeEmployeeTabs(1)}
            >
               Общие
            </div>
            <div 
            className={props.tabs === 2 ? 'tabOn' : 'tab'}
            onClick={() => props.changeEmployeeTabs(2)}
            >
               Доступ
            </div>
         </div>

         {props.tabs === 1 ? <EditEmployeeGenerally/> : null}
         {props.tabs === 2 ? <EditEmployeePermission/> : null}

        
        

         <div className='buttons_ mr-top-15'>
            <div className='buttons'>
               { props.edit ?
               <div 
               className='blueButton mr-lf-0 '
               onClick={() => {
                  props.seveEditEmployee(props.edit)
                  props.changeStatusEmployeeEditor()
               }}
               >
                  Сохранить
               </div>
               : <div 
               className='blueButton mr-lf-0 '
               onClick={() => {
                  props.createEmployee()
                  props.changeStatusEmployeeEditor()
               }}
               >
                  Создать
               </div>
               }
               <div 
               className='whiteBlueBotton'
               onClick={() => props.changeStatusEmployeeEditor()}
               >
                  Закрыть
               </div>
            </div>
            { props.edit ?
            <div 
            className='whiteButton simbolBotton'
            onClick={() => {
               props.deleteEmployee()
               props.changeStatusEmployeeEditor()
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
   tabs: state.employee.tabs,
   edit: state.employee.edit,
   first_name: state.employee.first_name,
   last_name: state.employee.last_name
   })

   const mapDispatchToProps = {
      changeEmployeeTabs,
      changeStatusEmployeeEditor,
      createEmployee,
      seveEditEmployee,
      deleteEmployee
   }
  
 export default connect(mapStateToProps, mapDispatchToProps)(EmploeeyEditor)