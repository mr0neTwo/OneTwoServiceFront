import React from 'react'
import { connect } from 'react-redux'

import DataLoader from '../../data/DataLoader'

const Settings = (props) => {
  return (
    <div className="tempPage">
      <div className="tempContainer">
        <h1 className="tempTitle">Здесь будут настройки</h1>
        <p className="tempDescription">Страница на стадии разработки</p>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
//   dataSidebarRows: 'dataSidebarRows',
  // addTodo: todo => ref('todos').push(todo)
})

export default connect(mapStateToProps)(Settings)
