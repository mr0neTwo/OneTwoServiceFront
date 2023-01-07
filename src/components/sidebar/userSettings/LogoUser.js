import React from 'react';
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'

import {editEmployee} from '../../../Redux/actions/employeeAction'


function LogoUser(props) {

    return (
        <Link to='/user'>
            <div
                className='avatar'
            >
                <img
                    src={`${process.env.REACT_APP_LOCAL_SOURCE}/${props.user.avatar}`}
                    className='img-avatar'
                    alt='User avatar'
                />
            </div>
        </Link>
    )

}

const mapStateToProps = state => ({
    user: state.data.user
})

const mapDispatchToProps = {
    editEmployee
}

export default connect(mapStateToProps, mapDispatchToProps)(LogoUser)
