import React, { useEffect } from 'react'
import StatusListGroup from './StatusListGroup'

function StatusList({ orderId, openStatusMenu }) {
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
      openStatusMenu(orderId)
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
          openStatusMenu={openStatusMenu}
        />
      ))}
    </div>
  )
}

export default StatusList
