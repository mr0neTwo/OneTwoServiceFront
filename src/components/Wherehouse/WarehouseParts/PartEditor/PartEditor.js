import React, {useEffect, useMemo} from 'react'
import {connect} from 'react-redux'

import {changePartState, resetPart, createPart, savePart, deletePart, getPart} from '../../../../Redux/actions/partAction';
import {changeVisibleState} from '../../../../Redux/actions'

import BottomButtons from '../../../general/BottomButtons'
import EditPart from './EditPart'
import Tabs from '../../../general/Tabs'
import EditPrices from './EditPrices'
import EditResidueRules from './EditResidueRules'
import EditPartSalary from './EditPartSalary'
import PartRemains from './PartRemains'
import PartMovement from './PartMovement'
import WarehouseRemains from './WarehouseRemains'


const PartEditor = props => {

    const handleClose = () => {
        props.changeVisibleState({
            statusPartEditor: false,
            inputWPartTitleChecked: true
        })
        props.resetPart()
    }

    const clickHandel = event => {
        if (
            !event.composedPath().map((el) => el.id).includes('wpartEditorWindow') &&
            !event.composedPath().map((el) => el.id).includes('writeOfEditor') &&
            !event.composedPath().map((el) => el.id).includes('registrationEditor') &&
            !event.composedPath().map((el) => el.id).includes('clientEditor') &&
            !event.composedPath().map((el) => el.id).includes('statusBackEditor') &&
            !event.composedPath().map((el) => el.id).includes('btaddWP')
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

    const can_delete = props.permissions.includes('delete_parts')
    const can_recover = props.permissions.includes('recover_parts')

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
        let current_tabs = [(<div><EditPart/><EditPrices/><EditResidueRules/><EditPartSalary/></div>), (<PartMovement/>)]
        if (props.permissions.includes('see_registrations')) {
            current_tabs.push((<PartRemains/>))
        }
        if (props.permissions.includes('see_remaining_warehouse')) {
            current_tabs.push((<WarehouseRemains/>))
        }
        return current_tabs
    }, [props.permissions])

    return (
        <div className={`rightBlock ${props.view.statusReqSparePartEditor ? 'z99999' : 'z99'}`}>
            <div className='rightBlockWindow' id='wpartEditorWindow'>
                <div className='createNewTitle'>{props.part.edit ? props.part.title : 'Новый товар'}</div>

                <div className='contentEditor w600'>

                    {!props.part.edit ? tabs[0] :
                        <div>
                            <Tabs
                                list={list}
                                tab={props.part.tabs}
                                func={tab => props.changePartState({tabs: tab})}
                            />

                            {tabs[props.part.tabs]}
                        </div>
                    }
                </div>

                <BottomButtons
                    edit={props.part.edit}
                    deleted={props.part.deleted}
                    create={handleCreate}
                    save={handleSave}
                    delete={can_delete ? () => props.deletePart(true) : null}
                    recover={can_recover ? () => props.deletePart(false) : null}
                    close={handleClose}
                />
            </div>
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
