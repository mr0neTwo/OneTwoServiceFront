import React from 'react'
import { connect } from 'react-redux'

const Reports = (props) => {
  return (
    <div className="tempPage">
      <div className="tempContainer">
        <h1 className="tempTitle">Здесь будут отчеты</h1>
        <p className="tempDescription">Страница на стадии разработки</p>
      </div>
    </div>
  )
}



export default connect()(Reports)
