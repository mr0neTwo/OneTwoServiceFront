
import React from 'react'
import { connect } from 'react-redux'

import { setOrderEquipment } from '../../../Redux/actions'

const EquipmentTitle = (props) => {
   return (
      <botton 
        className='optionsFilterText'
        id='optionsOrderTextOfGroup'
        onClick={() => props.setOrderEquipment(props.idx, props.title, {})}
      //   onClick={() => console.log(props.idx, props.title, {})}
      > 
       {props.equipments[props.idx][props.title].title}
        <span>&#6662;</span> 
      </botton>
   )
}

const mapStateToProps = state => ({
   equipments: state.order.equipments
   })

const mapDispatchToProps = {
   setOrderEquipment
}
  
 export default connect(mapStateToProps, mapDispatchToProps)(EquipmentTitle)