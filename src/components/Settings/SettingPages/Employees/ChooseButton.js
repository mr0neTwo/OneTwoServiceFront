import React from 'react'
import { connect } from 'react-redux'

import {
  cahngeOrdersVisibility,
  cahngeLeadsVisibility,
  cahngeEarningsVisibility,
} from '../../../../Redux/actions'

function ChooseButton(props) {
  return (
    <div>
      <div className="lableImput mt15">Отет по сотрудникам</div>
      <div className="checkButton">
        <div
          className={
            props.earnings_visibility ? 'checkButtonTwo' : 'checkButtonOne'
          }
          onClick={() => props.cahngeEarningsVisibility(true)}
        >
          По всем сотрудникам
        </div>
        <div
          className={
            props.earnings_visibility ? 'checkButtonOne' : 'checkButtonTwo'
          }
          onClick={() => props.cahngeEarningsVisibility(false)}
        >
          Только свою ЗП
        </div>
      </div>

      <div className="lableImput mt15">Заказы</div>
      <div className="checkButton">
        <div
          className={
            props.orders_visibility ? 'checkButtonTwo' : 'checkButtonOne'
          }
          onClick={() => props.cahngeOrdersVisibility(true)}
        >
          Все заказы
        </div>
        <div
          className={
            props.orders_visibility ? 'checkButtonOne' : 'checkButtonTwo'
          }
          onClick={() => props.cahngeOrdersVisibility(false)}
        >
          Только свои заказы
        </div>
      </div>

      <div className="lableImput mt15">Обращения</div>
      <div className="checkButton">
        <div
          className={
            props.leads_visibility ? 'checkButtonTwo' : 'checkButtonOne'
          }
          onClick={() => props.cahngeLeadsVisibility(true)}
        >
          Все обращения
        </div>
        <div
          className={
            props.leads_visibility ? 'checkButtonOne' : 'checkButtonTwo'
          }
          onClick={() => props.cahngeLeadsVisibility(false)}
        >
          Только свои обращения
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  earnings_visibility: state.role.earnings_visibility,
  leads_visibility: state.role.leads_visibility,
  orders_visibility: state.role.orders_visibility,
})

const mapDispatchToProps = {
  cahngeOrdersVisibility,
  cahngeLeadsVisibility,
  cahngeEarningsVisibility,
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseButton)
