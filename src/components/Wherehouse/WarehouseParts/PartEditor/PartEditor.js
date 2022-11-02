import React, {useEffect} from 'react'
import {connect} from 'react-redux'

import {changePartState, resetPart, createPart, savePart, deletePart, getPart} from '../../../../Redux/actions/partAction';
import {changeVisibleState} from '../../../../Redux/actions'

import BottomButtons from '../../../general/BottomButtons'
import EditPart from './EditPart'
import Tabs from '../../../general/Tabs'
import TempPage from '../../../general/TempPage'
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
            !event.path.map((el) => el.id).includes('wpartEditorWindow') &&
            !event.path.map((el) => el.id).includes('writeOfEditor') &&
            !event.path.map((el) => el.id).includes('registrationEditor') &&
            !event.path.map((el) => el.id).includes('clientEditor') &&
            !event.path.map((el) => el.id).includes('btaddWP')
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

    const getContent = (tab) => {
        switch (tab) {
            case 0:
                return (
                    <div>
                        <EditPart/>
                        <EditPrices/>
                        <EditResidueRules/>
                        <EditPartSalary/>
                    </div>
                )
            case 1:
                return <PartRemains/>
            case 2:
                return <PartMovement/>
            case 3:
                return <WarehouseRemains/>
            default:
                return <TempPage title='Редактор запчатей'/>
        }
    }

    return (
        <div className='rightBlock z99'>
            <div className='rightBlockWindow' id='wpartEditorWindow'>
                <div className='createNewTitle'>{props.part.edit ? props.part.title : 'Новый товар'}</div>

                <div className='contentEditor w600'>

                    {!props.part.edit ? getContent(0) :
                        <div>
                            <Tabs
                                list={['Общие', 'Паритии', 'История', 'Остатки']}
                                tab={props.part.tabs}
                                func={tab => props.changePartState({tabs: tab})}
                            />

                            {getContent(props.part.tabs)}
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
    statusOrderNotFound: state.view.statusOrderNotFound
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
