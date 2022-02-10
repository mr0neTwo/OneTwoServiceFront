import React from 'react'
import { connect } from 'react-redux'

const SettingTags = (props) => {
  return (
    <div className='settingContent'>
      <div className="tempPage">
        <div className="tempContainer">
          <h1 className="tempTitle">Здесь будут настройки тегов</h1>
          <p className="tempDescription">Страница на стадии разработки</p>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps)(SettingTags)