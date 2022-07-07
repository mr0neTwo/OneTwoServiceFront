import React, {useEffect} from 'react'
import {connect} from 'react-redux'

import {changeVisibleState, addCounters} from '../../../../Redux/actions'
import {addBranches, changeBranchState} from '../../../../Redux/actions/branchAction'

import Checkbox from '../../../general/Checkbox'
import BranchEditor from './BranchEditor'
import TableBranches from './TableBranches'

const SettingBranches = (props) => {

    useEffect(() => {
        props.addCounters()
    }, [])

    useEffect(() => {
        props.addBranches()
    }, [props.showDeleted])

    const addBranch = () => {
        props.changeVisibleState({statusBranchEditor: true})
        props.changeBranchState({
            employees: props.employees.filter(employee => !employee.deleted && employee.id !== 0).map(employee => employee.id)
        })
    }

    return (
        <div className='settingContent'>

            <div className='Header'>
                <span className='headerTitle'>Локации</span>
            </div>

            <div className='settingPageBody'>
                <p>Таблица показывает все локации компании. Каждой локации можно присвоить уникальный код и цвет.</p>
                <div className='row'>
                    <div
                        className='greenButton'
                        onClick={addBranch}
                    >
                        + Добавить локацию
                    </div>
                    {props.permissions.includes('setting_see_branch') ? <Checkbox
                        className='ml10'
                        label='Показать удаленные'
                        onChange={event => props.changeBranchState({showDeleted: event.target.checked})}
                        checked={props.showDeleted}
                    /> : null}
                </div>

                <TableBranches/>

                {props.statusBranchEditor ? <BranchEditor/> : null}
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    statusBranchEditor: state.view.statusBranchEditor,
    showDeleted: state.branch.showDeleted,
    permissions: state.data.user.role.permissions,
    employees: state.employee.employees
})

const mapDispatchToProps = {
    changeVisibleState,
    addCounters,
    changeBranchState,
    addBranches
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingBranches)