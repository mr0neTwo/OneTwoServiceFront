import React, {useEffect} from 'react'
import { connect } from 'react-redux'

import {addWriteOf, changeWriteOfState, selectedWriteOf} from '../../../Redux/actions/writeOfAction'
import {Table} from '../../../data/tableHeaders'
import {changeVisibleState} from '../../../Redux/actions'

import TableFields from '../../general/TableFields'
import Button from '../../general/Button'
import ChooseDate from '../../general/calandar/ChooseDate'
import WriteOfTable from './WriteOfTable'
import Paginate from '../../general/Paginate'

const WarehouseWriteOf = props => {

    useEffect(() => {
        props.addWriteOf()
    }, [props.writeof.filter_created_at, props.writeof.page])


    const handleNewWriteOf = () => {
        props.changeWriteOfState({write_of_type: {new_write_of: true, type: 'WAREHOUSE'}})
        props.changeVisibleState({statusWriteOfEditor: true})
    }

    return (
        <>
            <div className='row jc-sb mt15'>
                <div className='row'>
                    <Button
                        id='addWriteOf'
                        title='+ Списание'
                        className='greenButton h31'
                        onClick={handleNewWriteOf}
                    />
                    <ChooseDate
                        className='ml10 h27'
                        width='250px'
                        range={true}
                        func={date => props.changeWriteOfState({filter_created_at: date.map(date => parseInt(date / 1000))})}
                        current_date={props.writeof.filter_created_at}
                    />
                    <Button
                        title='Применить'
                        className='blueButton'
                        onClick={() => props.addWriteOf()}
                    />
                </div>
                <TableFields
                    id='writeFields'
                    height='185px'
                    classNameMenu='listOption'
                    list={Table.Fields.WriteOf}
                    checked_list={props.writeof.table_headers}
                    func={props.selectedWriteOf}
                />
            </div>
            <WriteOfTable/>
            <div className='row'>
                <Paginate
                    allItems={props.writeof.count}
                    onPage={50}
                    count={2}
                    count_start_end={2}
                    navigation={true}
                    func={page => props.changeWriteOfState({page})}
                />
                <div className='ml10'>Всего - {props.writeof.count}</div>
            </div>
        </>
    )
}

const mapStateToProps = state => ({
    writeof: state.writeof,
    view: state.view
})

const mapDispatchToProps = {
    changeWriteOfState,
    addWriteOf,
    selectedWriteOf,
    changeVisibleState
}

export default connect(mapStateToProps, mapDispatchToProps)(WarehouseWriteOf)