import React, {useEffect} from 'react'
import { connect } from 'react-redux'

import {addRemain, changeRemainState, selectedRemain} from '../../../Redux/actions/remainAction'
import {addWarehouseCategories} from '../../../Redux/actions/warehouseAction'

import SelectFromList from '../../general/SelectFromList'
import ChooseCategory from '../WarehouseParts/ChooseCategory'
import TableFields from '../../general/TableFields'
import {remain_headers} from '../../../data/tableHeaders'
import TableRemains from './TableRemains'
import {checkObject} from '../../general/utils'
import {addDiscountMargin} from '../../../Redux/actions/priceAction'
import Paginate from '../../general/Paginate'
import Search from '../Search'


const WarehouseRemains = (props) => {

    useEffect(() => {
        props.addWarehouseCategories()
    }, [props.warehouse.showDeleted])

    useEffect(() => {
        if (checkObject(props.remain.filter_warehouse))  props.addRemain()
    }, [
        props.remain.page,
        props.remain.filter_warehouse,
        props.remain.filter_category,
        props.remain.filter_type,
        props.remain.filter_title
    ])


    const tableMarginHeaders = props.discount_margin.filter(margin => margin.margin_type === 2).map((margin, idx) => {
        return  {
            id: idx + 15,
            margin_id: margin.id,
            title: margin.title,
            field: 'where_to_buy',
            width: 50,
            order: idx + 15
        }
    })

    return (
        <div className='contentTab'>
            <div className='row jc-sb'>
                <div className='row al-itm-fe'>
                    <SelectFromList
                        id='selWarRem'
                        title='Склад'
                        className=''
                        list={props.warehouse.warehouses}
                        setElement={warehouse => props.changeRemainState({filter_warehouse: warehouse})}
                        current_object={props.remain.filter_warehouse}
                        noChoosed='Выберете склад'
                        width={'210px'}
                    />
                    <ChooseCategory
                        className='ml10'
                        width={'210px'}
                        setCategory={category => props.changeRemainState({filter_category: category})}
                        current_category={props.remain.filter_category}
                        disabled={false}
                    />
                    <SelectFromList
                        id='selTypeOption'
                        title='Фильтр'
                        className='ml10'
                        list={props.remain.type_option}
                        setElement={warehouse => props.changeRemainState({filter_type: warehouse})}
                        current_object={props.remain.filter_type}
                        width={'210px'}
                    />
                    <Search
                        className='ml15 pd2'
                        func={search => props.changeRemainState({filter_title: search})}
                    />
                </div>
                <TableFields
                    id='fremains'
                    classNameMenu='listOption'
                    height='200px'
                    list={remain_headers.concat(tableMarginHeaders)}
                    checked_list={props.remain.table_headers}
                    func={props.selectedRemain}
                />
            </div>

            {checkObject(props.remain.filter_warehouse) ? <TableRemains/> : <div className='makeChoice'>Выбирете склад</div>}
            <div className='row'>
                <Paginate
                    allItems={props.remain.remains_count}
                    onPage={50}
                    count={2}
                    count_start_end={2}
                    navigation={true}
                    func={page => props.changeRemainState({page})}
                />
                <div className='ml10'>Всего - {props.remain.remains_count}</div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    remain: state.remain,
    warehouse: state.warehouse,
    discount_margin: state.price.discount_margin

})

const mapDispatchToProps = {
    addRemain,
    changeRemainState,
    addWarehouseCategories,
    selectedRemain,
    addDiscountMargin
}

export default connect(mapStateToProps, mapDispatchToProps)(WarehouseRemains)