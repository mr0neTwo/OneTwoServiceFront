import React from 'react'
import { connect } from 'react-redux'

const Analytics = (props) => {
   return (
      <div className='temp-page'>
         <div className='temp-page__body'>
            <h3>Здесь будет аналитика</h3>
            <h5>Страница на стадии разработки</h5>
         </div>
      </div>
   )
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = {

}
  
 export default connect(mapStateToProps, mapDispatchToProps)(Analytics)