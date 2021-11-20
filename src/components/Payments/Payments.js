import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { changeCashboxForm  } from '../../Redux/actions'

import Tabs from '../general/Tabs'
import Cashboxes from './cashboxes/Cashboxes'

const Payments = (props) => {

  useEffect(() => {
 
  }, [])


  return (
    <div className='pageContent'>

      <div className='Header'>
        <span className='headerTitle'>Финансы</span>
      </div>
        <div className='settingPageBody'>
      </div>

      <Tabs
        list={ ['Платежи', 'Взаиморасчеты', 'Счета'] }
        func={props.changeCashboxForm}
        tab={props.tabs}
      />
         {props.tabs === 0 ? <Cashboxes/>: null}
         {props.tabs === 1 ? null : null}
         {props.tabs === 2 ? null : null}


    </div>

  )
}

const mapStateToProps = state => ({
  tabs: state.cashbox.tabs

})

const mapDispatchToProps = {
  changeCashboxForm
}

export default connect(mapStateToProps, mapDispatchToProps)(Payments)

