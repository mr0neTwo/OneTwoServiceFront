
import React from 'react'
import { connect } from 'react-redux'

const ClientTask = (props) => {
   return (
      <div className = 'temp-page'>
         <div className = 'temp-page__body'>
            <h1 className = 'tempTitle'>Задачи</h1>
            <p className = 'tempDescription'>Страница на стадии разработки</p>
         </div>
      </div>
   )
}

const mapStateToProps = state => ({

   })

const mapDispatchToProps = {

}
  
 export default connect(mapStateToProps, mapDispatchToProps)(ClientTask)