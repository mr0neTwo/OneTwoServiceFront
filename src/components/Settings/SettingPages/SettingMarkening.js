import React from 'react'
import { connect } from 'react-redux'

const SettingMarkening = (props) => {
  return (
    <div className='settingContent'>
      <div className="temp-page">
        <div className="temp-page__body">
          <h3>Здесь будут маркетинг</h3>
          <h5>Страница на стадии разработки</h5>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps)(SettingMarkening)