import React from 'react'
import { connect } from 'react-redux'

const SettingWherehouse = (props) => {
  return (
    <div className="tempPage">
      <div className="tempContainer">
        <h1 className="tempTitle">Здесь будут настройки складов</h1>
        <p className="tempDescription">Страница на стадии разработки</p>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  // todos: 'todos',
  // addTodo: todo => ref('todos').push(todo)
})

export default connect(mapStateToProps)(SettingWherehouse)