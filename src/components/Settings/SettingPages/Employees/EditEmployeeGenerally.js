import React from 'react'
import { connect } from 'react-redux'
import InputMask from 'react-input-mask'

import { changeEmployeEditorForm, changeEmployeeEditorRoleOptions, setRoleEmployeeEdetor } from '../../../../Redux/actions'

function EditEmployeeGenerally (props) {
   return (
      <div className='employeeGenterally'>
         <div className='buttons'>

            <div className='flexColumn mr-rg-20'>
               <div className='lableImput'>Имя<span className='redStar'>*</span></div>
               <input 
                  className='textInput w250'
                  name='first_name'
                  onChange={(event) => props.changeEmployeEditorForm(event.target.name, event.target.value)}
                  value={props.first_name}
               />
            </div>

            <div className='flexColumn'>
               <div className='lableImput'>Фамилия</div>
               <input 
                  className='textInput w250'
                  name='last_name'
                  onChange={(event) => props.changeEmployeEditorForm(event.target.name, event.target.value)}
                  value={props.last_name}
               />
            </div>

         </div>

         
         <div className='lableImput'>email<span className='redStar'>*</span></div>
         <input 
            className='textInput w250'
            name='email'
            onChange={(event) => props.changeEmployeEditorForm(event.target.name, event.target.value)}
            value={props.email}
         />

         <div className='lableImput'>login<span className='redStar'>*</span></div>
         <input 
            className='textInput w250'
            name='login'
            onChange={(event) => props.changeEmployeEditorForm(event.target.name, event.target.value)}
            value={props.login}
         />
      
         <div className='lableImput'>Пароль<span className='redStar'>*</span></div>
         <input 
            className='textInput w250'
            name='password'
            onChange={(event) => props.changeEmployeEditorForm(event.target.name, event.target.value)}
            value={props.password}
         />
      
         <div className='lableImput'>Телефон</div>
         <InputMask 
            mask="+7(999) 999-99-99"
            className='textInput w250'
            name='phone'
            onChange={(event) => props.changeEmployeEditorForm(event.target.name, event.target.value)}
            value={props.phone}
         />
         
      
         <div className='lableImput'>ИНН Сотрудника</div>
         <input 
            className='textInput w250'
            name='inn'
            onChange={(event) => props.changeEmployeEditorForm(event.target.name, event.target.value)}
            value={props.inn}
         />
         
         <div className='lableImput'>Имя сотрудника впечатынх документах</div>
         <input 
            className='textInput w250'
            name='doc_name'
            onChange={(event) => props.changeEmployeEditorForm(event.target.name, event.target.value)}
            value={props.doc_name}
         />

         <div className='lableImput'>Примечание</div>
         <textarea 
            className='textInput'
            name='notes'
            onChange={(event) => props.changeEmployeEditorForm(event.target.name, event.target.value)}
            value={props.notes}
         />

         <div className='lableImput'>Роль</div>
         <div className='w250'>
            <div 
               className='optionsButton' 
               onClick={() => props.changeEmployeeEditorRoleOptions()}
            >
               <span>
                  {props.role_id ? props.roles.find(role => role.id === props.role_id).title : 'Выберете роль'}
               </span>
               <span>&#6662;</span>
            </div>
            {props.employeeEditorRoleOptions ?
               <div className='listOptions'>
               {props.roles.map(role => {
                  return(
                  <div
                     className='options'
                     onClick={() => {
                        props.setRoleEmployeeEdetor(role.id)
                     }}
                  >
                     {role.title}
                  </div>
               )})}
            </div> : null}
         </div> 
         
      </div>
   )
}

const mapStateToProps = state => ({
   first_name: state.employee.first_name,
   last_name: state.employee.last_name,
   email: state.employee.email,
   notes: state.employee.notes,
   phone: state.employee.phone,
   login: state.employee.login,
   password: state.employee.password,
   role_id: state.employee.role_id,
   inn: state.employee.inn,
   doc_name: state.employee.doc_name,
   roles: state.data.roles,
   employeeEditorRoleOptions: state.view.employeeEditorRoleOptions
})

const mapDispatchToProps = {
   changeEmployeEditorForm,
   changeEmployeeEditorRoleOptions,
   setRoleEmployeeEdetor
}

export default connect (mapStateToProps, mapDispatchToProps) (EditEmployeeGenerally)