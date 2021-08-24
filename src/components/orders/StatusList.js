import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { changeStatusMenuVisibleAction } from '../../Redux/actions'
import StatusListGroup from './StatusListGroup'

function StatusList({ orderId, changeStatusMenuVisible }) {
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
      event.target.parentElement.id !== 'statusList' &&
      event.target.id !== 'statusList'
    ) {
      changeStatusMenuVisible(orderId)
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
          orderId={orderId}
          groupIdx={idx}
        />
      ))}
    </div>
  )
}

const mapDispatchToProps = {
  changeStatusMenuVisible: changeStatusMenuVisibleAction
}

export default connect(null, mapDispatchToProps) (StatusList)
