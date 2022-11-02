import React, {useEffect} from 'react'
import { connect } from 'react-redux'

import {addWriteOf, changeWriteOfState, selectedWriteOf} from '../../../Redux/actions/writeOfAction'
import {write_of_headers} from '../../../data/tableHeaders'

import TableFields from '../../general/TableFields'
import Button from '../../general/Button'
import ChooseDate from '../../general/calandar/ChooseDate'
import WriteOfTable from './WriteOfTable'
import WriteOfEditor from './WriteOfEditor'
import {changeVisibleState} from '../../../Redux/actions'

const WarehouseWriteOf = props => {

    useEffect(() => {
        props.addWriteOf()
    }, [props.writeof.filter_created_at, props.writeof.page])


    const handleNewWriteOf = () => {
        props.changeWriteOfState({write_of_type: {new_write_of: true, type: 'WAREHOUSE'}})
        props.changeVisibleState({statusWriteOfEditor: true})
    }

    return (
        <div className = 'contentTab'>
            <div className='row jc-sb'>
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
                    list={write_of_headers}
                    checked_list={props.writeof.table_headers}
                    func={props.selectedWriteOf}
                />
            </div>
            <WriteOfTable/>
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