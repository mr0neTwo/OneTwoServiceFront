import React, {useEffect} from 'react'
import {connect} from 'react-redux'

import {changeBranchState, createBranch, deleteBranch, resetBranch, saveBranch} from '../../../../Redux/actions/branchAction'
import {changeVisibleState} from '../../../../Redux/actions'


import BottomButtons from '../../../general/BottomButtons'
import LableInput from '../../../general/LableInput'
import Schedule from './Schedule'
import ChooseIcon from './ChooseIcon'
import ChooseOfList from '../../../general/ChooseOfList'
import ChooseEmployees from './ChooseEmployees'

const BranchEditor = (props) => {

    const handleClose = () => {
        props.changeVisibleState({
            statusBranchEditor: false,
            inputBranchNameChecked: true,
            inputBranchPrefixChecked: true,
            inputBranchPrefixDocChecked: true
        })
        props.resetBranch()
    }

    const clickHandel = (event) => {
        if (!event.composedPath().map((el) => el.id).includes('BranchEditorWiondow')) {
            handleClose()
        }
    }

    useEffect(() => {
        window.addEventListener('click', clickHandel)
        return () => {
            window.removeEventListener('click', clickHandel)
        }
    })

    const handleCreateBranch = () => {
        if (
            props.branch.name &&
            props.branch.orders_prefix &&
            props.branch.documents_prefix
        ) {
            props.createBranch()
        } else {
            if (!props.branch.name) {
                props.changeVisibleState({inputBranchNameChecked: false})
            }
            if (!props.branch.orders_prefix) {
                props.changeVisibleState({inputBranchPrefixChecked: false})
            }
            if (!props.branch.documents_prefix) {
                props.changeVisibleState({inputBranchPrefixDocChecked: false})
            }
        }
    }

    const handleSaveBranch = () => {
        if (
            props.branch.name &&
            props.branch.orders_prefix &&
            props.branch.documents_prefix
        ) {
            props.saveBranch()
        } else {
            if (!props.branch.name) {
                props.changeVisibleState({inputBranchNameChecked: false})
            }
            if (!props.branch.orders_prefix) {
                props.changeVisibleState({inputBranchPrefixChecked: false})
            }
            if (!props.branch.documents_prefix) {
                props.changeVisibleState({inputBranchPrefixDocChecked: false})
            }
        }
    }
    const handleRecover = () => {
        if (props.permissions.includes('setting_recover_branch'))
            props.deleteBranch(false)
    }


    return (
        <div className="rightBlock">
            <div className="rightBlockWindow" id="BranchEditorWiondow">
                <div className="createNewTitle">
                    {props.branch.edit ? props.branch.name : ' ?????????? ??????????????'}
                </div>

                <LableInput
                    className="w250 mt15"
                    title="????????????????"
                    onChange={event => props.changeBranchState({name: event.target.value})}
                    value={props.branch.name}
                    checkedFlag="inputBranchNameChecked"
                    checked={props.view.inputBranchNameChecked}
                    redStar={true}
                    disabled={props.branch.deleted}
                />
                <LableInput
                    className="w250 mt15"
                    title="??????????"
                    onChange={event => props.changeBranchState({address: event.target.value})}
                    value={props.branch.address}
                    disabled={props.branch.deleted}
                />
                <LableInput
                    className='textInput w250'
                    title='??????????????'
                    onChange={value => props.changeBranchState({phone: value})}
                    value={props.branch.phone}
                    disabled={props.branch.deleted}
                    isPhone={true}
                />
                <Schedule/>
                <ChooseIcon/>
                <div className="lableImput mt15">?????? ???????????? ???? ??????????????????</div>
                <ChooseOfList
                    id={18}
                    list={props.order_type}
                    setElement={orders_type_id => props.changeBranchState({orders_type_id})}
                    current_id={props.branch.orders_type_id}
                    width={'250px'}
                    disabled={props.branch.deleted}
                />
                <LableInput
                    className="w250 mt15"
                    title="???????????? ???????????? ????????????"
                    onChange={event => props.changeBranchState({orders_prefix: event.target.value})}
                    value={props.branch.orders_prefix}
                    checkedFlag="inputBranchPrefixChecked"
                    checked={props.view.inputBranchPrefixChecked}
                    redStar={true}
                    disabled={props.branch.deleted}
                />
                <p className="mt0">
                    ????????????:{' '}
                    {`${props.branch.orders_prefix}-${
                        props.counters.find((count) => count.id === 1).count
                    }`}
                </p>
                <LableInput
                    className="w250 mt15"
                    title="???????????? ???????????? ????????????????????"
                    onChange={event => props.changeBranchState({documents_prefix: event.target.value})}
                    value={props.branch.documents_prefix}
                    checkedFlag="inputBranchPrefixDocChecked"
                    checked={props.view.inputBranchPrefixDocChecked}
                    redStar={true}
                    disabled={props.branch.deleted}
                />
                <p className="mt0">
                    ????????????:{' '}
                    {`${props.branch.documents_prefix}-${
                        props.counters.find((count) => count.id === 2).count
                    }`}
                </p>
                <ChooseEmployees/>

                <BottomButtons
                    edit={props.branch.edit}
                    create={handleCreateBranch}
                    save={handleSaveBranch}
                    recover={handleRecover}
                    delete={() => props.deleteBranch(true)}
                    close={handleClose}
                    deleted={props.branch.deleted}
                />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    branch: state.branch,
    view: state.view,
    order_type: state.data.order_type,
    counters: state.data.counters,
    permissions: state.data.user.role.permissions,
})

const mapDispatchToProps = {
    changeVisibleState,
    changeBranchState,
    createBranch,
    saveBranch,
    deleteBranch,
    resetBranch
}

export default connect(mapStateToProps, mapDispatchToProps)(BranchEditor)
