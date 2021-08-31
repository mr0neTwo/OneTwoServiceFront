import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { changeClientListFilter, changeClientMainFilter, changeNameClientFilter } from '../../../Redux/actions'

const SetClient = (props) => {

  const clickHandel = (event) => {
    if (
       !event.path.map(el => el.id).includes('listFilterOfClient') &&
       !event.path.map(el => el.id).includes('optionsFilterTextOfClient')
       ) {
       if (props.clientListFilter) {
        props.changeClientListFilter()
    }}
  }
 
  useEffect(() => {
    window.addEventListener('click', clickHandel)
    return () => {
      window.removeEventListener('click', clickHandel)
    }
  })

   return (
    <>
    <div className='optionsFilterTitle'>Клиент</div>
    <div 
    className='optionsFilterText'
    id='optionsFilterTextOfClient'
    onClick={() => props.changeClientListFilter()}
    > 
      <input 
      className='optionFilterInput'
      onChange={event => {
        props.changeClientMainFilter(event.target.value)
        props.changeNameClientFilter(event.target.value)
      }}
      placeholder='Выбирете клиента'
      value={props.tempFilter.client_name}
      />
      <span>&#6662;</span> 
    </div>
    {props.clientListFilter ? <div className='listFilter' id='listFilterOfClient'>
      {props.clientShow.map(client => {
        // console.log()
       return (
        client.name.toLowerCase().includes(props.tempFilter.client_name.toLowerCase()) ? 
        <div 
        key={client.id}
        className='rowGropList'
        onClick={() => {
          props.changeClientMainFilter(client.name)
          props.changeClientListFilter()
        }}
        >
          {client.name}
        </div> : null
      )})}

    </div> : null}
    </>
   )
}

const mapStateToProps = state => ({
  clientListFilter: state.view.clientListFilter,
  clientShow: state.data.clientShow,
  tempFilter: state.filter.tempFilter
})

const mapDispatchToProps = {
  changeClientListFilter,
  changeClientMainFilter,
  changeNameClientFilter
}
  
 export default connect(mapStateToProps, mapDispatchToProps)(SetClient)