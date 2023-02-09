import React, {useEffect} from 'react'
import {connect} from 'react-redux'

import {addRemain, changeRemainState, selectedRemain} from '../../../Redux/actions/remainAction'
import {addWarehouseCategories} from '../../../Redux/actions/warehouseAction'

import SelectFromList from '../../general/SelectFromList'
import ChooseCategory from '../WarehouseParts/ChooseCategory'
import TableFields from '../../general/TableFields'
import TableRemains from './TableRemains'
import {checkObject} from '../../general/utils'
import {addDiscountMargin} from '../../../Redux/actions/priceAction'
import Paginate from '../../general/Paginate'


const WarehouseRemains = (props) => {

    useEffect(() => {
        props.addWarehouseCategories()
    }, [props.warehouse.showDeleted])

    useEffect(() => {
        if (checkObject(props.remain.filter_warehouse)) props.addRemain()
    }, [
        props.remain.page,
        props.remain.filter_warehouse,
        props.remain.filter_category,
        props.remain.filter_type,
        props.remain.filter_title
    ])

    useEffect(() => {
        const tableMarginHeaders = props.discount_margin
            .filter(margin => margin.margin_type === 2)
            .filter(margin => !props.remain.table_headers.map(header => header.field).includes(`price_${margin.id}`))
            .map((margin, idx) => {
            return {
                id: idx + 15,
                title: margin.title,
                field: `price_${margin.id}`,
                visible: true,
                width: 50,
                order: idx + 15
            }
        })

        if (tableMarginHeaders.length) {
            props.changeRemainState({table_headers: props.remain.table_headers.concat(tableMarginHeaders)})
        }

    }, [])


    return (
        <div className='box'>
            <div className='row jc-sb'>
                <div className='two-buttons'>
                    <SelectFromList
                        id='selWarRem'
                        title='Склад'
                        className='w220'
                        list={props.warehouse.warehouses}
                        setElement={warehouse => props.changeRemainState({filter_warehouse: warehouse})}
                        current_object={props.remain.filter_warehouse}
                        noChoosed='Выберете склад'
                    />
                    <ChooseCategory
                        className='w220'
                        setCategory={category => props.changeRemainState({filter_category: category})}
                        current_category={props.remain.filter_category}
                        disabled={false}
                    />
                    <SelectFromList
                        id='selTypeOption'
                        title='Фильтр'
                        className='w220'
                        list={props.remain.type_option}
                        setElement={warehouse => props.changeRemainState({filter_type: warehouse})}
                        current_object={props.remain.filter_type}
                    />

                </div>
                <TableFields
                    id='remains'
                    list={props.remain.table_headers}
                    func={table_headers => props.changeRemainState({table_headers})}
                />
            </div>

            <TableRemains/>
            <Paginate
                allItems={props.remain.remains_count}
                onPage={50}
                count={2}
                count_start_end={2}
                navigation={true}
                func={page => props.changeRemainState({page})}
            />
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