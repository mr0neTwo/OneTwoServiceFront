import React from 'react'
import { connect } from 'react-redux'

const Wherehouse = (props) => {
  return (
    <div className="tempPage">
      <div className="tempContainer">
        <h1 className="tempTitle">Здесь будет склад</h1>
        <p className="tempDescription">Страница на стадии разработки</p>
      </div>
    </div>
  )
}

// const mapStateToProps = state => ({
  // todos: 'todos',
// })

export default connect(null, null)(Wherehouse)
