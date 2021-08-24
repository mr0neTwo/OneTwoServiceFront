import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { addEquipment, addClients, appFilter, resetFilter, changeStatusCreateNewFilter, saveCustomFilter, removeFilter } from '../../../Redux/actions'

import SetBrand from './SetBrand'
import SetClient from './SetClient'
import SetDataCreate from './SetDataCreate'
import SetEngeneer from './SetEngeneer'
import SetGroup from './SetGroup'
import SetManager from './SetManager'
import SetSubtype from './SetSubtype'
import SetStatus from './SetStatus'
import SetTypeOrder from './SetTypeOrder'
import CreateNewFilter from '../CreateNewFilter'

const SetFilter = (props) => {

   useEffect(() => {
      props.addEquipment()
   }, [])

   useEffect(() => {
      props.addClients()
   }, [props.clientFilter])

   return (
      <div className='setCustomFilter'>
         <div className='filterOptions'>
            <div className='setCustomFilterRow'>
               <div className='setCustomFilterCell'> <SetStatus/> </div>
               <div className='setCustomFilterCell'> <SetGroup/> </div>
               <div className='setCustomFilterCell'> <SetClient/></div>
            </div>
            <div className='setCustomFilterRow'>
               <div className='setCustomFilterCell'> <SetTypeOrder/> </div>
               <div className='setCustomFilterCell'> <SetBrand/> </div>
               <div className='setCustomFilterCell'> <SetManager/>  </div>
            </div>
            <div className='setCustomFilterRow'>
               <div className='setCustomFilterCell'> <SetDataCreate/> </div>
               <div className='setCustomFilterCell'> <SetSubtype/> </div>
               <div className='setCustomFilterCell'> <SetEngeneer/> </div>
            </div>
         </div>
         <div className='buttons fs14'>
            <div 
            className='blueButton'
            onClick={() => props.appFilter()}
            >
               Применить
            </div>
            {props.customFilters.map(filter => filter.active).includes(true) ? 
            <>
               <div 
               className='whiteButton'
               onClick={() => props.saveCustomFilter()}
               >
                  Сохранить фильтр
               </div>
               <div 
               className='whiteButton simbolBotton'
               onClick={() => props.removeFilter()}
               >
                  <svg className="icon-table-red-basket" viewBox="0 0 32 32">
                  <path d="M4 10v20c0 1.1 0.9 2 2 2h18c1.1 0 2-0.9 2-2v-20h-22zM10 28h-2v-14h2v14zM14 28h-2v-14h2v14zM18 28h-2v-14h2v14zM22 28h-2v-14h2v14z"></path>
                  <path d="M26.5 4h-6.5v-2.5c0-0.825-0.675-1.5-1.5-1.5h-7c-0.825 0-1.5 0.675-1.5 1.5v2.5h-6.5c-0.825 0-1.5 0.675-1.5 1.5v2.5h26v-2.5c0-0.825-0.675-1.5-1.5-1.5zM18 4h-6v-1.975h6v1.975z"></path>
                  </svg>
               </div>
            </> :
            <div 
            className='whiteButton'
            onClick={() => props.changeStatusCreateNewFilter()}
            >
               Создать фильтр
            </div>
            }
            <div 
            className='whiteButton'
            onClick={() => props.resetFilter()}
            > 
            
               <span className='blackCross'>✖</span>Сбросить параметы
            </div>
         </div>
         {props.statusCreateNewFilter ? <CreateNewFilter/> : null}
      </div>
   )
}

const mapStateToProps = state => ({
   clientFilter: state.filter.clientFilter,
   statusCreateNewFilter: state.view.statusCreateNewFilter,
   customFilters: state.filter.customFilters
   })

const mapDispatchToProps = {
   addEquipment,
   addClients,
   appFilter,
   resetFilter,
   changeStatusCreateNewFilter,
   saveCustomFilter,
   removeFilter
}
  
 export default connect(mapStateToProps, mapDispatchToProps)(SetFilter)