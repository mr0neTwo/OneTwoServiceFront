import React, {useEffect} from 'react'
import { connect } from 'react-redux'

import {addBacks, changeBackState, selectedBack} from '../../../Redux/actions/warehouseBackActions'
import {back_headers} from '../../../data/tableHeaders'

import ChooseDate from '../../general/calandar/ChooseDate'
import TableFields from '../../general/TableFields'
import Paginate from '../../general/Paginate'
import BackTable from './BackTable'

const WarehouseBacks = props => {

    useEffect(() => {
        props.addBacks()
    }, [props.back.page, props.back.filter_created_at])

    return (
        <div className = 'contentTab'>
            <div className='row jc-sb'>
                <div className='row'>
                    <ChooseDate
                        className='ml10 h27'
                        width='250px'
                        range={true}
                        func={date => props.changeBackState({filter_created_at: date.map(date => parseInt(date / 1000))})}
                        current_date={props.back.filter_created_at}
                    />
                </div>
                <TableFields
                    id='backFields'
                    height='185px'
                    classNameMenu='listOption'
                    list={back_headers}
                    checked_list={props.back.table_headers}
                    func={props.selectedBack}
                />
            </div>
            <BackTable/>
            <div className='row'>
                <Paginate
                    allItems={props.back.count}
                    onPage={50}
                    count={2}
                    count_start_end={2}
                    navigation={true}
                    func={page => props.changeBackState({page})}
                />
                <div className='ml10'>Всего - {props.back.count}</div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    back: state.back
})

const mapDispatchToProps = {
    changeBackState,
    addBacks,
    selectedBack
}

export default connect(mapStateToProps, mapDispatchToProps)(WarehouseBacks)