import React from 'react'
import { connect } from 'react-redux'

import CustomFilter from './CustomFilter'
import SetFilter from './setCustomFilter/SetFilter'
import { changeSetStatusFilter, setVisibleFlag, changeOrderFormS } from '../../Redux/actions'
import OrderEditor from './newOrder/OrderEditor'
import { icon_table } from '../../data/icons'

const CustomPanel = (props) => {

   const newOrder = () => {
      // if (!props.edit) {
      //    props.changeOrderFormS(parseInt(Date.now() / 1000) + 4 * 24 * 3600, 'estimated_done_at')
      //  }
      props.changeOrderFormS(props.user.id, 'manager_id')
      props.setVisibleFlag('statusOrderEditor', true)
   }

   return (
      <div className='mainCustomPanel'>
         <div className='customPanel'>
            <div 
               className='greenButton h27'
               style={props.permissions.includes('create_orders') ?  null : {display: 'none'}}
               onClick = { newOrder }>
                  + Заказ 
            </div>
            
            <div className='customFilters'>
               <div 
               className='customFilter'
               onClick = { ()=> props.changeSetStatusFilter() }>
                  <div className='cl11'>
                  <svg className="icon-table" viewBox="0 0 32 32">
                     <path d="M16 0c-8.837 0-16 2.239-16 5v3l12 12v10c0 1.105 1.791 2 4 2s4-0.895 4-2v-10l12-12v-3c0-2.761-7.163-5-16-5zM2.95 4.338c0.748-0.427 1.799-0.832 3.040-1.171 2.748-0.752 6.303-1.167 10.011-1.167s7.262 0.414 10.011 1.167c1.241 0.34 2.292 0.745 3.040 1.171 0.494 0.281 0.76 0.519 0.884 0.662-0.124 0.142-0.391 0.38-0.884 0.662-0.748 0.427-1.8 0.832-3.040 1.171-2.748 0.752-6.303 1.167-10.011 1.167s-7.262-0.414-10.011-1.167c-1.24-0.34-2.292-0.745-3.040-1.171-0.494-0.282-0.76-0.519-0.884-0.662 0.124-0.142 0.391-0.38 0.884-0.662z"></path>
                  </svg>
               </div> Фильтр
               </div>
               {props.customFilters.map(filter => {
                  return (
                  <CustomFilter data = {filter} key = {filter.id}/>
                  )
               })}
            </div>
            <div 
               className='chooseFieldButton'
               onClick = {()=> console.log('ckick on "set table"')}
            >
               <div className='cl11'>
                  <svg className="icon-table" viewBox="0 0 32 32">
                     <path d={icon_table}></path>
                  </svg>
               </div>
               <div className='cl12'>
                  <span className="fieldSeparate">&#6662;</span>
               </div>   
            </div>
         </div>
         
            {props.statusSetCustomFilter ? <SetFilter/> : null}
         
      </div>
   )
}

const mapStateToProps = state => ({
   customFilters: state.filter.customFilters,
   statusSetCustomFilter: state.view.statusSetCustomFilter,
   permissions: state.data.user.role.permissions,
   statusOrderEditor: state.view.statusOrderEditor,
   user: state.data.user,
   edit: state.order.edit
   })

const mapDispatchToProps = {
   changeSetStatusFilter,
   setVisibleFlag,
   changeOrderFormS
}
  
 export default connect(mapStateToProps, mapDispatchToProps)(CustomPanel)