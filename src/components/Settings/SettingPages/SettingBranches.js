
import React from 'react'
import { connect } from 'react-redux'

const SettingBranches = (props) => {
  return (
    <div className="tempPage">
      <div className="tempContainer">
        <h1 className="tempTitle">Здесь будут настройки филиалов</h1>
        <p className="tempDescription">Страница на стадии разработки</p>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  // todos: 'todos',
  // addTodo: todo => ref('todos').push(todo)
})

export default connect(mapStateToProps)(SettingBranches)