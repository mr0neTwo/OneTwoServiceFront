import React from 'react'
import { connect } from 'react-redux'

import { setVisibleFlag } from '../../../../Redux/actions'
import { editPayrule } from '../../../../Redux/actions/payrulleAction'
import SalaryRuleEditor from './SalaryRuleEditor'

const SalaryRule = (props) => {
   return (
      <div className = ''>

         <div className="lableImput mt15">Зарплата</div>
         <div 
            className='greenButton'
            onClick={() => props.setVisibleFlag('statusSalaryEditor', true)}
         > 
            + Правило
         </div>
         <table>
            <thead>
               <tr>
                  <th>Правила</th>
               </tr>
            </thead>
            <tbody>
               {props.payrules.filter(payrule => !payrule.deleted && props.employee_id === payrule.employee_id).map(payrule => (
                  <tr 
                     key={payrule.id}
                     onDoubleClick={() => {
                        props.editPayrule(payrule)
                        props.setVisibleFlag('statusSalaryEditor', true)
                     }}
                  >
                     <td>{payrule.title}</td>
                  </tr>
               ))}
               
            </tbody>
         </table>
      {props.statusSalaryEditor ? <SalaryRuleEditor/> : null}
      </div>
   )
}

const mapStateToProps = state => ({
   statusSalaryEditor: state.view.statusSalaryEditor,
   payrules: state.data.payrules,
   employee_id: state.employee.edit
   })

const mapDispatchToProps = {
   setVisibleFlag,
   editPayrule
}
  
 export default connect(mapStateToProps, mapDispatchToProps)(SalaryRule)