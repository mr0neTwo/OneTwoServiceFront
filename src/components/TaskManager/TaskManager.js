import React from 'react'
import { connect } from 'react-firebase'

const TaskManager = (props) => {
  return (
    <div className="tempPage">
      <div className="tempContainer">
        <h1 className="tempTitle">Здесь будет менеджер задач</h1>
        <p className="tempDescription">Страница на стадии разработки</p>
      </div>
    </div>
  )
}

const mapFirebaseToProps = (props, ref) => ({
  // todos: 'todos',
  // addTodo: todo => ref('todos').push(todo)
})

export default connect(mapFirebaseToProps)(TaskManager)
