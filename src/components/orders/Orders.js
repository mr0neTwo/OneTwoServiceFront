import React, {useState, useEffect} from 'react';
import Header from '../Header';
import Filters from './Filters';
import TableOrders from './TableOrdrers';
import Loader from '../Loader/Loader';
import _ from 'lodash';
import ReactPaginate from 'react-paginate';

















function Orders(props) {

    // Test speed filters ============================================
    // console.log(`Найдено ${props.orders.lenght} заказов`)
    // let time = performance.now();
    // console.log(props.orders.filter(key => key['client']['id'] === 7953012))
    // time = performance.now() - time;
    // console.log('Время выполнения фильтра = ', time);
    // ================================================================

    
    // Данные для отрисовки в таблице
    const [orderSortered, setOrderSortered] = useState(props.orders.slice())
    const [sort, setSort] = useState('asc')
    const [sortField, setSortField] = useState('id_label')
    const [pageSize, setPageSize] = useState(50)
    const [currentPage, setCurrentPage] = useState(0)
    const [pageCount, setPageCount] = useState(1)
    const [orderShow, setOrderShow] = useState(_.chunk(orderSortered, pageSize)[currentPage])

    // Функция сортировки
    const onSort = sortField => {
        // Сохраняем последнее поле сортировки
        setSortField(sortField)
        // Меняем направление сортировки при каждом клике
        setSort(sort === 'asc' ? 'desc' : 'asc');
        // Заносим сортированный массив в State по определенным признакам (sortField - поле сортировки и  sort - направление)
        setOrderSortered(_.orderBy(orderSortered, sortField, sort));
        
    }

    useEffect(() => {
        // Посчитаем кочичество страниц
        setPageCount(Math.ceil(orderSortered.length / pageSize))
    }, [orderSortered])

    useEffect(() => {
        setOrderShow(_.chunk(orderSortered, pageSize)[currentPage])
    }, [currentPage, orderSortered])
    


    const pageChangeHandler = page => {
        setCurrentPage(page.selected)
    }






    return (
        <div className = 'ordersMain'>
            <Header/>
            <Filters/>
            {orderSortered ? 
            <TableOrders 
            ordersShow = {orderShow}
            employees = {props.employees}
            status = {props.status}
            changeOderStatus = {props.changeOderStatus}
            onSort = {onSort}
            sort = {sort}
            sortField = {sortField}
            /> : <Loader/> }
            <div className = 'tableAllPage'>
                <ReactPaginate
                pageCount = {pageCount}
                marginPagesDisplayed = {2}
                pageRangeDisplayed = {5}
                onPageChange = {pageChangeHandler}
                forcePage = {currentPage}

                previousLabel = {'<'}
                nextLabel = {'>'}
                breakLabel = {'...'}
                breakClassName = {'pages-pagination'}
                containerClassName = {'pagination'}
                pageClassName = {'pages-pagination'}
                activeClassName = {'active'}
                nextClassName = {'pages-pagination'}
                previousClassName = {'pages-pagination'}
                />
                <div className = 'tablePageCount'>Всего - {orderSortered.length}</div>
            </div>
        </div>
    )  
}

export default Orders;
