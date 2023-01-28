import React from 'react'
import { connect } from 'react-redux'

const SettingTags = (props) => {
  return (
    <div className='settingContent'>
      <div className="temp-page">
        <div className="temp-page__body">
          <h3>Здесь будут настройки тегов</h3>
          <h5>Страница на стадии разработки</h5>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps)(SettingTags)