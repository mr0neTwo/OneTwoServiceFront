import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { changeStatusMenuVisible, setVisibleFlag } from '../../Redux/actions'
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
    if (!event.path.map(el => el.id).includes('statusListOrderForm')) {
      props.changeStatusMenuVisible(props.order.id)
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
          groupIdx={idx}
          order={props.order}
        />
      ))}
    </div>
  )
}

const mapDispatchToProps = {
  changeStatusMenuVisible,
  setVisibleFlag
}

export default connect(null, mapDispatchToProps) (StatusList)
