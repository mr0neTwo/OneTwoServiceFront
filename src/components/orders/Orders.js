import React, { useState, useEffect, useRef } from 'react'
import _, { add } from 'lodash'
import ReactPaginate from 'react-paginate'
import { connect } from 'react-redux'

import Header from './Header'
import Filters from './Filters'
import TableOrders from './TableOrdrers'
import Loader from '../Loader/Loader'
import OrderEditor from './newOrder/OrderEditor'
import { addOrders } from '../../Redux/actions/orderActions'
import { changePageAction, addBaggesAction, addStatusGroupAction, addCustomFilters, addAdCampaign, addEquipment } from '../../Redux/actions'
import CustomPanel from './CustomPanel'

function Orders(props) {


// Загружаем заказы
useEffect(() => {
  props.addStatusGroup()
  props.addCustomFilters()
  props.addAdCampaign()
  // props.addEquipment()
}, [props])


  
const pageChangeHandler = (page) => {
  const curent_page = page.selected ? page.selected : 0
  props.changePage(curent_page)
}
  useEffect(()=>{
    props.addOrders()
    props. addBagges()
  }, [props.mainFilter])

  return (
    <div className="pageContent">
        <Header oderSearch={''} />
        <Filters />
        <CustomPanel/>
        {props.ordersShow ? <TableOrders/> : <Loader/>}
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
        {props.statusOrderEditor ? <OrderEditor/> : null}
    </div>
  )
}

const mapStateToProps = state => ({
   mainFilter: state.filter.mainFilter,
   count: state.filter.count,
   ordersShow: state.data.ordersShow
})

const mapDispatchToProps = {
  addOrders,
  changePage: changePageAction,
  addBagges: addBaggesAction,
  addStatusGroup: addStatusGroupAction,
  addCustomFilters,
  addAdCampaign,
  addEquipment
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders)
