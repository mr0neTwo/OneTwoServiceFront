import React from 'react'
import { connect } from 'react-firebase'

import DataLoader from '../../data/DataLoader'

const Settings = (props) => {
  return (
    <div className="tempPage">
      <div className="tempContainer">
        <h1 className="tempTitle">Здесь будут настройки</h1>
        <p className="tempDescription">Страница на стадии разработки</p>
        <DataLoader />
      </div>
    </div>
  )
}

const mapFirebaseToProps = (props, ref) => ({
//   dataSidebarRows: 'dataSidebarRows',
  // addTodo: todo => ref('todos').push(todo)
})

export default connect(mapFirebaseToProps)(Settings)
