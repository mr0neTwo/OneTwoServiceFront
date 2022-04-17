import React from 'react'
import { connect } from 'react-redux'

import { icon_burn, icon_clock } from '../../../data/icons'
import { setVisibleFlag } from '../../../Redux/actions'
import Icon from '../../general/Icon'
import StatusList from '../StatusList'
import PaymentsEditor from '../../Payments/PaymentsEditor'

const TitleOrderEditor = (props) => {

  const iconBr = props.current_branch ? <Icon icon={props.current_branch.icon} color={props.current_branch.color} className='icon-sm8'/> : null
  const iconB = props.order.urgent ? <Icon icon={icon_burn} color='red' className='icon-sm8'/> : null
  const iconC = (!props.order.overdue && props.order.status.group < 4) ? <Icon icon={icon_clock} color='#f0ad4e' className='icon-sm8'/> : null

   return (

      <div className="createNewTitle">
         {props.order.edit ? 
         <div className='statusListOrder'>
            <span>Заказ № {props.order.id_label}</span>
            <span className='ml10 fsz12'>
               <button
                  id='statusListOrderForm'
                  className="statusButtom"
                  type="button"
                  style={{ backgroundColor: props.order.status.color }}
                  onClick={() => props.setVisibleFlag('statusStatusList', true)}
               >
                  {props.order.status.name}
                  <span className="statusSeparate"> | &#6662;</span>
               </button>
               {props.statusStatusList ?
                   <StatusList
                       order={props.order}
                   />
                   : null
               }
            </span>
            <span className='ml10'>{iconBr}</span>
            <span className='ml5'>{iconB}</span>   
            <span className='ml5'>{iconC}</span>
         </div> : 'Новый заказ'}
          {props.statusPaymentsEditor ? <PaymentsEditor/> : null}
      </div>
   )
}

const mapStateToProps = state => ({
    order: state.order,
    current_branch: state.data.current_branch,
    statusStatusList: state.view.statusStatusList,
    statusPaymentsEditor: state.view.statusPaymentsEditor
})

const mapDispatchToProps = {
   setVisibleFlag
}
  
 export default connect(mapStateToProps, mapDispatchToProps)(TitleOrderEditor)