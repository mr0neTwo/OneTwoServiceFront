import React, { useState, useEffect, useRef } from 'react'
import _, { add } from 'lodash'
import ReactPaginate from 'react-paginate'
import { connect } from 'react-redux'

import Header from './Header'
import Filters from './Filters'
import TableOrders from './TableOrdrers'
import Loader from '../Loader/Loader'
import { addOrdersAction, addEmplooysAction, changePageAction, addStatusAction, addBaggesAction, addStatusGroupAction, addOrdersTypeAction, addCustomFilters } from '../../Redux/actions'
import CustomPanel from './CustomPanel'

function Orders(props) {



// Загружаем заказы
useEffect(() => {
  props.addEmplooys()
  props.addStatus()
  props.addStatusGroup()
  props.addOrdersType()
  props.addCustomFilters()
}, [])
  
const pageChangeHandler = (page) => {
  const curent_page = page.selected ? page.selected : 0
  props.changePage(curent_page)
}
  useEffect(()=>{
    props.addOrders()
    props. addBagges()
  }, [props.mainFilter])

  return (
    <div className="ordersMain">
        <Header oderSearch={''} />
        <Filters />
        <CustomPanel/>
        <TableOrders/>
        <div className="tableAllPage">
          <ReactPaginate
            pageCount={ props.count % 50 > 0 ? ( props.count / 50 ) :  props.count / 50 - 1} 
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={pageChangeHandler}
            forcePage={ props.mainFilter.page }
            previousLabel={'<'}
            nextLabel={'>'}
            breakLabel={'...'}
            breakClassName={'pages-pagination'}
            containerClassName={'pagination'}
            pageClassName={'pages-pagination'}
            activeClassName={'active'}
            nextClassName={'pages-pagination'}
            previousClassName={'pages-pagination'}
          />
            <div className="tablePageCount">
              Всего - { props.count }
            </div>
        </div>
    </div>
  )
}

const mapStateToProps = state => ({
   mainFilter: state.filter.mainFilter,
   count: state.filter.count,
})

const mapDispatchToProps = {
  addOrders: addOrdersAction,
  addEmplooys: addEmplooysAction,
  addStatus: addStatusAction,
  changePage: changePageAction,
  addBagges: addBaggesAction,
  addStatusGroup: addStatusGroupAction,
  addOrdersType: addOrdersTypeAction,
  addCustomFilters
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders)
