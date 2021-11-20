
import React from 'react'
import { connect } from 'react-redux'

const Clause = (props) => {
   return (
      <div className={`row ${props.className}`}>
         <span className='lableImput'>{ props.title }</span>
         <span className='ml5'>{ props.text }</span>
      </div>
   )
}

const mapStateToProps = state => ({

   })

const mapDispatchToProps = {

}
  
 export default connect(mapStateToProps, mapDispatchToProps)(Clause)