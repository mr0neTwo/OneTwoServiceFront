import React from 'react'
import { connect } from 'react-redux'

const Reports = (props) => {
  return (
    <div className="temp-page">
      <div className="temp-page__body">
        <h3>Здесь будут отчеты</h3>
        <h5>Страница на стадии разработки</h5>
      </div>
    </div>
  )
}



export default connect()(Reports)
