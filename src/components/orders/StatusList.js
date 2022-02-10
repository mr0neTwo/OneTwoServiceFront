import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { changeStatusMenuVisibleAction, setVisibleFlag } from '../../Redux/actions'
import StatusListGroup from './StatusListGroup'

function StatusList(props) {
  const groupName = [
    'Новые',
    'На исполнении',
    'Отложенные',
    'Готовые',
    '',
    'Закрытые успешно',
    'Закрытые не успешно',
  ]

  const clichHandel = (event) => {
    if (
      // event.target.parentElement.id !== 'statusList' &&
      // event.target.id !== 'statusList'
      !event.path.map(el => el.id).includes('statusListOrderForm') 
    ) {
      props.changeStatusMenuVisible(props.orderId)
      props.setVisibleFlag('statusStatusList', false)
    }
  }

  useEffect(() => {
    window.addEventListener('click', clichHandel)
    return () => {
      window.removeEventListener('click', clichHandel)
    }
  })

  return (
    <div className="statusList" id="statusList">
      {groupName.map((groupName, idx) => (
        <StatusListGroup
          key={idx + groupName}
          groupName={groupName}
          orderId={props.orderId}
          groupIdx={idx}
        />
      ))}
    </div>
  )
}

const mapDispatchToProps = {
  changeStatusMenuVisible: changeStatusMenuVisibleAction,
  setVisibleFlag
}

export default connect(null, mapDispatchToProps) (StatusList)
