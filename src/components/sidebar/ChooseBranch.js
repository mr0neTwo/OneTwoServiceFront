import React, {useState} from 'react'
import {connect} from 'react-redux'

import {changeBranchState} from '../../Redux/actions/branchAction'

import Icon from '../general/Icon'

const ChooseBranch = (props) => {

    const [menuVisible, setMenuVisible] = useState(false)

    const handleChoose = (branch) => {
        props.changeBranchState({current_branch: branch})
        setMenuVisible(false)
    }

    return (
        <div>
            <div
                className='menuBranch'
                onClick={() => setMenuVisible(!menuVisible)}
            >
                <Icon
                    className='smalIcon'
                    icon={props.current_branch.icon}
                    color={props.current_branch.color}
                />
                <div className='sidebarBranch'>
                    {props.current_branch.name}
                </div>
            </div>
            {menuVisible ? <div className='listOptionsBranch'>
                {props.branches.filter(branch => branch.employees.includes(props.user_id) && !branch.deleted).map(branch => (
                    <div
                        key={branch.id}
                        className='listBranch'
                        onClick={() => handleChoose(branch)}
                    >
                        <Icon
                            className='smalIcon'
                            icon={branch.icon}
                            color={branch.color}
                        />
                        <div className='ml5'>{branch.name}</div>
                    </div>
                ))}
            </div> : null}
        </div>
    )
}

const mapStateToProps = state => ({
    current_branch: state.branch.current_branch,
    branches: state.branch.branches,
    user_id: state.data.user.id
})

const mapDispatchToProps = {
    changeBranchState
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseBranch)