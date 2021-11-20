
import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { changeOrderFormS } from '../../../Redux/actions'

import ChooseOfList from '../../general/ChooseOfList'

const AssingEmployee = (props) => {

   useEffect(() => {
      props.changeOrderFormS(props.user.id, 'manager_id')
   }, [])

   return (
      <div className = 'boxAssingEmployee'>

         <div className = 'formRow'>
          <div className='optionsTitle'>Менеджер</div> 
          <div className='blockImput'>
            <ChooseOfList
              id={17}
              list={props.employees}
              setElement={props.changeOrderFormS}
              current_id={props.manager_id}
              width={'250px'}
              className='pd-lf-5'
              field='manager_id'
              employee={true}
            /> 
          </div>
        </div>

        <div className = 'formRow'>
          <div className='optionsTitle'>Исполнитель</div> 
          <div className='blockImput'>
            <ChooseOfList
              id={18}
              list={props.employees}
              setElement={props.changeOrderFormS}
              current_id={props.engineer_id}
              width={'250px'}
              className='pd-lf-5'
              field='engineer_id'
              employee={true}
            /> 
          </div>
        </div>
         
      </div>
   )
}

const mapStateToProps = state => ({
   employees: state.data.employees,
   manager_id: state.order.manager_id,
   engineer_id: state.order.engineer_id,
   user: state.data.user
   })

const mapDispatchToProps = {
   changeOrderFormS
}
  
 export default connect(mapStateToProps, mapDispatchToProps)(AssingEmployee)