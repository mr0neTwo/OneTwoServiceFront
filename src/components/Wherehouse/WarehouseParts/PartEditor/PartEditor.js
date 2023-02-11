import React, {useEffect, useMemo} from 'react'
import {connect} from 'react-redux'

import {changePartState, resetPart, createPart, savePart, deletePart, getPart} from '../../../../Redux/actions/partAction';
import {changeVisibleState} from '../../../../Redux/actions'

import BottomButtons from '../../../general/BottomButtons'
import Tabs from '../../../general/Tabs'
import PartRemains from './PartRemains'
import PartMovement from './PartMovement'
import WarehouseRemains from './WarehouseRemains'
import MainPartEditor from './MainPartEditor'


const PartEditor = props => {

    const componentId = 'PartEditor'

    const handleClose = () => {
        props.changeVisibleState({
            isRightModalOpen: false,
            modalType: '',
            inputWPartTitleChecked: true
        })
        props.resetPart()
    }

    const clickHandel = event => {
        if ( !event.composedPath().map((el) => el.id).some(element_id => element_id?.includes('Editor'))) {
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
        if (props.part.title) {
            props.createPart()
            handleClose()
        } else {
            props.changeVisibleState({inputWPartTitleChecked: false})
        }
    }

    const handleSave = () => {
        if (props.part.title) {
            props.savePart()
            handleClose()
        } else {
            props.changeVisibleState({inputWPartTitleChecked: false})
        }
    }

    const canDelete = props.permissions.includes('delete_parts')
    const canRecover = props.permissions.includes('recover_parts')

    const list = useMemo(() => {
        let current_list = ['Общие', 'История']
        if (props.permissions.includes('see_registrations')) {
            current_list.push('Паритии')
        }
        if (props.permissions.includes('see_remaining_warehouse')) {
            current_list.push('Остатки')
        }
        return current_list

    }, [props.permissions])

    const tabs = useMemo(() => {
        let current_tabs = [
            (<MainPartEditor/>),
            (<PartMovement/>)
        ]
        if (props.permissions.includes('see_registrations')) {
            current_tabs.push((<PartRemains/>))
        }
        if (props.permissions.includes('see_remaining_warehouse')) {
            current_tabs.push((<WarehouseRemains/>))
        }
        return current_tabs
    }, [props.permissions])

    return (
            <div className='modal__box-right' id={componentId}>
                <h4>{props.part.edit ? props.part.title : 'Новый товар'}</h4>

                <div className='modal__body-right'>

                    {!props.part.edit ? tabs[0] :
                        <>
                            <Tabs
                                list={list}
                                tab={props.part.tabs}
                                func={tab => props.changePartState({tabs: tab})}
                            />

                            {tabs[props.part.tabs]}
                        </>
                    }
                </div>

                <BottomButtons
                    edit={props.part.edit}
                    deleted={props.part.deleted}
                    create={handleCreate}
                    save={handleSave}
                    delete={canDelete ? () => props.deletePart(true) : null}
                    recover={canRecover ? () => props.deletePart(false) : null}
                    close={handleClose}
                />
            </div>
    )
}

const mapStateToProps = (state) => ({
    part: state.part,
    permissions: state.data.user.role.permissions,
    statusOrderNotFound: state.view.statusOrderNotFound,
    view: state.view
})

const mapDispatchToProps = {
    changePartState,
    resetPart,
    createPart,
    savePart,
    deletePart,
    getPart,
    changeVisibleState
}

export default connect(mapStateToProps, mapDispatchToProps)(PartEditor)
