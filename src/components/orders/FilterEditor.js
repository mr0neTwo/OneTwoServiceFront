import React, {useEffect} from 'react'
import {connect} from 'react-redux'

import { changeVisibleState,} from '../../Redux/actions'
import LableInput from '../general/LableInput'
import Checkbox from '../general/Checkbox'
import BottomButtons from '../general/BottomButtons'
import {changeFilterState, createCustomFilter} from '../../Redux/actions/filterAction'

const FilterEditor = props => {

    const handleClose = () => {
        props.changeVisibleState({statusCreateNewFilter: false, inputFilterTitleChecked: true})
    }

    const clickHandel = event => {
        if (!event.path.map((el) => el.id).includes('createNewFilterWindow')) {
            handleClose()
        }
    }

    useEffect(() => {
        window.addEventListener('click', clickHandel)
        return () => {
            window.removeEventListener('click', clickHandel)
        }
    })

    const handleCreate = () => {
        if (props.filter.title) {
            props.createCustomFilter()
        } else {
            props.changeVisibleState({inputFilterTitleChecked: false})
        }
    }

    return (
        <div className="rightBlock">
            <div className="rightBlockWindow" id="createNewFilterWindow">

                <div className="createNewTitle w515">{props.filter.active_filter ? props.filter.title : 'Новый фильтр'}</div>

                <div className="contentEditor">
                    <LableInput
                         className='mt15'
                         title='Наименование'
                         onChange={event => props.changeFilterState({title: event.target.value})}
                         value={props.filter.title}
                         checkedFlag='inputFilterTitleChecked'
                         checked={props.inputFilterTitleChecked}
                         redStar={true}
                    />
                    <Checkbox
                        className='mt15'
                        label='Общий'
                        onChange={event => props.changeFilterState({general: event.target.checked})}
                        checked={props.filter.general}
                    />
                </div>

                <BottomButtons
                    edit={props.filter.active_filter}
                    create={handleCreate}
                    // save={handleSave}
                    // delete={() => props.deleteNotEvent(true)}
                    close={handleClose}
                />
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    filter: state.filter,
    inputFilterTitleChecked: state.view.inputFilterTitleChecked,

})

const mapDispatchToProps = {
    changeVisibleState,
    createCustomFilter,
    changeFilterState
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterEditor)
