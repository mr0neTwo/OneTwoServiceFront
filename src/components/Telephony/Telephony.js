import React from 'react'
import { connect } from 'react-redux'

const Telephony = (props) => {
  return (
    <div className="temp-page">
      <div className="temp-page__body">
        <h3>Здесь будут звонки</h3>
        <h5>Страница на стадии разработки</h5>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  // todos: 'todos',
})

export default connect(mapStateToProps)(Telephony)
