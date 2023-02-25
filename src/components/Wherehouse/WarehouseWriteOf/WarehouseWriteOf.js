import React, {useEffect} from 'react'
import {connect} from 'react-redux'

import {addWriteOf, changeWriteOfState, selectedWriteOf} from '../../../Redux/actions/writeOfAction'
import {Modal} from "../../../data/data"
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
        props.changeVisibleState({isCentralModalOpen: true, modalCentralType: Modal.Type.WRITE_OFF})
    }

    return (
        <div className='box'>
            <div className='page-buttons'>
                <div className='two-buttons'>
                    <Button
                        id='WriteOfEditor'
                        size='med'
                        type='create'
                        title='Списание'
                        onClick={handleNewWriteOf}
                    />
                    <ChooseDate
                        title='Диапазон'
                        range={true}
                        func={date => props.changeWriteOfState({filter_created_at: date.map(date => parseInt(date / 1000))})}
                        current_date={props.writeof.filter_created_at}
                    />
                </div>
                <TableFields
                    id='writeOf'
                    list={props.writeof.table_headers}
                    checked_list={props.writeof.table_headers}
                    func={table_headers => props.changeWriteOfState({table_headers})}
                />
            </div>
            <WriteOfTable/>
            <Paginate
                allItems={props.writeof.count}
                onPage={50}
                count={2}
                count_start_end={2}
                navigation={true}
                func={page => props.changeWriteOfState({page})}
            />
        </div>
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