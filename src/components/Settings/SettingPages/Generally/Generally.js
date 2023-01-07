import React from 'react'
import { connect } from 'react-redux'
import MainData from './MainData'

const Generally = (props) => {
  
  return (
    <div className='settingContent'>
        <div className='header'>
          <span className='headerTitle'>Общие</span>
        </div>
        <div className='settingPageBody'>
          <MainData/>

        </div>
      </div>
  )
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps)(Generally)