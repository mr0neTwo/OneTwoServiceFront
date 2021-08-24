import React from 'react'
import { connect } from 'react-redux'

import { appCustomFilter } from '../../Redux/actions'

const CustomFilter = (props) => {
   return (
    <div 
    className='customFilter'
    onClick={() => props.appCustomFilter(props.data.filters, props.data.id)}
    style={{backgroundColor: props.customFilters.find(filter => filter.id === props.data.id).active ? '#eeeeef' : 'white'}}
    >
       <div className='titleCustumFilter'>
         {props.data.title}
       </div>
    </div>
   )
}

const mapStateToProps = state => ({
  customFilters: state.filter.customFilters
   })
  
const mapDispatchToProps = {
  appCustomFilter
}
  
 export default connect(mapStateToProps, mapDispatchToProps)(CustomFilter)