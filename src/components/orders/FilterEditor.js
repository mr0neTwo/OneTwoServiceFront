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
        if (
            !event.composedPath().map((el) => el.id).includes('createNewFilter') &&
            !event.composedPath().map((el) => el.id).includes('customFilterCreate')
        ) {
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
        <div className="modal">
            <div className="modal__box modal__box_editor" id="createNewFilter">

                <h4>{props.filter.active_filter ? props.filter.title : 'Новый фильтр'}</h4>

                <div className="modal__body modal__body_filter">
                    <LableInput
                         title='Наименование'
                         onChange={event => props.changeFilterState({title: event.target.value})}
                         autoFoucus={true}
                         value={props.filter.title}
                         checkedFlag='inputFilterTitleChecked'
                         checked={props.inputFilterTitleChecked}
                         redStar={true}
                    />
                    <Checkbox
                        id='id'
                        type='slide-one'
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
