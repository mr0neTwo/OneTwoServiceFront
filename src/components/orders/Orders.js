import React, { useState, useEffect, useRef } from 'react'
import _ from 'lodash'
import ReactPaginate from 'react-paginate'
import { connect } from 'react-firebase'

import Header from './Header'
import Filters from './Filters'
import TableOrders from './TableOrdrers'
import Loader from '../Loader/Loader'

function Orders({ dataOrders, dataEmployees }) {

  // Подгружаем заказы из Firebase
  const orders = useRef([])
  // Массив отсортированных заказов
  const orderSortered = useRef(null)
  // Запоминаем напровление сортировки
  const sort = useRef('asc')
  // Запоминаем поле по которому была произведена сортировка
  const sortField = useRef('id')
  // Запоминаем количество заказов для отрисовки на странице
  const pageSize = useRef(50)
  // Запоминаем текущую страницу
  const currentPage = useRef(0)
  // Считаем количество страниц
  const pageCount = useRef(null)
  // Делаем выборку заказов для отрисовки
  const [orderShow, setOrderShow] = useState(null)

  const changeOrdersShow = () => {
    setOrderShow(
      _.chunk(orderSortered.current, pageSize.current)[currentPage.current]
    )
  }

  // Функция сортировки
  const onSort = (field) => {
    // Сохраняем последнее поле сортировки
    sortField.current = field
    // Меняем направление сортировки при каждом клике
    sort.current = sort.current === 'asc' ? 'desc' : 'asc'
    // Заносим сортированный массив в State по определенным признакам (sortField - поле сортировки и  sort - направление)
    orderSortered.current = _.orderBy(orderSortered.current, sortField.current, sort.current)
    // Обновляем текущую страниуц
    currentPage.current = 0
    // Меняем массив для отрисовки
    changeOrdersShow()
  }

  const update = () => {
    orders.current = dataOrders ? Object.values(dataOrders) : null
    pageCount.current = orders.current ? Math.ceil(orders.current.length / 50) : null
    orderSortered.current = orders.current
    changeOrdersShow()
  }

  useEffect(update, [dataOrders])

  const pageChangeHandler = (page) => {
    currentPage.current = page.selected
    changeOrdersShow()
  }

  const oderSearch = (search) => {
    orderSortered.current = orders.current.filter(order => 
        (order.brand ? order.brand.toLowerCase().includes(search.toLowerCase()) : false)
        || (order.client.name ? order.client.name.toLowerCase().includes(search.toLowerCase()) : false)
        || (order.client.phone ? order.client.phone.toString().toLowerCase().includes(search.toLowerCase()) : false)
        || (order.custom_fields.f718506 ? order.custom_fields.f718506.toLowerCase().includes(search.toLowerCase()) : false)
        || (order.custom_fields.f718512 ? order.custom_fields.f718512.toLowerCase().includes(search.toLowerCase()) : false)
        || (order.custom_fields.f718514 ? order.custom_fields.f718514.toLowerCase().includes(search.toLowerCase()) : false)
        || (order.id_label ? order.id_label.toLowerCase().includes(search.toLowerCase()) : false)
        || (order.kindof_good ? order.kindof_good.toLowerCase().includes(search.toLowerCase()) : false)
        || (order.malfunction ? order.malfunction.toLowerCase().includes(search.toLowerCase()) : false)
        || (order.model ? order.model.toLowerCase().includes(search.toLowerCase()) : false)
        )
        orderSortered.current = _.orderBy(orderSortered.current, sortField.current, sort.current)
        pageCount.current =  Math.ceil(orderSortered.current.length / 50) 
        currentPage.current = 0
        changeOrdersShow()
  }

  return (
    <div className="ordersMain">
      <Header 
      oderSearch = {oderSearch}
      />
      <Filters />
      {orderShow ? (
        <>
          <TableOrders
            ordersShow={orderShow}
            onSort={onSort}
            sort={sort}
            sortField={sortField}
          />
          <div className="tableAllPage">
            <ReactPaginate
              pageCount={pageCount.current}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={pageChangeHandler}
              forcePage={currentPage.current}
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
              Всего - {orderSortered.current.length}
            </div>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  )
}

const mapFirebaseToProps = (props, ref) => ({
  dataOrders: 'orders',
})

export default connect(mapFirebaseToProps)(Orders)
