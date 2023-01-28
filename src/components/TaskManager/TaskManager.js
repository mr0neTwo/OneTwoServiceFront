import React from 'react'
import { connect } from 'react-redux'

const TaskManager = (props) => {
  return (
    <div className="temp-page">
      <div className="temp-page__body">
        <h3>Здесь будет менеджер задач</h3>
        <h5>Страница на стадии разработки</h5>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  // todos: 'todos',
})

export default connect(mapStateToProps)(TaskManager)
